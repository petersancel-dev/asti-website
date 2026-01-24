'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface UseScrollRevealOptions {
    offset?: [string, string];
}

interface ScrollRevealReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    scrollYProgress: MotionValue<number>;
    clipPathValue: MotionValue<string>;
    opacity: MotionValue<number>;
    contentY: MotionValue<number>;
    contentScale: MotionValue<number>;
}

/**
 * CLONEA-style scroll reveal hook
 * Creates diagonal clip-path reveal animation on scroll
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}): ScrollRevealReturn {
    const { offset = ["start start", "end start"] } = options;
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: offset as ["start start", "end start"],
    });

    // Diagonal clip-path animation
    const clipPathValue = useTransform(
        scrollYProgress,
        [0, 0.4, 0.8],
        [
            "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // Hidden
            "polygon(0% 25%, 100% 0%, 100% 100%, 0% 100%)",    // Rising diagonal
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"       // Full screen
        ]
    );

    const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);
    const contentScale = useTransform(scrollYProgress, [0.1, 0.5], [0.95, 1]);

    return {
        containerRef,
        scrollYProgress,
        clipPathValue,
        opacity,
        contentY,
        contentScale,
    };
}
