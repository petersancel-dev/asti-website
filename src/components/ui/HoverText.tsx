'use client';

import { motion } from 'framer-motion';

interface HoverTextProps {
    text: string;
    className?: string;
}

/**
 * Clone1-style hover text effect
 * Text slides up on hover, revealing duplicate from below
 */
export function HoverText({ text, className = "" }: HoverTextProps) {
    return (
        <motion.div
            className={`relative overflow-hidden cursor-pointer ${className}`}
            initial="initial"
            whileHover="hover"
        >
            <div className="relative overflow-hidden">
                <motion.span
                    className="block"
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    variants={{
                        initial: { y: 0 },
                        hover: { y: "-100%" }
                    }}
                >
                    {text}
                </motion.span>
                <motion.span
                    className="absolute inset-0 block"
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    variants={{
                        initial: { y: "100%" },
                        hover: { y: 0 }
                    }}
                >
                    {text}
                </motion.span>
            </div>
        </motion.div>
    );
}
