'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PROGRAMME_CATEGORIES, PROGRAMME_LEVELS, PROGRAMMES, Programme } from '@/constants/programmes';

// =============================================================================
// PROGRAMME TREE - Interactive Branching Gallery
// A visual tree navigation through Category → Level → Programme
// =============================================================================

interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
    programme?: Programme;
}

// Level colors matching the qualification pathway
const LEVEL_COLORS: Record<string, { bg: string; border: string; glow: string }> = {
    introduction: { bg: 'bg-rose-500', border: 'border-rose-500', glow: 'shadow-rose-500/30' },
    certificate: { bg: 'bg-emerald-500', border: 'border-emerald-500', glow: 'shadow-emerald-500/30' },
    certification: { bg: 'bg-cyan-500', border: 'border-cyan-500', glow: 'shadow-cyan-500/30' },
    diploma: { bg: 'bg-blue-500', border: 'border-blue-500', glow: 'shadow-blue-500/30' },
    associate: { bg: 'bg-purple-500', border: 'border-purple-500', glow: 'shadow-purple-500/30' },
    degree: { bg: 'bg-violet-500', border: 'border-violet-500', glow: 'shadow-violet-500/30' },
    masters: { bg: 'bg-amber-500', border: 'border-amber-500', glow: 'shadow-amber-500/30' },
};

// Animated connector line
function TreeConnector({ isActive }: { isActive: boolean }) {
    return (
        <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
                scaleX: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
                backgroundColor: isActive ? '#d4af37' : '#374151'
            }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'left' }}
        />
    );
}

