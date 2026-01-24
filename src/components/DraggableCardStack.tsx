'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, PanInfo, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// =============================================================================
// DRAGGABLE STACKING CARD CAROUSEL - CLEAN REVERT
// =============================================================================

interface ProgrammeCard {
    id: string;
    title: string;
    level: string;
    category: string;
    duration: string;
    description: string;
    delivery: string[];
    featured?: boolean;
}

interface DraggableCardStackProps {
    programmes: ProgrammeCard[];
    onCardClick?: (programme: ProgrammeCard) => void;
}

// Simplified Colors: Introductory (Blue), Certificate (Green), Diploma (Gold)
const LEVEL_COLORS: Record<string, { bg: string; text: string; badge: string; shadow: string }> = {
    introductory: {
        bg: 'bg-white',
        text: 'text-blue-900',
        badge: 'bg-blue-600',
        shadow: 'shadow-blue-900/10'
    },
    certificate: {
        bg: 'bg-white',
        text: 'text-emerald-900',
        badge: 'bg-emerald-600',
        shadow: 'shadow-emerald-900/10'
    },
    diploma: {
        bg: 'bg-white',
        text: 'text-yellow-700',
        badge: 'bg-yellow-600',
        shadow: 'shadow-yellow-900/10'
    },
};

const DEFAULT_STYLE = LEVEL_COLORS.certificate;

function DraggableCard({
    programme,
    index,
    totalCards,
    onSwipe,
    isTop,
}: {
    programme: ProgrammeCard;
    index: number;
    totalCards: number;
    onSwipe: (direction: 'left' | 'right') => void;
    isTop: boolean;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });
    const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
    const rotateSpring = useSpring(rotate, { stiffness: 300, damping: 30 });

    const stackScale = 1 - (index * 0.04);
    const stackY = index * 10;
    const zIndex = totalCards - index;

    const leftOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
    const rightOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = 120;
        const velocity = info.velocity.x;

        if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 600) {
            const direction = info.offset.x > 0 ? 'right' : 'left';
            onSwipe(direction);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const style = LEVEL_COLORS[programme.level] || DEFAULT_STYLE;

    return (
        <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none perspective-1000"
            style={{
                x: isTop ? springX : 0,
                y: isTop ? springY : stackY,
                rotate: isTop ? rotateSpring : 0,
                scale: stackScale,
                zIndex,
            }}
            drag={isTop}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{
                scale: stackScale,
                opacity: index < 4 ? 1 - (index * 0.1) : 0,
                y: stackY
            }}
            exit={{
                x: 600 * (Math.random() > 0.5 ? 1 : -1),
                opacity: 0,
                rotate: 20 * (Math.random() > 0.5 ? 1 : -1),
                transition: { duration: 0.4 }
            }}
            whileHover={isTop ? { scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className={`
                relative w-full h-full rounded-2xl overflow-hidden
                bg-white shadow-xl ${style.shadow}
                border border-gray-100
                flex flex-col
            `}>
                <div className="p-8 flex flex-col h-full bg-white">
                    {/* Badge and Metadata */}
                    <div className="flex justify-between items-start mb-6">
                        <span className={`
                            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white
                            ${style.badge}
                        `}>
                            {programme.level === 'introductory' ? 'Introductory' :
                                programme.level === 'certificate' ? 'Certificate' :
                                    'Diploma (Advanced)'}
                        </span>

                        <div className="flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {programme.duration}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-oswald font-bold text-navy mt-2 leading-tight">
                        {programme.title}
                    </h3>

                    <div className="h-1 w-12 bg-gold/50 my-4" />

                    {/* Description */}
                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-6 flex-grow">
                        {programme.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                        <Link href={`/programmes/${programme.id}`} className="group flex items-center gap-2">
                            <span className="text-navy font-bold uppercase text-xs tracking-widest group-hover:text-gold transition-colors">
                                View Details
                            </span>
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Swipe Overlays */}
                {isTop && (
                    <>
                        <motion.div
                            className="absolute top-8 left-8 border-4 border-red-500 rounded-lg px-4 py-2 transform -rotate-12 opacity-0 z-20 bg-white/90"
                            style={{ opacity: leftOpacity }}
                        >
                            <span className="text-red-500 font-bold text-2xl uppercase tracking-widest">SKIP</span>
                        </motion.div>

                        <motion.div
                            className="absolute top-8 right-8 border-4 border-green-500 rounded-lg px-4 py-2 transform rotate-12 opacity-0 z-20 bg-white/90"
                            style={{ opacity: rightOpacity }}
                        >
                            <span className="text-green-500 font-bold text-2xl uppercase tracking-widest">SAVE</span>
                        </motion.div>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default function DraggableCardStack({ programmes, onCardClick }: DraggableCardStackProps) {
    const [cardStack, setCardStack] = useState(programmes.slice(0, 10));
    const [swipedCards, setSwipedCards] = useState<ProgrammeCard[]>([]);

    useEffect(() => {
        setCardStack(programmes.slice(0, 10));
        setSwipedCards([]);
    }, [programmes]);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (cardStack.length === 0) return;
        const [swiped, ...rest] = cardStack;

        if (direction === 'right') {
            setSwipedCards(prev => [...prev, swiped]);
        }

        const nextIndex = programmes.findIndex(p => p.id === swiped.id) + 10;
        if (nextIndex < programmes.length) {
            setCardStack([...rest, programmes[nextIndex]]);
        } else if (rest.length > 0) {
            setCardStack(rest);
        } else {
            setCardStack(programmes.slice(0, 10)); // Loop
        }
    };

    const undoSwipe = () => {
        if (swipedCards.length === 0) return;
        const lastSwiped = swipedCards[swipedCards.length - 1];
        setSwipedCards(prev => prev.slice(0, -1));
        setCardStack(prev => [lastSwiped, ...prev].slice(0, 10));
    };

    return (
        <div className="relative w-full max-w-md mx-auto my-12">
            <div className="relative h-[450px] w-full perspective-1000">
                <AnimatePresence mode="popLayout">
                    {cardStack.map((prog, i) => (
                        <DraggableCard
                            key={prog.id}
                            programme={prog}
                            index={i}
                            totalCards={cardStack.length}
                            onSwipe={handleSwipe}
                            isTop={i === 0}
                        />
                    ))}
                </AnimatePresence>

                {cardStack.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                        <div>
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold text-navy">All Caught Up!</h3>
                            <button
                                onClick={() => setCardStack(programmes.slice(0, 10))}
                                className="mt-4 px-6 py-2 bg-navy text-white rounded-full font-bold uppercase text-sm"
                            >
                                Start Over
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls - Clean Style */}
            <div className="flex justify-center items-center gap-6 mt-8">
                <button
                    onClick={undoSwipe}
                    disabled={swipedCards.length === 0}
                    className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-navy hover:border-navy transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                </button>

                <button
                    onClick={() => handleSwipe('left')}
                    disabled={cardStack.length === 0}
                    className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm active:scale-95"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <button
                    onClick={() => handleSwipe('right')}
                    disabled={cardStack.length === 0}
                    className="w-14 h-14 rounded-full bg-navy border border-navy flex items-center justify-center text-white hover:bg-navy-light transition-all shadow-md active:scale-95"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
            </div>
            <p className="text-center mt-6 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                {swipedCards.length} Saved
            </p>
        </div>
    );
}
