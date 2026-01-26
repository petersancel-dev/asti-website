'use client';

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const AdmissionHero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-gradient">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gold Orb 1 */}
                <motion.div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gold/10 blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Navy Orb 2 */}
                <motion.div
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-navy/40 blur-[120px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="inline-block px-4 py-1.5 border border-gold/30 rounded-full bg-gold/5 backdrop-blur-sm text-gold font-bold uppercase tracking-[0.3em] text-[11px] mb-8">
                        Admissions Portal
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold text-white uppercase leading-tight mb-8 drop-shadow-2xl">
                        Your Future <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-gradient-x">
                            Starts Here
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                        Join a community of innovators. A streamlined, 7-step journey from application to enrollment designed to launch your career in technology.
                    </p>

                    <motion.button
                        onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105"
                        whileHover="hover"
                    >
                        <div className="absolute inset-0 border border-gold/50 rounded-full" />
                        <div className="absolute inset-0 bg-gold/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative flex items-center gap-3 text-gold font-oswald font-bold tracking-widest uppercase text-sm">
                            Start the Journey
                            <ArrowDown className="w-4 h-4 animate-bounce" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-10" />
        </section>
    );
};
