'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ACCREDITATIONS } from '@/constants/accreditations';
import { ABOUT_CONTENT } from '@/constants/about';
import FAQ from '@/components/FAQ';

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <div>
            {/* CLONEA-style Parallax Hero */}
            <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: bgY }}
                >
                    <Image
                        src="/images/about-hero.png"
                        alt="ASTI Students and Faculty"
                        fill
                        className="object-cover scale-110"
                        priority
                        data-image-placeholder="about-hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-maroon via-navy-dark to-navy opacity-90" />
                </motion.div>

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        className="max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                            About ASTI
                        </span>
                        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white text-hero uppercase leading-none mb-6">
                            Teaching Tomorrow's<br />
                            <span className="text-gold">Technology Today</span>
                        </h1>
                        <p className="text-xl text-white/90 font-light max-w-2xl mx-auto text-hero-sub">
                            Fostering Science and Technology since our establishment as one of the
                            longest-running tertiary institutions in Trinidad.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section - Using ABOUT_CONTENT from TVET Ground Truth */}
            <section id="story" className="py-24 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy uppercase tracking-wide leading-none mb-6">
                                Our <span className="text-maroon">Story</span>
                            </h2>
                            <div className="w-24 h-1 bg-gold mb-8" />
                            <p className="text-gray-800 text-lg mb-4 font-light leading-relaxed">
                                {ABOUT_CONTENT.story.introduction}
                            </p>
                            <p className="text-gray-700 mb-4 font-light leading-relaxed">
                                {ABOUT_CONTENT.story.historyParagraphs[1]}
                            </p>
                            <p className="text-gray-700 mb-8 font-light leading-relaxed">
                                {ABOUT_CONTENT.story.historyParagraphs[2]}
                            </p>
                            <Link
                                href="/programmes"
                                className="px-8 py-4 bg-maroon text-white font-bold uppercase tracking-widest rounded-sm hover:bg-navy transition-colors inline-block"
                            >
                                Explore Programmes
                            </Link>
                        </motion.div>

                        <motion.div
                            className="bg-navy rounded-sm p-10"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-oswald font-bold text-gold uppercase tracking-wide mb-6">
                                Our Core Values
                            </h3>
                            <ul className="space-y-4">
                                {ABOUT_CONTENT.coreValues.map((value, index) => (
                                    <motion.li
                                        key={value.id}
                                        className="flex gap-4 text-white"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="text-gold text-xl">✓</span>
                                        <div>
                                            <span className="text-lg font-semibold">{value.name}</span>
                                            <p className="text-white/70 text-sm">{value.description}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Accreditations - CLONEA rankings style */}
            <section className="py-24 bg-gray-50" id="accreditations">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Our <span className="text-maroon">Accreditations</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                        <p className="text-gray-600 mt-6">Recognized locally and internationally</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {ACCREDITATIONS.map((acc, index) => (
                            <motion.div
                                key={acc.id}
                                className="bg-white p-8 shadow-lg border-t-4 border-navy"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            >
                                <div className="flex items-start gap-6">
                                    <div
                                        className="w-16 h-16 rounded-sm flex items-center justify-center font-oswald font-bold text-sm flex-shrink-0 bg-gold text-navy"
                                    >
                                        {acc.name}
                                    </div>
                                    <div>
                                        <h4 className="font-oswald font-bold text-navy uppercase text-xl mb-2">{acc.fullName}</h4>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{acc.region}</p>
                                        <p className="text-gray-600">{acc.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-24">
                <FAQ />
            </section>

            {/* Map Section */}
            <section id="map" className="py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Find <span className="text-maroon">Us</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                        <p className="text-gray-600 mt-6">46 Boundary Road, San Juan, Trinidad and Tobago</p>
                    </div>
                    <div className="aspect-video rounded-sm overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.5!2d-61.45!3d10.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s46%20Boundary%20Road%2C%20San%20Juan!5e0!3m2!1sen!2stt!4v1600000000000!5m2!1sen!2stt"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="ASTI Location Map"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
