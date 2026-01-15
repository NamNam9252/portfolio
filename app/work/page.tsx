"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Skiper52 } from "@/components/ui/cardScroll";
import { LogoLoop } from "@/components/LogoLoop";

import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiJavascript, SiHtml5, SiCss3, SiFramer, SiGreensock,
  SiMongodb, SiDocker, SiPython, SiExpress, SiPrisma
} from "react-icons/si";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowUpRight, Phone, ArrowRight } from "lucide-react";

import { Skiper51 } from "@/components/ui/skiper51";

const projects = [
  // --- SLIDE 1: KIRANA PROJECT ---
  {
    id: 1, // LARGE CARD
    category: "Full Stack (DBMS)",
    title: "Kirana: Smart Inventory Manager",
    description: "A comprehensive store management system allowing owners to register shops, hire employees, and track daily billing and transactions. Built with Express, React, and MySQL.",
    date: "Dec 2025",
    imageSrc: "/images/projects/kirana.png",
    imageAlt: "Kirana Dashboard",
    link: "/projects/kirana"
  },
  {
    id: 2,
    category: "Backend Architecture",
    title: "Express & MySQL Logic",
    description: "Robust database design handling complex relationships between inventory stocks, sales logs, and employee roles.",
    date: "Dec 2025",
    imageSrc: "/images/projects/kirana-db.jpeg",
    imageAlt: "Kirana Backend",
    link: "/projects/kirana"
  },
  {
    id: 3,
    category: "Feature",
    title: "Employee & Payroll",
    description: "Dedicated modules for shop owners to manage staff hiring, attendance, and access permissions.",
    date: "Dec 2025",
    imageSrc: "/images/projects/kirana-staff.jpeg",
    imageAlt: "Kirana Employee Module",
    link: "/projects/kirana"
  },
  {
    id: 4,
    category: "Feature",
    title: "Real-time Billing",
    description: "Fast and accurate transaction recording system designed for high-traffic retail environments.",
    date: "Dec 2025",
    imageSrc: "/images/projects/kirana-bill.jpeg",
    imageAlt: "Kirana Billing UI",
    link: "/projects/kirana"
  },

  // --- SLIDE 2: FAIR CAMPUS PROJECT ---
  {
    id: 5, // LARGE CARD
    category: "Social Design",
    title: "Fair Campus: Safety Initiative",
    description: "A design-led anti-ragging platform aimed at creating safer campuses. Features anonymous reporting and a responsive UI built with React and Vite.",
    date: "Oct 2025",
    imageSrc: "/images/projects/faircampus.png",
    imageAlt: "Fair Campus Hero",
    link: "https://namnam9252.github.io/faircampus/"
  },
  {
    id: 6,
    category: "Privacy Tech",
    title: "Anonymous Reporting",
    description: "Secure submission channels ensuring students can report incidents without fear of identity exposure.",
    date: "Oct 2025",
    imageSrc: "/images/projects/fair-campus-report.jpeg",
    imageAlt: "Fair Campus Reporting",
    link: "/projects/fair-campus"
  },
  {
    id: 7,
    category: "Frontend",
    title: "React + Vite Performance",
    description: "Lightning-fast frontend implementation ensuring the portal works smoothly on slow campus networks.",
    date: "Oct 2025",
    imageSrc: "/images/projects/fair-campus-tech.jpeg",
    imageAlt: "Fair Campus Tech",
    link: "/projects/fair-campus"
  },
  {
    id: 8,
    category: "Responsiveness",
    title: "Mobile First Design",
    description: "Optimized specifically for mobile screens, allowing students to access help immediately from their phones.",
    date: "Oct 2025",
    imageSrc: "/images/projects/fair-campus-mobile.jpeg",
    imageAlt: "Fair Campus Mobile",
    link: "/projects/fair-campus"
  },

  // --- SLIDE 3: BPL HELPER PROJECT ---
  {
    id: 9, // LARGE CARD
    category: "Social Impact",
    title: "BPL Helper: Scheme Aggregator",
    description: "An information portal for Below Poverty Line citizens. Uses empathy mapping principles to present government scheme knowledge and stats clearly.",
    date: "Nov 2025",
    imageSrc: "/images/projects/bplhelper.png",
    imageAlt: "BPL Helper Homepage",
    link: "https://namnam9252.github.io/BPL_Helper/"
  },
  {
    id: 10,
    category: "UX Research",
    title: "Empathy Driven Design",
    description: "UI crafted based on empathy mapping to ensure accessibility for users with limited technical literacy.",
    date: "Nov 2025",
    imageSrc: "/images/projects/bpl-ux.jpeg",
    imageAlt: "BPL UX Design",
    link: "/projects/bpl-helper"
  },
  {
    id: 11,
    category: "Open Source",
    title: "GitHub Pages Hosting",
    description: "Deployed via GitHub Pages for public access and transparency, built with React and Tailwind CSS.",
    date: "Nov 2025",
    imageSrc: "/images/projects/bpl-code.jpeg",
    imageAlt: "BPL Codebase",
    link: "/projects/bpl-helper"
  },
  {
    id: 12,
    category: "Data Viz",
    title: "Scheme Analytics",
    description: "Visual stats and clear breakdowns of eligibility criteria for various government aid programs.",
    date: "Nov 2025",
    imageSrc: "/images/projects/bpl-stats.jpeg",
    imageAlt: "BPL Statistics",
    link: "/projects/bpl-helper"
  },

  // --- SLIDE 4: CAREPLUS PROJECT ---
  {
    id: 13, // LARGE CARD
    category: "HealthTech (MERN + Flutter)",
    title: "CarePlus: Smart Health Ecosystem",
    description: "A hybrid platform connecting patients with clinics. Features clinic route finding, online consultation, and live appointment queue tracking.",
    date: "Coming Soon",
    imageSrc: "/images/projects/careplus-main.jpeg",
    imageAlt: "CarePlus App",
    link: "/projects/careplus"
  },
  {
    id: 14,
    category: "Hybrid Tech",
    title: "MERN & Flutter Stack",
    description: "A unified system offering a robust web dashboard for doctors and a native mobile app for patients.",
    date: "Coming Soon",
    imageSrc: "/images/projects/careplus-stack.jpeg",
    imageAlt: "CarePlus Technology",
    link: "/projects/careplus"
  },
  {
    id: 15,
    category: "Key Feature",
    title: "Live Queue Tracker",
    description: "Real-time updates on appointment numbers and estimated wait times to reduce clinic crowding.",
    date: "Coming Soon",
    imageSrc: "/images/projects/careplus-queue.jpeg",
    imageAlt: "CarePlus Queue Feature",
    link: "/projects/careplus"
  },
  {
    id: 16,
    category: "Integration",
    title: "Route & Navigation",
    description: "Integrated maps to help patients find the quickest route to their booked clinic or hospital.",
    date: "Coming Soon",
    imageSrc: "/images/projects/careplus-map.jpeg",
    imageAlt: "CarePlus Navigation",
    link: "/projects/careplus"
  }
];

