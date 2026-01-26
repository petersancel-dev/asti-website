'use client';

import { AdmissionHero } from "@/components/admissions/AdmissionHero";
import ApplicationSelector from "@/components/apply/ApplicationSelector";
import { motion } from "framer-motion";

export default function ApplyPage() {
    return (
        <main className="min-h-screen bg-navy text-white selection:bg-gold selection:text-navy">
            {/* 
               Reuse AdmissionHero but we might want to customize the text. 
               However, AdmissionHero has hardcoded text "Admissions Portal".
               For now, let's use it as it sets the perfect tone, or we can make a variant.
               Since AdmissionHero is exported as a named component, I'll use it but
               I'll wrap it to perhaps hide the specific text if needed, or just accept it 
               as the "Admissions Portal" landing which includes Applications.
            */}

            {/* Custom Hero for Application Page specifically */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-brand-gradient">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-gold/10 blur-[100px]"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm text-gold font-bold uppercase tracking-[0.3em] text-[11px] mb-6">
                            Start Your Future
                        </span>
                        <h1 className="text-6xl md:text-8xl font-oswald font-bold text-white uppercase leading-none mb-6 text-shadow-lg">
                            Apply <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold">Now</span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-xl mx-auto font-light">
                            Begin your journey at ASTI. Select your program level below to access the secure online application portal.
                        </p>
                    </motion.div>
                </div>

                {/* Fade to content */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy to-transparent z-10" />
            </section>

            <ApplicationSelector />

            {/* Footer / Additional Info area */}
            <section className="py-20 text-center relative z-10">
                <div className="max-w-2xl mx-auto px-4">
                    <p className="text-white/40 text-sm">
                        Need help with your application? <br />
                        Contact our admissions team at <a href="mailto:education@astitnt.com" className="text-gold hover:underline">education@astitnt.com</a>
                    </p>
                </div>
            </section>
        </main>
    );
}
