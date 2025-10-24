import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function LandingSection() {
    const [display, setDisplay] = useState(false);
    const [staticImageURL, setStaticImageURL] = useState<string | null>(null);

    const vidRef = useRef<HTMLVideoElement | null>(null);

    const LandingVideowebmURL = "https://firebasestorage.googleapis.com/v0/b/pierlookout.firebasestorage.app/o/Watercolour.webm?alt=media&token=3afa5c3b-c1d3-4b9c-8f86-0f35b86ce2b1";
    const LandingVideomp4URL = "https://firebasestorage.googleapis.com/v0/b/pierlookout.firebasestorage.app/o/Watercolour.mp4?alt=media&token=4bbbbd72-2eef-4b27-a4c5-d37db784daef";


    useEffect(() => {
        if (typeof window === "undefined") return;
        // Get the static image URL
        const fetchStaticAssets = async () => {
            try {
                const storageRef = ref(storage);

                const imageRef = ref(storageRef, 'LandingFF.webp');

                // Fetch Image URL
                const imageURL = await getDownloadURL(imageRef);

                setStaticImageURL(imageURL);

                setDisplay(true);
            }
            catch (error) {
                console.error("Error fetching static asset URLs:", error);
            }
        };
        void fetchStaticAssets();
    }, []);

    useEffect(() => {
        if (vidRef.current) {
            // Play the video when the section is in view
            void vidRef.current.play().catch((error) => {
                console.error("Error playing video:", error);
            });
        }
    }, [display]);




    return (
        <div className="w-full h-[80vh] relative px-[1rem] flex items-center justify-center" id="landing-section">
            <motion.div className="relative"
                style={{
                    aspectRatio: "2/5",
                    width: "clamp(0px, min(90vw, 80vh), 500px)",
                    height: "100%",                        /* derived from aspect-ratio */
                    backgroundImage: staticImageURL ? `url(${staticImageURL})` : undefined,
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                }}
                initial={{ width: "clamp(0px, min(90vw, 80vh), 900px)" }}
                animate={{ width: display ? "100%" : "clamp(0px, min(90vw, 80vh), 900px)" }}
                transition={{ delay: 5, duration: 2.5 }}
            >
                <motion.div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: display ? 1 : 0 }}
                    transition={{ delay: 7.9, duration: 0.05 }}
                >

                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover object-top z-0 opacity-100"
                        muted
                        autoPlay
                        playsInline
                        disablePictureInPicture
                        controls={false}
                        ref={vidRef}
                        onEnded={() => {
                            requestAnimationFrame(() => {
                                if (vidRef.current) vidRef.current.style.visibility = "hidden";
                            });
                        }}
                        preload="auto"
                    >
                        {LandingVideowebmURL && <source src={LandingVideowebmURL} type="video/webm" />}
                        {LandingVideomp4URL && <source src={LandingVideomp4URL} type="video/mp4" />}
                    </video>

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