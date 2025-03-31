// LocalDirectory.tsx
import { JSX, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lead, Subheading, Small } from "@/components/Typography";
import OptimizedImage from "@/components/forms/OptimizedImage";
import Link from "next/link";

// Define types
type Listing = {
  id: string;
  title: string;
  image: string;
  walkingDistance: string;
  recommendation: string;
  dates: string;
  pricePoint: 1 | 2 | 3;
  description: string;
  address?: string;
  phone?: string;
  website?: string;
};

type Category = {
  id: string;
  title: string;
  items: Listing[];
};

export default function LocalDirectory(): JSX.Element {
  // State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const listingsRef = useRef<HTMLDivElement>(null);

  const categoriesText = "Categories";

  // State for the typing animation
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (typingIndex < categoriesText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + categoriesText[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [typingIndex, categoriesText]);

  // Directory data - moved to a separate file or hook in a real application
  const categories: Category[] = [
    {
      id: "restaurants",
      title: "Restaurants, Pubs, And Bars",
      items: [
        {
          id: "mirabelle-restaurant",
          title: "The Grand Hotel's Mirabelle Restaurant",
          image: "Mirabelle",
          walkingDistance: "10 min",
          recommendation: "Seasonal tasting menu",
          dates: "Open for dinner Tue-Sat, 6:30pm-9:30pm",
          pricePoint: 3,
          description: "An elegant fine dining experience offering a menu that blends classic and contemporary dishes, emphasizing locally sourced ingredients.",
          address: "King Edwards Parade, Eastbourne BN21 4EQ",
          phone: "01323 412345",
          website: "www.grandeastbourne.com/dining/mirabelle-restaurant"
        },
        {
          id: "pilot-inn",
          title: "The Pilot Inn",
          image: "Pilot",
          walkingDistance: "20 min",
          recommendation: "Fresh seafood platters",
          dates: "Open daily, 11am-11pm",
          pricePoint: 2,
          description: "A traditional pub known for its warm atmosphere and a menu featuring classic British dishes and seafood specialties.",
          address: "89 Meads Street, Eastbourne BN20 7RW",
          phone: "01323 723440",
          website: "www.pilot-inn.co.uk"
        },
        {
          id: "dolphin",
          title: "The Dolphin",
          image: "Dolphin",
          walkingDistance: "8 min",
          recommendation: "Sunday roast and local ales",
          dates: "Mon-Sun, 11am-11pm",
          pricePoint: 1,
          description: "A popular pub offering a range of real ales and a menu of hearty meals, with a focus on fresh, local produce.",
          address: "14 South Street, Eastbourne BN21 4XF",
          phone: "01323 722733",
          website: "www.dolphineastbourne.co.uk"
        }
      ]
    },
    {
      id: "culture",
      title: "Art & Culture",
      items: [
        {
          id: "towner-eastbourne",
          title: "Towner Eastbourne",
          image: "Towner",
          walkingDistance: "15 min",
          recommendation: "Turner Prize exhibitions",
          dates: "Tue-Sun, 10am-5pm, Closed Mondays",
          pricePoint: 1,
          description: "A Modernist marvel painted in bold geometric rainbow colours by German artist Loether Götz, hosting the Turner Prize as part of its centenary celebrations with consistently top-drawer exhibitions.",
          address: "Devonshire Park, College Road, Eastbourne BN21 4JJ",
          phone: "01323 434670",
          website: "www.townereastbourne.org.uk"
        },
        {
          id: "emma-mason-gallery",
          title: "Emma Mason Gallery",
          image: "Analogue",
          walkingDistance: "12 min",
          recommendation: "British printmakers from the 1950s onwards",
          dates: "Wed-Sat, 10am-5pm",
          pricePoint: 1,
          description: "Small but excellent gallery showcasing work by artist printmakers working in Britain from the 1950s onwards, with a carefully curated collection of fine art prints.",
          address: "3 Cornfield Terrace, Eastbourne BN21 4NN",
          phone: "01323 726927",
          website: "www.emmamason.co.uk"
        },
        {
          id: "congress-theatre",
          title: "Congress Theatre",
          image: "CongressTheatre",
          walkingDistance: "14 min",
          recommendation: "London Philharmonic performances",
          dates: "Check website for performances",
          pricePoint: 2,
          description: "The only place outside London to see the London Philharmonic perform, this Grade II listed theater is part of Eastbourne's cultural quarter and hosts a variety of performances.",
          address: "Carlisle Road, Eastbourne BN21 4BP",
          phone: "01323 412000",
          website: "www.eastbournetheatres.co.uk"
        }
      ]
    },
    {
      id: "walks",
      title: "Walks & Activities",
      items: [
        {
          id: "seven-sisters",
          title: "Seven Sisters Country Park",
          image: "SevenSisters",
          walkingDistance: "Bus journey required",
          recommendation: "Spectacular cliff-top walks",
          dates: "Open year-round, visitor center hours vary",
          pricePoint: 1,
          description: "Recently named one of the most beautiful places in the world by Conde Nast Traveller, offering stunning white cliffs, meandering river valley and open downland with breathtaking views.",
          address: "East Dean Road, Seaford BN25 4AD",
          website: "www.sevensisters.org.uk"
        },
        {
          id: "eastbourne-pier",
          title: "Eastbourne Pier",
          image: "pier",
          walkingDistance: "2 min",
          recommendation: "Victorian tea room experience",
          dates: "Open daily, hours vary seasonally",
          pricePoint: 1,
          description: "A historic pier featuring amusements, dining, and panoramic sea views, perfect for a leisurely stroll.",
          address: "Grand Parade, Eastbourne BN21 3EL",
          website: "www.eastbournepier.com"
        },
        {
          id: "coastal-culture-trail",
          title: "Coastal Culture Trail",
          image: "CostalTrail",
          walkingDistance: "Starts at Towner Gallery",
          recommendation: "Cycle to De La Warr Pavilion",
          dates: "Accessible year-round",
          pricePoint: 1,
          description: "An unbroken stretch of cycle route linking Eastbourne with De La Warr Pavilion in Bexhill and Hastings Contemporary further along, perfect for art enthusiasts and cyclists alike.",
          website: "www.coastalculturetrail.com"
        },
        {
          id: "water-activities",
          title: "Kayak & Paddleboard Hire",
          image: "Kayak",
          walkingDistance: "5 min",
          recommendation: "Kayak tour from Wish Tower",
          dates: "April-October, weather permitting",
          pricePoint: 2,
          description: "Hire a kayak from Wish Tower to explore Eastbourne from the sea, or try paddleboarding along the stunning coastline for a unique perspective of the cliffs and beaches.",
          address: "Wish Tower, King Edwards Parade",
          website: "www.eastbournekayakhire.com"
        }
      ]
    },
    {
      id: "shopping",
      title: "Shopping",
      items: [
        {
          id: "camillas-bookshop",
          title: "Camilla's Bookshop",
          image: "Camillas",
          walkingDistance: "10 min",
          recommendation: "Rare and secondhand books",
          dates: "Mon-Sat, 9:30am-5pm",
          pricePoint: 1,
          description: "A legendary bookshop with three floors piled high with second hand, rare and antique books. There's also a parrot hiding in there somewhere amongst the paperbacks.",
          address: "13 Grove Road, Eastbourne BN21 4TT",
          phone: "01323 728787",
          website: "www.camillasbooks.co.uk"
        },
        {
          id: "all-things-analogue",
          title: "All Things Analogue",
          image: "Analogue",
          walkingDistance: "11 min",
          recommendation: "Beautiful stationery collections",
          dates: "Tue-Sat, 10am-5pm",
          pricePoint: 2,
          description: "Heaven for fans of beautiful stationery, this shop offers a carefully curated selection of notebooks, cards, pens and other analogue delights.",
          address: "14 Grove Road, Eastbourne BN21 4TT",
          website: "www.allthingsanalogue.co.uk"
        },
        {
          id: "little-chelsea",
          title: "Little Chelsea",
          image: "Chelsea",
          walkingDistance: "7 min",
          recommendation: "Independent boutiques and cafes",
          dates: "Individual shop hours vary",
          pricePoint: 2,
          description: "A charming area known for its independent shops, boutiques, and antique stores, centered around Grove Road and South Street.",
          address: "Grove Road & South Street, Eastbourne BN21"
        },
        {
          id: "barley-sugar",
          title: "Barley Sugar",
          image: "BarleySugar",
          walkingDistance: "8 min",
          recommendation: "Local Sussex produce",
          dates: "Tue-Sat, 9am-5pm",
          pricePoint: 2,
          description: "The place to stock up your pantry with top quality local produce from Sussex, including artisanal foods, wines, and specialty ingredients.",
          address: "18 Grove Road, Eastbourne BN21 4TT",
          phone: "01323 737477",
          website: "www.barleysugar.co.uk"
        }
      ]
    },
    {
      id: "coffee",
      title: "Coffee & Cafes",
      items: [
        {
          id: "nelson-coffee",
          title: "Nelson Coffee Roastery",
          image: "Nelson",
          walkingDistance: "10 min",
          recommendation: "Specialty coffee and brunch",
          dates: "Mon-Sat, 8am-4pm, Sun 9am-3pm",
          pricePoint: 2,
          description: "Near the station, this shop serves high-grade, seasonal and ethical coffee with a great brunch menu in a relaxed, contemporary setting.",
          address: "4 Terminus Road, Eastbourne BN21 3LP",
          website: "www.nelsoncoffee.co.uk"
        },
        {
          id: "urban-ground",
          title: "Urban Ground Coffee",
          image: "Urban",
          walkingDistance: "7 min",
          recommendation: "Artisan coffee and homemade cakes",
          dates: "Mon-Sat, 8am-5pm, Sun 9am-4pm",
          pricePoint: 1,
          description: "With two locations in central Eastbourne, Urban Ground makes excellent coffee to take away or enjoy with a relaxed brunch in their stylish cafes.",
          address: "12 Bolton Road, Eastbourne BN21 3JX",
          phone: "01323 301778",
          website: "www.urbanground.co.uk"
        },
        {
          id: "skylark",
          title: "Skylark",
          image: "Skylark",
          walkingDistance: "9 min",
          recommendation: "Brunch in secret courtyard",
          dates: "Tue-Sun, 9am-3pm",
          pricePoint: 2,
          description: "A chic, unfussy independent cafe with a pretty secret courtyard for warmer days, serving excellent brunch, lunch and neighborhood dining.",
          address: "44-46 Grove Road, Eastbourne BN21 4TT",
          phone: "01323 765431",
          website: "www.skylarkcafe.co.uk"
        },
        {
          id: "doc-coffee",
          title: "DOC Coffee",
          image: "DOC",
          walkingDistance: "8 min",
          recommendation: "Single-origin coffees",
          dates: "Mon-Sat, 8:30am-4:30pm",
          pricePoint: 1,
          description: "Located in Eastbourne's vibrant Little Chelsea area, DOC Coffee is an ideal place to while away an afternoon of people watching and flipping through arty magazines.",
          address: "10 South Street, Eastbourne BN21 4XF",
          website: "www.doccoffee.co.uk"
        }
      ]
    },
    {
      id: "events",
      title: "Events",
      items: [
        {
          id: "airbourne",
          title: "Eastbourne International Airshow (Airbourne)",
          image: "Airbourne",
          walkingDistance: "5 min to viewing area",
          recommendation: "Red Arrows displays",
          dates: "Typically held in August",
          pricePoint: 1,
          description: "An annual airshow featuring impressive aerial displays, ground exhibitions, and entertainment along the seafront.",
          website: "www.eastbourneairshow.com"
        },
        {
          id: "tennis-tournament",
          title: "Eastbourne International Tennis Tournament",
          image: "Tennis",
          walkingDistance: "15 min",
          recommendation: "Center court matches",
          dates: "Held annually in June",
          pricePoint: 2,
          description: "A prestigious tennis event attracting top players, serving as a warm-up for Wimbledon.",
          address: "Devonshire Park, College Road, Eastbourne",
          website: "www.lta.org.uk"
        },
        {
          id: "towner-centenary",
          title: "Towner 100: Centenary Celebrations",
          image: "Towner2",
          walkingDistance: "15 min",
          recommendation: "Turner Prize exhibition",
          dates: "Throughout 2023",
          pricePoint: 1,
          description: "A year-long programme of special exhibitions and events celebrating Towner Eastbourne's 100th anniversary, including hosting the prestigious Turner Prize.",
          address: "Devonshire Park, College Road, Eastbourne BN21 4JJ",
          website: "www.townereastbourne.org.uk/towner-100"
        }
      ]
    }
  ];
  
  // Handler to select a category
  const handleCategoryClick = (categoryId: string) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }

    // Scroll to listings if switching categories
    setTimeout(() => {
      if (listingsRef.current && categoryId !== activeCategory) {
        listingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsAnimating(false);
    }, 500);
  };

  // Get price point display
  const getPriceDisplay = (pricePoint: number): string => {
    return '£'.repeat(pricePoint);
  };

  // Get active category data
  const activeCategoryData = activeCategory
    ? categories.find(cat => cat.id === activeCategory)
    : null;

  return (
    <section className="w-full pb-20">
      <div className="flex flex-col gap-2 mb-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Lead className="font-[--font-shippori-serif] uppercase tracking-widest">Pier Lookout</Lead>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Subheading className="font-[--font-shippori-serif] uppercase tracking-widest">Local Directory</Subheading>
        </motion.div>

        <motion.div
          className="w-full max-w-[80vw] mx-auto flex items-center justify-center gap-3 relative overflow-clip"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-full h-px bg-stone-700 shrink-0 origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: typingComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          ></motion.div>

          <Lead className="whitespace-nowrap flex-nowrap uppercase min-w-[120px]">
            {typedText}
          </Lead>

          <motion.div
            className="w-full h-px bg-stone-700 shrink-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: typingComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          ></motion.div>
        </motion.div>

        <motion.div
          className="w-[90vw] md:w-[70vw] lg:w-[60vw] flex flex-wrap gap-y-4 gap-x-6 md:gap-x-10 items-center justify-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: typingComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="relative"
            >
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="cursor-pointer bg-transparent border-0 p-0 m-0"
                aria-label={`Show ${category.title}`}
              >
                <Lead
                  className={`${activeCategory === category.id ? 'opacity-100 underline' : 'opacity-60'} hover:opacity-100 font-[--font-shippori-serif] hover:underline transition-all duration-100 ease-in-out`}
                >
                  {category.title}
                </Lead>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Listings Section */}
      <div ref={listingsRef} className="w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {activeCategoryData && (
            <motion.div
              key={activeCategoryData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 px-4 md:px-8"
            >
              <motion.div
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-full h-px bg-stone-300"></div>
                <Lead className="whitespace-nowrap uppercase font-[--font-shippori-serif] tracking-widest">
                  {activeCategoryData.title}
                </Lead>
                <div className="w-full h-px bg-stone-300"></div>
              </motion.div>

              <div className="grid grid-cols-1 gap-10">
                {activeCategoryData.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex flex-col md:flex-row gap-6 text-left border-b border-stone-200 pb-10"
                  >
                    {/* Image */}
                    <div className="w-full md:w-1/3 h-64 md:h-auto relative">
                      <OptimizedImage
                        path={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        quality={85}
                      />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-2/3 flex flex-col">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <h3 className="text-xl font-[--font-shippori-serif] text-stone-800">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <Small className="text-stone-600 font-[--font-shippori-serif]">{getPriceDisplay(item.pricePoint)}</Small>
                        </div>
                      </div>

                      <p className="text-stone-600 mb-4 italic">{item.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Small className="text-stone-500 uppercase tracking-wide">Walking:</Small>
                          <Small className="text-stone-700">{item.walkingDistance}</Small>
                        </div>

                        <div className="flex items-center gap-2">
                          <Small className="text-stone-500 uppercase tracking-wide">Recommend:</Small>
                          <Small className="text-stone-700">{item.recommendation}</Small>
                        </div>

                        <div className="flex items-center gap-2">
                          <Small className="text-stone-500 uppercase tracking-wide">When:</Small>
                          <Small className="text-stone-700">{item.dates}</Small>
                        </div>

                        {item.address && (
                          <div className="flex items-center gap-2">
                            <Small className="text-stone-500 uppercase tracking-wide">Address:</Small>
                            <Small className="text-stone-700">{item.address}</Small>
                          </div>
                        )}

                        {item.phone && (
                          <div className="flex items-center gap-2">
                            <Small className="text-stone-500 uppercase tracking-wide">Phone:</Small>
                            <Small className="text-stone-700">{item.phone}</Small>
                          </div>
                        )}

                        {item.website && (
                          <div className="flex items-center gap-2">
                            <Small className="text-stone-500 uppercase tracking-wide">Website:</Small>
                            <Link href={`https://${item.website}`} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-blue-700 underline transition-colors">
                              <Small>
                                {item.website}
                              </Small>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}