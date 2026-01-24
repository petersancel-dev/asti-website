'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ALUMNI_CONTENT, ALUMNI_RESOURCES, GET_INVOLVED, ALUMNI_TESTIMONIALS, ALUMNI_GALLERY } from '@/constants/alumni';

export default function AlumniPage() {
    return (
        <div>
            {/* CLONEA-style Hero */}
            <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-gradient">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/graduation.png"
                        alt="Alumni"
                        fill
                        className="object-cover"
                        data-image-placeholder="alumni-hero"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-navy/80" />

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-gold/50 text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                            Alumni Network
                        </span>
                        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase leading-none mb-6">
                            {ALUMNI_CONTENT.pageTitle}
                        </h1>
                        <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
                            {ALUMNI_CONTENT.pageSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Alumni Resources */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Resources for <span className="text-maroon">Alumni</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ALUMNI_RESOURCES.map((resource, index) => (
                            <motion.a
                                key={resource.id}
                                href={resource.href}
                                className="bg-gray-50 rounded-sm p-8 text-center border-t-4 border-maroon group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            >
                                {resource.icon.startsWith('/') ? (
                                    <div className="w-16 h-16 mb-4 mx-auto relative">
                                        <Image src={resource.icon} alt={resource.title} fill className="object-contain" />
                                    </div>
                                ) : (
                                    <span className="text-4xl mb-4 block">{resource.icon}</span>
                                )}
                                <h3 className="font-oswald font-bold text-navy uppercase tracking-wide mb-3 group-hover:text-gold transition-colors">
                                    {resource.title}
                                </h3>
                                <p className="text-sm text-gray-600">{resource.description}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Get Involved */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Get <span className="text-maroon">Involved</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {GET_INVOLVED.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="bg-white rounded-sm p-8 border-l-4 border-gold flex flex-col"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-oswald font-bold text-navy uppercase tracking-wide mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 flex-1 mb-6">{item.description}</p>
                                <motion.button
                                    className="self-start px-6 py-3 border-l-4 border-maroon text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-navy hover:text-white transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {item.cta}
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                            Alumni <span className="text-maroon">Stories</span>
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {ALUMNI_TESTIMONIALS.slice(0, 6).map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                className="bg-gray-50 rounded-sm p-8 border-t-4 border-maroon"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy font-oswald font-bold text-xl"
                                    >
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-oswald font-bold text-navy uppercase tracking-wide">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.program}
                                        </p>
                                        <p className="text-xs text-maroon font-medium">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-600 italic border-l-4 border-gold pl-4">
                                    &quot;{testimonial.quote}&quot;
                                </blockquote>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide mb-4">
                        Alumni <span className="text-maroon">Gallery</span>
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto mb-8" />
                    <p className="text-gray-600 mb-12">
                        Photos and videos from alumni events, workshops, and reunions.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {ALUMNI_GALLERY.placeholderImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                className="aspect-square bg-gray-200 rounded-sm overflow-hidden relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                data-image-placeholder={`gallery-${image.category}`}
                            >
                                {image.src ? (
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-4xl">📷</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-maroon text-white text-center">
                <motion.div
                    className="max-w-3xl mx-auto px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase mb-6">
                        Share Your <span className="text-gold">ASTI Story</span>
                    </h2>
                    <p className="text-white/70 mb-10 font-light text-lg">
                        We&apos;d love to hear about your journey and achievements since graduating from ASTI.
                    </p>
                    <Link
                        href="/contact"
                        className="px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors inline-block"
                    >
                        Contact Alumni Relations
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
