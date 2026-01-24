'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LifeAtAsti() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section ref={containerRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
            {/* Parallax Background Image */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY }}
            >
                <Image
                    src="/images/life-at-asti.png"
                    alt="Student life at ASTI"
                    fill
                    className="object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
            </motion.div>

            <div className="section-container relative z-10 py-20">
                <motion.div
                    className="max-w-2xl"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                        Student Life
                    </span>
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase leading-none mb-6">
                        Learn, Grow,{' '}
                        <span className="text-gold">Succeed</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                        At ASTI, you&apos;ll find more than just classrooms. Join a vibrant community
                        of learners, access modern facilities, and build connections that last
                        a lifetime.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/about"
                            className="px-8 py-4 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
                        >
                            Discover ASTI
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-navy transition-colors"
                        >
                            Schedule a Visit
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
