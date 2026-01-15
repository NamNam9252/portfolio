"use client";

import React, { useRef, useState } from "react";
import LaserFlow from "@/components/LaserFlow";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import RotatingText from "@/components/RotatingText";
import CrowdCanvas from "@/components/CrowdCanvas";
import { useTheme } from "next-themes";
import HomeBento from "@/components/HomeBento";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiJavascript, SiHtml5, SiCss3, SiFramer, SiGreensock, 
  SiMongodb, SiDocker, SiPython, SiExpress, SiPrisma 
} from "react-icons/si";

const techLogos = [
  { node: <SiReact className="w-full h-full text-[#61DAFB] grayscale hover:grayscale-0 transition-all duration-300" />, title: "React" },
  { node: <SiNextdotjs className="w-full h-full text-neutral-900 dark:text-white grayscale hover:grayscale-0 transition-all duration-300" />, title: "Next.js" },
  { node: <SiMongodb className="w-full h-full text-[#47A248] grayscale hover:grayscale-0 transition-all duration-300" />, title: "MongoDB" },
  { node: <SiDocker className="w-full h-full text-[#2496ED] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Docker" },
  { node: <SiPython className="w-full h-full text-[#3776AB] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Python" },
  { node: <SiTypescript className="w-full h-full text-[#3178C6] grayscale hover:grayscale-0 transition-all duration-300" />, title: "TypeScript" },
  { node: <SiJavascript className="w-full h-full text-[#F7DF1E] grayscale hover:grayscale-0 transition-all duration-300" />, title: "JavaScript" },
  { node: <SiHtml5 className="w-full h-full text-[#E34F26] grayscale hover:grayscale-0 transition-all duration-300" />, title: "HTML5" },
  { node: <SiCss3 className="w-full h-full text-[#1572B6] grayscale hover:grayscale-0 transition-all duration-300" />, title: "CSS3" },
  { node: <SiExpress className="w-full h-full text-neutral-900 dark:text-white grayscale hover:grayscale-0 transition-all duration-300" />, title: "Express" },
  { node: <SiNodedotjs className="w-full h-full text-[#339933] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Node.js" },
  { node: <SiTailwindcss className="w-full h-full text-[#06B6D4] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Tailwind CSS" },
  { node: <SiPrisma className="w-full h-full text-neutral-900 dark:text-white grayscale hover:grayscale-0 transition-all duration-300" />, title: "Prisma" },
];

