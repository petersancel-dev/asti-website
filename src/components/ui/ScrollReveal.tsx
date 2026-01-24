'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    once?: boolean;
}

/**
 * Scroll-triggered reveal animation wrapper.
 * Elements animate into view when they enter the viewport.
 * 
 * Usage: <ScrollReveal delay={0.2} direction="up">Content</ScrollReveal>
 */
export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.6,
    once = true,
}: ScrollRevealProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: -40 },
        right: { y: 0, x: 40 },
    };

    const { x, y } = directions[direction];

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once, margin: '-50px' }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1], // Expo out easing
            }}
        >
            {children}
        </motion.div>
    );
}
