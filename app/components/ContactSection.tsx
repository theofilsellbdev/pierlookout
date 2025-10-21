import { JSX } from "react";

export default function ContactSection(): JSX.Element {
    return (
        <section
            className="w-full h-fit flex items-center justify-center flex-col pb-[4rem] px-[2rem]"
            style={{ fontFamily: "--var-shippori-serif" }}
        >
            <div className="flex items-center justify-center p-[3rem] flex-col bg-gray-100">
                <h2 className="text-center text-[clamp(1rem,2vw,2rem)] max-w-6xl mb-4">Contact Us</h2>
                <div className="max-w-3xl w-full text-[clamp(.65rem,2vw,1rem)] leading-relaxed">
                    <p className="mb-4 text-center">
                        We would love to hear from you! Whether you have questions about Pier Lookout, need assistance with your booking, or simply want to share your experience, please don&apos;t hesitate to reach out.
                    </p>
                    <p className="mb-4 text-center">
                        You can contact us via email at <a href="mailto:info@pierlookout.co.uk" className="underline">info@pierlookout.co.uk</a> or call us at <a href="tel:+447966626651" className="underline">+44 79666 26651</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}