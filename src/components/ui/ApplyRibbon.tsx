'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// =============================================================================
// APPLY RIBBON - Static SVG with elegant lighting effects
// This is the CORRECT version that works on the live Vercel deployment.
// =============================================================================

interface ApplyRibbonProps {
    isScrolled: boolean;
}

export default function ApplyRibbon({ isScrolled }: ApplyRibbonProps) {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isScrolled ? -100 : 0,
                opacity: isScrolled ? 0 : 1
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 20
            }}
            className="absolute top-0 right-4 lg:right-10 z-50"
        >
            <Link href="/apply" className="block group">
                <motion.div
                    className="relative"
                    whileHover={{ y: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                    {/* Main Ribbon SVG */}
                    <svg
                        width="90"
                        height="120"
                        viewBox="0 0 90 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                    >
                        <path d="M0 0H90V105L45 120L0 105V0Z" fill="#8B1A2D" />
                    </svg>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 text-white pointer-events-none">
                        <motion.svg
                            className="mb-2"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                        </motion.svg>
                        <span className="font-oswald text-lg font-bold uppercase tracking-wider group-hover:tracking-[0.2em] transition-all duration-300">
                            Apply
                        </span>
                    </div>

                    {/* Top Glossy Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                    {/* Left Edge Shadow (3D depth) */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

                    {/* Right Edge Highlight (3D depth) */}
                    <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                </motion.div>
            </Link>
        </motion.div>
    );
}
