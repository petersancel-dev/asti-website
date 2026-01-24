'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
    Search, X, ArrowRight, Clock, Globe, ChevronLeft, Sparkles, Zap,
    Radio, Briefcase, Cpu, Wrench, Car, Zap as ZapIcon, CircuitBoard,
    Wifi, HeartPulse, Scale, Smartphone, Bot, Shield, Sun, Antenna
} from 'lucide-react';
import { animate, stagger, createTimeline } from 'animejs';
import { PROGRAMME_CATEGORIES, PROGRAMME_LEVELS, PROGRAMMES, Programme } from '@/constants/programmes';

// Check for reduced motion preference
const getReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// =============================================================================
// PROGRAMME GALAXY - Premium Redesign with Creative anime.js
// Inspired by: akaru.fr - Sophisticated animations, text reveals, parallax
// =============================================================================

// Priority ordering for categories (higher = more important, shown first)
// Social/perceived value ranking - cutting-edge tech at top
const CATEGORY_PRIORITY: Record<string, number> = {
    'telecom': 100,           // Highest value - infrastructure
    'robotics': 98,           // Cutting-edge - drones, automation
    'fiber-optics': 95,       // High-tech infrastructure
    'computer-science': 92,   // IT & Software
    'business-admin': 90,     // Professional/Executive
    'security': 88,           // Cybersecurity - high demand
    'electrical-electronics': 85,
    'electric-hybrid': 80,    // Green technology
    'solar-energy': 75,       // Renewable energy
    'auto-mechanics': 50,     // Traditional trade
    'computer-repair': 45,    // Tech support
    'mobile-repair': 40,      // Device repair
    'healthcare': 35,         // Support role
    'air-conditioning': 30,   // Traditional trade
    'legal': 25,              // Paralegal - support role
};

// Professional Lucide icons for categories
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    'telecom': Antenna,
    'business-admin': Briefcase,
    'computer-science': Cpu,
    'fiber-optics': Wifi,
    'security': Shield,
    'electrical-electronics': CircuitBoard,
    'electric-hybrid': ZapIcon,
    'solar-energy': Sun,
    'auto-mechanics': Car,
    'robotics': Bot,
    'computer-repair': Wrench,
    'mobile-repair': Smartphone,
    'air-conditioning': Radio,
    'healthcare': HeartPulse,
    'legal': Scale,
};

// Level styling
const LEVEL_STYLES: Record<string, { gradient: string; glow: string; text: string; bg: string }> = {
    introduction: {
        gradient: 'from-blue-500 to-blue-600',
        glow: 'shadow-blue-500/40',
        text: 'text-blue-400',
        bg: 'bg-blue-500/20'
    },
    certificate: {
        gradient: 'from-emerald-500 to-emerald-600',
        glow: 'shadow-emerald-500/40',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/20'
    },
    diploma: {
        gradient: 'from-amber-400 to-yellow-500',
        glow: 'shadow-amber-500/40',
        text: 'text-amber-400',
        bg: 'bg-amber-500/20'
    }
};

