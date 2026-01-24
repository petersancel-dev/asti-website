'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface UseParallaxOptions {
    offset?: [string, string];
    distance?: number;
}

interface ParallaxReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    scrollYProgress: MotionValue<number>;
    translateY: MotionValue<string>;
}

/**
 * CLONEA-style parallax hook for background images
 */
export function useParallax(options: UseParallaxOptions = {}): ParallaxReturn {
    const { offset = ["start start", "end start"], distance = 20 } = options;
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: offset as ["start start", "end start"],
    });

    const translateY = useTransform(scrollYProgress, [0, 1], ["0%", `${distance}%`]);

    return {
        containerRef,
        scrollYProgress,
        translateY,
    };
}
