"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";

const Skiper52 = () => {
  const images = [
    {
      src: "/others/home_black_bg.png",
      alt: "Project Screenshot 1",
      code: "Personal Site",
    },
    {
      src: "/others/home_white_bg.png",
      alt: "Project Screenshot 2",
      code: "E-commerce",
    },
    {
      src: "/others/home_black_bg.png",
      alt: "Project Screenshot 3",
      code: "Dashboard",
    },
    {
      src: "/others/home_white_bg.png",
      alt: "Project Screenshot 4",
      code: "Portfolio",
    },
    {
      src: "/others/home_black_bg.png",
      alt: "Project Screenshot 5",
      code: "Landing Page",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden py-10">
      <HoverExpand_001 className="" images={images} />
    </div>
  );
};

export { Skiper52 };

const HoverExpand_001 = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-4 md:px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 bg-muted",
              )}
              initial={{ width: "100%", height: "200px" }}
              animate={{
                width: typeof window !== 'undefined' && window.innerWidth >= 768 
                  ? (activeImage === index ? "40%" : "10%")
                  : "100%",
                height: typeof window !== 'undefined' && window.innerWidth >= 768
                  ? "400px"
                  : (activeImage === index ? "300px" : "100px"),
                flexGrow: typeof window !== 'undefined' && window.innerWidth < 768 && activeImage === index ? 1 : 0
              }}
              // Fallback for SSR/Hydration mismatch: css media query would be better but framer motion handles inline styles
              // simplistic responsive handling for motion values often needs resize listener or layout prop
              layout
              transition={{ duration: 0.4, ease: "anticipate" }}
              onClick={() => setActiveImage(index)}
              onMouseEnter={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  />
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-start justify-end p-4 md:p-6"
                  >
                   <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{image.code}</h3>
                    <p className="text-sm text-white/70 font-medium">
                      {image.alt}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <img
                src={image.src}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };

