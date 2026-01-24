'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}

/**
 * Fade-in animation for page load entrance effects.
 * Used for hero headlines and primary content.
 */
export default function FadeIn({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
}: FadeInProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
