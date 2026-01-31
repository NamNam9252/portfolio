"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef, useState } from "react";
import ResumeModal from "./ResumeModal";
import MagicBento from "@/components/MagicBento";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import LogoLoop from "@/components/LogoLoop";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowRight, Phone } from "lucide-react";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiJavascript, SiHtml5, SiCss3, SiFramer, SiGreensock, 
  SiMongodb, SiDocker, SiPython, SiExpress, SiPrisma 
} from "react-icons/si";
import { Skiper54 } from "@/components/ui/skiper54";

const techLogos = [
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


export default function AboutPage() {
  const [showResume, setShowResume] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
 const experiences = [
  {
    year: "2019 – 2020",
    title: "Early Explorer",
    company: "Self-Initiated",
    description:
      "Started exploring technology during school years. Learned basic programming concepts with Python and experimented with video editing, developing an early interest in how digital systems and visuals work."
  },
  {
    year: "2021 – 2022",
    title: "Foundations in Programming",
    company: "Higher Secondary (11–12)",
    description:
      "Built a strong foundation in Python, logical thinking, and problem-solving. Continued creative work with video editing while understanding the basics of software development."
  },
  {
    year: "2023 – 2024",
    title: "Frontend & Mobile Developer",
    company: "College – 1st Year",
    description:
      "Entered college and dived into Flutter for cross-platform apps and frontend development with React and Next.js. Focused on UI, component-based architecture, and modern web practices."
  },
  {
    year: "2024 – Present",
    title: "Full-Stack & AI-Driven Builder",
    company: "College – 2nd Year",
    description:
      "Completed full-stack development using the MERN stack and began building real-world projects like a Kirana Store Management system. Currently exploring machine learning, AI integrations, and MCP-based workflows to build intelligent, scalable systems."
  }
];


  return (
    <div className="w-full bg-white dark:bg-zinc-950 font-[family-name:var(--font-noto-serif)]">
      <div className="flex justify-between items-end mt-5 ml-15">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">About Me</h1>
                        <p className="text-gray-500 dark:text-gray-400">Get to know me better</p>
                    </div>
                </div>
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-10">
        
        

        {/* Top Pill / Status */}
        <div className="flex justify-center mb-10 mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs font-medium text-zinc-900 dark:text-zinc-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open to work
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_35%] gap-4 min-h-[500px] mb-20">
          {/* Left Column (MagicBento Grid) */}
          <div className="flex flex-col h-full w-full">
             <MagicBento 
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={false}
                clickEffect={true}
                glowColor="132, 0, 255"
             />
          </div>

          {/* Right Column (3D Card) - Spans 1 col on MD (50% width) */}
          <div className="h-full min-h-[500px]">
            <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col gap-4">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Nazyx
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 font-medium font-[family-name:var(--font-patrick-hand)]"
                >
                  Builder · Systems Thinker · Explorer
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4 flex-grow">
                  <img
                    src="/me/me%20(1).png"
                    className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Me"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        {/* Tech Stack Logo Loop */}
        <div className="w-full py-10 mb-20 overflow-hidden relative">
          <div className="[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <LogoLoop
              logos={techLogos}
              direction="left"
              speed={100}
              logoHeight={50}
              gap={60}
              pauseOnHover={true}
              fadeOut={false}
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="w-full">
          <div className="container mx-auto px-6 py-20 max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">My Story</h1>
                        <p className="text-gray-500 dark:text-gray-400">Experience & Education</p>
                    </div>
                </div>

                <div ref={ref} className="space-y-12 relative ml-3 pl-8 pb-4">
                    {/* Glowing Line Background */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-white/10" />
                    
                    {/* Animated Glowing Line */}
                    <motion.div 
                        style={{ height, opacity }}
                        className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10 rounded-full"
                    />
                    {experiences.map((exp, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="relative"
                        >
                            {/* Breathing Dot */}
                            <motion.div
                                initial={{ scale: 1, backgroundColor: "rgb(209 213 219)" }} // gray-300
                                whileInView={{
                                    scale: 1.2,
                                    backgroundColor: "#8b5cf6", // violet-500
                                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.6)",
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5 }}
                                className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-white dark:border-black z-20 dark:bg-zinc-700"
                            >
                                <motion.div 
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-full h-full rounded-full bg-violet-400 opacity-50"
                                />
                            </motion.div>
                            
                            <span className="text-sm font-mono text-gray-500 dark:text-gray-500 mb-1 block">{exp.year}</span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                            <h4 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">{exp.company}</h4>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            
            {/* Download/View Resume Button */}
            <div className="flex justify-center mt-12 mb-10">
               <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  onClick={() => setShowResume(true)}
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-3 text-lg font-medium"
                >
                  <span>View Resumé</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </HoverBorderGradient>
            </div>
            
            <ResumeModal 
              isOpen={showResume} 
              onClose={() => setShowResume(false)} 
              pdfUrl="/resume/resume1.pdf" 
            />
        </div>
        </div>
        {/* Achievements and Certificates */}
        <div className="w-full">
          <div className="container mx-auto px-6 py-20 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-end mb-16">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">Achievements and Certificates</h1>
                  <p className="text-gray-500 dark:text-gray-400">Things i have earned</p>
                </div>
              </div>

              <div className="w-full flex items-center justify-center">
                 <Skiper54 className="w-full" />
              </div>
            </motion.div>
          </div>
        </div>                    

        {/* CTA Section */}
        <div className="w-full py-20 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 max-w-2xl font-[family-name:var(--font-noto-serif)] italic">
                Be the next to get a space in my timeline.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-10 max-w-xl">
                If that info helps you find me perfect, let's get in touch. Or if you want to see more of my work, check out my projects.
            </p>
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
              <Link href="/work">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-3 text-lg font-medium"
                >
                  <span>Works</span>
                </HoverBorderGradient>
              </Link>
            </div>
        </div>
        
      </div>
    </div>
  );
}
