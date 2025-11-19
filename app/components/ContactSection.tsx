"use client";

import { JSX, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ContactSection(): JSX.Element {
    const sectionRef = useRef<HTMLElement | null>(null);
    const hasLoggedViewRef = useRef(false);

    // Track when the section becomes visible
    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasLoggedViewRef.current) {
                        hasLoggedViewRef.current = true;

                        trackEvent("section_view", {
                            section_id: "contact",
                        });
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    const handleEmailClick = () => {
        trackEvent("email_click", {
            location: "contact_section",
        });
    };

    const handlePhoneClick = () => {
        trackEvent("phone_click", {
            location: "contact_section",
        });
    };

    return (
        <section
            ref={sectionRef}
            className="w-full h-fit flex items-center justify-center flex-col pb-[4rem] px-[2rem]"
            style={{ fontFamily: "--var-shippori-serif" }}
        >
            <div className="flex items-center justify-center p-[3rem] flex-col bg-gray-100">
                <h2 className="text-center text-[clamp(1rem,2vw,2rem)] max-w-6xl mb-4">
                    Contact Us
                </h2>

                <div className="max-w-3xl w-full text-[clamp(.65rem,2vw,1rem)] leading-relaxed">
                    <p className="mb-4 text-center">
                        We would love to hear from you! Whether you have questions
                        about Pier Lookout, need assistance with your booking, or
                        simply want to share your experience, please don&apos;t hesitate
                        to reach out.
                    </p>

                    <p className="mb-4 text-center">
                        You can contact us via email at{" "}
                        <a
                            href="mailto:info@pierlookout.co.uk"
                            className="underline"
                            onClick={handleEmailClick}
                        >
                            info@pierlookout.co.uk
                        </a>{" "}
                        or call us at{" "}
                        <a
                            href="tel:+447966626651"
                            className="underline"
                            onClick={handlePhoneClick}
                        >
                            +44 79666 26651
                        </a>.
                    </p>
                </div>
            </div>
        </section>
    );
}