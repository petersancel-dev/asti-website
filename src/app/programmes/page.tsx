'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgrammeGalaxy from '@/components/ProgrammeGalaxy';
import ConstellationBackground from '@/components/ConstellationBackground';

// =============================================================================
// PROGRAMMES PAGE
// Streamlined with Programme Galaxy as the sole programme browser
// =============================================================================

export default function ProgrammesPage() {
    return (
        <div className="min-h-screen">
            {/* ============================================================
                HERO SECTION with Branching Tree Gallery
            ============================================================ */}
            <section className="relative min-h-screen bg-gradient-to-br from-navy via-navy to-maroon overflow-hidden">
                {/* Constellation particle background */}
                <div className="absolute inset-0">
                    <ConstellationBackground
                        particleCount={100}
                        connectionDistance={180}
                        particleColor="rgba(196, 165, 46, 0.8)"
                        lineColor="rgba(196, 165, 46, 0.25)"
                        speed={0.5}
                    />
                </div>

                {/* Floating orbs for depth */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold/10 blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-maroon/20 blur-3xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 20, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="section-container relative z-10 pt-20 pb-32">
                    {/* Hero Header */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                            200+ Internationally Recognized Courses
                        </span>
                        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white text-hero uppercase leading-none mb-6">
                            Discover Your <br />
                            <span className="text-gold">Perfect</span> Programme
                        </h1>
                        <p className="text-xl text-white/90 font-light max-w-2xl mx-auto text-hero-sub">
                            Navigate through our qualification tree to find your path.
                            From introductory courses to master's degrees.
                        </p>
                    </motion.div>

                    {/* Programme Tree Gallery */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <ProgrammeGalaxy />
                    </motion.div>
                </div>

                {/* Scroll indicator - pointing to CTA */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center text-white/50">
                        <span className="text-xs uppercase tracking-widest mb-2">Need Help Finding a Programme?</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            </section>

            {/* ============================================================
                CTA SECTION
            ============================================================ */}
            <section className="py-24 bg-maroon text-white text-center">
                <motion.div
                    className="max-w-3xl mx-auto px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-oswald font-bold uppercase mb-6">
                        Can't find what you're looking for?
                    </h2>
                    <p className="text-white/70 mb-10 font-light text-lg">
                        With over 200 programmes, we likely have exactly what you need. Our admissions team can help you find the perfect fit.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors inline-block"
                        >
                            Talk to Admissions
                        </Link>
                        <Link
                            href="/admissions"
                            className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-maroon transition-colors inline-block"
                        >
                            View Requirements
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
