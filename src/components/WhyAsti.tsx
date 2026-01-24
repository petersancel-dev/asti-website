'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// ============================================================
// ANIMATED COUNTER COMPONENT
// Counts up to target value when in view with spring physics
// ============================================================
function AnimatedCounter({
    value,
    suffix = '',
    duration = 2
}: {
    value: number;
    suffix?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            let startTime: number;
            let animationFrame: number;

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

                // Easing function for smooth deceleration
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(easeOutQuart * value);

                setDisplayValue(currentValue);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setDisplayValue(value);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {displayValue}{suffix}
        </span>
    );
}

// Stats with parsed numeric values
const STATS = [
    { value: 100, suffix: '%', label: 'Job Placement Rate', description: 'For qualified graduates' },
    { value: 200, suffix: '+', label: 'Courses Available', description: 'Across all disciplines' },
    { value: 4, suffix: '', label: 'Accreditations', description: 'International recognition' },
    { value: 18, suffix: '+', label: 'Years Excellence', description: 'In technical education' },
];

export default function WhyAsti() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

    return (
        <section ref={containerRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
            {/* Parallax Background Image */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY }}
            >
                <Image
                    src="/images/graduation.png"
                    alt="ASTI Graduation Ceremony"
                    fill
                    className="object-cover scale-110"
                />
                <div className="absolute inset-0 bg-maroon/90" />
            </motion.div>

            <div className="section-container relative z-10 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Why Choose ASTI
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Graduate with{' '}
                        <span className="text-gold">Confidence</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-white/70 font-light"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Join thousands of successful alumni who have transformed their careers
                        with ASTI&apos;s industry-recognized qualifications.
                    </motion.p>
                </div>

                {/* Stats Grid with Counting Animation */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-sm border border-white/10"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.6,
                                type: 'spring',
                                stiffness: 100
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: 'rgba(255,255,255,0.15)'
                            }}
                        >
                            <div className="text-4xl md:text-5xl font-oswald font-bold text-gold mb-2">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    duration={1.5 + index * 0.2}
                                />
                            </div>
                            <div className="text-white font-semibold mb-1">
                                {stat.label}
                            </div>
                            <div className="text-white/50 text-sm">
                                {stat.description}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        href="/admissions"
                        className="px-10 py-4 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
                    >
                        Start Your Journey
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
