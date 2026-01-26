'use client';

import { motion } from "framer-motion";
import { POLICY_NOTICES } from "@/constants/registration-process";
import { AlertCircle } from "lucide-react";

export const PolicyNotices = () => {
    return (
        <section className="py-24 bg-navy relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Heading */}
                    <div className="text-white">
                        <span className="text-maroon font-bold uppercase tracking-widest text-sm mb-2 block">Important Information</span>
                        <h2 className="text-3xl md:text-4xl font-oswald font-bold uppercase mb-6 leading-tight">
                            Institutional <br /> <span className="text-white/50">Details & Compliance</span>
                        </h2>
                        <p className="text-white/60 mb-8 max-w-md">
                            Ensuring a transparent and fair academic environment for all students. Please review these essential policies regarding your enrollment status.
                        </p>

                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-gold shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-gold font-bold uppercase text-sm mb-2">Institutional Authority</h4>
                                    <p className="text-xs text-white/70 leading-relaxed">
                                        ASTI reserves the right to amend registration procedures, deadlines, fees, and requirements at any time. All decisions on registration matters are final.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Policy Grid */}
                    <div className="space-y-4">
                        {POLICY_NOTICES.map((policy, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white rounded-sm border-l-4 border-maroon hover:border-gold transition-colors group"
                            >
                                <h3 className="font-oswald font-bold text-navy uppercase text-lg mb-2 group-hover:text-maroon transition-colors">
                                    {policy.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {policy.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
