'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ADMISSIONS_CONTENT,
    STUDY_LEVELS,
    FIELDS_OF_STUDY,
    FINANCIAL_AID,
    APPLICATION_PROCESS,
    APPLICATION_FORMS
} from '@/constants/admissions';

export default function AdmissionsPage() {
    return (
        <div>
            {/* CLONEA-style Hero */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-brand-gradient">
                <div className="absolute inset-0 opacity-20">
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
                            Admissions
                        </span>
                        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white text-hero uppercase leading-none mb-6">
                            {ADMISSIONS_CONTENT.pageTitle}
                        </h1>
                        <p className="text-xl text-white/90 font-light max-w-2xl mx-auto text-hero-sub">
                            {ADMISSIONS_CONTENT.pageSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Study Levels - CLONEA card grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Programs & <span className="text-maroon">Levels</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {STUDY_LEVELS.map((level, index) => (
                            <motion.div
                                key={level.id}
                                className="bg-gray-50 p-8 rounded-sm border-t-4 border-maroon group cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            >
                                {level.icon.startsWith('/') ? (
                                    <div className="w-12 h-12 mb-6 mx-auto relative">
                                        <Image src={level.icon} alt={level.type} fill className="object-contain" />
                                    </div>
                                ) : (
                                    <span className="text-4xl mb-6 block">{level.icon}</span>
                                )}
                                <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide mb-3 group-hover:text-gold transition-colors">
                                    {level.type}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">{level.purpose}</p>
                                <ul className="space-y-2 mb-6">
                                    {level.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                                            <span className="text-gold">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-navy font-bold uppercase tracking-widest">
                                    Duration: {level.duration}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fields of Study */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-8">
                        Fields of <span className="text-maroon">Study</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {FIELDS_OF_STUDY.map((field, index) => (
                            <motion.span
                                key={field}
                                className="px-6 py-3 bg-white rounded-sm text-navy font-medium shadow-sm border-2 border-transparent hover:border-gold transition-all cursor-pointer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {field}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Financial Aid */}
            <section id="financial-aid" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            {FINANCIAL_AID.title}
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {FINANCIAL_AID.options.map((option, index) => (
                            <motion.div
                                key={option.id}
                                className="text-center p-8 bg-gray-50 rounded-sm"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {option.icon.startsWith('/') ? (
                                    <div className="w-16 h-16 mb-6 mx-auto relative">
                                        <Image src={option.icon} alt={option.title} fill className="object-contain" />
                                    </div>
                                ) : (
                                    <span className="text-5xl mb-6 block">{option.icon}</span>
                                )}
                                <h3 className="text-lg font-oswald font-bold text-navy uppercase tracking-wide mb-3">
                                    {option.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{option.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-6">Contact us to discuss your financial options</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a
                                href={`mailto:${FINANCIAL_AID.contactMethods.email}`}
                                className="px-8 py-4 border-2 border-navy text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-navy hover:text-white transition-colors"
                                whileHover={{ scale: 1.02 }}
                            >
                                📧 Email Us
                            </motion.a>
                            <motion.a
                                href={`https://wa.me/${FINANCIAL_AID.contactMethods.whatsapp}`}
                                className="px-8 py-4 bg-maroon text-white font-bold uppercase tracking-widest rounded-sm hover:bg-gold hover:text-navy transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                            >
                                💬 WhatsApp
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Process - Timeline */}
            <section id="apply" className="py-24 bg-maroon text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-white uppercase tracking-wide">
                            {APPLICATION_PROCESS.title}
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {APPLICATION_PROCESS.steps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                className="flex gap-8 mb-12 last:mb-0"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full bg-gold text-navy font-oswald font-bold flex items-center justify-center text-2xl">
                                        {step.step}
                                    </div>
                                    {index < APPLICATION_PROCESS.steps.length - 1 && (
                                        <div className="w-0.5 flex-1 bg-gold/30 mt-4" />
                                    )}
                                </div>
                                <div className="flex-1 pb-8">
                                    <h3 className="text-2xl font-oswald font-bold text-gold uppercase tracking-wide mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/70 font-light">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Forms */}
            <section id="forms" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Application <span className="text-maroon">Forms</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="max-w-2xl mx-auto space-y-4">
                        {APPLICATION_FORMS.map((form, index) => (
                            <motion.div
                                key={form.id}
                                className="flex items-center justify-between p-6 bg-gray-50 rounded-sm border-l-4 border-navy"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 8 }}
                            >
                                <div>
                                    <h4 className="font-oswald font-bold text-navy uppercase tracking-wide">
                                        {form.level}
                                    </h4>
                                    <p className="text-sm text-gray-500">Download or submit online</p>
                                </div>
                                <div className="flex gap-3">
                                    <motion.a
                                        href={form.formUrl}
                                        className="px-4 py-2 border-2 border-navy text-navy text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-navy hover:text-white transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        📄 PDF
                                    </motion.a>
                                    <motion.button
                                        className="px-4 py-2 bg-gold text-navy text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-maroon hover:text-white transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        ✏️ Online
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-navy text-white text-center">
                <motion.div
                    className="max-w-3xl mx-auto px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase mb-6">
                        Ready to <span className="text-gold">Begin?</span>
                    </h2>
                    <p className="text-white/70 mb-10 font-light text-lg">
                        Take the first step toward your new career. Our admissions team is here to help.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
                        >
                            Contact Admissions
                        </Link>
                        <Link
                            href="/academics"
                            className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-navy transition-colors"
                        >
                            Explore Programs
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
