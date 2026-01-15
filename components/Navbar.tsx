"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check initial theme
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const darkMode = htmlElement.classList.contains('dark');
      setIsDark(darkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Use white logo for dark mode, black logo for light mode
  const logoSrc = isDark ? "/logo/logo.png" : "/logo/icon_black.png";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {mounted && (
            <Image
              id="navbar-logo"
              src={logoSrc}
              alt="Nazyx Logo"
              width={36}
              height={36}
              className="object-contain transition-opacity duration-300 sm:w-10 sm:h-10"
              key={logoSrc}
            />
          )}
        </Link>

        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Projects
            </Link>
            <Link href="/resume" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Resume
            </Link>
            <Link href="/contact" className="px-4 py-2 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Contact
            </Link>
          </div>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="container mx-auto px-4 pb-4 flex flex-col space-y-3">
          <Link
            href="/about"
            className="text-sm font-medium py-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium py-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/resume"
            className="text-sm font-medium py-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className="w-full text-center py-2 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