// -----------------------------------------------------------------------------
// Spotlight Search with Slide-Reveal Animation
// -----------------------------------------------------------------------------
function SpotlightSearch({
    searchQuery,
    setSearchQuery,
    onCategoryClick
}: {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    onCategoryClick: (id: string) => void;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return { categories: [], programmes: [] };
        const query = searchQuery.toLowerCase();
        const categories = PROGRAMME_CATEGORIES.filter(cat =>
            cat.id !== 'all' && cat.label.toLowerCase().includes(query)
        ).slice(0, 5);
        const programmes = PROGRAMMES.filter(p =>
            p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
        ).slice(0, 8);
        return { categories, programmes };
    }, [searchQuery]);

    const hasResults = searchResults.categories.length > 0 || searchResults.programmes.length > 0;

    // Animate results with slide reveal
    useEffect(() => {
        if (hasResults && resultsRef.current) {
            const items = resultsRef.current.querySelectorAll('.search-result-item');
            if (items.length > 0) {
                // Reset items
                items.forEach(el => {
                    (el as HTMLElement).style.opacity = '0';
                    (el as HTMLElement).style.transform = 'translateY(20px)';
                });
                // Animate with slide reveal
                animate(items, {
                    translateY: [20, 0],
                    opacity: [0, 1],
                    delay: stagger(40),
                    duration: 400,
                    easing: 'easeOutExpo'
                });
            }
        }
    }, [searchResults, hasResults]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                inputRef.current?.blur();
                setSearchQuery('');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setSearchQuery]);

    return (
        <div ref={containerRef} className="relative mb-16">
            <div className={`
                relative flex items-center gap-4 px-6 py-5 rounded-2xl
                bg-white/[0.03] border transition-all duration-500
                ${isFocused ? 'border-gold/40 shadow-2xl shadow-gold/10 bg-white/[0.06]' : 'border-white/[0.08]'}
            `}>
                <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-gold' : 'text-white/30'}`} />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    placeholder="Search programmes, categories, skills..."
                    className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-lg font-light tracking-wide"
                />
                {searchQuery ? (
                    <button onClick={() => setSearchQuery('')} className="text-white/30 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                ) : (
                    <kbd className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/30 text-xs font-mono border border-white/[0.08]">
                        ⌘K
                    </kbd>
                )}
            </div>

            {/* Results Dropdown */}
            {isFocused && searchQuery && (
                <div
                    ref={resultsRef}
                    className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-navy-dark/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden z-50"
                >
                    {hasResults ? (
                        <div className="max-h-[420px] overflow-y-auto">
                            {searchResults.categories.length > 0 && (
                                <div className="p-5 border-b border-white/[0.06]">
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4 font-medium">Industries</p>
                                    {searchResults.categories.map(cat => {
                                        const Icon = CATEGORY_ICONS[cat.id] || Briefcase;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => { onCategoryClick(cat.id); setSearchQuery(''); }}
                                                className="search-result-item w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-colors text-left group"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                                    <Icon className="w-5 h-5 text-gold" />
                                                </div>
                                                <span className="text-white font-medium tracking-wide">{cat.label}</span>
                                                <ArrowRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-gold group-hover:translate-x-1 transition-all" />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {searchResults.programmes.length > 0 && (
                                <div className="p-5">
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4 font-medium">Programmes</p>
                                    {searchResults.programmes.map(prog => (
                                        <Link
                                            key={prog.id}
                                            href={`/programmes/${prog.id}`}
                                            className="search-result-item flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                                        >
                                            <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${LEVEL_STYLES[prog.level]?.gradient || 'from-gray-400 to-gray-500'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium truncate tracking-wide">{prog.title}</p>
                                                <p className="text-white/30 text-sm">{prog.duration}</p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <p className="text-white/40">No results found for &quot;{searchQuery}&quot;</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// -----------------------------------------------------------------------------
// Industry Grid with Staggered Wave Animation
// -----------------------------------------------------------------------------
function IndustryGrid({
    categories,
    onCategoryClick
}: {
    categories: typeof PROGRAMME_CATEGORIES;
    onCategoryClick: (id: string) => void;
}) {
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const hasAnimated = useRef(false);

    // Sort categories by priority
    const sortedCategories = useMemo(() => {
        return [...categories]
            .filter(c => c.id !== 'all')
            .sort((a, b) => (CATEGORY_PRIORITY[b.id] || 0) - (CATEGORY_PRIORITY[a.id] || 0));
    }, [categories]);

    // Programme counts
    const programmeCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        PROGRAMMES.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
        return counts;
    }, []);

    // Sophisticated entrance animation
    useEffect(() => {
        if (!gridRef.current || hasAnimated.current) return;
        hasAnimated.current = true;

        const cards = gridRef.current.querySelectorAll('.industry-card');
        const header = headerRef.current;
        const lines = gridRef.current.parentElement?.querySelectorAll('.divider-line');

        // Initial state
        cards.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.transform = 'translateY(40px) scale(0.95)';
        });

        // Create timeline for coordinated animation
        const tl = createTimeline({ autoplay: true });

        // Animate header first
        if (header) {
            tl.add(header, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutExpo'
            }, 0);
        }

        // Animate divider lines
        if (lines) {
            tl.add(lines, {
                scaleX: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            }, 100);
        }

        // Animate cards with wave effect from top-left
        tl.add(cards, {
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            delay: stagger(80, {
                grid: [5, Math.ceil(sortedCategories.length / 5)],
                from: 'first'
            }),
            duration: 700,
            easing: 'easeOutExpo'
        }, 200);

    }, [sortedCategories.length]);

    return (
        <div className="mb-24">
            <div className="flex items-center justify-center gap-4 mb-10">
                <div className="divider-line h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-right" />
                <h3 ref={headerRef} className="text-xs text-white/40 uppercase tracking-[0.35em] font-medium">
                    Browse by Industry
                </h3>
                <div className="divider-line h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left" />
            </div>

            <div
                ref={gridRef}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            >
                {sortedCategories.map((cat, index) => {
                    const Icon = CATEGORY_ICONS[cat.id] || Briefcase;
                    return (
                        <IndustryCard
                            key={cat.id}
                            category={cat}
                            Icon={Icon}
                            count={programmeCounts[cat.id] || 0}
                            onClick={() => onCategoryClick(cat.id)}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// Individual Industry Card with Hover Animation
function IndustryCard({
    category,
    Icon,
    count,
    onClick,
    index
}: {
    category: { id: string; label: string };
    Icon: React.ComponentType<{ className?: string }>;
    count: number;
    onClick: () => void;
    index: number;
}) {
    const cardRef = useRef<HTMLButtonElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (cardRef.current && iconRef.current) {
            // Subtle lift and icon pulse
            animate(cardRef.current, {
                translateY: -6,
                scale: 1.02,
                duration: 400,
                easing: 'easeOutExpo'
            });
            animate(iconRef.current, {
                scale: [1, 1.15, 1.1],
                rotate: [0, -5, 0],
                duration: 500,
                easing: 'easeOutElastic(1, 0.5)'
            });
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current && iconRef.current) {
            animate(cardRef.current, {
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
            animate(iconRef.current, {
                scale: 1,
                rotate: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    };

    return (
        <button
            ref={cardRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="industry-card group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] hover:border-gold/30 transition-colors duration-500 text-left overflow-hidden"
            style={{ willChange: 'transform' }}
        >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 group-hover:from-gold/[0.03] group-hover:to-transparent transition-all duration-700 pointer-events-none" />

            <div ref={iconRef} className="relative w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-500">
                <Icon className="w-6 h-6 text-white/60 group-hover:text-gold transition-colors duration-500" />
            </div>

            <h4 className="font-oswald font-semibold text-white text-sm uppercase tracking-wide mb-1 line-clamp-2 group-hover:text-gold transition-colors duration-500">
                {category.label}
            </h4>
            <p className="text-white/30 text-xs font-light">
                {count} programme{count !== 1 ? 's' : ''}
            </p>

            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-white/[0.03] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </div>
        </button>
    );
}

// -----------------------------------------------------------------------------
// Category Drill-Down with Cinematic Transition
// -----------------------------------------------------------------------------
function CategoryDrillDown({
    category,
    onBack
}: {
    category: { id: string; label: string };
    onBack: () => void;
}) {
    const [selectedLevel, setSelectedLevel] = useState('all');
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const programmes = useMemo(() => {
        return PROGRAMMES.filter(p => {
            const matchesCategory = p.category === category.id;
            const matchesLevel = selectedLevel === 'all' || p.level === selectedLevel;
            return matchesCategory && matchesLevel;
        });
    }, [category.id, selectedLevel]);

    const availableLevels = useMemo(() => {
        return PROGRAMME_LEVELS.filter(level =>
            PROGRAMMES.some(p => p.category === category.id && p.level === level.id)
        );
    }, [category.id]);

    const Icon = CATEGORY_ICONS[category.id] || Briefcase;

    // Entrance animation
    useEffect(() => {
        if (!containerRef.current || !headerRef.current) return;

        const tl = createTimeline({ autoplay: true });

        // Container fade in
        tl.add(containerRef.current, {
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        }, 0);

        // Header slide up with stagger
        const headerElements = headerRef.current.querySelectorAll('.header-element');
        tl.add(headerElements, {
            opacity: [0, 1],
            translateY: [30, 0],
            delay: stagger(100),
            duration: 600,
            easing: 'easeOutExpo'
        }, 100);

    }, []);

    // Cards animation on filter change
    useEffect(() => {
        if (!cardsRef.current) return;
        const cards = cardsRef.current.querySelectorAll('.programme-card');
        if (cards.length === 0) return;

        // Reset
        cards.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.transform = 'translateY(30px)';
        });

        animate(cards, {
            opacity: [0, 1],
            translateY: [30, 0],
            delay: stagger(60, { from: 'first' }),
            duration: 500,
            easing: 'easeOutExpo'
        });
    }, [programmes, selectedLevel]);

    const handleBack = useCallback(() => {
        if (containerRef.current) {
            animate(containerRef.current, {
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 250,
                easing: 'easeInCubic',
                onComplete: onBack
            });
        } else {
            onBack();
        }
    }, [onBack]);

    return (
        <div ref={containerRef} className="min-h-[60vh] pb-24">
            {/* Header */}
            <div ref={headerRef} className="mb-12">
                <button
                    onClick={handleBack}
                    className="header-element flex items-center gap-2 text-white/40 hover:text-gold transition-colors mb-6 group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium tracking-wide">Back to Industries</span>
                </button>

                <div className="header-element flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                        <h2 className="font-oswald font-bold text-4xl text-white uppercase tracking-wide">
                            {category.label}
                        </h2>
                        <p className="text-white/40 text-sm mt-1">{programmes.length} programmes available</p>
                    </div>
                </div>
            </div>

            {/* Level Filter */}
            <div className="header-element flex flex-wrap gap-3 mb-10">
                <button
                    onClick={() => setSelectedLevel('all')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${selectedLevel === 'all'
                        ? 'bg-white text-navy shadow-lg'
                        : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                        }`}
                >
                    All Levels
                </button>
                {availableLevels.map(level => {
                    const style = LEVEL_STYLES[level.id];
                    const isActive = selectedLevel === level.id;
                    return (
                        <button
                            key={level.id}
                            onClick={() => setSelectedLevel(level.id)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${isActive
                                ? `bg-gradient-to-r ${style?.gradient} text-white shadow-lg ${style?.glow}`
                                : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                                }`}
                        >
                            {level.label}
                        </button>
                    );
                })}
            </div>

            {/* Programme Cards */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programmes.length > 0 ? (
                    programmes.map(prog => <ProgrammeCard key={prog.id} programme={prog} />)
                ) : (
                    <div className="col-span-full text-center py-16">
                        <p className="text-white/40">No programmes match this filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Programme Card with Hover Animation
// -----------------------------------------------------------------------------
function ProgrammeCard({ programme }: { programme: Programme }) {
    const style = LEVEL_STYLES[programme.level] || LEVEL_STYLES.certificate;
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (cardRef.current) {
            animate(cardRef.current, {
                translateY: -8,
                scale: 1.015,
                duration: 400,
                easing: 'easeOutExpo'
            });
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            animate(cardRef.current, {
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="programme-card"
            style={{ willChange: 'transform' }}
        >
            <Link href={`/programmes/${programme.id}`}>
                <div className="relative h-full p-7 rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 group">
                    {/* Accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient}`} />

                    {/* Level badge */}
                    <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-widest ${style.bg} ${style.text} mb-5`}>
                        {programme.level.replace('-', ' ')}
                    </span>

                    {/* Title */}
                    <h3 className="font-oswald font-semibold text-white uppercase tracking-wide text-lg mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-500">
                        {programme.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-2">
                        {programme.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-white/30 text-xs mb-6">
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {programme.duration}
                        </span>
                        {programme.delivery.includes('online') && (
                            <span className="flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5" />
                                Online
                            </span>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                            View Details
                        </span>
                        <div className="w-9 h-9 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Curated Rail with Horizontal Scroll
// -----------------------------------------------------------------------------
function CuratedRail({
    title,
    icon: Icon,
    programmes
}: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    programmes: Programme[];
}) {
    const railRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!railRef.current || hasAnimated.current) return;
        hasAnimated.current = true;

        const cards = railRef.current.querySelectorAll('.rail-card');
        if (cards.length === 0) return;

        cards.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.transform = 'translateX(40px)';
        });

        animate(cards, {
            translateX: [40, 0],
            opacity: [0, 1],
            delay: stagger(60),
            duration: 600,
            easing: 'easeOutExpo'
        });
    }, []);

    if (programmes.length === 0) return null;

    return (
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
                <Icon className="w-5 h-5 text-gold" />
                <h3 className="font-oswald font-semibold text-xl text-white uppercase tracking-wide">
                    {title}
                </h3>
            </div>

            <div
                ref={railRef}
                className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {programmes.map(prog => (
                    <Link
                        key={prog.id}
                        href={`/programmes/${prog.id}`}
                        className="rail-card flex-shrink-0 w-80 p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] hover:border-gold/30 transition-all duration-500 scroll-snap-align-start group"
                    >
                        <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${LEVEL_STYLES[prog.level]?.gradient || 'from-gray-400 to-gray-500'} mb-4`} />
                        <h4 className="font-oswald font-semibold text-white uppercase text-sm tracking-wide mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-500">
                            {prog.title}
                        </h4>
                        <p className="text-white/40 text-xs mb-4 line-clamp-2">{prog.description}</p>
                        <div className="flex items-center gap-2 text-white/30 text-xs">
                            <Clock className="w-3 h-3" />
                            {prog.duration}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Ambient Background with Breathing Animation
// -----------------------------------------------------------------------------
function AmbientOrbs() {
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current || getReducedMotion()) return;
        hasAnimated.current = true;

        // Breathing animation for orbs
        if (orb1Ref.current) {
            animate(orb1Ref.current, {
                scale: [1, 1.15, 1],
                opacity: [0.03, 0.06, 0.03],
                duration: 8000,
                easing: 'easeInOutSine',
                loop: true
            });
        }
        if (orb2Ref.current) {
            animate(orb2Ref.current, {
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.08, 0.05],
                translateX: [0, 30, 0],
                translateY: [0, -20, 0],
                duration: 10000,
                easing: 'easeInOutSine',
                loop: true
            });
        }
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                ref={orb1Ref}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[100px]"
                style={{ willChange: 'transform, opacity' }}
            />
            <div
                ref={orb2Ref}
                className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-maroon/[0.05] blur-[120px]"
                style={{ willChange: 'transform, opacity' }}
            />
        </div>
    );
}

// -----------------------------------------------------------------------------
// Kinetic Title with Character Animation
// -----------------------------------------------------------------------------
function KineticTitle() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current || !titleRef.current) return;
        hasAnimated.current = true;

        const reducedMotion = getReducedMotion();

        // Subtitle animation first
        if (subtitleRef.current) {
            if (reducedMotion) {
                subtitleRef.current.style.opacity = '1';
            } else {
                animate(subtitleRef.current, {
                    opacity: [0, 1],
                    translateY: [10, 0],
                    duration: 600,
                    easing: 'easeOutExpo'
                });
            }
        }

        // Title character animation
        const title = titleRef.current;
        const text = title.textContent || '';
        const isGoldWord = (word: string) => word === 'GALAXY';

        // Split into words
        const words = text.split(' ');
        title.innerHTML = '';

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'inline-block mr-3';

            // Split word into characters
            word.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.className = `inline-block ${isGoldWord(word) ? 'text-gold' : ''}`;
                charSpan.style.opacity = reducedMotion ? '1' : '0';
                wordSpan.appendChild(charSpan);
            });

            title.appendChild(wordSpan);
            if (wordIndex < words.length - 1) {
                title.appendChild(document.createTextNode(' '));
            }
        });

        if (!reducedMotion) {
            const chars = title.querySelectorAll('span > span');
            animate(chars, {
                opacity: [0, 1],
                translateY: [{ to: -20, ease: 'outExpo', duration: 400 }, { to: 0, ease: 'outBounce', duration: 600 }],
                rotate: [{ from: -10, to: 0 }],
                delay: stagger(35, { from: 'center' }),
                easing: 'outExpo'
            });
        }
    }, []);

    return (
        <div className="text-center mb-12">
            <span
                ref={subtitleRef}
                className="text-[10px] text-gold uppercase tracking-[0.5em] font-semibold block mb-4"
                style={{ opacity: 0 }}
            >
                Explore Our Offerings
            </span>
            <h2
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white uppercase tracking-wide"
            >
                Programme <span className="text-gold">Galaxy</span>
            </h2>
        </div>
    );
}

// =============================================================================
// Main Component
// =============================================================================
export default function ProgrammeGalaxy() {
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<'browse' | 'category'>('browse');
    const [selectedCategory, setSelectedCategory] = useState<{ id: string; label: string } | null>(null);

    const displayCategories = useMemo(() => {
        return PROGRAMME_CATEGORIES.filter(cat =>
            cat.id === 'all' || PROGRAMMES.some(p => p.category === cat.id)
        );
    }, []);

    // Sort programmes by category priority (high-value first)
    const sortByPriority = (programmes: typeof PROGRAMMES) => {
        return [...programmes].sort((a, b) =>
            (CATEGORY_PRIORITY[b.category] || 0) - (CATEGORY_PRIORITY[a.category] || 0)
        );
    };

    const featuredProgrammes = useMemo(() => {
        const featured = PROGRAMMES.filter(p => p.featured);
        return sortByPriority(featured).slice(0, 8);
    }, []);

    const quickCertificates = useMemo(() => {
        const quick = PROGRAMMES.filter(p => {
            const hours = parseInt(p.duration);
            return !isNaN(hours) && hours <= 30;
        });
        // Sort by priority so high-value quick certs appear first
        return sortByPriority(quick).slice(0, 8);
    }, []);

    const handleCategoryClick = useCallback((categoryId: string) => {
        const cat = PROGRAMME_CATEGORIES.find(c => c.id === categoryId);
        if (cat) {
            setSelectedCategory({ id: cat.id, label: cat.label });
            setView('category');
        }
    }, []);

    const handleBackToBrowse = useCallback(() => {
        setView('browse');
        setSelectedCategory(null);
    }, []);

    return (
        <div className="relative w-full min-h-[80vh]">
            <AmbientOrbs />

            <div className="relative z-10">
                {/* Kinetic Title */}
                <KineticTitle />

                {/* Search */}
                <SpotlightSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onCategoryClick={handleCategoryClick}
                />

                {/* Content */}
                {view === 'browse' ? (
                    <>
                        <IndustryGrid categories={displayCategories} onCategoryClick={handleCategoryClick} />
                        <CuratedRail title="Featured Programmes" icon={Sparkles} programmes={featuredProgrammes} />
                        <CuratedRail title="Quick Certificates" icon={Zap} programmes={quickCertificates} />
                    </>
                ) : selectedCategory ? (
                    <CategoryDrillDown category={selectedCategory} onBack={handleBackToBrowse} />
                ) : null}
            </div>
        </div>
    );
}
