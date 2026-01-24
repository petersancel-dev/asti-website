'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { getProgrammeDetail, ProgrammeDetail, ProgrammeModule } from '@/constants/programme-details';
import { PROGRAMMES } from '@/constants/programmes';

// =============================================================================
// INDIVIDUAL PROGRAMME PAGE
// Premium magazine-style reading experience
// =============================================================================

// Animated section wrapper for scroll-triggered reveals
function AnimatedSection({
    children,
    className = '',
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
}

// Module accordion card with expand animation
function ModuleCard({ module, index }: { module: ProgrammeModule; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className="border-b border-gray-200 last:border-b-0"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-start gap-6 text-left group"
            >
                {/* Module number */}
                <span className="flex-shrink-0 w-14 h-14 rounded-sm bg-navy text-white font-oswald font-bold text-xl flex items-center justify-center group-hover:bg-maroon transition-colors">
                    {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex-grow">
                    <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide group-hover:text-maroon transition-colors">
                        {module.title}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm">{module.description}</p>
                    <span className="inline-block mt-2 text-xs text-gray-400 uppercase tracking-widest">
                        {module.hours} Hours
                    </span>
                </div>

                <motion.span
                    className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-gold transition-colors"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                >
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.span>
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="pb-6 pl-20">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {module.topics.map((topic, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-2 text-sm text-gray-700"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                {topic}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Sticky sidebar navigation
function StickyNav({ sections, activeSection }: { sections: { id: string; label: string }[]; activeSection: string }) {
    return (
        <nav className="hidden xl:block sticky top-32 w-48">
            <div className="border-l-2 border-gray-200 pl-4 space-y-4">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`block text-sm uppercase tracking-widest transition-all duration-300 ${activeSection === section.id
                            ? 'text-maroon font-bold translate-x-2'
                            : 'text-gray-400 hover:text-navy'
                            }`}
                    >
                        {section.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}

// Level badge colors - All 10 ASTI levels + EIU-Paris + EduQual
const LEVEL_STYLES: Record<string, { bg: string; text: string; gradient: string }> = {
    // ASTI Programmes (10 levels)
    'introductory': { bg: 'bg-rose-500', text: 'text-rose-500', gradient: 'from-rose-600 to-rose-400' },
    'certificate': { bg: 'bg-emerald-500', text: 'text-emerald-500', gradient: 'from-emerald-600 to-emerald-400' },
    'advanced-certificate': { bg: 'bg-teal-500', text: 'text-teal-500', gradient: 'from-teal-600 to-teal-400' },
    'diploma': { bg: 'bg-blue-500', text: 'text-blue-500', gradient: 'from-blue-600 to-blue-400' },
    'advanced-diploma': { bg: 'bg-indigo-500', text: 'text-indigo-500', gradient: 'from-indigo-600 to-indigo-400' },
    'associates-degree': { bg: 'bg-purple-500', text: 'text-purple-500', gradient: 'from-purple-600 to-purple-400' },
    'bachelors-degree': { bg: 'bg-violet-500', text: 'text-violet-500', gradient: 'from-violet-600 to-violet-400' },
    'post-graduate-award': { bg: 'bg-fuchsia-500', text: 'text-fuchsia-500', gradient: 'from-fuchsia-600 to-fuchsia-400' },
    'post-graduate-diploma': { bg: 'bg-pink-500', text: 'text-pink-500', gradient: 'from-pink-600 to-pink-400' },
    'masters': { bg: 'bg-amber-500', text: 'text-amber-500', gradient: 'from-amber-600 to-amber-400' },
    // EIU-Paris (Pedagog) Programmes
    'eiu-certificate': { bg: 'bg-cyan-500', text: 'text-cyan-500', gradient: 'from-cyan-600 to-cyan-400' },
    'eiu-diploma': { bg: 'bg-sky-500', text: 'text-sky-500', gradient: 'from-sky-600 to-sky-400' },
    'eiu-bachelors': { bg: 'bg-blue-600', text: 'text-blue-600', gradient: 'from-blue-700 to-blue-500' },
    'eiu-masters': { bg: 'bg-indigo-600', text: 'text-indigo-600', gradient: 'from-indigo-700 to-indigo-500' },
    'eiu-doctorate': { bg: 'bg-violet-600', text: 'text-violet-600', gradient: 'from-violet-700 to-violet-500' },
    // EduQual Programmes
    'eduqual-award': { bg: 'bg-lime-500', text: 'text-lime-500', gradient: 'from-lime-600 to-lime-400' },
    'eduqual-certificate': { bg: 'bg-green-500', text: 'text-green-500', gradient: 'from-green-600 to-green-400' },
    'eduqual-diploma': { bg: 'bg-emerald-600', text: 'text-emerald-600', gradient: 'from-emerald-700 to-emerald-500' },
};

export default function ProgrammePage() {
    const params = useParams();
    const programmeId = params.id as string;
    const [programme, setProgramme] = useState<ProgrammeDetail | null>(null);
    const [activeSection, setActiveSection] = useState('overview');

    // Scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Parallax for hero - using document scroll (avoids hydration issues with ref-based tracking)
    const heroY = useTransform(scrollYProgress, [0, 0.2], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const sections = [
        { id: 'overview', label: 'Overview' },
        { id: 'curriculum', label: 'Curriculum' },
        { id: 'requirements', label: 'Requirements' },
        { id: 'careers', label: 'Careers' },
        { id: 'accreditation', label: 'Accreditation' },
    ];

    useEffect(() => {
        const detail = getProgrammeDetail(programmeId);
        if (detail) {
            setProgramme(detail);
        }
    }, [programmeId]);

    // Track active section based on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px' }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [programme]);

    if (!programme) {
        // Fallback for programmes not in detail database
        const basicProgramme = PROGRAMMES.find(p => p.id === programmeId);
        if (!basicProgramme) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-oswald font-bold text-navy uppercase mb-4">Programme Not Found</h1>
                        <Link href="/programmes" className="text-maroon hover:text-gold transition-colors">
                            ← Back to Programmes
                        </Link>
                    </div>
                </div>
            );
        }

        // Show basic page for programmes without full details
        return (
            <div className="min-h-screen py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <Link href="/programmes" className="text-sm text-gray-500 uppercase tracking-widest hover:text-maroon transition-colors mb-8 inline-block">
                        ← Back to Programmes
                    </Link>
                    <h1 className="text-5xl font-oswald font-bold text-navy uppercase mb-6">{basicProgramme.title}</h1>
                    <p className="text-xl text-gray-600 mb-8">{basicProgramme.description}</p>
                    <Link href="/apply" className="btn-primary">Apply Now</Link>
                </div>
            </div>
        );
    }

    const levelStyle = LEVEL_STYLES[programme.level] || LEVEL_STYLES.certificate;

    return (
        <div className="min-h-screen">
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
                style={{ scaleX }}
            />

            {/* ============================================================
                HERO SECTION - Full bleed with parallax
            ============================================================ */}
            <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-navy">
                {/* Background with parallax */}
                <motion.div
                    className="absolute inset-0"
                    style={{ y: heroY }}
                >
                    {programme.heroImage ? (
                        <Image
                            src={programme.heroImage}
                            alt={programme.title}
                            fill
                            className="object-cover opacity-40"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-maroon" />
                    )}
                    {/* Lighter gradient for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/40" />
                </motion.div>

                {/* Floating orbs */}
                <motion.div
                    className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/10 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-maroon/20 blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />

                {/* Content */}
                <motion.div
                    className="relative z-10 h-full flex items-end pb-20"
                    style={{ opacity: heroOpacity }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        {/* Breadcrumb */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link href="/programmes" className="text-white/80 hover:text-white text-sm uppercase tracking-widest transition-colors">
                                Programmes
                            </Link>
                            <span className="text-white/50 mx-2">/</span>
                            <span className="text-gold text-sm uppercase tracking-widest">{programme.categoryLabel}</span>
                        </motion.div>

                        {/* Level badge */}
                        <motion.span
                            className={`inline-block px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.3em] text-white bg-gradient-to-r ${levelStyle.gradient} shadow-lg mb-6`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {programme.levelLabel}
                        </motion.span>

                        {/* Title - with text shadow for contrast */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold text-white uppercase leading-none mb-6 max-w-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {programme.title}
                        </motion.h1>

                        {/* Subtitle */}
                        {programme.subtitle && (
                            <motion.p
                                className="text-xl md:text-2xl text-white/90 font-light italic max-w-2xl drop-shadow-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {programme.subtitle}
                            </motion.p>
                        )}

                        {/* Quick stats */}
                        <motion.div
                            className="flex flex-wrap gap-6 mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="flex items-center gap-3 text-white/80">
                                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm uppercase tracking-widest">{programme.duration}</span>
                            </div>
                            {programme.totalHours && (
                                <div className="flex items-center gap-3 text-white/80">
                                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-sm uppercase tracking-widest">{programme.totalHours} Total Hours</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 text-white/80">
                                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm uppercase tracking-widest">
                                    {programme.delivery.map(d => d === 'face-to-face' ? 'In-Person' : d.charAt(0).toUpperCase() + d.slice(1)).join(' · ')}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            className="w-1.5 h-3 bg-gold rounded-full"
                            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ============================================================
                MAIN CONTENT with Sticky Sidebar
            ============================================================ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex gap-16">
                    {/* Sticky Navigation */}
                    <StickyNav sections={sections} activeSection={activeSection} />

                    {/* Main Content */}
                    <div className="flex-grow max-w-4xl">

                        {/* OVERVIEW SECTION */}
                        <section id="overview" className="scroll-mt-24 mb-24">
                            <AnimatedSection>
                                <span className="text-xs text-gold uppercase tracking-[0.3em] font-bold mb-4 block">01 — Overview</span>
                                <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-8">
                                    Programme Overview
                                </h2>
                            </AnimatedSection>

                            <AnimatedSection delay={0.1}>
                                <p className="text-xl text-gray-700 leading-relaxed font-light mb-8">
                                    {programme.tagline}
                                </p>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2}>
                                <div className="prose prose-lg max-w-none text-gray-600">
                                    {programme.description.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </AnimatedSection>

                            {/* Highlights */}
                            <AnimatedSection delay={0.3} className="mt-12">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {programme.highlights.map((highlight, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-sm"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            <span className="text-gray-700">{highlight}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatedSection>

                            {/* Next Start Dates */}
                            <AnimatedSection delay={0.4} className="mt-12 p-8 bg-navy rounded-sm text-white">
                                <h3 className="text-lg font-oswald font-bold uppercase tracking-wide mb-4">
                                    Upcoming Start Dates
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {programme.startDates.map((date, i) => (
                                        <span key={i} className="px-4 py-2 bg-white/10 rounded-sm text-sm font-medium">
                                            📅 {date}
                                        </span>
                                    ))}
                                </div>
                                {programme.schedule && (
                                    <p className="mt-4 text-white/60 text-sm">
                                        <strong className="text-gold">Schedule:</strong> {programme.schedule}
                                    </p>
                                )}
                            </AnimatedSection>
                        </section>

                        {/* CURRICULUM SECTION */}
                        <section id="curriculum" className="scroll-mt-24 mb-24">
                            <AnimatedSection>
                                <span className="text-xs text-gold uppercase tracking-[0.3em] font-bold mb-4 block">02 — Curriculum</span>
                                <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-4">
                                    What You'll Learn
                                </h2>
                                <p className="text-gray-600 mb-12">
                                    Our comprehensive curriculum is designed by industry experts to ensure you gain practical, job-ready skills.
                                </p>
                            </AnimatedSection>

                            <div className="border-t border-gray-200">
                                {programme.modules.map((module, index) => (
                                    <ModuleCard key={module.id} module={module} index={index} />
                                ))}
                            </div>

                            {/* Total hours summary */}
                            <AnimatedSection className="mt-8 flex items-center justify-between p-6 bg-gray-50 rounded-sm">
                                <span className="font-oswald font-bold text-navy uppercase tracking-wide">
                                    Total Programme Hours
                                </span>
                                <span className="text-3xl font-oswald font-bold text-maroon">
                                    {programme.modules.reduce((acc, m) => acc + m.hours, 0)} Hours
                                </span>
                            </AnimatedSection>
                        </section>

                        {/* REQUIREMENTS SECTION */}
                        <section id="requirements" className="scroll-mt-24 mb-24">
                            <AnimatedSection>
                                <span className="text-xs text-gold uppercase tracking-[0.3em] font-bold mb-4 block">03 — Requirements</span>
                                <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-8">
                                    Entry Requirements
                                </h2>
                            </AnimatedSection>

                            <div className="grid md:grid-cols-2 gap-8">
                                <AnimatedSection delay={0.1}>
                                    <div className="p-6 border-l-4 border-navy bg-gray-50">
                                        <h3 className="font-oswald font-bold text-navy uppercase tracking-wide mb-4">
                                            Academic Requirements
                                        </h3>
                                        <ul className="space-y-3">
                                            {programme.entryRequirements.map((req, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-2" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                        {programme.matureEntry && (
                                            <p className="mt-6 p-4 bg-gold/10 rounded-sm text-sm text-gray-700">
                                                <strong className="text-maroon">Mature Entry:</strong> {programme.matureEntry}
                                            </p>
                                        )}
                                    </div>
                                </AnimatedSection>

                                <AnimatedSection delay={0.2}>
                                    <div className="p-6 border-l-4 border-maroon bg-gray-50">
                                        <h3 className="font-oswald font-bold text-navy uppercase tracking-wide mb-4">
                                            Documents Required
                                        </h3>
                                        <ul className="space-y-3">
                                            {programme.documentsRequired.map((doc, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                                    <span className="w-2 h-2 rounded-full bg-maroon flex-shrink-0 mt-2" />
                                                    {doc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>

                        {/* CAREERS SECTION */}
                        <section id="careers" className="scroll-mt-24 mb-24">
                            <AnimatedSection>
                                <span className="text-xs text-gold uppercase tracking-[0.3em] font-bold mb-4 block">04 — Careers</span>
                                <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-8">
                                    Career Outcomes
                                </h2>
                            </AnimatedSection>

                            <div className="grid gap-6">
                                {programme.careerOutcomes.map((career, i) => (
                                    <AnimatedSection key={i} delay={i * 0.1}>
                                        <motion.div
                                            className="p-6 bg-white border border-gray-200 rounded-sm group hover:border-gold hover:shadow-lg transition-all duration-300"
                                            whileHover={{ x: 10 }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide group-hover:text-maroon transition-colors">
                                                        {career.title}
                                                    </h3>
                                                    <p className="text-gray-600 mt-2">{career.description}</p>
                                                </div>
                                                {career.averageSalary && (
                                                    <span className="flex-shrink-0 px-4 py-2 bg-gold/10 text-maroon font-bold text-sm rounded-sm">
                                                        {career.averageSalary}
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    </AnimatedSection>
                                ))}
                            </div>

                            {/* Certificates */}
                            {programme.certifications && (
                                <AnimatedSection className="mt-12">
                                    <h3 className="font-oswald font-bold text-navy uppercase tracking-wide mb-6">
                                        Certificates You'll Earn
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {programme.certifications.map((cert, i) => (
                                            <span key={i} className="px-4 py-2 bg-navy text-white text-sm font-medium rounded-sm">
                                                🏅 {cert}
                                            </span>
                                        ))}
                                    </div>
                                </AnimatedSection>
                            )}
                        </section>

                        {/* ACCREDITATION SECTION (Pricing removed - contact us for details) */}
                        <section id="accreditation" className="scroll-mt-24 mb-24">
                            <AnimatedSection>
                                <span className="text-xs text-gold uppercase tracking-[0.3em] font-bold mb-4 block">05 — Accreditation</span>
                                <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-8">
                                    Quality & Recognition
                                </h2>
                            </AnimatedSection>

                            {/* Accreditation badges - prominent display */}
                            <AnimatedSection className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-sm border border-gray-200 mb-8">
                                <div className="text-center mb-8">
                                    <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">This Programme is Accredited by</span>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {programme.accreditedBy.map((acc, i) => (
                                        <div key={i} className="px-8 py-4 bg-white text-navy text-lg font-bold rounded-sm border-2 border-navy/20 shadow-sm hover:border-gold hover:shadow-md transition-all duration-300">
                                            <span className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                {acc}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedSection>

                            {/* Contact for pricing info */}
                            <AnimatedSection className="p-8 bg-navy rounded-sm text-white text-center">
                                <h3 className="text-xl font-oswald font-bold uppercase tracking-wide mb-4">
                                    Interested in This Programme?
                                </h3>
                                <p className="text-white/70 mb-6 max-w-lg mx-auto">
                                    Contact our admissions team to learn about tuition, payment plans, and available start dates.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/apply"
                                        className="inline-block px-10 py-4 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
                                    >
                                        Apply Now
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-block px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-navy transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </AnimatedSection>
                        </section>

                        {/* CTA SECTION */}
                        <AnimatedSection>
                            <div className="p-12 bg-maroon rounded-sm text-center">
                                <h2 className="text-3xl md:text-4xl font-oswald font-bold text-white uppercase mb-4">
                                    Ready to Start Your Journey?
                                </h2>
                                <p className="text-white/70 mb-8 max-w-xl mx-auto">
                                    Take the first step towards a rewarding career. Our admissions team is here to help you every step of the way.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/apply"
                                        className="px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
                                    >
                                        Apply Now
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-maroon transition-colors"
                                    >
                                        Contact Admissions
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    );
}
