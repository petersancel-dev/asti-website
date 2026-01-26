import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, hoverEffect = true, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl",
                    hoverEffect && "transition-colors duration-300 hover:bg-white/10 hover:border-white/20",
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                {...props}
            >
                {/* Shine effect on top border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

                {/* Shine effect on left border */}
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-30" />

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";
