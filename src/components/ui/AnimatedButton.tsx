'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HoverText } from './HoverText';

interface AnimatedButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
}

/**
 * Clone1-style animated button with scale and text reveal
 */
export function AnimatedButton({ href, children, variant = 'primary', className = "" }: AnimatedButtonProps) {
    const variantClasses = {
        primary: 'bg-gold text-navy hover:bg-white',
        secondary: 'bg-navy text-white hover:bg-maroon',
        ghost: 'border-2 border-current bg-transparent hover:bg-current hover:text-white'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={className}
        >
            <Link
                href={href}
                className={`block px-8 py-4 font-bold uppercase tracking-widest rounded-sm text-center transition-colors ${variantClasses[variant]}`}
            >
                {typeof children === 'string' ? (
                    <HoverText text={children} />
                ) : (
                    children
                )}
            </Link>
        </motion.div>
    );
}
