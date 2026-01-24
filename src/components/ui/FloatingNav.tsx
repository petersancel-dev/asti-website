'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FilterItem {
    id: string;
    label: string;
    href: string;
}

interface FloatingNavProps {
    items: FilterItem[];
    activeId?: string;
    scrollThreshold?: number;
}

/**
 * Floating navigation bar that appears after scrolling.
 * Adapted from Fiasco Design's CategoryFilter with ASTI styling.
 * 
 * Usage: <FloatingNav items={[{id: 'all', label: 'All', href: '/programmes'}]} />
 */
export default function FloatingNav({
    items,
    activeId = 'all',
    scrollThreshold = 0.5
}: FloatingNavProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [active, setActive] = useState(activeId);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past threshold (percentage of viewport height)
            if (window.scrollY > window.innerHeight * scrollThreshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollThreshold]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-navy/95 backdrop-blur-xl text-white px-2 py-2 rounded-full shadow-2xl border border-white/10"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ul className="flex items-center gap-1">
                        {items.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    onClick={() => setActive(item.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 block ${active === item.id
                                            ? 'bg-gold text-navy-dark'
                                            : 'hover:bg-white/10 text-white/80'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
