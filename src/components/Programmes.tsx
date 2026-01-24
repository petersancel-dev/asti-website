'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PROGRAMMES, PROGRAMME_CATEGORIES, Programme } from '@/constants/programmes';
import FeaturedProgrammesAuriga from './FeaturedProgrammesAuriga';

// Program level configuration - links to filtered programmes page
const PROGRAM_LEVELS = [
    {
        title: "Introductory",
        description: "Start your journey with foundational courses designed for beginners.",
        color: "#1E3A8A", // Blue-900
        href: "/programmes?level=introductory"
    },
    {
        title: "Certificate",
        description: "Gain practical skills and professional certification for career advancement.",
        color: "#064E3B", // Emerald-900
        href: "/programmes?level=certificate"
    },
    {
        title: "Diploma",
        description: "Advanced comprehensive programmes for mastery and leadership.",
        color: "#78350F", // Amber-900
        href: "/programmes?level=diploma"
    }
];

function ProgrammeCard({ programme }: { programme: Programme }) {
    // Standard Color Scheme
    const levelStyles: Record<string, { badge: string }> = {
        introduction: { badge: 'bg-blue-600' },
        certificate: { badge: 'bg-emerald-600' },
        diploma: { badge: 'bg-amber-600' },
    };

    const style = levelStyles[programme.level] || levelStyles.certificate;

    return (
        <div className="card group cursor-pointer border border-gray-200 bg-white hover:shadow-xl transition-all duration-300">
            {programme.image && (
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={programme.image}
                        alt={programme.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />

                    <span className={`
                        absolute top-3 right-3 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-white shadow-sm
                        ${style.badge}
                    `}>
                        {programme.level}
                    </span>
                </div>
            )}

            <div className="p-6">
                {!programme.image && (
                    <span className={`
                        inline-block px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-white mb-4
                        ${style.badge}
                    `}>
                        {programme.level}
                    </span>
                )}

                <h3 className="text-lg font-oswald font-bold text-navy mb-2 group-hover:text-maroon transition-colors">
                    {programme.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {programme.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                        <svg className="w-4 h-4 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {programme.duration}
                    </span>
                </div>

                <Link
                    href={`/programmes/${programme.id}`}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-navy group-hover:text-maroon transition-colors"
                >
                    Learn More
                    <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default function Programmes() {
    return (
        <section className="py-20 bg-white" id="programmes">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Two-column layout like study-at-dwu */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

                    {/* Left Text */}
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy uppercase tracking-wide leading-none">
                            Study at <span className="text-gold">ASTI</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed font-light">
                            You'll be gaining an education that is personalized, hands-on, and focused on honing your strengths in technology, business, and professional development.
                        </p>
                        <Link
                            href="/programmes"
                            className="inline-block text-navy font-bold uppercase tracking-wide border-b-2 border-gold hover:text-maroon transition-colors"
                        >
                            View All Programs
                        </Link>
                    </div>

                    {/* Right Cards - Program Levels */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        {PROGRAM_LEVELS.map((level, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 80, scale: 0.85 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{
                                    delay: idx * 0.1,
                                    duration: 0.6,
                                    type: 'spring',
                                    stiffness: 80,
                                    damping: 15
                                }}
                            >
                                <Link href={level.href} className="block h-full">
                                    <motion.div
                                        className="relative p-8 rounded-xl cursor-pointer group h-full min-h-[220px] transition-all duration-300"
                                        style={{
                                            backgroundColor: level.color,
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                        }}
                                        whileHover={{
                                            y: -8,
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Subtle pattern overlay */}
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                                        {/* Icon/Decoration */}
                                        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
                                            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/20 rounded-full">
                                                Level {idx + 1}
                                            </span>

                                            <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase mb-3 text-white">
                                                {level.title}
                                            </h3>

                                            <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
                                                {level.description}
                                            </p>

                                            <div className="flex items-center text-white/90 text-sm font-bold uppercase tracking-wide group-hover:text-white transition-colors duration-300">
                                                View Programmes
                                                <svg
                                                    className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Featured Programmes - Auriga Style Expanding Panels */}
                <FeaturedProgrammesAuriga />
            </div>
        </section>
    );
}