export default function Home() {
  const { resolvedTheme } = useTheme();
  const revealImgRef = useRef(null)

  return (
    <main className="w-full min-h-screen bg-white dark:bg-black overflow-x-hidden font-sans selection:bg-indigo-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Static background image placeholder - shows while LaserFlow loads */}
        <div className="absolute inset-0 z-0 -top-1">
          {/* Light mode background */}
          <Image
            src="/others/home_white_bg.png"
            alt=""
            fill
            priority
            className="object-cover dark:hidden ml-1"
            
          />
          {/* Dark mode background */}
          <Image
            src="/others/home_black_bg.png"
            alt=""
            fill
            priority
            className="object-cover hidden dark:block ml-1"
            
          />
        </div>
        
        {/* LaserFlow with transparent background - overlays the static image */}
        <div 
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ backgroundColor: 'transparent' }}
        >
          <LaserFlow
            horizontalBeamOffset={0.23}
            verticalBeamOffset={-0.495}
            color={resolvedTheme === 'dark' ? "#cf9eff" : "#ec007aff"}
            verticalSizing={25.0}
            horizontalSizing={2.1}
            wispDensity={1.0}
            flowSpeed={0.2}
            fogIntensity={5.5}
            wispIntensity={40.0} // Preserving user's manual edit
          />
        </div>

        <div className="relative z-10 flex flex-col items-start justify-start pt-12 md:pt-20 h-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">
          <div className="pointer-events-auto space-y-4 w-full max-w-6xl">
            {/* Multi-language Welcome Mosaic - Left Side */}
            <div className="w-full max-w-xl md:max-w-2xl lg:max-w-[45vw] flex flex-wrap content-start items-baseline justify-start gap-x-6 leading-none select-none py-2 mb-4">
              {/* English */}
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white font-[family-name:var(--font-noto-serif)]">
                Welcome
              </span>
              
              {/* Hindi */}
              <span className="text-3xl md:text-4xl lg:text-5xl text-neutral-700 dark:text-neutral-300 font-['Arya']">
                स्वागत
              </span>

              {/* Chinese */}
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-600 dark:text-neutral-400 font-['Cactus_Classical_Serif']">
                欢迎
              </span>
              
              {/* Arabic */}
              <span className="text-3xl md:text-4xl lg:text-5xl text-neutral-800 dark:text-neutral-200 font-['Noto_Kufi_Arabic']">
                أهلاً بك
              </span>
              
              {/* Japanese */}
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-500 dark:text-neutral-500 font-[family-name:var(--font-noto-serif)]">
                ようこそ
              </span>
              
              {/* Urdu/Persian */}
              <span className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 dark:text-neutral-300 font-['Arya']">
                خوش آمدید
              </span>

              {/* French */}
              <span className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-600 font-[family-name:var(--font-patrick-hand)]">
                Bienvenue
              </span>

              {/* German */}
              <span className="text-xl md:text-2xl lg:text-3xl text-neutral-500 dark:text-neutral-500 font-sans font-bold font-italic tracking-tighter">
                Willkommen
              </span>

              {/* Spanish */}
              <span className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-400 font-serif italic">
                Bienvenido
              </span>

              {/* Italian */}
              <span className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 dark:text-neutral-300 font-[family-name:var(--font-noto-serif)] italic">
                Benvenuto
              </span>

              {/* Russian */}
              <span className="text-2xl md:text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-200 font-serif">
                Добро пожаловать
              </span>

              {/* Korean */}
              <span className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-400 font-sans font-bold">
                환영합니다
              </span>

              {/* Turkish */}
              <span className="text-2xl md:text-3xl lg:text-4xl text-neutral-500 dark:text-neutral-500 font-['Arya']">
                Hoş geldiniz
              </span>

              {/* Dutch */}
              <span className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 dark:text-neutral-300 font-[family-name:var(--font-noto-serif)]">
                Welkom
              </span>

              {/* Swedish */}
              <span className="text-xl md:text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-200 font-['Cactus_Classical_Serif']">
                Välkommen
              </span>

              {/* Indonesian */}
              <span className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-400 font-[family-name:var(--font-patrick-hand)]">
                Selamat datang
              </span>

              {/* Thai */}
              <span className="text-xl md:text-2xl lg:text-3xl text-neutral-700 dark:text-neutral-300 font-sans">
                ยินดีต้อนรับ
              </span>

              {/* Swahili */}
              <span className="text-2xl md:text-3xl lg:text-4xl text-neutral-600 dark:text-neutral-400 font-serif italic">
                Karibu
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 md:gap-3 text-2xl md:text-4xl text-neutral-800 dark:text-neutral-200 font-[family-name:var(--font-noto-serif)]">
              <span>Myself</span>
              <RotatingText
                texts={['Naman Goyal_', 'Nazyx--', 'Namnam.', 'Coder !']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-transparent text-neutral-900 dark:text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-2xl md:text-4xl font-[family-name:var(--font-noto-serif)] italic "
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-3 text-lg font-medium group"
                >
                  <span>Get in touch</span>
                  <Phone className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </HoverBorderGradient>
              </Link>
              <Link href="/about">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-3 text-lg font-medium"
                >
                  <span>About Me</span>
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
        </div>
        
      </section>
      
      {/* --- NEW BENTO UI SECTION --- */}
      <HomeBento />

      {/* --- FOOTER WITH CTA & CROWD --- */}
      <footer className="relative w-full min-h-[650px] dark:bg-black bg-white overflow-hidden flex flex-col items-center pt-32 border-t border-white/5">
        
        {/* CTA Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-noto-serif)] italic font-bold text-neutral-900 dark:text-white mb-10 leading-tight drop-shadow-sm">
            This is the Sign to get out of this crowd join me to be the change.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
             <Link href="/contact">
               <HoverBorderGradient
                 containerClassName="rounded-full"
                 as="button"
                 className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-4 text-lg font-medium group"
               >
                 <span>Get in touch</span>
                 <Phone size={20} className="ml-2 stroke-[1.5] group-hover:rotate-12 transition-transform duration-300" />
               </HoverBorderGradient>
             </Link>
             <Link href="/work">
               <HoverBorderGradient
                 containerClassName="rounded-full"
                 as="button"
                 className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-10 py-4 text-lg font-medium group"
               >
                 <span>Works</span>
                 <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
               </HoverBorderGradient>
             </Link>
          </div>
        </div>

        {/* Crowd Canvas Animation - Overlaps buttons slightly due to height/positioning */}
        <div className="absolute bottom-0 w-full h-[700px] z-0 pointer-events-none">
           <CrowdCanvas 
            basePath="/me/bust"
            peepCount={105}
            maxCrowd={70}
            peepSize={270}
          />
        </div>
      </footer>

    </main>
  );
}
