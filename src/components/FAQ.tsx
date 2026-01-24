'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '@/constants/faq';

function FAQItem({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-5 px-6 text-left group"
                aria-expanded={isOpen}
            >
                <span className={`font-oswald font-semibold uppercase tracking-wide transition-colors ${isOpen ? 'text-maroon' : 'text-navy group-hover:text-maroon'}`}>
                    {question}
                </span>
                <span
                    className={`ml-4 flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-300
            ${isOpen ? 'bg-maroon text-white rotate-180' : 'bg-gray-100 text-gray-600 group-hover:bg-maroon group-hover:text-white'}`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-gray-50" id="faq">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - Header */}
                    <motion.div
                        className="lg:sticky lg:top-32"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-4">
                            Frequently Asked <span className="text-maroon">Questions</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mb-6" />
                        <p className="text-gray-600 mb-8">
                            Get answers to the most common questions about ASTI, our programmes,
                            accreditations, and enrollment process.
                        </p>

                        {/* Contact CTA */}
                        <div className="p-6 bg-navy rounded-sm">
                            <h4 className="text-white font-oswald font-semibold uppercase tracking-wide mb-2">
                                Still have questions?
                            </h4>
                            <p className="text-gray-300 text-sm mb-4">
                                Our admissions team is ready to help you find the perfect programme.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest hover:underline"
                            >
                                Contact Us
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column - FAQ Accordion */}
                    <motion.div
                        className="bg-white rounded-sm border border-gray-100 shadow-lg overflow-hidden"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {FAQ_ITEMS.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
