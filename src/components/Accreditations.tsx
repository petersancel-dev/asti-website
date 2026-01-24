'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ACCREDITATIONS } from '@/constants/accreditations';

// ============================================================
// ACCREDITATION MARQUEE
// Infinite scrolling logo ticker - clean, no background boxes
// Premium design with subtle hover effects
// ============================================================

interface MarqueeItemProps {
    logo: string;
    name: string;
    fullName: string;
    url: string;
}

function MarqueeItem({ logo, name, fullName, url }: MarqueeItemProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center px-8 md:px-12 py-6 transition-all duration-300 hover:scale-105"
            title={fullName}
        >
            {/* Logo - with light shadow for depth on dark bg */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(196,165,46,0.3)]">
                <Image
                    src={logo}
                    alt={fullName}
                    fill
                    className="object-contain transition-all duration-300 group-hover:brightness-110 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                />
            </div>

            {/* Name */}
            <span className="text-gray-400 font-bold text-sm tracking-wide opacity-80 group-hover:opacity-100 group-hover:text-white transition-all">
                {name}
            </span>
        </a>
    );
}

export default function Accreditations() {
    // Duplicate array for seamless infinite scroll
    const duplicatedAccreditations = [...ACCREDITATIONS, ...ACCREDITATIONS, ...ACCREDITATIONS];

    return (
        <section className="py-20 md:py-24 bg-navy relative overflow-hidden">
            {/* Background pattern - subtle dots */}
            <div className="absolute inset-0 opacity-[0.05]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-white/10 border border-white/10 rounded-full text-gold text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                        Our Partners
                    </span>
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4">
                        Internationally <span className="text-gold">Recognized</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Our programmes are recognized by leading educational bodies worldwide
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient fade edges - adjusted to match navy bg */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

                {/* The scrolling track */}
                <motion.div
                    className="flex items-center"
                    animate={{
                        x: ['0%', '-33.333%']
                    }}
                    transition={{
                        x: {
                            duration: 25,
                            repeat: Infinity,
                            ease: 'linear'
                        }
                    }}
                >
                    {duplicatedAccreditations.map((acc, index) => (
                        <MarqueeItem
                            key={`${acc.id}-${index}`}
                            logo={acc.logo}
                            name={acc.name}
                            fullName={acc.fullName}
                            url={acc.url}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-gray-500 text-sm mt-10 px-8"
            >
                Click any logo to visit our accreditation partners →
            </motion.p>
        </section>
    );
}
