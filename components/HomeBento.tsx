"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Instagram, Linkedin, Phone, ChevronDown, 
  Zap, Globe, Sparkles, Brain, Box, PenTool, Code, Layers, Cpu, Twitter
} from "lucide-react";

// Helper for Tailwind class merging
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// Custom SVG Icons for the MERN stack + Python/C
const MongoLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M17.193 11.58c0 4.14-2.83 8.355-5.193 11.42-2.363-3.065-5.192-7.28-5.192-11.42 0-3.13 1.832-5.717 4.39-6.914l.802 8.397.803-8.397c2.557 1.197 4.39 3.784 4.39 6.914zm-5.193-11.58c-1.397 0-2.528 2.21-2.528 4.937 0 .343.018.677.054 1.002 1.085-.63 2.308-.63 3.392 0 .036-.325.054-.659.054-1.002 0-2.727-1.13-4.937-2.528-4.937z"/>
  </svg>
);

const ExpressLogo = () => (
  <div className="font-bold text-3xl tracking-tighter">ex</div>
);

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 7c3.31 0 6 2.24 6 5s-2.69 5-6 5-6-2.24-6-5 2.69-5 6-5z" transform="rotate(30 12 12)" opacity="0.5" />
    <path d="M12 7c3.31 0 6 2.24 6 5s-2.69 5-6 5-6-2.24-6-5 2.69-5 6-5z" transform="rotate(150 12 12)" opacity="0.5" />
    <path d="M12 7c3.31 0 6 2.24 6 5s-2.69 5-6 5-6-2.24-6-5 2.69-5 6-5z" transform="rotate(270 12 12)" opacity="0.5" />
  </svg>
);

const NodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M12 1l10.4 6v12L12 23l-10.4-6V7L12 1zm0 2.2L3.6 8v8l8.4 4.8 8.4-4.8V8L12 3.2z M12 14.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M11.9 1c-1.8 0-3.3.2-4.5.6-2.2.7-2.7 1.8-2.7 3.5v2.2h7.3v1h-10c-1.2 0-2.3 1-2.3 2.5v3.8c0 1.5 1.1 2.8 2.3 2.8h1.8v-2.5c0-1.7.9-3.3 2.7-3.3h5.5c1.1 0 2.3-.9 2.3-2.3V4.8c0-1.8-1.1-3.2-3.3-3.2l-1.4-.6zm3.3 5.4c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1zm-3.3 6.2c-1.1 0-2.3.9-2.3 2.3v4.6c0 1.5 1.1 2.7 3.3 2.7h1.4c1.8 0 3.3-.2 4.5-.6 2.2-.7 2.7-1.8 2.7-3.5v-2.2h-7.3v-1h10c1.2 0 2.3-1 2.3-2.5v-3.8c0-1.5-1.1-2.8-2.3-2.8h-1.8v2.5c0 1.7-.9 3.3-2.7 3.3h-5.5zm-2.2 6.5c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z"/>
  </svg>
);

const CLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 14.2l-8 4-8-4V7.8l8-4 8 4v8.4z M15.5 14.5c-.7.7-1.8 1-3.1 1-2.3 0-3.9-1.5-3.9-3.5s1.6-3.5 3.9-3.5c1.3 0 2.4.3 3.1 1l-.7.7c-.6-.6-1.5-.8-2.4-.8-1.8 0-3 1.1-3 2.6s1.2 2.6 3 2.6c.9 0 1.8-.2 2.4-.8l.7.7z"/>
  </svg>
);

import { Tooltip } from "@/components/ui/tooltip-card";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiPython, SiC, SiOpenai, SiPrisma, SiNextdotjs } from "react-icons/si";
import { Skiper51 } from "@/components/ui/skiper51";
import { projects } from "@/constants/projects";

