'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageRevealProps {
    src: string;
    alt: string;
    aspectRatio?: 'video' | 'square' | 'portrait';
    className?: string;
}

/**
 * Clone1-style image with zoom on hover
 */
export function ImageReveal({ src, alt, aspectRatio = 'video', className = "" }: ImageRevealProps) {
    const aspectClasses = {
        video: 'aspect-video',
        square: 'aspect-square',
        portrait: 'aspect-[3/4]'
    };

    return (
        <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]} ${className}`}>
            <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                />
            </motion.div>
            <motion.div
                className="absolute inset-0 bg-black/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
}
