'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CAMPUS_LIFE_CONTENT, CAMPUS_SHOP, CAMPUS_EVENTS, STUDENT_RESOURCES } from '@/constants/campus-life';

export default function CampusLifePage() {
    return (
        <div>
            {/* CLONEA-style Hero */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-brand-gradient">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/life-at-asti.png"
                        alt="Campus Life"
                        fill
                        className="object-cover"
                        data-image-placeholder="campus-life-hero"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy/50" />

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                            Student Experience
                        </span>
                        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase leading-none mb-6">
                            {CAMPUS_LIFE_CONTENT.pageTitle}
                        </h1>
                        <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
                            {CAMPUS_LIFE_CONTENT.pageSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Campus Overview */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide leading-none mb-6">
                                {CAMPUS_LIFE_CONTENT.overview.title}
                            </h2>
                            <div className="w-24 h-1 bg-gold mb-8" />
                            <p className="text-gray-600 text-lg mb-8 font-light leading-relaxed">
                                {CAMPUS_LIFE_CONTENT.overview.introduction}
                            </p>
                            <ul className="space-y-4">
                                {CAMPUS_LIFE_CONTENT.overview.highlights.map((highlight, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="text-gold text-2xl">✓</span>
                                        <span className="text-gray-700 text-lg">{highlight}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="relative aspect-video rounded-sm overflow-hidden bg-gray-100"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            data-image-placeholder="campus-overview"
                        >
                            <Image
                                src="/images/campus-exterior.png"
                                alt="ASTI Campus"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Campus Shop */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-6 py-2 bg-gold text-navy font-bold rounded-sm text-sm uppercase tracking-widest mb-4">
                            Coming {CAMPUS_SHOP.launchDate}
                        </span>
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            {CAMPUS_SHOP.title}
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {CAMPUS_SHOP.categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                className="text-center p-8 bg-white rounded-sm opacity-60"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 0.6, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {category.icon.startsWith('/') ? (
                                    <div className="w-16 h-16 mb-6 mx-auto relative">
                                        <Image src={category.icon} alt={category.name} fill className="object-contain" />
                                    </div>
                                ) : (
                                    <span className="text-5xl mb-6 block">{category.icon}</span>
                                )}
                                <h3 className="font-oswald font-bold text-navy uppercase tracking-wide mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 text-sm">{category.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-4 border-2 border-gray-300 text-gray-400 font-bold uppercase tracking-widest rounded-sm cursor-not-allowed">
                            Notify Me When Available
                        </button>
                    </div>
                </div>
            </section>

            {/* Campus Events */}
            <section id="events" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Campus <span className="text-maroon">Events</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CAMPUS_EVENTS.map((event, index) => (
                            <motion.div
                                key={event.id}
                                className={`bg-gray-50 rounded-sm p-8 ${event.featured ? 'border-2 border-gold' : 'border-t-4 border-maroon'}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                {event.featured && (
                                    <span className="inline-block px-4 py-1 bg-gold text-navy text-xs font-bold uppercase tracking-widest rounded-sm mb-4">
                                        Featured
                                    </span>
                                )}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="text-center min-w-[70px] bg-navy text-white rounded-sm py-3 px-2">
                                        <span className="block text-xs uppercase tracking-widest opacity-70">
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                        <span className="block text-3xl font-oswald font-bold">
                                            {new Date(event.date).getDate()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-oswald font-bold text-navy uppercase tracking-wide mb-1">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{event.time}</p>
                                        <p className="text-sm text-gray-500">{event.location}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-6">{event.description}</p>
                                <motion.a
                                    href={event.registrationUrl}
                                    className="block w-full text-center py-3 border-2 border-navy text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-navy hover:text-white transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    Register
                                </motion.a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Student Resources */}
            <section id="resources" className="py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            {STUDENT_RESOURCES.title}
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {STUDENT_RESOURCES.categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                className="bg-white rounded-sm p-8 border-t-4 border-maroon"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            >
                                <span className="text-5xl mb-6 block">{category.icon}</span>
                                <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide mb-3">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-6">{category.description}</p>
                                <ul className="space-y-2 mb-8">
                                    {category.services.map((service, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="text-gold">•</span>
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-3 border-2 border-navy text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-navy hover:text-white transition-colors">
                                    {category.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-maroon text-white text-center">
                <motion.div
                    className="max-w-3xl mx-auto px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase mb-6">
                        Join the <span className="text-gold">ASTI Community</span>
                    </h2>
                    <p className="text-white/70 mb-10 font-light text-lg">
                        Experience a vibrant campus life while pursuing your academic goals.
                    </p>
                    <Link
                        href="/admissions"
                        className="px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors inline-block"
                    >
                        Apply Now
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
