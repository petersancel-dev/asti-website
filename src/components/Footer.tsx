'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CONTACT_INFO } from '@/constants/contact';
import { NAV_ITEMS } from '@/constants/navigation';
import { Phone, MapPin, Mail, ChevronDown, Facebook, Instagram } from 'lucide-react';

// ============================================================
// 300FEETOUT-STYLE EXPANDABLE SECTION
// On hover, section expands to reveal content with smooth animations
// ============================================================
interface ExpandableSectionProps {
    title: string;
    children: React.ReactNode;
    delay?: number;
}

function ExpandableSection({ title, children, delay = 0 }: ExpandableSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className="group/section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Section Header */}
            <div className="flex items-center justify-between cursor-pointer mb-4">
                <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-navy flex items-center gap-3 group-hover/section:text-gold transition-colors duration-500">
                    <motion.span
                        className="w-8 h-[2px] bg-navy group-hover/section:bg-gold group-hover/section:w-12 transition-all duration-500"
                    />
                    {title}
                </h4>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-navy group-hover/section:text-gold transition-colors"
                >
                    <ChevronDown size={16} />
                </motion.div>
            </div>

            {/* Expandable Content */}
            <motion.div
                initial={false}
                animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0
                }}
                transition={{
                    height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.3, delay: isExpanded ? 0.1 : 0 }
                }}
                className="overflow-hidden"
            >
                <div className="pb-6">
                    {children}
                </div>
            </motion.div>

            {/* Preview line (visible when collapsed) */}
            <motion.div
                animate={{ opacity: isExpanded ? 0 : 1 }}
                className="h-[1px] bg-gray-200 group-hover/section:bg-gold/30 transition-colors duration-500"
            />
        </motion.div>
    );
}

// Social Link with expanding label (300feetout style)
interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/social flex items-center text-navy hover:text-gold transition-colors duration-500"
            whileHover={{ x: 4 }}
        >
            <span className="w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/social:w-20 group-hover/social:opacity-100 group-hover/social:mr-2 font-bold text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                {label}
            </span>
            <div className="w-6 h-6 [&_svg]:w-full [&_svg]:h-full">
                {icon}
            </div>
        </motion.a>
    );
}

export default function Footer() {
    return (
        <footer className="bg-white text-navy py-20 px-6 md:px-8 lg:px-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column - CTA */}
                    <div className="lg:col-span-5">
                        <motion.h2
                            className="text-5xl md:text-6xl lg:text-7xl font-oswald font-bold leading-[0.9] tracking-tight mb-8"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Let's work<br />
                            <span className="text-gold">together.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mb-10"
                        >
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="inline-flex items-center text-xl md:text-2xl text-navy hover:text-gold transition-colors duration-300 group"
                            >
                                <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                <span className="border-b-2 border-gray-300 group-hover:border-gold pb-1 transition-colors">
                                    {CONTACT_INFO.email}
                                </span>
                            </a>
                        </motion.div>

                        {/* Social Links - 300feetout style expanding */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-6 p-4 rounded-full bg-gray-50 w-fit"
                        >
                            <SocialLink
                                href="https://www.facebook.com/ASTIUniversity/"
                                icon={<Facebook />}
                                label="Facebook"
                            />
                            <SocialLink
                                href="https://www.instagram.com/asti_caribbean/"
                                icon={<Instagram />}
                                label="Instagram"
                            />
                        </motion.div>

                        {/* ASTI Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-12"
                        >
                            <Link href="/" className="inline-block group">
                                <div className="relative w-16 h-16 group-hover:scale-105 transition-transform">
                                    <Image
                                        src="/images/asti-logo.png"
                                        alt="ASTI"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column - Expandable Sections */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8">

                        {/* Location Section */}
                        <ExpandableSection title="Location" delay={0.1}>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-xl font-semibold text-navy mb-1">
                                        {CONTACT_INFO.address.city}
                                    </p>
                                    <p className="text-gray-500">
                                        {CONTACT_INFO.address.full}
                                    </p>
                                    <a
                                        href="https://maps.google.com/?q=46+Boundary+Road+San+Juan+Trinidad"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center mt-3 text-sm font-bold text-navy hover:text-gold transition-colors"
                                    >
                                        Get Directions
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </ExpandableSection>

                        {/* Navigate Section */}
                        <ExpandableSection title="Navigate" delay={0.2}>
                            <div className="grid grid-cols-2 gap-4">
                                {NAV_ITEMS.map((item, idx) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group/link flex items-center text-lg text-navy hover:text-gold transition-colors duration-300"
                                    >
                                        <span className="w-0 h-[2px] bg-gold mr-0 group-hover/link:w-4 group-hover/link:mr-3 transition-all duration-300" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </ExpandableSection>

                        {/* Contact Section */}
                        <ExpandableSection title="Contact" delay={0.3}>
                            <div className="space-y-4">
                                {CONTACT_INFO.phones.map((phone, idx) => (
                                    <a
                                        key={phone.number}
                                        href={`tel:${phone.number.replace(/\s/g, '')}`}
                                        className="flex items-start gap-4 text-lg text-navy hover:text-gold transition-colors group/phone"
                                    >
                                        <Phone className="w-5 h-5 text-gold group-hover/phone:scale-110 transition-transform mt-1" />
                                        <div className="flex flex-col">
                                            {phone.label && (
                                                <span className="text-sm font-bold text-gold uppercase tracking-wider">{phone.label}</span>
                                            )}
                                            <span className="font-medium">{phone.number}</span>
                                        </div>
                                    </a>
                                ))}
                                <a
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    className="flex items-center gap-4 text-lg text-navy hover:text-gold transition-colors group/email"
                                >
                                    <Mail className="w-5 h-5 text-gold group-hover/email:scale-110 transition-transform" />
                                    <span>{CONTACT_INFO.email}</span>
                                </a>
                            </div>
                        </ExpandableSection>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Advanced Solutions Technical Institute. All rights reserved.
                    </span>
                    <div className="flex gap-8 text-sm">
                        <Link href="/privacy" className="text-gray-400 hover:text-navy transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-400 hover:text-navy transition-colors">Terms of Use</Link>
                        <Link href="/sitemap" className="text-gray-400 hover:text-navy transition-colors">Sitemap</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
