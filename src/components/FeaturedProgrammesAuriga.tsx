'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PROGRAMMES } from '@/constants/programmes';

// ============================================================
// FEATURED PROGRAMMES - AURIGA STYLE
// Inspired by aurigaspace.com's expanding panel interaction
// Two ASTI logo panels that expand to reveal featured programmes
// ============================================================

// HIGH-VALUE PROGRAMME CURATION
// Explicitly prioritize cutting-edge technology programmes
// Order matters: highest perceived value first
const HIGH_VALUE_TECH_IDS = [
    'cert-drone-repair',     // Drones - cutting edge
    'cert-robotics',         // Robotics - high-tech
    'diploma-fiber-optics',  // Fiber Optics - telecom infrastructure
    'cert-cybersecurity',    // Cybersecurity - high demand
    'cert-network-admin',    // Network Admin - IT infrastructure
];

const HIGH_VALUE_BUSINESS_IDS = [
    'diploma-business-admin', // Business Administration - professional
    'cert-project-management', // Project Management - executive skill
    'cert-data-analytics',    // Data Analytics - high demand
    'cert-digital-marketing', // Digital Marketing - modern business
    'cert-entrepreneurship',  // Entrepreneurship - innovation
];

// Get programmes by ID, maintaining order
const getProgrammesByIds = (ids: string[]) => {
    return ids
        .map(id => PROGRAMMES.find(p => p.id === id))
        .filter((p): p is typeof PROGRAMMES[0] => p !== undefined);
};

// Left panel: Cutting-edge Technology (Drones, Robotics, Fiber)
const leftProgrammes = getProgrammesByIds(HIGH_VALUE_TECH_IDS).slice(0, 3);

// Right panel: Business & Professional
const rightProgrammes = getProgrammesByIds(HIGH_VALUE_BUSINESS_IDS).slice(0, 3);

// Fallback to top robotics/telecom if specific IDs not found
const ensuredLeft = leftProgrammes.length >= 3
    ? leftProgrammes
    : PROGRAMMES.filter(p => ['robotics', 'telecom', 'fiber-optics'].includes(p.category)).slice(0, 3);

const ensuredRight = rightProgrammes.length >= 3
    ? rightProgrammes
    : PROGRAMMES.filter(p => ['business-admin', 'computer-science'].includes(p.category)).slice(0, 3);

interface ExpandablePanelProps {
    side: 'left' | 'right';
    programmes: typeof PROGRAMMES;
    label: string;
    accentLabel: string;
    isActive: boolean;
    onHover: () => void;
    onLeave: () => void;
    otherActive: boolean;
}

