// app/api/eviivo-reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const shortname = searchParams.get("shortname") || "PierLookoutBN21";
    const page = searchParams.get("page") || "1";

    const upstream = `https://via.eviivo.com/booking/reviews/${encodeURIComponent(shortname)}/${encodeURIComponent(page)}`;

    const r = await fetch(upstream, {
        headers: {
            "Accept": "text/html, */*;q=0.01",
            "X-Requested-With": "XMLHttpRequest",
        },
        // avoid sending cookies; endpoint is public
    });

    if (!r.ok) {
        return NextResponse.json({ error: `Upstream ${r.status}` }, { status: r.status });
    }

    const html = await r.text();
    const $ = cheerio.load(html);

    const reviews = $(".review-item").map((_, el) => {
        const $el = $(el);
        const name = $el.find(".avatar-name").text().trim();
        const stayedRaw = $el.find(".avatar-date").text().trim(); // e.g. "Stayed: Mar 25"
        const ratingRaw = $el.find(".rating-score").text().trim(); // e.g. "5/5"
        const title = $el.find(".rating-meta h4").text().trim();
        const body = $el.find("article p").first().text().trim();
        const like = $el.find(".likes .likes-details").text().trim();

        // Normalise
        const stayed = stayedRaw.replace(/^Stayed:\s*/i, "");
        const rating = (() => {
            const m = ratingRaw.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
            return m ? { value: Number(m[1]), outOf: Number(m[2]) } : null;
        })();

        return { name, stayed, rating, title, body, like };
    }).get();

    // crude “has next” detection by checking for Next link visibility/content
    const hasNext = $(".mod-paginate a:contains('Next')").length > 0;

    const res = NextResponse.json({ shortname, page: Number(page), hasNext, count: reviews.length, reviews });
    // cache at the edge for an hour; update silently
    res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res;
}