"use client";

import { motion } from "framer-motion";
import React, { JSX, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const ASE_DESTINATIONS: Array<{ name: string; price: string; distance: string; link: string }> = [
    {
        name: "Seven Sisters Country Park",
        price: "Free",
        distance: "Starts wherever you'd like",
        link: "www.sevensisters.org.uk",
    },
    {
        name: "Eastbourne Pier",
        price: "£",
        distance: "2 min walk",
        link: "www.eastbournepier.com",
    },
    {
        name: "Coastal Culture Trail",
        price: "Free",
        distance: "Starts wherever you'd like",
        link: "www.coastalculturetrail.com",
    },
    {
        name: "Kayak & Paddleboard Hire",
        price: "££",
        distance: "15 min drive",
        link: "www.sevensisters.org.uk/things-to-do/kayaking-paddle-boarding/",
    },
];


const CULTURE_DESTINATIONS: Array<{ name: string; price: string; distance: string; link: string }> = [
    {
        name: "Towner Eastbourne",
        price: "£",
        distance: "14 min walk",
        link: "www.townereastbourne.org.uk",
    },
    {
        name: "Emma Mason Gallery",
        price: "£",
        distance: "13 min walk",
        link: "www.emmamason.co.uk",
    },
    {
        name: "Congress Theatre",
        price: "££",
        distance: "14 min walk",
        link: "www.eastbournetheatres.co.uk",
    },
];

const F_AND_B_DESTINATIONS: Array<{ name: string; price: string; distance: string; link: string }> = [
    {
        name: "The Grand Hotel's Mirabelle Restaurant",
        price: "£££",
        distance: "15 min walk",
        link: "www.grandeastbourne.com/mirabelle-restaurant",
    },
    {
        name: "The Pilot Inn",
        price: "££",
        distance: "35 min walk",
        link: "www.pilot-inn.co.uk",
    },
    {
        name: "The Dolphin",
        price: "£",
        distance: "14 min walk",
        link: "share.google/2LIMIubNu838NYNCt",
    },
    {
        name: "Nelson Coffee Roastery",
        price: "££",
        distance: "22 min walk",
        link: "www.nelsoncoffee.co.uk",
    },
    {
        name: "Skylark",
        price: "££",
        distance: "16 min walk",
        link: "www.skylarkeastbourne.co.uk",
    },
];

export default function LocalDirectory(): JSX.Element {
    const [elementInView, setElementInView] = useState(false);
    const [displayCat, setDisplayCat] = useState("Main Menu");
    const hasLoggedViewRef = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const element = document.getElementById("local-directory");
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setElementInView(true);

                        if (!hasLoggedViewRef.current) {
                            hasLoggedViewRef.current = true;
                            trackEvent("local_directory_view", {
                                section_id: "local_directory",
                            });
                        }
                    } else if (entry.intersectionRatio === 0) {
                        setElementInView(false);
                    }
                });
            },
            {
                threshold: [0, 0.5],
            }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);



    return (
        <section className="w-full pb-16 h-[90vh] p-[5vw] relative" id="local-directory">
            <div className="relative h-full w-full max-w-[6xl] flex items-center justify-center flex-col gap-3"
                style={{
                    backgroundImage: "url('/cardtexture.webp')",
                    backgroundColor: "rgba(225,225,225,1)",
                    backgroundSize: '20%',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                }}
            >
                <motion.div
                    className="w-full h-full flex flex-col items-center justify-center gap-3 absolute top-0 left-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: displayCat == 'Main Menu' ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ pointerEvents: displayCat == 'Main Menu' ? 'auto' : 'none' }}
                >
                    <div className="mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black text-2xl relative"
                        style={{ fontFamily: "var(--font-goudy-serif)" }}
                    >
                        {"Local Directory".split('').map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: elementInView ? 1 : 0 }}
                                transition={{ delay: elementInView ? index * 0.1 : 0, duration: 0 }}
                                style={{ display: 'inline-block' }}

                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black md:text-lg text-md relative cursor-pointer flex flex-row landscape:w-[70%] portrait:w-[90%] lg:gap-5 lg:gap-y-2 gap-3 flex-wrap items-center justify-center"
                        style={{ fontFamily: "var(--font-goudy-serif)" }}
                    >
                        {
                            [
                                'Restaurants, Pubs, and Cafés',
                                'Arts & Culture',
                                'Activities, Sport, and Events'
                            ].map(
                                (cat, index) =>
                                    <motion.div
                                        className="w-fit max-w-full h-fit relative text-black group text-center"
                                        key={index}
                                        animate={{ cursor: elementInView ? 'pointer' : 'default' }}
                                        transition={{ delay: elementInView ? 1.6 : 0 }}
                                    >
                                        <motion.button
                                            type="button"
                                            tabIndex={0}
                                            className="focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: elementInView ? 1 : 0 }}
                                            transition={{ delay: elementInView ? 1.6 : 0, duration: 1 }}
                                            onClick={() => {
                                                setDisplayCat(cat);
                                                trackEvent("local_directory_category_select", {
                                                    category: cat,
                                                    section_id: "local_directory",
                                                    source: "main_menu",
                                                });
                                            }}
                                        >
                                            {cat}
                                        </motion.button>
                                        <motion.div
                                            className="absolute -bottom-0.5 w-0 h-[0.5px] bg-black group-hover:w-full duration-75"
                                            animate={{ backgroundColor: elementInView ? 'black' : 'transparent' }}
                                            transition={{ delay: elementInView ? 1.6 : 0 }}
                                        />
                                    </motion.div>
                            )
                        }
                    </div>
                </motion.div>
                <FAndBSection display={displayCat == 'Restaurants, Pubs, and Cafés' && elementInView} selectCat={setDisplayCat} />
                <ArtAndCultureSection display={displayCat == 'Arts & Culture' && elementInView} selectCat={setDisplayCat} />
                <ActivitiesSportsEventsSection display={displayCat == 'Activities, Sport, and Events' && elementInView} selectCat={setDisplayCat} />
            </div>
        </section >
    )
}


