"use client";

import React, { useEffect, useRef } from "react";

export function BackgroundRippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const gridSize = 60;
    const boxes: HTMLDivElement[] = [];
    const ripples = new Map<HTMLDivElement, { current: number; target: number }>();

    // Calculate grid dimensions
    const updateGrid = () => {
      // Clear existing boxes
      container.innerHTML = '';
      boxes.length = 0;
      ripples.clear();

      const cols = Math.ceil(window.innerWidth / gridSize) + 1;
      const rows = Math.ceil(window.innerHeight / gridSize) + 1;

      // Create grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const box = document.createElement('div');
          box.className = 'absolute border border-gray-200/20 dark:border-white/5 transition-colors duration-200';
          box.style.width = `${gridSize}px`;
          box.style.height = `${gridSize}px`;
          box.style.left = `${col * gridSize}px`;
          box.style.top = `${row * gridSize}px`;
          box.dataset.row = String(row);
          box.dataset.col = String(col);

          container.appendChild(box);
          boxes.push(box);
          ripples.set(box, { current: 0, target: 0 });
        }
      }
    };

    const isDark = () => document.documentElement.classList.contains('dark');

    const createRipple = (centerBox: HTMLDivElement, strength: number = 1) => {
      const centerRow = parseInt(centerBox.dataset.row || '0');
      const centerCol = parseInt(centerBox.dataset.col || '0');

      boxes.forEach(box => {
        const row = parseInt(box.dataset.row || '0');
        const col = parseInt(box.dataset.col || '0');
        const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));

        const ripple = ripples.get(box);
        if (ripple) {
          ripple.target = Math.max(ripple.target, Math.max(0, (5 - distance) * strength * 0.3));
        }
      });
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const col = Math.floor(e.clientX / gridSize);
      const row = Math.floor(e.clientY / gridSize);
      const box = boxes.find(b => b.dataset.row === String(row) && b.dataset.col === String(col));

      if (box) {
        createRipple(box, 0.5);
      }
    };

    // Click handler
    const handleClick = (e: MouseEvent) => {
      const col = Math.floor(e.clientX / gridSize);
      const row = Math.floor(e.clientY / gridSize);
      const box = boxes.find(b => b.dataset.row === String(row) && b.dataset.col === String(col));

      if (box) {
        createRipple(box, 2);
      }
    };

    // Animation loop
    const animate = () => {
      const dark = isDark();

      boxes.forEach(box => {
        const ripple = ripples.get(box);
        if (!ripple) return;

        // Smooth animation
        ripple.current += (ripple.target - ripple.current) * 0.15;
        ripple.target *= 0.92;

        // Apply color based on ripple intensity
        if (ripple.current > 0.01) {
          const intensity = Math.min(1, ripple.current);
          if (dark) {
            box.style.backgroundColor = `rgba(139, 92, 246, ${intensity * 0.4})`;
            box.style.borderColor = `rgba(139, 92, 246, ${intensity * 0.6})`;
          } else {
            box.style.backgroundColor = `rgba(99, 102, 241, ${intensity * 0.3})`;
            box.style.borderColor = `rgba(99, 102, 241, ${intensity * 0.5})`;
          }
        } else {
          box.style.backgroundColor = 'transparent';
          box.style.borderColor = dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        }
      });

      requestAnimationFrame(animate);
    };

    // Initialize
    updateGrid();
    window.addEventListener('resize', updateGrid);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    animate();

    return () => {
      window.removeEventListener('resize', updateGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
