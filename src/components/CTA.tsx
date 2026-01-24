'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="py-24 relative overflow-hidden bg-maroon">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z' fill='%23fff'/%3E%3C/svg%3E")`
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-white/70 text-lg mb-10 font-light">
                        Take the first step towards a rewarding career. Apply today and join thousands of successful graduates.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/admissions"
                                className="block px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
                            >
                                Apply Now - It&apos;s Free
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/programmes"
                                className="block px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-maroon transition-colors"
                            >
                                Browse Programmes
                            </Link>
                        </motion.div>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/60 text-sm uppercase tracking-widest">
                        <span>✓ No Application Fee</span>
                        <span>✓ Flexible Payment Plans</span>
                        <span>✓ Start Anytime</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