const HomeBento = () => {
  const skills = [
    { name: "MongoDB", icon: <SiMongodb size={40} className="text-[#47A248]" />, label: "M", description: "NoSQL database for modern applications." },
    { name: "Express", icon: <SiExpress size={40} className="text-white" />, label: "E", description: "Fast, unopinionated web framework for Node.js." },
    { name: "React", icon: <SiReact size={40} className="text-[#61DAFB]" />, label: "R", description: "The library for web and native user interfaces." },
    { name: "Node.js", icon: <SiNodedotjs size={40} className="text-[#339933]" />, label: "N", description: "JavaScript runtime built on Chrome's V8 engine." },
    { name: "AI Flows", icon: <Brain size={40} className="text-[#8B5CF6]" />, label: "AI", description: "Designing intelligent agentic workflows and LLM integrations." },
    { name: "Python", icon: <SiPython size={40} className="text-[#3776AB]" />, label: "PY", description: "Versatile language for backend, AI, and data science." },
    { name: "C Language", icon: <SiC size={40} className="text-[#00599C]" />, label: "C", description: "Low-level system programming and optimization." },
    { name: "Prisma", icon: <SiPrisma size={40} className="text-white" />, label: "PR", description: "Next-generation ORM for Node.js and TypeScript." },
    { name: "Next.js", icon: <SiNextdotjs size={40} className="text-white" />, label: "NX", description: "The React Framework for the Web." },
  ];

  return (
    <section className="w-full bg-white dark:bg-black text-neutral-900 dark:text-white py-20 px-4 md:px-8 overflow-hidden font-[family-name:var(--font-noto-serif)] relative z-10">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* --- HERO BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-none md:grid-rows-2 gap-4 lg:h-[700px]">
          
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 lg:col-span-4 row-span-2 relative bg-gray-50 dark:bg-transparent rounded-[2.5rem] p-8 md:p-12 overflow-hidden"
          >
            {/* Dark/Light Background for Main Card */}
            <div className="absolute top-0 left-[5%] w-[90%] h-[100%] bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-white/5 rounded-4xl z-[5] overflow-hidden group shadow-xl dark:shadow-none">
               <GlassOverlay />
            </div>
            
            <div className="relative z-[40] h-full flex flex-col items-center px-10 justify-between max-w-[60%] md:max-w-[50%]">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-xs font-medium text-purple-600 dark:text-purple-400 mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <p className="text-emerald-500">Available for new projects</p>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-neutral-900 dark:text-white">
                  Digital <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Architect</span>
                </h1>
                <p className="text-neutral-500 dark:text-gray-400 text-lg leading-relaxed font-[family-name:var(--font-noto-serif)]">
                  I bridge the gap between complex engineering and human-centered design. 
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link href="/contact">
                  <button className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400 text-white dark:text-white font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-500/20">
                    Let's Talk <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/work">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-6 py-3 text-sm md:text-base font-medium"
                  >
                    <span>View Work</span>
                  </HoverBorderGradient>
                </Link>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 w-[55%] md:w-[50%] h-full z-[30]">
              <div className="absolute inset-0 rounded-full blur-3xl translate-y-20 translate-x-20 bg-purple-500/10 dark:bg-purple-500/20" />
              <div className="absolute inset-0 z-20 h-1/4 bottom-0 bg-transparent" /> 
              {/* Note: The gradient above might need adjustment to match the card inner bg */}
              <img 
                src="/me/me2.png" 
                alt="Professional Portrait" 
                className="w-full h-full object-contain object-right-bottom drop-shadow-2xl"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x1000/222/555?text=Hero+Asset'; }}
              />
            </div>
          </motion.div>

          {/* Why Me Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 bg-white dark:bg-[#111] rounded-[2.5rem] p-8 border border-neutral-200 dark:border-white/5 flex flex-col justify-between hover:border-purple-500/30 transition-colors group relative overflow-hidden shadow-sm dark:shadow-none"
          >
            <GlassOverlay />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Why hire me?</h3>
              <p className="text-neutral-500 dark:text-gray-400 text-sm leading-relaxed font-[family-name:var(--font-noto-serif)]">
                I don't just write code; I design systems. With 3+ years of experience, I ensure every pixel serves a purpose and every function is optimized for speed.
              </p>
            </div>
            <div className="mt-6 flex -space-x-2 relative z-10">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#141414] bg-neutral-200 dark:bg-[#222] flex items-center justify-center text-[10px] font-bold text-neutral-500" title="Avatar Placeholder">
                  👤
                </div>
              ))}
              <span className="pl-4 text-xs text-neutral-500 dark:text-gray-500 self-center font-bold">0 Clients ,Be my First 1</span>
            </div>
          </motion.div>

          {/* --- BIG SOCIAL BLOCK --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 lg:col-span-1 bg-white dark:bg-[#111] border border-neutral-200 dark:border-white/5 rounded-[2.5rem] p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden hover:shadow-lg dark:hover:bg-white/5 dark:hover:backdrop-blur-md dark:hover:border-white/20"
          >
             {/* Glass Gradient Overlay on Hover */}
            <GlassOverlay />
            
            <span className="text-[10px] font-bold text-neutral-400 dark:text-gray-500 uppercase tracking-widest relative z-10">My Social Media</span>
            
            <div className="flex flex-col gap-3 mt-4 relative z-10">
              <SocialItem icon={<Phone size={18} />} label="Phone" href="tel:+916377992203" color="group-hover:text-purple-600 dark:group-hover:text-purple-400" />
              <SocialItem icon={<Linkedin size={18} />} label="LinkedIn" href="https://www.linkedin.com/in/naman-goyal-ba12b1333" color="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              <SocialItem icon={<Instagram size={18} />} label="Instagram" href="https://www.instagram.com/naman.xd__/" color="group-hover:text-pink-500 dark:group-hover:text-pink-400" />
              <SocialItem icon={<Twitter size={18} />} label="Twitter" href="https://x.com/NGoyal99728" color="group-hover:text-sky-500 dark:group-hover:text-sky-400" />
            </div>
          </motion.div>

          {/* --- SMALL CODING SKILLS AREA --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 lg:col-span-1 bg-purple-500 rounded-[2.5rem] p-4 flex flex-col items-center justify-center text-white shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)] group relative overflow-hidden"
          >
            <GlassOverlay />
            <span className="text-4xl font-black italic relative z-10">3+</span>
            <span className="text-[9px] font-black uppercase tracking-tight text-center mt-1 leading-none relative z-10">
              Years of <br /> Coding Skills
            </span>
          </motion.div>

        </div>

        {/* --- SERVICES SECTION --- */}
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-[0.2em]">
                <Sparkles size={14} />
                Specializations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">How I can help you</h2>
            </div>
            <p className="text-neutral-500 dark:text-gray-400 max-w-sm text-sm font-[family-name:var(--font-noto-serif)]">
              Customized digital solutions leveraging advanced AI architectures, cross-platform mobile frameworks, and creative design thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Layers size={24} />} 
              title="Full-Stack & Mobile" 
              desc="Building cross-platform apps using MERN and Flutter. High-performance web and mobile solutions with a single codebase focus."
              tag="PLATFORM"
            />
            <ServiceCard 
              icon={<Brain size={24} />} 
              title="AI Integration" 
              desc="Specialized in CSAI, implementing Model Context Protocol (MCP) and Deep Learning to build intelligent, autonomous workflows."
              tag="AI & ML"
            />
            <ServiceCard 
              icon={<Sparkles size={24} />} 
              title="Creative Vision" 
              desc="Merging technical engineering with high-level creativity to craft digital experiences that are as beautiful as they are functional."
              tag="CREATIVE"
            />
          </div>
        </div>

        {/* --- SKILLS SECTION --- */}
        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-px flex-grow bg-neutral-200 dark:bg-white/5" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center whitespace-nowrap uppercase text-neutral-900 dark:text-white">
              Things I think I'm <span className="text-purple-500 dark:text-purple-400">Good At</span>
            </h2>
            <div className="h-px flex-grow bg-neutral-200 dark:bg-white/5" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {skills.map((skill, index) => (
              <Tooltip key={skill.name} content={skill.description} containerClassName="w-full h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative w-full h-full flex flex-col items-center justify-center p-8 rounded-[2rem] bg-gray-50 dark:bg-[#111] border border-neutral-100 dark:border-white/5 hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm dark:shadow-none"
                >
                  <GlassOverlay />
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-200/[0.2] dark:from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="mb-4 transform group-hover:scale-110 relative z-10 transition-transform duration-500">
                    {/* Clone element to force color classes if needed, or rely on existing classes */}
                    {React.cloneElement(skill.icon, { className: cn(skill.icon.props.className, "dark:opacity-100") })}
                  </div>
                  <span className="text-[10px] font-black tracking-[0.2em] text-neutral-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors uppercase relative z-10">
                    {skill.name}
                  </span>
                  {index < 4 && (
                    <div className="absolute top-4 right-6 text-[10px] font-black text-neutral-300 dark:text-white/5 group-hover:text-purple-500/30 transition-colors z-20">
                      {skill.label}
                    </div>
                  )}
                </motion.div>
              </Tooltip>
            ))}
          </div>
        </div>

    {/* --- WORK SLIDES SECTION --- */}
        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-px flex-grow bg-neutral-200 dark:bg-white/5" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center whitespace-nowrap uppercase text-neutral-900 dark:text-white">
              My <span className="text-purple-500 dark:text-purple-400">Works</span>
            </h2>
            <div className="h-px flex-grow bg-neutral-200 dark:bg-white/5" />
          </div>
          <div className="w-full">
            <Skiper51 data={projects} />
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-900 dark:text-white">
              Got questions? <br />
              <span className="text-neutral-400 dark:text-gray-500">I've got answers.</span>
            </h2>
            <p className="text-neutral-500 dark:text-gray-400 font-[family-name:var(--font-noto-serif)]">
              Can't find what you're looking for? Reach out directly and I'll get back to you within 24 hours.
            </p>
            <button className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Contact Support <ArrowRight size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <AccordionItem 
              question="What is your typical project timeline?" 
              answer="Most MVP projects take 4-6 weeks from discovery to deployment. Complex SaaS platforms can range from 3-6 months depending on the feature set."
            />
            <AccordionItem 
              question="Do you offer post-launch support?" 
              answer="Yes, I provide maintenance packages that include security updates, performance monitoring, and minor UI adjustments."
            />
            <AccordionItem 
              question="Can you work with my existing dev team?" 
              answer="Absolutely. I have extensive experience working as a lead designer/engineer in distributed teams using Agile methodologies."
            />
            <AccordionItem 
              question="Which technologies do you prioritize?" 
              answer="I specialize in the React ecosystem (Next.js), Tailwind CSS for styling, and Supabase or Firebase for backend infrastructure."
            />
          </div>
        </div>

      </div>
    </section>
  );
};

