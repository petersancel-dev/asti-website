'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { toggleMobileMenu, closeMobileMenu } from '@/lib/features/ui/ui-slice';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { NAV_ITEMS } from '@/constants/navigation';

// ============================================================
// APPLY RIBBON - ULTRATHINK Implementation
// Physics: Fabric unfurls from top (scaleY), settles with bounce
// Hover: Subtle wave-like oscillation (not mechanical rotation)
// Scroll: Graceful retraction upward
// ============================================================
// ============================================================
// APPLY RIBBON - ULTRATHINK 3D UNFOLDING
// ============================================================
import ApplyRibbon from './ui/ApplyRibbon';

// Compact Apply Button for scrolled state - appears in navbar
const ApplyButtonCompact = ({ isVisible }: { isVisible: boolean }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        delay: 0.1
                    }
                }}
                exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.15 } }}
            >
                <Link
                    href="/admissions"
                    className="px-5 py-2 bg-maroon text-white font-oswald font-bold uppercase tracking-wider text-sm hover:bg-maroon-dark transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Apply
                </Link>
            </motion.div>
        )}
    </AnimatePresence>
);

// NavItem component with mega menu
const NavItem = ({ item }: { item: typeof NAV_ITEMS[0] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    return (
        <div
            className="group relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link
                href={item.href}
                className="flex items-center space-x-1 text-white hover:text-gold py-3 px-2 text-sm font-bold font-oswald uppercase tracking-wider transition-colors"
                onClick={() => setIsOpen(false)}
            >
                <span>{item.label}</span>
                {hasChildren && <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
            </Link>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
                {isOpen && hasChildren && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5, transition: { duration: 0.15 } }}
                        className="fixed left-0 top-auto mt-0 w-full bg-white shadow-2xl border-t border-gray-100 z-40 py-6 px-6"
                    >
                        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
                            <div className="col-span-1">
                                <h3 className="text-navy font-oswald text-xl font-bold uppercase mb-3">{item.label}</h3>
                                <div className="w-12 h-1 bg-gold mb-4" />
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Discover the opportunities that await you at ASTI.
                                </p>
                            </div>
                            <div className="col-span-3 grid grid-cols-3 gap-6">
                                {item.children?.map((child, idx) => (
                                    <Link
                                        key={idx}
                                        href={child.href}
                                        className="group/item cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="relative h-16 w-full mb-2 overflow-hidden bg-gray-100 rounded-sm">
                                            {child.image && (
                                                <Image
                                                    src={child.image}
                                                    alt={child.label}
                                                    fill
                                                    className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-navy/10 group-hover/item:bg-transparent transition-colors" />
                                        </div>
                                        <h4 className="font-bold text-navy uppercase text-sm mb-0.5 group-hover/item:text-gold tracking-wide transition-colors">
                                            {child.label}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Header() {
    const dispatch = useAppDispatch();
    const isMobileMenuOpen = useAppSelector((state: RootState) => state.ui.isMobileMenuOpen);
    const [isScrolled, setIsScrolled] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Hysteresis: expand at 120px, collapse only after < 60px
        // This prevents jitter when scroll position hovers near threshold
        if (latest > 120 && !isScrolled) {
            setIsScrolled(true);
        } else if (latest < 60 && isScrolled) {
            setIsScrolled(false);
        }
    });

    return (
        <motion.header
            className={`w-full z-[100] sticky top-0 transition-shadow duration-200 ease-out ${isScrolled ? 'shadow-xl' : ''}`}
        >
            {/* Top Utility Row */}
            <motion.div
                className="bg-white/95 backdrop-blur-md border-b border-gray-100"
                animate={{
                    paddingTop: isScrolled ? '0.375rem' : '0.75rem',
                    paddingBottom: isScrolled ? '0.375rem' : '0.75rem'
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    {/* Logo - Links to Home */}
                    {/* Logo - Links to Home */}
                    <Link href="/" className="flex items-center gap-4 origin-left group py-2">
                        {/* ASTI Crest Logo - Also navigates home */}
                        <motion.div
                            className="relative transition-transform group-hover:scale-105 z-10"
                            initial={{ scale: 0.9, opacity: 0, y: 10 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                width: isScrolled ? '2.5rem' : '6.5rem',
                                height: isScrolled ? '2.5rem' : '6.5rem'
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1], // "Cinematic" easing
                                layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                            }}
                        >
                            <Image
                                src="/images/asti-logo.png"
                                alt="ASTI - Click to go home"
                                fill
                                className={`object-contain transition-all duration-500 ${isScrolled ? 'drop-shadow-md' : 'drop-shadow-2xl'}`}
                            />
                        </motion.div>
                        {/* Text Logo */}
                        <div className="flex flex-col justify-center">
                            <motion.span
                                className="font-oswald font-bold text-navy tracking-tighter uppercase leading-none drop-shadow-sm"
                                initial={{ opacity: 0, filter: 'blur(8px)', x: -10 }}
                                animate={{
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    x: 0,
                                    fontSize: isScrolled ? '1.5rem' : '3rem'
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.1 // Slight stagger
                                }}
                            >
                                ASTI
                            </motion.span>
                            <AnimatePresence>
                                {!isScrolled && (
                                    <motion.span
                                        className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-gray-600 font-bold mt-1"
                                        initial={{ opacity: 0, filter: 'blur(4px)', y: 5 }}
                                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                        exit={{ opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.3 } }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: 0.2 // More stagger
                                        }}
                                    >
                                        Advanced Solutions Technical Institute
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <div className="hidden lg:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-widest text-navy">
                            <Link href="/programmes" className="flex items-center hover:text-gold transition-colors">
                                <Image src="/icons/programmes.png" alt="" width={16} height={16} className="mr-2 opacity-80" /> Programmes
                            </Link>
                            <Link href="/campus-life" className="flex items-center hover:text-gold transition-colors">
                                <Image src="/icons/campus-life.png" alt="" width={16} height={16} className="mr-2 opacity-80" /> Campus Life
                            </Link>
                            <button className="hover:text-gold transition-colors">
                                <Search size={20} className="opacity-80" />
                            </button>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => dispatch(toggleMobileMenu())}
                            className="lg:hidden p-2 text-navy"
                        >
                            <div className="w-6 h-0.5 bg-current mb-1" />
                            <div className="w-6 h-0.5 bg-current mb-1" />
                            <div className="w-6 h-0.5 bg-current" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Main Navigation Blue Bar */}
            <div className="hidden lg:block bg-navy border-t border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-12 relative">
                    {/* Left Nav Items */}
                    <nav className="flex items-center space-x-2">
                        {NAV_ITEMS.map((item) => (
                            <NavItem key={item.href} item={item} />
                        ))}
                    </nav>

                    {/* Right Side - Visit, Alumni with spacer for ribbon */}
                    <div className="flex items-center space-x-8 mr-28 pr-4 border-r border-navy-light">
                        {/* Apply Button (visible when scrolled) */}
                        <ApplyButtonCompact isVisible={isScrolled} />
                    </div>

                    {/* Apply Ribbon - Positioned absolutely */}
                    <ApplyRibbon isScrolled={isScrolled} />
                </div>
            </div>


            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-0 bg-navy z-[110] p-8 text-white flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-oswald text-2xl font-bold uppercase">Menu</span>
                            <button onClick={() => dispatch(closeMobileMenu())} className="text-3xl">&times;</button>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <Link
                                href="/"
                                className="text-2xl font-oswald uppercase font-bold border-b border-white/10 pb-2 text-gold"
                                onClick={() => dispatch(closeMobileMenu())}
                            >
                                Home
                            </Link>
                            {NAV_ITEMS.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-2xl font-oswald uppercase font-bold border-b border-white/10 pb-2"
                                    onClick={() => dispatch(closeMobileMenu())}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto grid grid-cols-2 gap-4">
                            <Link href="/admissions" className="bg-gold text-navy py-4 text-center font-bold uppercase">Apply</Link>
                            <Link href="/contact" className="border border-white py-4 text-center font-bold uppercase">Visit</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
