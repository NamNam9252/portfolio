"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  basePath?: string;
  peepCount?: number;
  maxCrowd?: number;
  peepSize?: number;
}

const CrowdCanvas = ({ 
  basePath = "/me/Bust", 
  peepCount = 105,
  maxCrowd = 20,
  peepSize = 120
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    const stage = {
      width: 0,
      height: 0,
    };

    // TYPES
    type Peep = {
      image: HTMLImageElement;
      width: number;
      height: number;
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: gsap.core.Timeline | null;
      loaded: boolean;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: Peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 50 - 150 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }: { peep: Peep; props: any }) => {
      const { startY, endX } = props;
      const xDuration = randomRange(8, 15);
      const yDuration = 0.3;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.2));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0,
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 8,
        },
        0,
      );

      return tl;
    };

    const walks = [normalWalk];

    // FACTORY FUNCTIONS
    const createPeep = (index: number): Peep => {
      const img = new Image();
      const peep: Peep = {
        image: img,
        width: peepSize,
        height: peepSize,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        loaded: false,
        render: (ctx: CanvasRenderingContext2D) => {
          if (!peep.loaded) return;
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(
            peep.image,
            0,
            0,
            peep.width,
            peep.height,
          );
          ctx.restore();
        },
      };

      img.onload = () => {
        peep.loaded = true;
        // Maintain aspect ratio
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        peep.height = peepSize;
        peep.width = peepSize * aspectRatio;
      };
      img.src = `${basePath}/peep-${index}.png`;

      return peep;
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      for (let i = 1; i <= peepCount; i++) {
        allPeeps.push(createPeep(i));
      }
    };

    const initCrowd = () => {
      // Add a subset of peeps to initial crowd
      const initialCount = Math.min(maxCrowd, availablePeeps.length);
      for (let i = 0; i < initialCount; i++) {
        const peep = addPeepToCrowd();
        if (peep?.walk) {
          peep.walk.progress(Math.random());
        }
      }
    };

    const addPeepToCrowd = (): Peep | null => {
      if (availablePeeps.length === 0) return null;
      
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      createPeeps();
      // Wait a bit for images to start loading
      setTimeout(() => {
        resize();
        gsap.ticker.add(render);
      }, 100);
    };

    init();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [basePath, peepCount, maxCrowd, peepSize]);

  return (
    <canvas ref={canvasRef} className="absolute bottom-0 h-full w-full" />
  );
};

export default CrowdCanvas;
