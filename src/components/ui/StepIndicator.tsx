import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface StepIndicatorProps {
    stepNumber: number | string;
    isActive?: boolean;
    isCompleted?: boolean;
    className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
    stepNumber,
    isActive = false,
    isCompleted = false,
    className,
}) => {
    return (
        <div className={cn("relative flex items-center justify-center w-12 h-12", className)}>
            {/* Outer Glow Ring - Pulse animation when active */}
            {isActive && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-gold/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {/* Border Ring */}
            <motion.div
                className={cn(
                    "absolute inset-0 rounded-full border-2",
                    isActive || isCompleted ? "border-gold" : "border-white/20"
                )}
                initial={false}
                animate={{
                    borderColor: isActive || isCompleted ? "#D4AF37" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Inner Circle / Content */}
            <motion.div
                className={cn(
                    "relative z-10 flex items-center justify-center w-full h-full rounded-full text-base font-bold font-oswald",
                    isActive || isCompleted ? "bg-gold text-navy" : "bg-navy/80 text-white/50"
                )}
                initial={false}
                animate={{
                    backgroundColor: isActive || isCompleted ? "#D4AF37" : "rgba(10, 25, 47, 0.8)",
                    color: isActive || isCompleted ? "#0A192F" : "rgba(255,255,255,0.5)",
                    scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
            >
                {isCompleted ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    stepNumber
                )}
            </motion.div>
        </div>
    );
};
