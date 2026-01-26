'use client';

import { AdmissionHero } from '@/components/admissions/AdmissionHero';
import { RegistrationJourney } from '@/components/admissions/RegistrationJourney';
import { PolicyNotices } from '@/components/admissions/PolicyNotices';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdmissionsPage() {
    return (
        <main className="bg-gray-950 min-h-screen">
            {/* 1. Hero Section */}
            <AdmissionHero />

            {/* 2. Main Interactive Journey */}
            <RegistrationJourney />

            {/* 3. Policy & Compliance */}
            <PolicyNotices />

            {/* 4. Final CTA */}
            <section className="py-32 bg-brand-gradient relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase mb-8">
                            Ready to <span className="text-gold">Commit?</span>
                        </h2>
                        <p className="text-xl text-white/80 font-light mb-12 max-w-2xl mx-auto">
                            If you have reviewed the requirements and are ready to take the next step, start your application today.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                href="/apply"
                                className="px-10 py-5 bg-gold text-navy font-bold font-oswald uppercase tracking-widest rounded-sm hover:bg-white hover:text-navy transition-all transform hover:-translate-y-1 shadow-2xl"
                            >
                                Apply Now
                            </Link>
                            <Link
                                href="/contact"
                                className="px-10 py-5 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold font-oswald uppercase tracking-widest rounded-sm hover:bg-white hover:text-navy transition-all transform hover:-translate-y-1"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

