"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    trackEvent("page_view", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}