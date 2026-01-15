"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBriefcase,
  IconMail,
  IconSun,
  IconMoon,
  IconBrandGithub,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function FloatingNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Works",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/work",
    },
    {
      title: "About",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/about",
    },
    {
      title: "Get in Touch",
      icon: (
        <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contact",
    },
    {
      title: "Mail",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:gnaman180@gmail.com",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/namnam9252",
    },
  ];

  // Theme toggle
  const themeToggle = {
    title: mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Toggle",
    icon: mounted && theme === "light" ? (
      <IconMoon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ) : (
      <IconSun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#theme",
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if clicked element or any parent up to 5 levels has href="#theme"
    let element: HTMLElement | null = target;
    let depth = 0;
    
    while (element && depth < 5) {
      if (element.tagName === 'A' && element.getAttribute('href') === '#theme') {
        e.preventDefault();
        e.stopPropagation();
        setTheme(theme === "dark" ? "light" : "dark");
        return;
      }
      element = element.parentElement;
      depth++;
    }
  };

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      onClick={handleClick}
    >
      <FloatingDock items={[...links, themeToggle]} />
    </div>
  );
}
