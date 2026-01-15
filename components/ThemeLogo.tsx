"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ThemeLogoProps {
  width?: number;
  height?: number;
  className?: string;
  lightLogoPath?: string;
  darkLogoPath?: string;
}

export default function ThemeLogo({ 
  width = 40, 
  height = 40, 
  className = "",
  lightLogoPath = "/logo/icon_black.png",
  darkLogoPath = "/logo/icon.png"
}: ThemeLogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div 
        style={{ width, height }} 
        className={`bg-gray-200 dark:bg-gray-800 rounded animate-pulse ${className}`}
      />
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const logoSrc = currentTheme === "dark" ? darkLogoPath : lightLogoPath;

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={logoSrc}
        alt="Logo"
        width={width}
        height={height}
        className="object-contain transition-opacity duration-300"
        priority
      />
    </div>
  );
}
