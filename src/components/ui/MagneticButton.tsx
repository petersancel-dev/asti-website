'use client';

import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number; // How far it can move (pixels)
    activeScale?: number; // Scale on hover
}

export function MagneticButton({
    children,
    className,
    strength = 30,
    activeScale = 1.1
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX, y: middleY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    // Physics for the movement
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", ...springConfig }}
            whileHover={{ scale: activeScale }}
            whileTap={{ scale: 0.95 }}
            className={cn("inline-block cursor-pointer", className)}
        >
            {children}
        </motion.div>
    );
}