// Branch node component
function BranchNode({
    item,
    isSelected,
    onClick,
    depth,
    index,
}: {
    item: { id: string; label: string };
    isSelected: boolean;
    onClick: () => void;
    depth: number;
    index: number;
}) {
    return (
        <motion.button
            onClick={onClick}
            className={`
                relative flex items-center gap-3 px-5 py-4 rounded-sm text-left
                transition-all duration-300 w-full
                ${isSelected
                    ? 'bg-gold text-navy shadow-lg shadow-gold/20'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }
            `}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Connector dot */}
            <span className={`
                w-3 h-3 rounded-full flex-shrink-0
                ${isSelected ? 'bg-navy' : 'bg-gold/50'}
            `} />

            {/* Label */}
            <span className="font-oswald font-bold uppercase tracking-wide text-sm truncate">
                {item.label}
            </span>

            {/* Arrow indicator */}
            <motion.svg
                className={`w-4 h-4 ml-auto flex-shrink-0 ${isSelected ? 'text-navy' : 'text-white/30'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: isSelected ? 0 : -5, opacity: isSelected ? 1 : 0.5 }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
        </motion.button>
    );
}

// Programme card at the leaf of the tree
function ProgrammeLeaf({
    programme,
    index,
}: {
    programme: Programme;
    index: number;
}) {
    const levelStyle = LEVEL_COLORS[programme.level] || LEVEL_COLORS.certificate;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            className="group"
        >
            <Link href={`/programmes/${programme.id}`}>
                <div className={`
                    relative p-6 rounded-sm bg-white/5 backdrop-blur-sm
                    border-l-4 ${levelStyle.border}
                    hover:bg-white/10 transition-all duration-300
                    cursor-pointer overflow-hidden
                `}>
                    {/* Glow effect */}
                    <motion.div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 ${levelStyle.bg} blur-xl transition-opacity duration-300`}
                    />

                    {/* Level badge */}
                    <span className={`
                        inline-block px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest
                        text-white ${levelStyle.bg} mb-3
                    `}>
                        {programme.level.replace('-', ' ')}
                    </span>

                    {/* Title */}
                    <h3 className="font-oswald font-bold text-white uppercase tracking-wide text-lg mb-2 group-hover:text-gold transition-colors">
                        {programme.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                        {programme.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-white/50 text-xs">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {programme.duration}
                        </span>
                        {programme.delivery.includes('online') && (
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Online
                            </span>
                        )}
                    </div>

                    {/* Hover arrow */}
                    <motion.div
                        className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                    >
                        <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
}

// Main Programme Tree Component
export default function ProgrammeTree() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    // Filter categories that have programmes
    const activeCategories = PROGRAMME_CATEGORIES.filter(cat =>
        cat.id !== 'all' && PROGRAMMES.some(p => p.category === cat.id)
    );

    // Get levels available for selected category
    const availableLevels = selectedCategory
        ? PROGRAMME_LEVELS.filter(level =>
            PROGRAMMES.some(p => p.category === selectedCategory && p.level === level.id)
        )
        : [];

    // Get programmes for selected category + level
    const filteredProgrammes = PROGRAMMES.filter(p => {
        if (!selectedCategory) return false;
        if (selectedLevel) {
            return p.category === selectedCategory && p.level === selectedLevel;
        }
        return p.category === selectedCategory;
    });

    const handleCategoryClick = (categoryId: string) => {
        if (selectedCategory === categoryId) {
            // Collapse if already selected
            setSelectedCategory(null);
            setSelectedLevel(null);
        } else {
            setSelectedCategory(categoryId);
            setSelectedLevel(null);
        }
    };

    const handleLevelClick = (levelId: string) => {
        setSelectedLevel(selectedLevel === levelId ? null : levelId);
    };

    return (
        <div className="w-full">
            {/* Tree Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="text-xs text-gold uppercase tracking-[0.3em] font-bold mb-2 block">
                    Navigate Your Path
                </span>
                <h2 className="text-3xl md:text-4xl font-oswald font-bold text-white uppercase tracking-wide">
                    Qualification <span className="text-gold">Tree</span>
                </h2>
                <p className="text-white/60 mt-2 text-sm">
                    Select a category → Choose your level → Explore programmes
                </p>
            </motion.div>

            {/* Breadcrumb Trail */}
            <motion.div
                className="flex items-center gap-2 mb-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <span className={`px-3 py-1 rounded-sm ${!selectedCategory ? 'bg-gold text-navy' : 'bg-white/10 text-white/60'}`}>
                    Categories
                </span>
                {selectedCategory && (
                    <>
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className={`px-3 py-1 rounded-sm ${!selectedLevel ? 'bg-gold text-navy' : 'bg-white/10 text-white/60'}`}>
                            {activeCategories.find(c => c.id === selectedCategory)?.label}
                        </span>
                    </>
                )}
                {selectedLevel && (
                    <>
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="px-3 py-1 rounded-sm bg-gold text-navy">
                            {PROGRAMME_LEVELS.find(l => l.id === selectedLevel)?.label}
                        </span>
                    </>
                )}
            </motion.div>

            {/* Three-Column Tree Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Column 1: Categories */}
                <div className="space-y-2">
                    <h3 className="text-xs text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold font-bold">1</span>
                        Category
                    </h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {activeCategories.map((cat, index) => (
                                <BranchNode
                                    key={cat.id}
                                    item={cat}
                                    isSelected={selectedCategory === cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    depth={0}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Column 2: Levels */}
                <div className="space-y-2">
                    <h3 className="text-xs text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold font-bold">2</span>
                        Level
                    </h3>
                    <AnimatePresence mode="wait">
                        {selectedCategory ? (
                            <motion.div
                                key={selectedCategory}
                                className="space-y-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                {availableLevels.length > 0 ? (
                                    availableLevels.map((level, index) => (
                                        <BranchNode
                                            key={level.id}
                                            item={level}
                                            isSelected={selectedLevel === level.id}
                                            onClick={() => handleLevelClick(level.id)}
                                            depth={1}
                                            index={index}
                                        />
                                    ))
                                ) : (
                                    <div className="text-white/40 text-sm p-4 bg-white/5 rounded-sm">
                                        No levels available for this category
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="text-white/40 text-sm p-6 bg-white/5 rounded-sm text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <svg className="w-8 h-8 mx-auto mb-2 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                </svg>
                                Select a category first
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Column 3: Programmes */}
                <div className="space-y-2">
                    <h3 className="text-xs text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold font-bold">3</span>
                        Programmes
                        {filteredProgrammes.length > 0 && (
                            <span className="ml-auto text-gold">({filteredProgrammes.length})</span>
                        )}
                    </h3>
                    <AnimatePresence mode="wait">
                        {selectedCategory ? (
                            <motion.div
                                key={`${selectedCategory}-${selectedLevel}`}
                                className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                {filteredProgrammes.length > 0 ? (
                                    filteredProgrammes.map((programme, index) => (
                                        <ProgrammeLeaf
                                            key={programme.id}
                                            programme={programme}
                                            index={index}
                                        />
                                    ))
                                ) : (
                                    <div className="text-white/40 text-sm p-4 bg-white/5 rounded-sm">
                                        No programmes match your selection
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="text-white/40 text-sm p-6 bg-white/5 rounded-sm text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <svg className="w-8 h-8 mx-auto mb-2 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Browse programmes here
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Quick Stats */}
            <motion.div
                className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div>
                    <div className="text-3xl font-oswald font-bold text-gold">{activeCategories.length}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest">Categories</div>
                </div>
                <div>
                    <div className="text-3xl font-oswald font-bold text-gold">{PROGRAMME_LEVELS.length}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest">Levels</div>
                </div>
                <div>
                    <div className="text-3xl font-oswald font-bold text-gold">{PROGRAMMES.length}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest">Programmes</div>
                </div>
            </motion.div>
        </div>
    );
}
