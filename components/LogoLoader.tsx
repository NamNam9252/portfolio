"use client";

import { useEffect, useState } from "react";

export default function LogoLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false); // Default false, check in effect

  useEffect(() => {
    // Only access localStorage on client mount
    const hasVisitedBefore = localStorage.getItem('hasVisitedSite');
    if (hasVisitedBefore) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedSite', 'true');
      setIsFirstVisit(true);
    }

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleVideoEnd = () => {
    setIsAnimating(true);
    
    // Clear any running interval
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    // After animation completes, fade out the loader
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 900);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!video.duration) return;
    
    const targetProgress = Math.floor((video.currentTime / video.duration) * 100);
    
    // Clear previous interval if exists
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    // Smoothly increment progress to target
    if (targetProgress > progress) {
      const newInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= targetProgress) {
            clearInterval(newInterval);
            setIntervalId(null);
            return prev;
          }
          return prev + 1;
        });
      }, 30);
      setIntervalId(newInterval);
    }
  };

  // Convert to Eastern Arabic numerals
  const toArabicNumerals = (num: number): string => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
  };

  if (!isLoading) {
    return null;
  }

  // Use CSS classes for theming instead of JS state strings
  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-black transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Logo Video at Top - Responsive */}
        <div className="relative w-[280px] h-[200px] sm:w-[400px] sm:h-[300px] mb-6 sm:mb-8">
            {/* Light Mode Video */}
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={(e) => {
              if (!isFirstVisit) e.currentTarget.playbackRate = 6;
            }}
            style={{
              transform: isAnimating 
                ? 'translate(-50vw, -48vh) scale(0.05)' 
                : 'translate(0, 0) scale(1)',
              transition: isAnimating 
                ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'none',
            }}
            className="w-full h-full object-contain dark:hidden block"
          >
            <source src="/logo/logo_bg_white.mp4" type="video/mp4" />
          </video>

          {/* Dark Mode Video */}
           <video
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={(e) => {
              if (!isFirstVisit) e.currentTarget.playbackRate = 6;
            }}
            style={{
              transform: isAnimating 
                ? 'translate(-50vw, -48vh) scale(0.05)' 
                : 'translate(0, 0) scale(1)',
              transition: isAnimating 
                ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'none',
            }}
            className="w-full h-full object-contain hidden dark:block"
          >
            <source src="/logo/logo_vid.mp4" type="video/mp4" />
          </video>


          {/* Right side watermark mask */}
          <div 
            className="absolute bottom-0 right-0 w-20 h-10 bg-white dark:bg-black"
            style={{
              transform: isAnimating 
                ? 'translate(-50vw, -48vh) scale(0.05)' 
                : 'translate(0, 0) scale(1)',
              transition: isAnimating 
                ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'none',
            }}
          />
          {/* Bottom line cover block */}
          <div 
            className="absolute -bottom-2 left-0 right-0 h-12 bg-white dark:bg-black"
            style={{
              transform: isAnimating 
                ? 'translate(-50vw, -48vh) scale(0.05)' 
                : 'translate(0, 0) scale(1)',
              transition: isAnimating 
                ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'none',
            }}
          />
        </div>

        {/* Large Percentage Number with Arabic Font - Responsive */}
        <div 
          className="text-5xl sm:text-7xl mb-6 sm:mb-8 text-black dark:text-white"
          style={{
            fontFamily: "'Amiri', serif",
            fontWeight: 700,
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 0.3s ease-out',
            textShadow: '0 0 20px rgba(0,0,0,0.1), 0 0 40px rgba(0,0,0,0.1) dark:0 0 20px rgba(255,255,255,0.5)'
          }}
        >
          {toArabicNumerals(progress)}
        </div>

        {/* Loading Bar - Responsive */}
        <div 
          className="w-64 sm:w-96"
          style={{
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <div 
            className="h-0.5 bg-black dark:bg-white transition-all duration-500 ease-out rounded-full"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px rgba(0,0,0,0.1) dark:0 0 10px rgba(255,255,255,0.5)'
            }}
          />
        </div>
      </div>
    </>
  );
}


// export default function LogoLoader() {
//   return<>
//   </>
// }