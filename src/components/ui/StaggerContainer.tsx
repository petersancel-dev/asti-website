'use client';

import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    /**
     * Delay between each child's animation in seconds
     * Default: 0.1
     */
    staggerDelay?: number;
    /**
     * Initial delay before starting the sequence
     * Default: 0
     */
    delay?: number;
    /**
     * Animation offset for children (pixels)
     * Default: 20
     */
    childOffset?: number;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    delay = 0,
    childOffset = 20,
    ...props
}: StaggerContainerProps) {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Child item wrapper - use this to wrap individual items inside the container
// or rely on motion components with compatible variants
export function StaggerItem({ children, className, offset = 20 }: { children: ReactNode, className?: string, offset?: number }) {
    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: offset
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}
