'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ACCREDITATIONS } from '@/constants/accreditations';

// ============================================================
// ACCREDITATION FLIP CARDS
// Inspired by Slush.app's bouncy 3D flip animation
// Premium design with glassmorphism and gold accents
// ============================================================

interface FlipCardProps {
    logo: string;
    name: string;
    fullName: string;
    region: string;
    url: string;
    index: number;
}

function AccreditationFlipCard({ logo, name, fullName, region, url, index }: FlipCardProps) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            className="group perspective-1000"
            style={{ perspective: '1000px' }}
        >
            {/* The flipping container */}
            <div
                className="relative w-44 h-44 md:w-52 md:h-52 transition-transform duration-500 ease-out group-hover:[transform:rotateY(180deg)]"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* ========== FRONT FACE - LOGO ========== */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* Premium glass container - warm cream to provide contrast for white logo elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white backdrop-blur-xl" />

                    {/* Subtle border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" />

                    {/* Inner shadow for depth */}
                    <div className="absolute inset-[1px] rounded-2xl shadow-inner" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }} />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6">
                        {/* Logo with glow effect for contrast against light backgrounds */}
                        <div
                            className="relative w-24 h-24 md:w-28 md:h-28 mb-3"
                            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}
                        >
                            <Image
                                src={logo}
                                alt={fullName}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Name */}
                        <span className="text-navy font-bold text-sm md:text-base tracking-wide">
                            {name}
                        </span>

                        {/* Region tag */}
                        <span className="mt-1 text-[10px] text-gray-400 uppercase tracking-widest">
                            {region}
                        </span>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gold/20 to-transparent rounded-bl-3xl" />
                </div>

                {/* ========== BACK FACE - VISIT SITE ========== */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon to-navy" />

                    {/* Animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                    {/* Border */}
                    <div className="absolute inset-0 rounded-2xl border border-gold/30" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        {/* Arrow icon */}
                        <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mb-4">
                            <svg
                                className="w-5 h-5 text-gold"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </div>

                        {/* Visit Site Text */}
                        <span className="text-gold font-bold text-lg md:text-xl tracking-wide">
                            Visit Site
                        </span>

                        {/* Full name */}
                        <span className="mt-2 text-white/60 text-[10px] md:text-xs leading-tight max-w-[90%]">
                            {fullName}
                        </span>
                    </div>
                </div>
            </div>
        </motion.a>
    );
}

export default function AccreditationCards() {
    return (
        <section className="py-24 bg-gradient-to-b from-maroon to-maroon-dark relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy/20 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-bold uppercase tracking-widest mb-6">
                        Our Partners
                    </span>
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4">
                        Internationally <span className="text-gold">Accredited</span>
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto">
                        Our programmes are recognized by leading educational bodies worldwide
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {ACCREDITATIONS.map((acc, index) => (
                        <AccreditationFlipCard
                            key={acc.id}
                            logo={acc.logo}
                            name={acc.name}
                            fullName={acc.fullName}
                            region={acc.region}
                            url={acc.url}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center text-white/40 text-sm mt-12"
                >
                    Hover to explore our accreditation partners →
                </motion.p>
            </div>
        </section>
    );
}
