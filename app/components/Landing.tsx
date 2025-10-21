import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LandingSection() {
    const [display, setDisplay] = useState(false);
    const [staticImageURL, setStaticImageURL] = useState<string | null>(null);
    const vidRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        // Get the static image URL
        const fetchStaticImage = async () => {
            try {
                const storageRef = ref(storage);
                const imageRef = ref(storageRef, 'LandingFF.webp');

                getDownloadURL(imageRef)
                    .then((url) => {
                        setStaticImageURL(url);
                    })
                    .catch((error) => {
                        console.error("Error fetching static image URL:", error);
                    });

            }
            catch (error) {
                console.error("Error fetching static image URL:", error);
            }
        };
        void fetchStaticImage();
    }, []);

    useEffect(() => {
        if (vidRef.current) {
            // Play the video when the section is in view
            void vidRef.current.play().catch((error) => {
                console.error("Error playing video:", error);
            });
            setDisplay(true);
            
        }
    }, [display]);




    return (
        <div className="w-full h-[80vh] relative px-[1rem] flex items-center justify-center" id="landing-section">
            <motion.div className="relative bg-gray-200"
                style={{
                    aspectRatio: "2/5",
                    width: "clamp(0px, min(90vw, 80vh), 500px)",
                    height: "100%",                        /* derived from aspect-ratio */
                }}
                initial={{ width: "clamp(0px, min(90vw, 80vh), 900px)" }}
                animate={{ width: display ? "100%" : "clamp(0px, min(90vw, 80vh), 900px)" }}
                transition={{ delay: 5, duration: 2.5 }}
            >
                <motion.div
                    className="absolute top-0 left-0 w-full h-full z-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: display ? .8 : 0 }}
                    transition={{ delay: 7.9, duration: 0.05 }}
                >
                    {
                        staticImageURL &&
                        <Image
                            src={staticImageURL || ""}
                            alt="View from Pier Lookout"
                            fill
                            style={{ objectFit: "cover", objectPosition: "top" }}
                            priority
                            quality={100}
                        />
                    }
                </motion.div>
                <motion.div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: display ? 1 : 0 }}
                    transition={{ delay: 7.9, duration: 0.05 }}
                >
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover object-top z-0 opacity-80"
                        src="Watercolour.mp4"
                        muted
                        playsInline
                        disablePictureInPicture
                        controls={false}
                        ref={vidRef}

                        onEnded={() => {
                            // prevent first-frame flash:
                            requestAnimationFrame(() => {
                                if (vidRef.current) vidRef.current.style.visibility = "hidden";
                            });
                        }}

                    />
                </motion.div>
                <div className="w-full h-full absolute top-0 left-0 bg-transparent flex flex-col items-center justify-center z-10 px-[5%]">
                    {/* 1. Description */}
                    <motion.h1
                        className="text-center w-full text-white"
                        style={{
                            fontFamily: "var(--font-shippori-serif)",
                            fontSize: "clamp(20px, min(5vw, 5vh), 20px)",
                        }}
                        initial={{ opacity: 0, y: -60 }}
                        animate={{ opacity: display ? 1 : 0, y: display ? 0 : -60 }}
                        transition={{ delay: 6, duration: 1.5 }}
                        // Metadata for accessibility and SEO
                        aria-description="Pier Lookout - Stunning Coastal Flat for Rent"
                        aria-labelledby="pier-lookout-title"
                        id="pier-lookout-title"
                    >
                        A flat in the heart of Eastbourne,&nbsp;<motion.span className="italic font-bold">just steps from the beach</motion.span>&nbsp;with sea and pier views.
                    </motion.h1>
                </div>

            </motion.div>
        </div >
    )
}