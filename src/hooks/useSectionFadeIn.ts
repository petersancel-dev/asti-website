'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseSectionFadeInOptions {
    once?: boolean;
    margin?: `${number}px` | `${number}%` | `${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`;
}

interface SectionFadeInReturn {
    ref: React.RefObject<HTMLDivElement | null>;
    isInView: boolean;
}

/**
 * Hook for fade-in-up animations when section enters viewport
 */
export function useSectionFadeIn(options: UseSectionFadeInOptions = {}): SectionFadeInReturn {
    const { once = true, margin = "-100px" } = options;
    const ref = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInView = useInView(ref, { once, margin: margin as any });

    return {
        ref,
        isInView,
    };
}
