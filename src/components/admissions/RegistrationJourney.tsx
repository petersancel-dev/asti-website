'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { REGISTRATION_STEPS } from "@/constants/registration-process";
import { GlassCard } from "@/components/ui/GlassCard";
import { StepIndicator } from "@/components/ui/StepIndicator";
import * as LucideIcons from "lucide-react";

// Helper to render icon string dynamically
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // Convert kebab-case (e.g. "file-text") to PascalCase (e.g. "FileText")
    const iconName = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType | undefined;
    return Icon ? <Icon className={className} /> : null;
};

export const RegistrationJourney = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="journey" className="relative py-32 bg-gray-950 overflow-hidden">
            {/* Background Context */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-wide mb-6"
                    >
                        Registration <span className="text-gold">Process</span>
                    </motion.h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Your step-by-step roadmap to becoming an ASTI student. Follow this comprehensive guide to ensure a smooth enrollment experience.
                    </p>
                </div>

                <div ref={containerRef} className="relative">
                    {/* Central Progress Line (Hidden on mobile) */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-gold via-maroon to-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        />
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        {REGISTRATION_STEPS.map((step, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content Side */}
                                    <div className={`w-full md:w-[calc(50%-40px)] pl-16 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                                        <GlassCard className="p-8 h-full group hover:border-gold/30">
                                            <div className={`mb-4 flex items-center gap-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                                                <div className="p-3 rounded-lg bg-navy/50 border border-white/10 text-gold shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <DynamicIcon name={step.icon} className="w-6 h-6" />
                                                </div>
                                                <span className="text-gold text-sm font-bold uppercase tracking-widest">{step.subtitle}</span>
                                            </div>

                                            <h3 className="text-2xl font-oswald font-bold text-white uppercase mb-4 group-hover:text-gold transition-colors">
                                                {step.title}
                                            </h3>

                                            <p className="text-white/70 mb-6 text-sm leading-relaxed">
                                                {step.description}
                                            </p>

                                            {/* Details List */}
                                            <ul className={`space-y-2 ${isEven ? "md:items-end" : "md:items-start"} flex flex-col`}>
                                                {step.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                                                        {!isEven && <span className="w-1.5 h-1.5 rounded-full bg-maroon" />}
                                                        {detail}
                                                        {isEven && <span className="w-1.5 h-1.5 rounded-full bg-maroon" />}
                                                    </li>
                                                ))}
                                            </ul>
                                        </GlassCard>
                                    </div>

                                    {/* Center Indicator */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                                        <StepIndicator
                                            stepNumber={step.id}
                                            className="bg-gray-950 z-20"
                                        />
                                    </div>

                                    {/* Empty Spacer Side */}
                                    <div className="hidden md:block md:w-[calc(50%-40px)]" />

                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