interface SocialItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

const SocialItem = ({ icon, label, href, color }: SocialItemProps) => (
  <a 
    href={href} 
    className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-all duration-300 group/item"
  >
    <div className={cn(
      "w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-400 dark:text-gray-400 transition-colors duration-300",
      color.replace("group-hover:", "group-hover/item:") 
    )}>
      {icon}
    </div>
    <span className="text-xs font-bold text-neutral-500 dark:text-gray-500 group-hover/item:text-black dark:group-hover/item:text-white transition-colors uppercase tracking-wider">
      {label}
    </span>
  </a>
);

const GlassOverlay = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
}

const ServiceCard = ({ icon, title, desc, tag }: ServiceCardProps) => (
  <div className="group bg-white dark:bg-[#111] p-8 rounded-[2rem] border border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-[#161616] hover:border-purple-500/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden shadow-sm dark:shadow-none">
    <GlassOverlay />
    <div className="mb-8 flex justify-between items-start relative z-10">
      <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white dark:group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <span className="text-[10px] font-black tracking-widest text-neutral-400 dark:text-gray-600 group-hover:text-purple-600/50 dark:group-hover:text-purple-500/50 transition-colors">{tag}</span>
    </div>
    <h3 className="text-xl font-bold mb-4 relative z-10 text-neutral-900 dark:text-white">{title}</h3>
    <p className="text-neutral-500 dark:text-gray-500 text-sm leading-relaxed mb-8 flex-grow relative z-10 font-[family-name:var(--font-noto-serif)]">
      {desc}
    </p>
    <div className="pt-6 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between relative z-10">
      <span className="text-xs font-bold text-neutral-400 dark:text-gray-400">EXPLORE</span>
      <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-black dark:text-white group-hover:translate-x-1 transition-transform">
        <ArrowRight size={14} />
      </div>
    </div>
  </div>
);

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cn(
      "border rounded-3xl overflow-hidden transition-all duration-300",
      isOpen ? "bg-white dark:bg-[#141414] border-neutral-300 dark:border-white/10" : "bg-gray-50 dark:bg-[#0f0f0f] border-neutral-200 dark:border-white/5"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className={cn("font-bold text-lg transition-colors", isOpen ? "text-purple-600 dark:text-purple-400" : "text-neutral-700 dark:text-gray-300")}>
          {question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center transition-transform duration-300 text-neutral-500 dark:text-gray-400",
          isOpen && "rotate-180 bg-purple-500 border-none text-white dark:text-white"
        )}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-neutral-600 dark:text-gray-400 text-sm leading-relaxed border-t border-neutral-100 dark:border-white/5 pt-4 font-[family-name:var(--font-noto-serif)]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeBento;
