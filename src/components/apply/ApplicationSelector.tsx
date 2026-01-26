'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Award } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { APPLICATION_FORMS } from "@/constants/admissions";

const getIcon = (id: string) => {
    switch (id) {
        case 'introductory': return <Award className="w-12 h-12 text-gold mb-4" />;
        case 'certificate': return <BookOpen className="w-12 h-12 text-gold mb-4" />;
        case 'diploma': return <GraduationCap className="w-12 h-12 text-gold mb-4" />;
        default: return <BookOpen className="w-12 h-12 text-gold mb-4" />;
    }
};

const getBackgroundColor = (id: string) => {
    switch (id) {
        case 'introductory': return 'from-blue-900/40 to-navy/60';
        case 'certificate': return 'from-maroon/40 to-navy/60';
        case 'diploma': return 'from-gold/20 to-navy/60';
        default: return 'from-white/5 to-white/10';
    }
}

export default function ApplicationSelector() {
    return (
        <section id="application-forms" className="py-24 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-wide mb-4">
                        Select Your <span className="text-gold">path</span>
                    </h2>
                    <div className="h-1 w-24 bg-gold mx-auto rounded-full mb-6" />
                    <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
                        Choose the application level that matches your career goals.
                        Each path is designed to provide industry-leading skills and certification.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {APPLICATION_FORMS.map((form, index) => (
                        <GlassCard
                            key={form.id}
                            className={`p-8 flex flex-col items-center text-center group bg-gradient-to-b ${getBackgroundColor(form.id)} border-white/5`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="p-4 rounded-full bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-inner">
                                {getIcon(form.id)}
                            </div>

                            <h3 className="text-2xl font-oswald font-bold text-white uppercase tracking-wider mb-2">
                                {form.level}
                            </h3>

                            <p className="text-white/60 text-sm mb-8 leading-relaxed min-h-[40px]">
                                {form.id === 'introductory' && "Short courses for upskilling and immediate knowledge."}
                                {form.id === 'certificate' && "Professional certification for career entry and advancement."}
                                {form.id === 'diploma' && "Advanced technical training for leadership roles."}
                            </p>

                            <Link
                                href={form.onlineUrl === '/registration' && form.id === 'introductory' ? '/registration/intro' : form.onlineUrl}
                                className="mt-auto w-full"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gradient-to-r from-gold to-yellow-600 text-navy font-bold uppercase tracking-widest text-sm rounded-lg shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 group-hover:from-white group-hover:to-gray-200 transition-all"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
