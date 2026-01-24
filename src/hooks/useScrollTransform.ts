import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';

interface ScrollTransformOptions {
    /**
     * Input range for the scroll progress [start, end]
     * Default: [0, 1]
     */
    inputRange?: number[];
    /**
     * Output range for the transformed value
     * Default: [0, 100]
     */
    outputRange?: (number | string)[];
    /**
     * Offset for the scroll detection
     * Default: ["start start", "end start"]
     */
    offset?: any;
    /**
     * Optional ref to track scroll of a specific container instead of window
     */
    container?: RefObject<HTMLElement>;
    /**
     * Optional target element to track. If not provided, a new ref is created and returned.
     */
    target?: RefObject<HTMLElement | null>;
}

/**
 * Expert pattern for creating scroll-linked animations.
 * Abstracts the complexity of setting up useScroll and useTransform.
 */
export function useScrollTransform(options: ScrollTransformOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);

    // Default config
    const {
        inputRange = [0, 1],
        outputRange = [0, 100],
        offset = ["start start", "end start"],
        container,
        target
    } = options;

    const { scrollYProgress } = useScroll({
        target: target || ref,
        container: container,
        offset: offset
    });

    const value = useTransform(scrollYProgress, inputRange, outputRange);

    return { ref, scrollYProgress, value };
}