const FAndBSection = ({ display, selectCat }: { display: boolean, selectCat: (cat: string) => void }) => {


    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center gap-3 absolute top-0 left-0 py-[1em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: display ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            style={{ pointerEvents: display ? 'auto' : 'none' }}
        >
            <div className="mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black text-md md:text-lg lg:text-2xl relative"
                style={{ fontFamily: "var(--font-goudy-serif)" }}
            >
                {"Restaurants, Pubs, and Cafés".split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: display ? 1 : 0 }}
                        transition={{ delay: display ? index * 0.1 : 0, duration: 0 }}
                        style={{ display: 'inline-block' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>
            <div className="w-full px-[10%] mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black text-sm md:text-md relative max-h-full overflow-y-scroll overflow-x-clip">
                <div style={{ fontFamily: "var(--font-goudy-serif)", display: "grid" }} className="grid-cols-[auto_auto] sm:grid-cols-[1fr_auto_auto] sm:gap-[1rem] md:grid-cols-[auto_1fr_auto_auto] w-full">
                    {F_AND_B_DESTINATIONS.map((dest, i) => (
                        <React.Fragment key={i}>
                            {/* Theres 4 attributes so the key = `attr-${j}` */}
                            {/* Index */}
                            <motion.span
                                key={`index-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 : 0, duration: 0 }}
                                className="hidden md:inline-block"
                                style={{ width: '2ch' }}
                            >
                                {i + 1}.
                            </motion.span>
                            {/* Name */}
                            <motion.a
                                key={`name-${i}`}
                                href={`https://${dest.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:text-blue-600 col-span-2 sm:col-span-1 mb-[0.25rem] sm:mb-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.05 : 0, duration: 0 }}
                                style={{ display: "inline-block", maxWidth: "60ch" }}
                                onClick={() => {
                                    trackEvent("local_directory_click", {
                                        business_name: dest.name,
                                        category: "food_and_drink",
                                        price_band: dest.price,
                                        distance_label: dest.distance,
                                        link: dest.link,
                                    });
                                }}
                            >
                                <span className="md:hidden">
                                    {i + 1}.&nbsp;
                                </span>
                                {dest.name}
                            </motion.a>
                            {/* Distance */}
                            <motion.span
                                key={`distance-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.15 : 0, duration: 0 }}
                                style={{ display: 'inline-block', width: '12ch' }}
                                className="mb-[1rem] sm:mb-0 w-full"
                            >
                                {dest.distance}
                            </motion.span>
                            {/* Price */}
                            <motion.span
                                key={`price-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.1 : 0, duration: 0 }}
                                style={{ display: 'inline-block' }}
                                className="text-right w-full"
                            >
                                {dest.price}
                            </motion.span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div
                className="w-full flex flex-col items-end gap-[0.2rem] md:flex-row md:items-center md:justify-between px-[10%] mt-[1rem]"
                style={{ fontFamily: "var(--font-goudy-serif)" }}
            >
                {
                    [
                        'Activities, Sport, and Events',
                        'Main Menu',
                        'Arts & Culture'
                    ].map(
                        (cat, index) =>
                            <motion.div
                                className={`w-full h-fit relative  text-gray-800 group text-sm md:text-md ${index == 0 ? 'md:text-start' : index == 1 ? 'md:text-center' : 'md:text-end'}`}
                                key={index}
                                animate={{ cursor: display ? 'pointer' : 'default' }}
                                transition={{ delay: display ? 1.6 : 0 }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: display ? 1 : 0 }}
                                    transition={{ delay: display ? 1.6 : 0, duration: 1 }}
                                    onClick={() => {
                                        selectCat(cat);
                                        trackEvent("local_directory_category_select", {
                                            category: cat,
                                            section_id: "local_directory",
                                            source: "section_footer",
                                        });
                                    }}
                                    className="relative px-1"
                                >
                                    {cat}
                                    <motion.div className="absolute -bottom-0.5 w-0 h-[0.5px] text-gray-800 group-hover:w-full duration-75 left-0"
                                        animate={{ backgroundColor: display ? 'black' : 'transparent' }}
                                        transition={{ delay: display ? 1.6 : 0 }}
                                    />
                                </motion.span>


                            </motion.div>
                    )
                }
            </div>
        </motion.div>
    )
}



const ArtAndCultureSection = ({ display, selectCat }: { display: boolean, selectCat: (cat: string) => void }) => {


    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center gap-3 absolute top-0 left-0 py-[1em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: display ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            style={{ pointerEvents: display ? 'auto' : 'none' }}
        >
            <div className="mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black text-md md:text-lg lg:text-2xl relative"
                style={{ fontFamily: "var(--font-goudy-serif)" }}
            >
                {"Arts & Culture".split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: display ? 1 : 0 }}
                        transition={{ delay: display ? index * 0.1 : 0, duration: 0 }}
                        style={{ display: 'inline-block' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>
            <div className="w-full px-[10%] mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black text-sm md:text-md relative max-h-full overflow-y-scroll overflow-x-clip">
                <div style={{ fontFamily: "var(--font-goudy-serif)", display: "grid" }} className="grid-cols-[auto_auto] sm:grid-cols-[1fr_auto_auto] sm:gap-[1rem] md:grid-cols-[auto_1fr_auto_auto] w-full">
                    {CULTURE_DESTINATIONS.map((dest, i) => (
                        <React.Fragment key={i}>
                            {/* Theres 4 attributes so the key = `attr-${j}` */}
                            {/* Index */}
                            <motion.span
                                key={`index-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 : 0, duration: 0 }}
                                className="hidden md:inline-block"
                                style={{ width: '2ch' }}
                            >
                                {i + 1}.
                            </motion.span>
                            {/* Name */}
                            <motion.a
                                key={`name-${i}`}
                                href={`https://${dest.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:text-blue-600 col-span-2 sm:col-span-1 mb-[0.25rem] sm:mb-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.05 : 0, duration: 0 }}
                                style={{ display: "inline-block", maxWidth: "60ch" }}
                                onClick={() => {
                                    trackEvent("local_directory_click", {
                                        business_name: dest.name,
                                        category: "arts_and_culture",
                                        price_band: dest.price,
                                        distance_label: dest.distance,
                                        link: dest.link,
                                    });
                                }}
                            >
                                <span className="md:hidden">
                                    {i + 1}.&nbsp;
                                </span>
                                {dest.name}
                            </motion.a>
                            {/* Distance */}
                            <motion.span
                                key={`distance-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.15 : 0, duration: 0 }}
                                style={{ display: 'inline-block', width: '12ch' }}
                                className="mb-[1rem] sm:mb-0 w-full"
                            >
                                {dest.distance}
                            </motion.span>
                            {/* Price */}
                            <motion.span
                                key={`price-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.1 : 0, duration: 0 }}
                                style={{ display: 'inline-block' }}
                                className="text-right w-full"
                            >
                                {dest.price}
                            </motion.span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div
                className="w-full flex flex-col items-end gap-[0.2rem] md:flex-row md:items-center md:justify-between px-[10%] mt-[1rem]"
                style={{ fontFamily: "var(--font-goudy-serif)" }}
            >
                {
                    [
                        'Restaurants, Pubs, and Cafés',
                        'Main Menu',
                        'Activities, Sport, and Events'
                    ].map(
                        (cat, index) =>
                            <motion.div
                                className={`w-full h-fit relative  text-gray-800 group text-sm md:text-md ${index == 0 ? 'md:text-start' : index == 1 ? 'md:text-center' : 'md:text-end'}`}
                                key={index}
                                animate={{ cursor: display ? 'pointer' : 'default' }}
                                transition={{ delay: display ? 1.6 : 0 }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: display ? 1 : 0 }}
                                    transition={{ delay: display ? 1.6 : 0, duration: 1 }}
                                    onClick={() => {
                                        selectCat(cat);
                                        trackEvent("local_directory_category_select", {
                                            category: cat,
                                            section_id: "local_directory",
                                            source: "section_footer",
                                        });
                                    }}
                                    className="relative px-1"
                                >
                                    {cat}
                                    <motion.div className="absolute -bottom-0.5 w-0 h-[0.5px] text-gray-800 group-hover:w-full duration-75 left-0"
                                        animate={{ backgroundColor: display ? 'black' : 'transparent' }}
                                        transition={{ delay: display ? 1.6 : 0 }}
                                    />
                                </motion.span>


                            </motion.div>
                    )
                }
            </div>
        </motion.div>
    )
}



const ActivitiesSportsEventsSection = ({ display, selectCat }: { display: boolean, selectCat: (cat: string) => void }) => {
    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center gap-3 absolute top-0 left-0 py-[1em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: display ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            style={{ pointerEvents: display ? 'auto' : 'none' }}
        >
            <div className="mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black text-md md:text-lg lg:text-2xl relative"
                style={{ fontFamily: "var(--font-goudy-serif)" }}
            >
                {"Activities, Sport, and Events".split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: display ? 1 : 0 }}
                        transition={{ delay: display ? index * 0.1 : 0, duration: 0 }}
                        style={{ display: 'inline-block' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>
            <div className="w-full px-[10%] mix-blend-hard-light opacity-70 font-extralight bg-transparent bg-blend-hard-light text-black text-sm md:text-md relative max-h-full overflow-y-scroll overflow-x-clip">
                <div style={{ fontFamily: "var(--font-goudy-serif)", display: "grid" }} className="grid-cols-[auto_auto] sm:grid-cols-[1fr_auto_auto] sm:gap-[1rem] md:grid-cols-[auto_1fr_auto_auto] w-full">
                    {ASE_DESTINATIONS.map((dest, i) => (
                        <React.Fragment key={i}>
                            {/* Theres 4 attributes so the key = `attr-${j}` */}
                            {/* Index */}
                            <motion.span
                                key={`index-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 : 0, duration: 0 }}
                                className="hidden md:inline-block"
                                style={{ width: '2ch' }}
                            >
                                {i + 1}.
                            </motion.span>
                            {/* Name */}
                            <motion.a
                                key={`name-${i}`}
                                href={`https://${dest.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:text-blue-600 col-span-2 sm:col-span-1 mb-[0.25rem] sm:mb-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.05 : 0, duration: 0 }}
                                style={{ display: "inline-block", maxWidth: "60ch" }}
                                onClick={() => {
                                    trackEvent("local_directory_click", {
                                        business_name: dest.name,
                                        category: "activities_sport_events",
                                        price_band: dest.price,
                                        distance_label: dest.distance,
                                        link: dest.link,
                                    });
                                }}
                            >
                                <span className="md:hidden">
                                    {i + 1}.&nbsp;
                                </span>
                                {dest.name}
                            </motion.a>
                            {/* Distance */}
                            <motion.span
                                key={`distance-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.15 : 0, duration: 0 }}
                                style={{ display: 'inline-block' }}
                                className="mb-[1rem] sm:mb-0 text-nowrap w-fit"
                            >
                                {dest.distance}
                            </motion.span>
                            {/* Price */}
                            <motion.span
                                key={`price-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: display ? 1 : 0 }}
                                transition={{ delay: display ? 2 + i * 0.1 + 0.1 : 0, duration: 0 }}
                                style={{ display: 'inline-block' }}
                                className="text-right w-full"
                            >
                                {dest.price}
                            </motion.span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div
                className="w-full flex flex-col items-end gap-[0.2rem] md:flex-row md:items-center md:justify-between px-[10%] mt-[1rem]"
                style={{ fontFamily: "var(--font-goudy-serif)" }}
            >
                {
                    [
                        'Arts & Culture',
                        'Main Menu',
                        'Restaurants, Pubs, and Cafés'
                    ].map(
                        (cat, index) =>
                            <motion.div
                                className={`w-full h-fit relative  text-gray-800 group text-sm md:text-md ${index == 0 ? 'md:text-start' : index == 1 ? 'md:text-center' : 'md:text-end'}`}
                                key={index}
                                animate={{ cursor: display ? 'pointer' : 'default' }}
                                transition={{ delay: display ? 1.6 : 0 }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: display ? 1 : 0 }}
                                    transition={{ delay: display ? 1.6 : 0, duration: 1 }}
                                    onClick={() => {
                                        selectCat(cat);
                                        trackEvent("local_directory_category_select", {
                                            category: cat,
                                            section_id: "local_directory",
                                            source: "section_footer",
                                        });
                                    }}
                                    className="relative px-1"
                                >
                                    {cat}
                                    <motion.div className="absolute -bottom-0.5 w-0 h-[0.5px] text-gray-800 group-hover:w-full duration-75 left-0"
                                        animate={{ backgroundColor: display ? 'black' : 'transparent' }}
                                        transition={{ delay: display ? 1.6 : 0 }}
                                    />
                                </motion.span>


                            </motion.div>
                    )
                }
            </div>
        </motion.div>
    )
}
