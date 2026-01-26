'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CONTACT_INFO } from '@/constants/contact';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div>
            {/* CLONEA-style Parallax Hero */}
            <section ref={heroRef} className="relative min-h-[50vh] flex items-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: bgY }}
                >
                    <Image
                        src="/images/campus-exterior.png"
                        alt="ASTI Campus"
                        fill
                        className="object-cover scale-110"
                        data-image-placeholder="contact-hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-maroon/70" />
                </motion.div>

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                            Get In Touch
                        </span>
                        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase leading-none mb-6">
                            Contact <span className="text-gold">Us</span>
                        </h1>
                        <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
                            Our admissions team is here to help you find the perfect programme.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Form */}
                        <motion.div
                            className="bg-gray-50 rounded-sm p-10"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-oswald font-bold text-navy uppercase tracking-wide mb-8">
                                Send us a <span className="text-maroon">Message</span>
                            </h3>
                            {submitted ? (
                                <motion.div
                                    className="text-center py-16"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                >
                                    <div className="text-6xl mb-4 text-gold">✓</div>
                                    <h4 className="text-2xl font-oswald font-bold text-navy uppercase mb-2">Thank You!</h4>
                                    <p className="text-gray-600">We&apos;ll get back to you shortly.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-navy mb-2">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none transition-colors"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-navy mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none transition-colors"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-navy mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none transition-colors"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-navy mb-2">Message</label>
                                        <textarea
                                            rows={5}
                                            required
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none transition-colors resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="w-full px-8 py-5 bg-maroon text-white font-bold uppercase tracking-widest rounded-sm hover:bg-navy transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-oswald font-bold text-navy uppercase tracking-wide mb-8">
                                Get in <span className="text-maroon">Touch</span>
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { icon: '📍', title: 'Address', content: CONTACT_INFO.address.full },
                                    {
                                        icon: '📞',
                                        title: 'Phone',
                                        content: (
                                            <div className="flex flex-col gap-1">
                                                {CONTACT_INFO.phones.map(p => (
                                                    <a key={p.label} href={`tel:${p.number.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">
                                                        <span className="font-semibold text-navy">{p.label}:</span> {p.number}
                                                    </a>
                                                ))}
                                            </div>
                                        )
                                    },
                                    { icon: '✉️', title: 'Email', content: CONTACT_INFO.email },
                                    { icon: '🕐', title: 'Hours', content: `Mon-Fri: ${CONTACT_INFO.hours.weekdays}` }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        className="flex gap-6 p-6 bg-gray-50 rounded-sm border-l-4 border-gold"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="text-3xl">{item.icon}</div>
                                        <div>
                                            <h4 className="font-oswald font-bold text-navy uppercase tracking-wide mb-1">{item.title}</h4>
                                            <div className="text-gray-600">{item.content}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map placeholder */}
                            <div
                                className="mt-8 h-64 rounded-sm bg-gray-200 flex items-center justify-center"
                                data-image-placeholder="contact-map"
                            >
                                <span className="text-gray-500 font-oswald uppercase tracking-widest">Interactive Map</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