export default function WorkPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const logos = [
    { node: <SiReact className="w-full h-full text-[#61DAFB] grayscale hover:grayscale-0 transition-all duration-300" />, title: "React" },
    { node: <SiNextdotjs className="w-full h-full text-white grayscale hover:grayscale-0 transition-all duration-300" />, title: "Next.js" },
    { node: <SiMongodb className="w-full h-full text-[#47A248] grayscale hover:grayscale-0 transition-all duration-300" />, title: "MongoDB" },
    { node: <SiDocker className="w-full h-full text-[#2496ED] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Docker" },
    { node: <SiPython className="w-full h-full text-[#3776AB] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Python" },
    { node: <SiTypescript className="w-full h-full text-[#3178C6] grayscale hover:grayscale-0 transition-all duration-300" />, title: "TypeScript" },
    { node: <SiJavascript className="w-full h-full text-[#F7DF1E] grayscale hover:grayscale-0 transition-all duration-300" />, title: "JavaScript" },
    { node: <SiHtml5 className="w-full h-full text-[#E34F26] grayscale hover:grayscale-0 transition-all duration-300" />, title: "HTML5" },
    { node: <SiCss3 className="w-full h-full text-[#1572B6] grayscale hover:grayscale-0 transition-all duration-300" />, title: "CSS3" },
    { node: <SiExpress className="w-full h-full text-white grayscale hover:grayscale-0 transition-all duration-300" />, title: "Express" },
    { node: <SiNodedotjs className="w-full h-full text-[#339933] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Node.js" },
    { node: <SiTailwindcss className="w-full h-full text-[#06B6D4] grayscale hover:grayscale-0 transition-all duration-300" />, title: "Tailwind CSS" },
    { node: <SiPrisma className="w-full h-full text-white grayscale hover:grayscale-0 transition-all duration-300" />, title: "Prisma" },
  ];



  return (
    <div className=" relative w-full min-h-screen bg-white dark:bg-black font-[family-name:var(--font-noto-serif)] text-black dark:text-white font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 overflow-hidden">

      {/* Main Content Container Ref for Scroll Tracking */}
      <div ref={ref} className="relative w-full h-full z-10">

        {/* The Animated Line Background */}
        <div className="absolute -top-20 right-[10%] h-full w-full pointer-events-none z-99 overflow-visible">
          <LinePath
            className="absolute -right-[35%] top-0 h-full opacity-20 md:-right-[5%] md:opacity-40"
            scrollYProgress={scrollYProgress}
          />
        </div>

        {/* Header Section */}
        <div className="relative z-999 w-full px-8 md:px-20 pt-10 mb-20 pb-10">
          <div className="w-full max-w-7xl flex justify-start items-end ">
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-2 font-[family-name:var(--font-noto-serif)]">My Work</h1>
              <p className="text-gray-500 dark:text-gray-400 font-[family-name:var(--font-patrick-hand)]">Check out what any vells person can DO!</p>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center  mt-16 font-[family-name:var(--font-noto-serif)] tracking-tight leading-[1.1] mb-20">
            I build, break, and <br className="hidden md:block" /> rebuild
          </h1>
        </div>

        {/* Projects Section */}
        <div className="relative z-10 w-full px-8 md:px-20 mb-20">
          <h2 className="text-3xl font-bold mb-10 font-[family-name:var(--font-noto-serif)]">My projects</h2>
          {/* Using existing card scroll component */}
          <div className="w-full">
            <Skiper51 data={projects} />
          </div>
        </div>



        {/* Tech Stack */}
        <div className="relative z-10 w-full mb-32 px-8 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-[family-name:var(--font-noto-serif)]">Technologies I think I am good at</h2>
          <div className="w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
            <LogoLoop logos={logos} direction="left" speed={50} logoHeight={60} gap={50} />
          </div>
        </div>

        {/* New Text Section */}
        {/* New Text Section */}
        <div className="relative z-10 w-full px-8 md:px-20 mb-32 mt-32 flex flex-col items-center justify-center text-center">
             <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-10 max-w-5xl font-[family-name:var(--font-noto-serif)] italic leading-tight drop-shadow-sm">
                Ready to start? Let's make your project the next highlight here.
             </h2>
             <div className="flex flex-wrap gap-6 justify-center">
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
                  <span>About</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </HoverBorderGradient>
              </Link>
            </div>
        </div>

        {/* Custom Footer */}
        <div className="relative z-10 w-full px-4 md:px-6 pb-6 font-[family-name:var(--font-noto-serif)]">
          <div className="w-full dark:bg-white bg-black text-white rounded-[3rem] p-10 md:p-20 flex flex-col items-center justify-center relative overflow-hidden">
            <h1 className="text-5xl md:text-7xl dark:text-black lg:text-9xl font-bold tracking-tighter mb-4 z-10">
              Namannn.online
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 mt-10 text-xs md:text-sm font-medium tracking-wide text-neutral-400 z-10 text-center">
              <span>NAZYX JAIPUR RAJASTHAN</span>
              <span className="hidden md:inline">•</span>
              <span>INDIA</span>
            </div>

            {/* Subtle backglow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const userPathLength = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682  672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        className="stroke-purple-600 dark:stroke-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.3)] dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]"
        strokeWidth="20"
        strokeLinecap="round"
        style={{
          pathLength: userPathLength,
        }}
      />
    </svg>
  );
};
