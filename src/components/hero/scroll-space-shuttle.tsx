"use client";

import * as React from "react";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from '@/lib/utils';

  interface ScrollSpaceShuttleRenderProps {
  progress: MotionValue<number>;
  isMidpoint: boolean;
  hasPassedMidpoint: boolean;
}

const ScrollSpaceShuttleContext = React.createContext<ScrollSpaceShuttleRenderProps | null>(null);

function useScrollSpaceShuttle() {
  const context = React.useContext(ScrollSpaceShuttleContext);
  if (!context) {
    throw new Error("useScrollSpaceShuttle must be used within a ScrollSpaceShuttle component");
  }
  return context;
}

interface ScrollSpaceShuttleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  imageUrl: string;
  imageAlt?: string;
  imageClassName?: string;
  midpointRange?: [number, number];
  stickyOffset?: number;
}

const ScrollSpaceShuttle = React.forwardRef<HTMLDivElement, ScrollSpaceShuttleProps>(
  (
    {
      children,
      imageUrl,
      imageAlt = "Animated image",
      imageClassName,
      className,
      midpointRange,
      stickyOffset,
      ...props
    },
    ref
  ) => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const [screenWidth, setScreenWidth] = React.useState<number>(0);

    React.useEffect(() => {
      const updateWidth = () => setScreenWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });

    const widthForAnimation = React.useMemo(() => {
      if (!screenWidth) return 1920;
      return Math.max(screenWidth, 1280);
    }, [screenWidth]);

    const x = useTransform(
      scrollYProgress,
      [0.02, 0.98],
      [`-${widthForAnimation * 1.85}px`, `${widthForAnimation * 1.6}px`],
    );

    const opacity = useTransform(scrollYProgress, [0.02, 0.2, 0.85, 0.95], [0, 1, 1, 0]);

    const [isMidpoint, setIsMidpoint] = React.useState(false);
    const [hasPassedMidpoint, setHasPassedMidpoint] = React.useState(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if (!midpointRange) return;
      const [start, end] = midpointRange;
      const withinMidpoint = latest >= start && latest <= end;
      setIsMidpoint(withinMidpoint);

      if (!hasPassedMidpoint && latest > end) {
        setHasPassedMidpoint(true);
      }
    });

    const contextValue = React.useMemo(
      () => ({ progress: scrollYProgress, isMidpoint, hasPassedMidpoint }),
      [scrollYProgress, isMidpoint, hasPassedMidpoint]
    );

    return (
      <div
        ref={targetRef}
        className={cn('relative h-[300vh] w-full flex-shrink-0', className)}
        {...props}
      >
        
        <div
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[url('/background-planet.jpg')]  bg-cover bg-center bg-no-repeat"
          style={stickyOffset ? { top: stickyOffset } : undefined}
        >
        
          <ScrollSpaceShuttleContext.Provider value={contextValue}>
            <div className="z-10 text-center">{children}</div>
          </ScrollSpaceShuttleContext.Provider>

        
          <motion.div
            style={{ x, opacity }}
            className="absolute top-0 left-1/2 z-20 flex h-full w-[200vw] -translate-x-1/2 items-center"
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className={cn(
                'mx-auto h-auto w-auto max-h-[80vh] max-w-[100vw] object-contain md:max-h-[100vh] md:max-w-[100vw]',
                imageClassName
              )}
              onError={e => {
                e.currentTarget.src = `https://placehold.co/1200x800/000000/ffffff?text=Image+Error`;
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
);

ScrollSpaceShuttle.displayName = "ScrollSpaceShuttle";

export { ScrollSpaceShuttle, useScrollSpaceShuttle };
