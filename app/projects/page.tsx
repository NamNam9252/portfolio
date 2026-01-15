"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

// Placeholder data - ideally this would come from a CMS or config file
const projects = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Web Application",
    description: "A high-performance analytics dashboard with real-time data visualization.",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Neon Nexus",
    category: "Design System",
    description: "A comprehensive design system for next-gen cyber-physical interfaces.",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Zenith Core",
    category: "SaaS Platform",
    description: "Scalable cloud infrastructure management tool for enterprise.",
    color: "bg-emerald-500",
  },
   {
    id: 4,
    title: "Aura",
    category: "Mobile App",
    description: "Meditation and focus application with generative ambient soundscapes.",
    color: "bg-orange-500",
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
       <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Selected Work
        </motion.h1>
         <motion.p variants={item} className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl">
          A showcase of projects that define my journey in crafting digital excellence.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div 
                key={project.id}
                variants={item}
                className="group relative bg-gray-50 dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 transition-all duration-500 aspect-[4/3] flex flex-col"
            >
             <div className={`h-2/3 ${project.color}/10 group-hover:${project.color}/20 transition-colors relative overflow-hidden flex items-center justify-center`}>
                {/* Abstract Visual Placeholder */}
                <div className={`w-32 h-32 rounded-full ${project.color} blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                
                {/* Text Overlay on Hover */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-6 py-2 bg-white dark:bg-black/80 backdrop-blur-md rounded-full text-sm font-medium border border-gray-200 dark:border-white/10">View Case Study</span>
                 </div>
             </div>
             
             <div className="p-8 flex-grow flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{project.category}</span>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
             </div>

             <Link href={`#`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
