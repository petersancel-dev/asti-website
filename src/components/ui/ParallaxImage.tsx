'use client';

import { motion, MotionValue } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { useScrollTransform } from '@/hooks/useScrollTransform';
import { cn } from '@/lib/utils';

interface ParallaxImageProps extends Omit<ImageProps, 'ref'> {
    className?: string;
    containerClassName?: string;
    /**
     * Speed factor. 
     * 0 = no movement
     * 0.5 = half speed of scroll (pronounced parallax)
     * -0.5 = reverse direction
     */
    parallaxFactor?: number;
    /**
     * Starting scale to prevent whitespace revealing during movement
     * Default: 1.1
     */
    scale?: number;
    /**
     * Overlay opacity (0-1) for text readability
     */
    overlayOpacity?: number;
}

export function ParallaxImage({
    className,
    containerClassName,
    parallaxFactor = 0.3,
    scale = 1.1,
    overlayOpacity = 0,
    alt,
    src,
    ...props
}: ParallaxImageProps) {
    // We want the image to move slightly slower than the scroll
    // effectively "sticking" a bit, or moving faster for opposite tracking

    const { ref, value: y } = useScrollTransform({
        inputRange: [0, 1],
        outputRange: ["0%", `${parallaxFactor * 100}%`],
        offset: ["start start", "end start"]
    });

    return (
        <div
            ref={ref}
            className={cn("relative overflow-hidden w-full h-full", containerClassName)}
        >
            <motion.div
                className={cn("absolute inset-0 w-full h-full", className)}
                style={{ y, scale }}
            >
                <Image
                    src={src}
                    alt={alt || "Background"}
                    fill
                    className="object-cover"
                    {...props}
                />
            </motion.div>

            {overlayOpacity > 0 && (
                <div
                    className="absolute inset-0 bg-navy pointer-events-none"
                    style={{ opacity: overlayOpacity }}
                />
            )}
        </div>
    );
}
