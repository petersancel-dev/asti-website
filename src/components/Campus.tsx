'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CONTACT_INFO, LEARNING_MODES } from '@/constants/contact';

export default function Campus() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    return (
        <section ref={containerRef} className="py-20 bg-white" id="campus">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* CLONEA-style centered heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                        Learn Your Way at <span className="text-maroon">Our Campus</span>
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                        Flexible learning options designed around your schedule. Whether online,
                        in-person, or hybrid - you&apos;re in control of your education.
                    </p>
                </div>

                {/* Learning Modes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {LEARNING_MODES.map((mode, index) => (
                        <motion.div
                            key={mode.id}
                            className="bg-gray-50 p-8 text-center rounded-sm border-t-4 border-navy hover:shadow-xl transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="relative w-16 h-16 mx-auto mb-4">
                                <Image
                                    src={mode.icon}
                                    alt={mode.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-oswald font-bold text-navy uppercase mb-2">{mode.title}</h3>
                            <p className="text-gray-600 text-sm">{mode.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Campus Location - Two Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Map/Campus Image with zoom animation */}
                    <motion.div
                        className="relative rounded-sm overflow-hidden shadow-xl aspect-video bg-navy group"
                        style={{ scale: imageScale }}
                    >
                        <Image
                            src="/images/campus-exterior.png"
                            alt="ASTI Campus at 46 Boundary Road, San Juan"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />

                        {/* Location Overlay */}
                        <div className="absolute bottom-6 left-6 text-white z-10">
                            <h4 className="text-xl font-oswald font-bold uppercase">San Juan Campus</h4>
                            <p className="text-gray-300 text-sm">46 Boundary Road</p>
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-oswald font-bold text-navy uppercase mb-4">Visit Our Campus</h3>
                        <p className="text-gray-600 mb-6">
                            Conveniently situated just minutes away from the Priority Bus Route (PBR)
                            and major highways. We offer on-campus parking for all students and staff.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-sm bg-navy flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-navy">Address</p>
                                    <p className="text-gray-600">{CONTACT_INFO.address.full}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-sm bg-navy flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-navy">Contact</p>
                                    {CONTACT_INFO.phones.map((phone) => (
                                        <a
                                            key={phone.number}
                                            href={`tel:${phone.number.replace(/\s/g, '')}`}
                                            className="block text-gray-600 hover:text-maroon transition-colors"
                                        >
                                            {phone.number}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-sm bg-navy flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-navy">Hours</p>
                                    <p className="text-gray-600">Mon-Fri: {CONTACT_INFO.hours.weekdays}</p>
                                    <p className="text-gray-600">Sat: {CONTACT_INFO.hours.saturday}</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-maroon text-white font-bold uppercase tracking-widest rounded-sm hover:bg-navy transition-colors inline-block"
                        >
                            Schedule a Visit
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
