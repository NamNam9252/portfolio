"use client";

import {
  Home,
  Briefcase,
  FolderGit2,
  Palette,
  ShoppingBag,
  Mail,
  Linkedin,
  Globe,
  X,
  Dribbble,
  Instagram,
  Sun,
  Moon,
  Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeLogo from "./ThemeLogo";
import { useSidebar } from "@/contexts/SidebarContext";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Briefcase, label: "Work", href: "/work" },
  { icon: FolderGit2, label: "Personal Projects", href: "/projects" },
  { icon: Palette, label: "Creative Suite", href: "/creative" },
  { icon: ShoppingBag, label: "Shop", href: "/shop", badge: "NEW" },
];

const socialLinks = [
  { icon: Mail, href: "mailto:hello@nazyx.com" },
  { icon: Dribbble, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Globe, href: "#" },
  { icon: X, href: "#" },
  { icon: Instagram, href: "#" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <aside className={`${isCollapsed ? 'w-[80px]' : 'w-[280px]'} h-screen bg-gray-50 dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/5 flex flex-col p-6 fixed left-0 top-0 z-40 hidden md:flex transition-all duration-300 ease-in-out overflow-hidden`}>

      {/* Toggle Button - Hamburger Menu */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-6 right-6 w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:bg-gray-200 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors z-50"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="h-[2px] w-5 bg-gray-600 dark:bg-gray-400 rounded-full transition-all duration-300"></span>
        <span className={`h-[2px] bg-gray-600 dark:bg-gray-400 rounded-full transition-all duration-300 ${isCollapsed ? 'w-5' : 'w-4'}`}></span>
        <span className="h-[2px] w-5 bg-gray-600 dark:bg-gray-400 rounded-full transition-all duration-300"></span>
      </button>

      {/* Profile Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} mb-10 overflow-hidden`}>
        <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
          <ThemeLogo
            width={48}
            height={48}
          />
        </div>
        <div className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
          <h2 className="text-gray-900 dark:text-white font-semibold text-lg leading-none whitespace-nowrap">Naman</h2>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 whitespace-nowrap">Full Stack Developer</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-8 flex-1 overflow-hidden">
        <h3 className={`text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>Creations</h3>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                    ? "bg-gray-200 dark:bg-[#1a1a1a] text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
                  <Icon size={18} strokeWidth={2} className={isActive ? "text-gray-900 dark:text-white" : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"} />
                  <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'} whitespace-nowrap`}>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold bg-[#1a2e1a] text-green-500 px-1.5 py-0.5 rounded border border-green-500/20 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto">
        {/* Socials */}
        <div className="mb-8">
          <h3 className={`text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>Socials</h3>
          <div className={`grid ${isCollapsed ? 'grid-cols-1' : 'grid-cols-4'} gap-2`}>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#111] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-[#222] transition-all border border-transparent hover:border-gray-300 dark:hover:border-white/5"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Theme Toggle Button (Icon Only) */}
        <div className={`${isCollapsed ? '' : 'px-2'} pt-4 border-t border-gray-200 dark:border-white/5 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-[#111] hover:bg-gray-300 dark:hover:bg-[#222] border border-gray-300 dark:border-white/5 transition-all group"
            title={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
          >
            {mounted && theme === "light" ? (
              <Moon size={14} className="text-blue-500" />
            ) : (
              <Sun size={14} className="text-yellow-500" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
