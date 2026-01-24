'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { RESEARCH_CONTENT, DIGITAL_LIBRARY, LMS_INFO, STUDENT_RESEARCH_RESOURCES, RESEARCH_GUIDES } from '@/constants/research';

export default function ResearchPage() {
    return (
        <div>
            {/* CLONEA-style Hero */}
            <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-gradient">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z' fill='%23fff'/%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                            Resources
                        </span>
                        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white text-hero uppercase leading-none mb-6">
                            {RESEARCH_CONTENT.pageTitle}
                        </h1>
                        <p className="text-xl text-white/90 font-light max-w-2xl mx-auto text-hero-sub">
                            {RESEARCH_CONTENT.pageSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Digital Library */}
            <section id="library" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-6xl mb-6 block">{DIGITAL_LIBRARY.icon}</span>
                            <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide leading-none mb-6">
                                {DIGITAL_LIBRARY.title}
                            </h2>
                            <div className="w-24 h-1 bg-gold mb-8" />
                            <p className="text-gray-600 text-lg mb-8 font-light leading-relaxed">
                                {DIGITAL_LIBRARY.description}
                            </p>
                            <ul className="space-y-4">
                                {DIGITAL_LIBRARY.features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="text-gold text-2xl">✓</span>
                                        <span className="text-gray-700 text-lg">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 rounded-sm p-10"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide mb-6">
                                Search Resources
                            </h3>
                            <div className="relative mb-8">
                                <input
                                    type="text"
                                    placeholder={DIGITAL_LIBRARY.searchPlaceholder}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none transition-colors pr-32"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-maroon hover:text-white transition-colors">
                                    Search
                                </button>
                            </div>
                            <p className="text-xs uppercase tracking-widest font-bold text-navy mb-4">External Databases</p>
                            <div className="flex flex-wrap gap-3">
                                {DIGITAL_LIBRARY.externalDatabases.map((db) => (
                                    <motion.a
                                        key={db.name}
                                        href={db.url}
                                        className="px-4 py-2 bg-navy text-white rounded-sm text-sm font-medium hover:bg-maroon transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {db.name}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* LMS Section */}
            <section id="lms" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-6xl mb-6 block">{LMS_INFO.icon}</span>
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            {LMS_INFO.title}
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                        <p className="text-gray-600 mt-6 max-w-2xl mx-auto">{LMS_INFO.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            className="bg-white rounded-sm p-8 border-t-4 border-maroon"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide mb-6">
                                Features
                            </h3>
                            <ul className="space-y-3">
                                {LMS_INFO.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <span className="text-gold">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-sm p-8 border-t-4 border-gold"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide mb-6">
                                Benefits
                            </h3>
                            <ul className="space-y-3 mb-8">
                                {LMS_INFO.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <span className="text-gold">•</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <motion.a
                                href={LMS_INFO.loginUrl}
                                className="block w-full text-center py-4 bg-maroon text-white font-bold uppercase tracking-widest rounded-sm hover:bg-navy transition-colors"
                                whileHover={{ scale: 1.02 }}
                            >
                                Access LMS
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Student Resources */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-6xl mb-6 block">{STUDENT_RESEARCH_RESOURCES.icon}</span>
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            {STUDENT_RESEARCH_RESOURCES.title}
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                        <p className="text-gray-600 mt-6 max-w-2xl mx-auto">{STUDENT_RESEARCH_RESOURCES.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STUDENT_RESEARCH_RESOURCES.resources.map((resource, index) => (
                            <motion.div
                                key={resource.id}
                                className="bg-gray-50 rounded-sm p-6 text-center border-t-4 border-maroon"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest bg-gold/20 text-gold-dark rounded-sm mb-4">
                                    {resource.type}
                                </span>
                                <h3 className="font-oswald font-bold text-navy uppercase tracking-wide mb-3">
                                    {resource.title}
                                </h3>
                                <p className="text-sm text-gray-600">{resource.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research Guides */}
            <section id="guides" className="py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Research Aids & <span className="text-maroon">Guides</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {RESEARCH_GUIDES.map((guide, index) => (
                            <motion.div
                                key={guide.id}
                                className="flex items-center justify-between p-6 bg-white rounded-sm border-l-4 border-maroon"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 8 }}
                            >
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                        {guide.category}
                                    </span>
                                    <h4 className="font-oswald font-bold text-navy uppercase tracking-wide">
                                        {guide.title}
                                    </h4>
                                </div>
                                <motion.a
                                    href={guide.downloadUrl}
                                    className="px-6 py-3 border-2 border-navy text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-navy hover:text-white transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {guide.type === 'PDF' ? '📄' : '📝'} Download
                                </motion.a>
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
                        Need Research <span className="text-gold">Assistance?</span>
                    </h2>
                    <p className="text-white/70 mb-10 font-light text-lg">
                        Our academic support team is here to help you succeed in your research endeavors.
                    </p>
                    <motion.a
                        href={`mailto:${STUDENT_RESEARCH_RESOURCES.contactEmail}`}
                        className="px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors inline-block"
                        whileHover={{ scale: 1.02 }}
                    >
                        Contact Research Support
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
}
