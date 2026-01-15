"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

const DEFAULT_PARTICLE_COUNT = 15; // Slightly more stars
const DEFAULT_GLOW_COLOR = "132, 0, 255"; // Purple

export const MagicCardBody = ({
  children,
  className,
  enableStars = true,
  enableBorderGlow = true,
  glowColor = DEFAULT_GLOW_COLOR,
}: {
  children: React.ReactNode;
  className?: string;
  enableStars?: boolean;
  enableBorderGlow?: boolean;
  glowColor?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);

  // Helper: Create particle element
  const createParticleElement = (x: number, y: number, color: string): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(${color}, 1);
      box-shadow: 0 0 6px rgba(${color}, 0.6);
      pointer-events: none;
      z-index: 0; 
      left: ${x}px;
      top: ${y}px;
    `;
    return el;
  };

  const initializeParticles = useCallback(() => {
    // We generate particles on the fly during animation to avoid stale dimensions
  }, []);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();

    // Create a batch of particles
    for (let i = 0; i < DEFAULT_PARTICLE_COUNT; i++) {
        const timeoutId = window.setTimeout(() => {
             if (!isHoveredRef.current || !cardRef.current) return;
             
             // Create particle at random position
             const startX = Math.random() * width;
             const startY = Math.random() * height;
             const particle = createParticleElement(startX, startY, glowColor);
             
             cardRef.current.appendChild(particle);
             particlesRef.current.push(particle);

             // Animate appearance
             gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

             // Animate movement (float around)
             gsap.to(particle, {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                duration: 2 + Math.random() * 2,
                ease: 'none',
                repeat: -1,
                yoyo: true
             });

             // Animate pulse
             gsap.to(particle, {
                opacity: 0.3,
                duration: 1.5,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
             });

        }, i * 150); // Stagger creation
        timeoutsRef.current.push(timeoutId);
    }
  }, [glowColor]);


  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (enableStars) animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      // Reset glow
      element.style.setProperty('--glow-intensity', '0');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableBorderGlow) return;
      
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const relativeX = (x / rect.width) * 100;
      const relativeY = (y / rect.height) * 100;

      element.style.setProperty('--glow-x', `${relativeX}%`);
      element.style.setProperty('--glow-y', `${relativeY}%`);
      element.style.setProperty('--glow-intensity', '1');
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, enableStars, enableBorderGlow]);


  return (
    <div
      ref={cardRef}
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] relative overflow-hidden",
        enableBorderGlow ? "magic-glow-card" : "",
        className
      )}
      style={{
        // Default css vars for glow
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-intensity': '0',
        '--glow-radius': '300px', // Larger radius for 3D card
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
        <style jsx>{`
            .magic-glow-card::after {
                content: '';
                position: absolute;
                inset: 0;
                padding: 4px; /* Border thickness */
                background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                    rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                    rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                    transparent 60%);
                border-radius: inherit;
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                mask-composite: exclude;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 10;
            }
            .magic-glow-card:hover::after {
                opacity: 1;
            }
        `}</style>
      
      {/* Content wrapper to ensure z-index above stars/particles */}
      <div className="relative z-20 h-full w-full pointer-events-none">
          {/* We use pointer-events-none on wrapper so mouse events pass through to card for tilt/glow calculation, 
              BUT interactive children need pointer-events-auto. 
              Actually, usually CardBody children are just visual. 3D Card handles tilt on container. */}
        {children}
      </div>

    </div>
  );
};
