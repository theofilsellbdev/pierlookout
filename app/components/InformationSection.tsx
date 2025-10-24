import { AnimatePresence, motion } from "framer-motion";
import { JSX, useId, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

type AccordianItemProps = {
    title: string;
    content: string[];
    isOpen: boolean;            // controlled
    onToggle: () => void;       // controlled
    className?: string;
};

const accordionItems = [
    {
        title: "Cleaning & Safety",
        content: [
            "Professionally cleaned",
            "Contactless check-in/out",
            "No staff present",
            "Linens washed to local guidelines",
            "Linens washed above 60°C/140°F",
            "Mattress and pillow protectors",
            "Washable duvet covers",
        ],
    },
    {
        title: "Facilities",
        content: [
            "Free WiFi internet",
            "High-speed internet",
            "Express check-in",
        ],
    },
    {
        title: "Parking",
        content: [
            "Free parking",
            "Off-site parking",
        ],
    },
    {
        title: "Activities & Experiences",
        content: [
            "Bird watching",
            "Art galleries & museums",
            "Theatre and opera",
            "Walking",
            "Water activities",
            "Water-skiing",
            "Watersports",
        ],
    },
    {
        title: "Accessibility",
        content: [
            "Pier Lookout is located at the top of the building and is reached via approximately six small flights of stairs.",
            "Not suitable for wheelchair access.",
            "No lift available.",
        ],
    },
];


export default function InformationSection(): JSX.Element {
    return (
        <section
            className="w-full h-fit flex items-center justify-center flex-col"
            style={{ fontFamily: "--var-shippori-serif" }}
        >
            <h2 className="text-[clamp(1rem,2vw,2rem)] max-w-6xl mb-4">Information</h2>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] h-full w-full max-w-5xl gap-x-[4rem] pb-[4rem] px-[2rem]">
                {/* Left Column */}
                <div className="w-full h-full flex flex-col">
                    {/* About the flat: */}
                    <h3 className="text-[clamp(.7rem,2vw,1.2rem)] mb-1">About the flat:</h3>
                    <p className="text-[clamp(.65rem,2vw,1rem)]">
                        Pier Lookout is a tranquil top-floor apartment with sweeping sea views over Eastbourne’s historic pier. Just steps from the beach, it blends coastal charm with modern comfort. The bright open-plan living space is perfect for slow mornings or quiet evenings, complete with an acoustic guitar for relaxed nights in.
                    </p>
                    {/* Divider */}<div className="w-full h-[1px] bg-gray-300 my-4" />
                    {/* Contact */}
                    {/* About the flat: */}
                    <h3 className="text-[clamp(.7rem,2vw,1.2rem)] mb-1">Contact Us:</h3>
                    <p className="text-[clamp(.65rem,2vw,1rem)]">
                        For any inquiries or assistance, please reach out to us at <a href="mailto:info@pierlookout.co.uk" className="underline">info@pierlookout.co.uk</a> or call us at <a href="tel:+447966626651" className="underline">+44 79666 26651</a>.
                    </p>
                    {/* Divider */}<div className="w-full h-[1px] bg-gray-300 my-4" />
                    {/* A quick Overview */}
                    <h3 className="text-[clamp(.7rem,2vw,1.2rem)] mb-1">A quick Overview:</h3>
                    <ul className="list-disc list-inside text-[clamp(.65rem,2vw,1rem)]">
                        <li>Top-floor apartment with panoramic pier and sea views</li>
                        <li>Romantic double bedroom with modern interiors</li>
                        <li>Bright open-plan living, dining &amp; kitchen space</li>
                        <li>Professionally cleaned with contactless check-in</li>
                        <li>Free high-speed Wi-Fi &amp; Smart TV</li>
                        <li>Easy access to Eastbourne beach and pier</li>
                        <li>Steps from galleries, cafés &amp; coastal walks</li>
                        <li>Free and off-site parking options</li>
                        <li>Accessed via stairs (no lift)</li>
                    </ul>
                    {/* Divider */}<div className="w-full h-[1px] bg-gray-300 my-4" />
                    <h3 className="text-[clamp(.7rem,2vw,1.2rem)] mb-1">Please Note:</h3>
                    <ul className="list-disc list-inside text-[clamp(.65rem,2vw,1rem)]">
                        <li>Unfortunately the flat is not suitable for children, pets, and stag or hen parties.</li>
                        <li>Smoking is not allowed in the flat.</li>
                    </ul>

                </div>
                {/* Right Column */}
                <div className="w-full h-full flex flex-col">
                    {/* Mobile Divider */}
                    <div className="w-full h-[1px] bg-gray-300 my-4 sm:hidden" />
                    {/* Getting Here: */}
                    <h3 className="text-[clamp(.7rem,2vw,1.2rem)] mb-4">Getting Here:</h3>
                    {/* Map */}
                    <div className="w-full h-64 mb-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2523.428485244599!2d0.29259789999999997!3d50.7676301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df734f1ba16995%3A0x93d9b97d45aacbfb!2sPier%20Lookout!5e0!3m2!1sen!2suk!4v1761310935210!5m2!1sen!2suk&scrollwheel=false&zoom=15&disableDefaultUI=true"
                            width="600"
                            height="450"
                            loading="eager"
                            className="w-full h-full bg-[#f5f5f5]"
                            // disable moving the map
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            referrerPolicy="no-referrer-when-downgrade"

                            // Add a button to open in Google Maps
                            title="Map to Pier Lookout"
                            aria-label="Map to Pier Lookout apartment in Eastbourne"
                        />
                    </div>
                    <p className="text-[clamp(.65rem,2vw,1rem)] text-end">Flat 5, 3 Grand Parade<br />Eastbourne, East Sussex<br />BN21 3EH</p>

                    {/* Divider */} <div className="w-full h-[1px] bg-gray-300 my-4" />
                    {/* Accordion Menus */}
                    <AccordianGroup
                        items={accordionItems}
                    />

                </div>

            </div>
        </section>
    )
}

export function AccordianItem({
    title,
    content,
    isOpen,
    onToggle,
    className = "",
}: AccordianItemProps): JSX.Element {
    const panelId = useId();
    const buttonId = useId();

    return (
        <div className={`w-full rounded-2xl transition ${className}`}>
            <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={onToggle}
                className="group w-full flex items-center justify-between gap-1 text-left"
            >
                <span className="text-[clamp(.8rem,2vw,1.2rem)] font-medium tracking-tight">
                    {title}
                </span>
                <HiChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    aria-hidden="true"
                />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-1 pb-2 text-[clamp(.7rem,2vw,1rem)] leading-6 text-gray-700">
                            <ul className="list-disc pl-5 space-y-1">
                                {content.map((line, i) => (
                                    <li key={i} className="marker:text-gray-400">
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ---- Single-open Group ----
export function AccordianGroup({
    items,
    defaultOpenIndex = null,
}: {
    items: { title: string; content: string[] }[];
    defaultOpenIndex?: number | null;
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

    return (
        <div className="space-y-3">
            {items.map((it, idx) => (
                <AccordianItem
                    key={idx}
                    title={it.title}
                    content={it.content}
                    isOpen={openIndex === idx}
                    onToggle={() =>
                        setOpenIndex((cur) => (cur === idx ? null : idx))
                    }
                />
            ))}
        </div>
    );
}