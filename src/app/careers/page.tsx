'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, GraduationCap, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { CAREERS_CONTENT, PARTNER_EMPLOYERS, INTERNSHIP_INFO, CAREER_PATHS, CAREER_STATS } from '@/constants/careers';

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-navy text-white py-20 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        className="text-4xl md:text-6xl font-oswald font-bold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {CAREERS_CONTENT.pageTitle}
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {CAREERS_CONTENT.introduction}
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-6 lg:px-16 bg-gray-50">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {CAREER_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-4xl md:text-5xl font-oswald font-bold text-maroon mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Partner Employers */}
            <section className="py-20 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-oswald font-bold text-navy mb-4">
                            Our Partner Employers
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {CAREERS_CONTENT.employerRelationships}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {PARTNER_EMPLOYERS.map((employer, index) => (
                            <motion.div
                                key={employer.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-gold transition-all group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors">
                                    <Briefcase className="w-8 h-8 text-navy group-hover:text-gold transition-colors" />
                                </div>
                                <h3 className="font-bold text-navy text-sm mb-1">{employer.name}</h3>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">{employer.industry}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Career Paths */}
            <section className="py-20 px-6 lg:px-16 bg-navy text-white">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-4xl font-oswald font-bold mb-4 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Career Paths After ASTI
                    </motion.h2>
                    <motion.p
                        className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Explore the exciting career opportunities available to ASTI graduates
                    </motion.p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CAREER_PATHS.map((path, index) => (
                            <motion.div
                                key={path.id}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <TrendingUp className="w-8 h-8 text-gold mb-4" />
                                <h3 className="text-xl font-oswald font-bold mb-2">{path.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{path.description}</p>
                                <div className="text-gold font-bold text-sm mb-3">{path.avgSalary}</div>
                                <div className="flex flex-wrap gap-2">
                                    {path.programs.map((program) => (
                                        <span
                                            key={program}
                                            className="text-xs bg-white/10 px-2 py-1 rounded"
                                        >
                                            {program}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internship Section */}
            <section className="py-20 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-oswald font-bold text-navy mb-6">
                                {INTERNSHIP_INFO.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{INTERNSHIP_INFO.description}</p>
                            <p className="text-gray-600 mb-6">{INTERNSHIP_INFO.commitment}</p>
                            <p className="text-gray-500 text-sm italic mb-8">{INTERNSHIP_INFO.whatIsInternship}</p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-maroon text-white px-6 py-3 font-oswald font-bold uppercase tracking-wider hover:bg-maroon-dark transition-colors"
                            >
                                Contact Us About Internships
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            {INTERNSHIP_INFO.benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.id}
                                    className="bg-gray-50 p-6 rounded-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GraduationCap className="w-8 h-8 text-gold mb-3" />
                                    <h4 className="font-bold text-navy mb-2">{benefit.title}</h4>
                                    <p className="text-sm text-gray-600">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 lg:px-16 bg-gold">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl font-oswald font-bold text-navy mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Ready to Start Your Career Journey?
                    </motion.h2>
                    <motion.p
                        className="text-navy/80 text-lg mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Join thousands of successful ASTI graduates working at top companies
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/programmes"
                            className="bg-navy text-white px-8 py-4 font-oswald font-bold uppercase tracking-wider hover:bg-navy-dark transition-colors"
                        >
                            Explore Programmes
                        </Link>
                        <Link
                            href="/admissions"
                            className="bg-white text-navy px-8 py-4 font-oswald font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                        >
                            Apply Now
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
