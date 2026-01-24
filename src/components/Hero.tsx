'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ParallaxImage, StaggerContainer, StaggerItem, MagneticButton } from '@/components/ui';
import { useScrollTransform } from '@/hooks/useScrollTransform';

// Hero images for carousel
const HERO_IMAGES = [
    '/images/hero-students.png',
    '/images/campus-exterior.png',
    '/images/graduation.png',
];

// Reusable physics constants
const SPRING_TRANSITION = { type: "spring" as const, stiffness: 100, damping: 15 };


// Text Reveal Variants
const textVariants: Variants = {
    hidden: { opacity: 0, y: 30, letterSpacing: "0.1em" },
    visible: {
        opacity: 1,
        y: 0,
        letterSpacing: "0.25em",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const wordVariants: Variants = {
    hidden: { opacity: 0, x: -20, skewX: 10 },
    visible: {
        opacity: 1,
        x: 0,
        skewX: 0,
        transition: SPRING_TRANSITION
    }
};

export default function Hero() {
    const [currentImg, setCurrentImg] = useState(0);

    // Optimized hook for diagonal reveal clip-path
    // Starts revealing at 0 scroll, fully revealed by 40% of viewport
    const { ref: containerRef, value: clipPathValue } = useScrollTransform({
        inputRange: [0, 0.15, 0.4],
        outputRange: [
            "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // Hidden
            "polygon(0% 25%, 100% 0%, 100% 100%, 0% 100%)",    // Rising diagonal
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"       // Full screen
        ],
        offset: ["start start", "end start"]
    });

    const { value: revealOpacity } = useScrollTransform({
        target: containerRef,
        inputRange: [0.05, 0.2],
        outputRange: [0, 1]
    });

    // Content parallax effect inside the reveal
    const { value: contentY } = useScrollTransform({
        target: containerRef,
        inputRange: [0.15, 0.35],
        outputRange: [60, 0]
    });

    // Image carousel timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    // -------------------------------------------------------------------------
    // ORCHESTRATION VARIANTS (Nested Stagger System)
    // -------------------------------------------------------------------------

    // 1. Master Container (Left Column)
    // Controls the sequence: LogoGroup -> Headline -> Tagline
    const leftColumnOrchestrator: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Delay between major blocks
                delayChildren: 0.2
            }
        }
    };

    // 2. Logo Group (Internal Stagger)
    // Logo Icon -> Text Lines
    const logoGroupVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren" // Ensure container moves then contents play
            }
        }
    };

    const logoIconVariants: Variants = {
        hidden: { scale: 0, rotate: -180, opacity: 0 },
        visible: {
            scale: 1,
            rotate: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 200, damping: 20 }
        }
    };

    // 3. Headline Group (Cascading Words)
    const headlineGroupVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 } // Fast ripple effect
        }
    };

    // 4. Button Group (Right Column)
    const buttonGroupVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.6 // Wait for left side to start
            }
        }
    };

    const buttonItemVariants: Variants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div ref={containerRef} className="relative min-h-[180vh]">

            {/* SECTION 1: HERO TOP */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy-dark">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0"
                    >
                        <ParallaxImage
                            src={HERO_IMAGES[currentImg]}
                            alt="Hero Background"
                            parallaxFactor={0.5}
                            overlayOpacity={0.5}
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* ASTI Logo Watermark - REMOVED for clean header look */}

                {/* Central Overlay Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4 z-10">
                    <StaggerContainer delay={0.5} className="flex flex-col items-center">
                        <StaggerItem>
                            <h1 className="text-white font-oswald text-[14vw] md:text-[10vw] font-bold uppercase tracking-tight leading-none drop-shadow-2xl">
                                ADVANCED.
                            </h1>
                        </StaggerItem>
                        <StaggerItem offset={20}>
                            <div className="mt-4 text-white font-bold uppercase tracking-[0.5em] text-sm md:text-base border-t border-white/20 pt-4">
                                The ASTI Experience
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 text-[10px] uppercase font-bold tracking-widest z-10"
                >
                    <span>Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent mt-2" />
                </motion.div>
            </div>

            {/* SECTION 2: DIAGONAL REVEAL - MISSION STATEMENT */}
            <motion.section
                style={{ clipPath: clipPathValue, opacity: revealOpacity }}
                className="relative z-10 -mt-[15vh] bg-maroon py-32 md:py-48 will-change-[clip-path]"
            >
                <div className="max-w-7xl mx-auto px-8">
                    <motion.div
                        style={{ y: contentY }}
                        className="grid lg:grid-cols-2 gap-20 items-center"
                    >
                        {/* ========== LEFT COLUMN ORCHESTRATION ========== */}
                        <motion.div
                            variants={leftColumnOrchestrator}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="space-y-10"
                        >

                            {/* BLOCK 1: LOGO + NAME */}
                            <motion.div variants={logoGroupVariants} className="flex items-center gap-6">
                                <motion.div variants={logoIconVariants} className="relative w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl">
                                    <Image src="/images/asti-logo.png" alt="ASTI Crest" fill className="object-contain" />
                                </motion.div>
                                <div className="flex flex-col">
                                    <motion.span variants={textVariants} className="text-gold font-oswald text-lg md:text-2xl font-bold uppercase tracking-[0.15em] leading-tight">
                                        Advanced Solutions
                                    </motion.span>
                                    <motion.span variants={textVariants} className="text-white font-oswald text-lg md:text-2xl font-bold uppercase tracking-[0.15em] leading-tight">
                                        Technical Institute
                                    </motion.span>
                                    <motion.div
                                        variants={textVariants}
                                        className="mt-2"
                                    >
                                        <span className="text-white/50 text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
                                            Fostering Science &amp; Technology
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* BLOCK 2: HEADLINE CASCADING WORDS */}
                            <motion.h2
                                variants={headlineGroupVariants}
                                className="text-5xl md:text-7xl font-oswald font-bold text-white leading-[0.95]"
                            >
                                <motion.span variants={wordVariants} className="block opacity-80">AT ASTI,</motion.span>
                                <motion.span variants={wordVariants} className="block">EVERYONE IS</motion.span>
                                <motion.span
                                    variants={wordVariants}
                                    className="block text-gold filter drop-shadow-lg"
                                >
                                    FOCUSED
                                </motion.span>
                                <motion.span variants={wordVariants} className="block">ON YOUR SUCCESS.</motion.span>
                            </motion.h2>

                            {/* BLOCK 3: TAGLINE */}
                            <motion.p
                                variants={textVariants}
                                className="text-xl md:text-2xl font-light leading-relaxed max-w-lg text-white/70"
                            >
                                We help you <span className="font-bold text-white italic">develop</span> your natural talents, supporting your achievements.
                            </motion.p>
                        </motion.div>

                        {/* ========== RIGHT COLUMN ORCHESTRATION ========== */}
                        <motion.div
                            variants={buttonGroupVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="flex flex-col space-y-6 lg:items-end w-full"
                        >
                            {[
                                { text: 'Schedule a Visit', href: '/contact', style: 'border-2 border-white text-white hover:bg-white hover:text-maroon' },
                                { text: 'Request Information', href: '/about', style: 'border-2 border-white text-white hover:bg-white hover:text-maroon' },
                                { text: 'Apply Now', href: '/admissions', style: 'bg-gold border-2 border-gold text-navy hover:bg-white hover:text-gold hover:border-white' }
                            ].map((btn, i) => (
                                <motion.div key={i} variants={buttonItemVariants} className="w-full md:w-96">
                                    <MagneticButton className="w-full" strength={40}>
                                        <Link
                                            href={btn.href}
                                            className={`block px-10 py-6 rounded-full font-bold uppercase tracking-widest text-center transition-all duration-300 ${btn.style}`}
                                        >
                                            {btn.text}
                                        </Link>
                                    </MagneticButton>
                                </motion.div>
                            ))}
                        </motion.div>

                    </motion.div>
                </div>
            </motion.section>

            <div className="h-[40vh]" />
        </div>
    );
}
