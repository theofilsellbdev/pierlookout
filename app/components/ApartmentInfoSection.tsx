import React, { JSX, useState } from 'react';
import { Heading, Subheading, Lead, Body } from "@/components/Typography";

interface InfoTab {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function ApartmentInfoSection(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("facilities");

  const infoTabs: InfoTab[] = [
    {
      id: "facilities",
      title: "Facilities",
      content: (
        <div className="space-y-6">
          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Cleaning and Safety</Subheading>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Professionally cleaned</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Contactless check-in/out</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">No staff present</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Linens washed to local guidelines</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Linens washed above 60°C/140°F</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Mattress and pillow protectors</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Washable duvet covers</Body>
              </li>
            </ul>
          </div>

          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Amenities</Subheading>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Free WiFi internet</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">High speed internet</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Express check in</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Free parking</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Off-site parking</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Smart TV</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">DAB radio with Bluetooth</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Dishwasher</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Nespresso coffee machine</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Electric oven with induction hob</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Double shower</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Iron and ironing facilities</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Acoustic guitar</Body>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "spaces",
      title: "Spaces",
      content: (
        <div className="space-y-6">
          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Accommodation Details</Subheading>
            <ul className="space-y-3">
              <li>
                <Body className="text-stone-700 font-medium">Sleeps up to: 3 people</Body>
              </li>
              <li>
                <Body className="text-stone-700 font-medium">Bedroom: Double bed</Body>
              </li>
              <li>
                <Body className="text-stone-700 font-medium">Living Room: Sofa bed (suitable for 1 adult or 2 children)</Body>
              </li>
            </ul>
          </div>

          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Layout</Subheading>
            <Body className="text-stone-600 leading-relaxed">
              {`This fourth floor apartment features a pleasant hallway with space for hanging coats and dropping off sandy shoes. 
              The beautifully finished lounge/kitchen/diner provides a wonderful place to relax with two comfortable sofas 
              (one being a sofa bed), a Smart TV, DAB radio with Bluetooth speaker, and even an acoustic guitar for guests to enjoy.`}
            </Body>
            <Body className="text-stone-600 leading-relaxed mt-4">
              {`The fully equipped kitchen/diner includes an electric oven, induction hob, fridge, dishwasher, Nespresso coffee 
              machine, and a dining table with seating for four. The apartment offers a romantic double bedroom and is completed 
              with a shower room featuring a double shower and WC.`}
            </Body>
          </div>
        </div>
      ),
    },
    {
      id: "location",
      title: "How to Reach the Flat",
      content: (
        <div className="space-y-6">
          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Accessibility</Subheading>
            <Body className="text-stone-600 leading-relaxed">
              {`Pier Lookout is situated at the top apartment in the block and is reached via approximately 6 small 
              flights of stairs. Please note there are no lifts available, and therefore the property is not suitable 
              for wheelchair access.`}
            </Body>
          </div>

          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Parking</Subheading>
            <Body className="text-stone-600 leading-relaxed">
              {`There is restricted local roadside parking subject to availability. Free and off-site parking options are 
              available nearby.`}
            </Body>
          </div>

          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Location</Subheading>
            <Body className="text-stone-600 leading-relaxed">
              {`Pier Lookout enjoys a central location in the traditional seaside resort of Eastbourne. Lying just across 
              from the apartment is the town's wide shingle beach, which gives way to sand during low tide and offers 
              visitors the opportunity to enjoy sunbathing or local water sports.`}
            </Body>
            <Body className="text-stone-600 leading-relaxed mt-3">
              {`With breath-taking sea views overlooking the pier, this is the ideal place from which to watch the annual 
              Eastbourne Airbourne Show. A little further down the beach is the lifeboat museum and historic Wish Tower.`}
            </Body>
          </div>
        </div>
      ),
    },
    {
      id: "faqs",
      title: "FAQs",
      content: (
        <div className="space-y-6">
          <div className="space-y-6">
            {[
              {
                q: "How many people can the apartment accommodate?",
                a: `The flat can sleep up to 3 people comfortably - 2 in the double bed and 1 adult (or 2 small children) on the sofa bed in the living room.`
              },
              {
                q: "Is the apartment accessible for people with mobility issues?",
                a: `The apartment is located on the fourth floor and accessed via approximately 6 small flights of stairs with no lift available. Unfortunately, it is not suitable for wheelchair access or those with significant mobility challenges.`
              },
              {
                q: "Is parking available?",
                a: `There is restricted local roadside parking subject to availability. Free and off-site parking options are also available nearby.`
              },
              {
                q: "Is there WiFi in the apartment?",
                a: "Yes, free high-speed WiFi internet is available throughout the apartment."
              },
              {
                q: "What kitchen facilities are available?",
                a: `The kitchen is fully equipped with an electric oven, induction hob, refrigerator, dishwasher, microwave, toaster, kettle, Nespresso coffee machine, and all necessary kitchenware.`
              }
            ].map((faq, index) => (
              <div key={index}>
                <Body className="text-stone-700 font-medium">{faq.q}</Body>
                <Body className="text-stone-600 mt-1">{faq.a}</Body>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "guidelines",
      title: "Guest Guidelines",
      content: (
        <div className="space-y-6">
          <div>
            <Body className="text-stone-600 leading-relaxed">
              {`To ensure a pleasant stay for all our guests, we kindly ask you to note the following guidelines:`}
            </Body>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start space-x-2">
                <span className="text-stone-600 mt-1">•</span>
                <Body className="text-stone-600">{`The apartment operates with contactless check-in/out. Instructions will be provided before your arrival.`}</Body>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-stone-600 mt-1">•</span>
                <Body className="text-stone-600">{`Please be mindful of neighbors and keep noise to a reasonable level, especially after 10pm.`}</Body>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-stone-600 mt-1">•</span>
                <Body className="text-stone-600">Smoking is not permitted anywhere in the apartment.</Body>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-stone-600 mt-1">•</span>
                <Body className="text-stone-600">{`Please treat the musical instruments and other amenities with care.`}</Body>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-stone-600 mt-1">•</span>
                <Body className="text-stone-600">{`Take care to switch off all appliances and lock doors when leaving the property.`}</Body>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-stone-600 mt-1">•</span>
                <Body className="text-stone-600">{`If you have any questions or issues during your stay, please contact us using the details provided in your booking confirmation.`}</Body>
              </li>
            </ul>
          </div>

          <div>
            <Subheading className="font-[--font-shippori-serif] text-stone-700 mb-4">Activities and Experiences</Subheading>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Bird watching</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Art galleries & museums</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Theatre</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Walking</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Water activities</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Water-skiing</Body>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-stone-600">•</span>
                <Body className="text-stone-600">Watersports</Body>
              </li>
            </ul>
            <Body className="text-stone-600 leading-relaxed mt-4">
              {`Keen walkers will enjoy exploring the many footpaths located on the South Downs, and there are a wide range 
              of local vineyards, breweries, castles, and gardens to enjoy just a short drive away.`}
            </Body>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-[90vw] md:w-[80vw] mx-auto py-8 mb-8">
      <div className='w-full h-fit bg-stone-800/5 p-8'>

        <div className="mb-12 text-center">
          <Heading className="font-[--font-shippori-serif] uppercase tracking-widest text-stone-700 mb-4">
            About Pier Lookout
          </Heading>
          <Lead className="text-stone-600 max-w-3xl mx-auto">
            A luxurious seafront retreat with breathtaking views and all the comforts of home
          </Lead>
        </div>

        <div className="flex flex-col items-start w-full">
          {/* Navigation tabs */}
          <div className="w-full mb-8 border-b border-stone-200 overflow-x-auto">
            <div className="flex min-w-max">
              {infoTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-stone-700 font-[--font-shippori-serif] uppercase tracking-wider text-sm whitespace-nowrap transition-all
                  ${activeTab === tab.id
                      ? "border-b-2 border-stone-700 font-medium"
                      : "hover:text-stone-900 hover:border-b-2 hover:border-stone-300"
                    }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="w-full">
            {infoTabs.map((tab) => (
              <div
                key={tab.id}
                className={`${activeTab === tab.id ? "block" : "hidden"}`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}