function ExpandablePanel({
    side,
    programmes,
    label,
    accentLabel,
    isActive,
    onHover,
    onLeave,
    otherActive
}: ExpandablePanelProps) {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    return (
        <motion.div
            className="relative h-[500px] md:h-[600px] overflow-hidden cursor-pointer"
            animate={{
                flex: isActive ? 3 : otherActive ? 0.5 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Collapsed State - ASTI Logo Button */}
            <AnimatePresence>
                {!isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-navy flex flex-col items-center justify-center"
                    >
                        {/* Corner brackets */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/50" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/50" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/50" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/50" />

                        {/* Rotated label - left side */}
                        <div className={`absolute ${side === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2`}>
                            <span
                                className="text-white/50 text-xs uppercase tracking-[0.3em] font-bold whitespace-nowrap"
                                style={{
                                    writingMode: 'vertical-rl',
                                    transform: side === 'left' ? 'rotate(180deg)' : 'none'
                                }}
                            >
                                ASTI
                            </span>
                        </div>

                        {/* Center content */}
                        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
                            <Image
                                src="/images/asti-logo.png"
                                alt="ASTI Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Rotated label - right side */}
                        <div className={`absolute ${side === 'left' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2`}>
                            <span
                                className="text-xs uppercase tracking-[0.3em] font-bold whitespace-nowrap"
                                style={{
                                    writingMode: 'vertical-rl',
                                    transform: side === 'right' ? 'rotate(180deg)' : 'none'
                                }}
                            >
                                <span className="text-white/50">FOR </span>
                                <span className="text-gold">{accentLabel}</span>
                                <span className="text-white/50"> PROGRAMMES</span>
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded State - Programme Rows */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="absolute inset-0 bg-navy flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 bg-black/20">
                            <div className="flex items-center justify-between">
                                <span className="text-white/50 text-xs uppercase tracking-widest">ASTI</span>
                                <span className="text-xs uppercase tracking-widest">
                                    <span className="text-white/50">FOR </span>
                                    <span className="text-gold font-bold">{accentLabel}</span>
                                </span>
                            </div>
                        </div>

                        {/* Programme Rows */}
                        <div className="flex-1 flex flex-col">
                            {programmes.map((programme, index) => (
                                <motion.div
                                    key={programme.id}
                                    initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex-1 relative border-b border-white/5 last:border-b-0 group/row"
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    {/* Background image on hover */}
                                    <div
                                        className={`absolute inset-0 transition-opacity duration-500 ${hoveredRow === index ? 'opacity-30' : 'opacity-0'}`}
                                    >
                                        {programme.image && (
                                            <Image
                                                src={programme.image}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <Link
                                        href={`/programmes/${programme.id}`}
                                        className="relative z-10 h-full p-6 flex flex-col justify-center"
                                    >
                                        <h3 className={`text-xl md:text-2xl font-oswald font-bold uppercase transition-colors duration-300 ${hoveredRow === index ? 'text-gold' : 'text-white'}`}>
                                            {programme.title}
                                        </h3>
                                        <p className="text-white/50 text-xs uppercase tracking-widest mt-2 line-clamp-2">
                                            {programme.description}
                                        </p>
                                    </Link>

                                    {/* Hover indicator dots */}
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                        <motion.div
                                            className="w-1.5 h-1.5 rounded-full bg-gold"
                                            animate={{ opacity: hoveredRow === index ? 1 : 0.2 }}
                                        />
                                        <motion.div
                                            className="w-1.5 h-1.5 rounded-full bg-gold"
                                            animate={{ opacity: hoveredRow === index ? 1 : 0.2 }}
                                            transition={{ delay: 0.05 }}
                                        />
                                        <motion.div
                                            className="w-1.5 h-1.5 rounded-full bg-gold"
                                            animate={{ opacity: hoveredRow === index ? 1 : 0.2 }}
                                            transition={{ delay: 0.1 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FeaturedProgrammesAuriga() {
    const [activePanel, setActivePanel] = useState<'left' | 'right' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="bg-navy-dark py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-wide mb-4">
                        Featured <span className="text-gold">Programmes</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        Hover over each panel to explore our top programmes in Technology and Business
                    </p>
                </motion.div>

                {/* Auriga-style expanding panels */}
                <div
                    ref={containerRef}
                    className="flex gap-2 md:gap-4 rounded-xl overflow-hidden"
                    onMouseLeave={() => setActivePanel(null)}
                >
                    <ExpandablePanel
                        side="left"
                        programmes={ensuredLeft}
                        label="ASTI"
                        accentLabel="TECHNOLOGY"
                        isActive={activePanel === 'left'}
                        otherActive={activePanel === 'right'}
                        onHover={() => setActivePanel('left')}
                        onLeave={() => { }}
                    />
                    <ExpandablePanel
                        side="right"
                        programmes={ensuredRight}
                        label="ASTI"
                        accentLabel="BUSINESS"
                        isActive={activePanel === 'right'}
                        otherActive={activePanel === 'left'}
                        onHover={() => setActivePanel('right')}
                        onLeave={() => { }}
                    />
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/programmes"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-bold uppercase tracking-wide rounded-sm hover:bg-gold-light transition-colors"
                    >
                        View All Programmes
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
