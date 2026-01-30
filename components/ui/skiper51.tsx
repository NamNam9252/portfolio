"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRight, Calendar } from "lucide-react";
import React, { useMemo } from "react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export interface ProjectData {
  id: string | number;
  category: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
}

const Skiper51 = ({ data }: { data?: ProjectData[] }) => {
  // Fallback data if none provided (for development/testing)
  const defaultData: ProjectData[] = [
    {
      id: 1,
      category: "Development",
      title: "Approach to eco-friendly product development",
      description: "Leverage agile by the way frameworks to provide a for high level in the most important overviews.",
      date: "March 20, 2024",
      imageSrc: "/images/x.com/13.jpeg",
      imageAlt: "Eco-friendly product development",
      link: "#"
    },
    {
       id: 2,
       category: "Design",
       title: "How Raven's designs are changing the game",
       description: "Leverage agile by the way frameworks to provide a for high level in the most important overviews.",
       date: "Feb 15, 2024",
       imageSrc: "/images/x.com/32.jpeg",
       imageAlt: "Raven Designs",
       link: "#"
    },
    {
       id: 3,
       category: "Marketing",
       title: "Prototyping secrets revealed of creation",
       description: "Leverage agile by the way frameworks to provide a for high level in the most important overviews.",
       date: "Jan 10, 2024",
       imageSrc: "/images/x.com/20.jpeg",
       imageAlt: "Prototyping secrets",
       link: "#"
    },
    {
       id: 4,
       category: "Design",
       title: "Raven's perspective on the future of product design",
       description: "Leverage agile by the way frameworks to provide a for high level in the most important overviews.",
       date: "Dec 05, 2023",
       imageSrc: "/images/x.com/21.jpeg",
       imageAlt: "Raven Perspective",
       link: "#"
    }
  ];

  const projectData = data || defaultData;

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden py-10">
      <Carousel_005 className="" data={projectData} autoplay={true} showPagination={true} loop={true} />
    </div>
  );
};

export { Skiper51 };

const Carousel_005 = ({
  data,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 30,
}: {
  data: ProjectData[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_005 {
    width: 100%;
    padding-bottom: 50px !important;
  }
  
  .Carousal_005 .swiper-slide {
    height: auto;
    width: 100%;
    /* No max-width restriction here, we want full width for grid */
    border-radius: 20px;
    display: flex; 
    flex-direction: column;
  }

  .Carousal_005 .swiper-pagination-bullet {
    background-color: #525252 !important; /* neutral-600 */
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  .Carousal_005 .swiper-pagination-bullet-active {
    background-color: #9333ea !important; /* purple-600 */
    opacity: 1;
    width: 20px;
    border-radius: 4px;
  }
  
  /* Dark mode overrides - assuming 'dark' class on a parent/html */
  .dark .Carousal_005 .swiper-pagination-bullet {
    background-color: #d4d4d4 !important; /* neutral-300 */
    opacity: 0.5;
  }
  .dark .Carousal_005 .swiper-pagination-bullet-active {
    background-color: #c084fc !important; /* purple-400 */
    opacity: 1;
  }

  /* Hide scrollbars */
  .Carousal_005::-webkit-scrollbar {
    display: none;
  }
  .Carousal_005 {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  `;

  // Chunk data into groups of 4
  const chunkedData = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < data.length; i += 4) {
      chunks.push(data.slice(i, i + 4));
    }
    return chunks;
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-5xl px-5 mx-auto", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="creative"
          grabCursor={true}
          slidesPerView={1}
          centeredSlides={true}
          loop={loop}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_005"
          creativeEffect={{
            prev: {
              shadow: false,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: false,
              translate: ["120%", 0, -500],
            },
          }}
          modules={[EffectCreative, Pagination, Autoplay]}
        >
          {chunkedData.map((chunk, index) => {
             const largeCard = chunk[0];
             // The side cards might be less than 3 if it's the last chunk
             const sideCards = chunk.slice(1);

             return (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full h-full min-h-[350px]">
                  
                  {/* LEFT COLUMN: Large Featured Card (Span 3) */}
                  {largeCard && (
                    <div className="lg:col-span-3 flex flex-col h-full bg-[#111] dark:bg-[#111] bg-neutral-900 rounded-[24px] overflow-hidden border border-neutral-800 shadow-xl group hover:border-neutral-700 transition-colors">
                      {/* Large Image */}
                      <div className="relative w-full aspect-[2/1] overflow-hidden m-4 mb-0 rounded-[20px] self-center shrink-0" style={{width: 'calc(100% - 32px)'}}>
                         <Image
                           src={largeCard.imageSrc}
                           alt={largeCard.imageAlt}
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                         <div className="flex items-center justify-between mb-4">
                            <span className="px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-800/50 text-neutral-300 text-sm font-medium backdrop-blur-sm">
                              {largeCard.category}
                            </span>
                            <div className="flex items-center text-blue-500 font-semibold bg-blue-500/10 px-3 py-1 rounded-md">
                               <Calendar size={16} className="mr-2" />
                               {largeCard.date}
                            </div>
                         </div>

                         <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-[1.2] tracking-tight">
                            {largeCard.title}
                         </h3>

                         <p className="text-gray-400 text-base leading-relaxed mb-6 line-clamp-3">
                            {largeCard.description}
                         </p>

                         <div className="mt-auto">
                            <Link 
                              href={largeCard.link || "#"} 
                              className="inline-flex items-center text-white text-base font-semibold hover:text-purple-400 transition-colors group/link"
                            >
                               Read More
                               <span className="ml-2 p-1.5 rounded-full border border-neutral-700 group-hover/link:border-purple-500 transition-colors bg-neutral-800">
                                 <ArrowRight size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                               </span>
                            </Link>
                         </div>
                      </div>
                    </div>
                  )}

                  {/* RIGHT COLUMN: Stacked Small Cards (Span 2) */}
                  <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                    {sideCards.map((card, i) => ( // Using i for key here is okay as list is static per chunk
                       <div key={card.id || i} className="flex-1 flex flex-col justify-center p-6 bg-[#111] dark:bg-[#111] bg-neutral-900 rounded-[24px] border border-neutral-800 shadow-lg hover:border-neutral-700 transition-all group">
                          
                          <div className="mb-3">
                             <span className="px-3 py-1 rounded-full border border-neutral-700 bg-neutral-800/30 text-neutral-400 text-xs font-medium">
                                {card.category}
                             </span>
                          </div>

                          <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-200 transition-colors line-clamp-2">
                             {card.title}
                          </h4>

                          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                             {card.description}
                          </p>
                       </div>
                    ))}
                    {/* Fill empty space if less than 3 side cards? Optional. */}
                  </div>

                </div>
              </SwiperSlide>
             );
          })}
          
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden bg-black/50 p-3 rounded-full hover:bg-black transition-colors backdrop-blur-sm border border-white/10">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden bg-black/50 p-3 rounded-full hover:bg-black transition-colors backdrop-blur-sm border border-white/10">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_005 };

/**
 * Skiper 51 Carousel_005 — React + Swiper
 * Built with Swiper.js - Read docs to learn more https://swiperjs.com/
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
