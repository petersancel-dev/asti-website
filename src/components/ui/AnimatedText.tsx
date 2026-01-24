'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
    children: ReactNode;
    className?: string;
}

/**
 * Premium hover text effect that displays a sliding reveal animation.
 * Adapted from Fiasco Design's HoverText component.
 * 
 * Usage: <AnimatedText>Click Me</AnimatedText>
 */
export default function AnimatedText({ children, className = '' }: AnimatedTextProps) {
    return (
        <motion.div
            className={`relative overflow-hidden cursor-pointer ${className}`}
            initial="initial"
            whileHover="hover"
        >
            <div className="relative overflow-hidden">
                {/* Original text - slides up on hover */}
                <motion.span
                    className="block"
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    variants={{
                        initial: { y: 0 },
                        hover: { y: '-100%' }
                    }}
                >
                    {children}
                </motion.span>

                {/* Duplicate text - slides in from below */}
                <motion.span
                    className="absolute inset-0 block"
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    variants={{
                        initial: { y: '100%' },
                        hover: { y: 0 }
                    }}
                >
                    {children}
                </motion.span>
            </div>
        </motion.div>
    );
}
