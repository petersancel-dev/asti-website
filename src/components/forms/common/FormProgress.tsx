'use client';

import { motion } from 'framer-motion';

interface FormProgressProps {
    currentStep: number;
    totalSteps: number;
    stepTitles: string[];
}

export default function FormProgress({ currentStep, totalSteps, stepTitles }: FormProgressProps) {
    const currentTitle = stepTitles[currentStep];
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="mb-8">
            {/* Mobile / Compact View */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">
                    Step {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-sm font-semibold text-navy truncate ml-4">
                    {currentTitle}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            </div>

            {/* Desktop Stepper Visuals (Optional - Hidden on small screens if too cramped) */}
            <div className="hidden md:flex justify-between mt-2 px-1">
                {stepTitles.map((title, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center w-8 ${isActive ? 'opacity-100' : isCompleted ? 'opacity-70' : 'opacity-30'
                                }`}
                        >
                            <div
                                className={`w-2 h-2 rounded-full mb-1 transition-colors ${isActive || isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            />
                            {isActive && (
                                <motion.span
                                    layoutId="activeStepLabel"
                                    className="text-xs font-semibold text-blue-600 text-center absolute mt-4 w-32 -ml-[3.75rem]" // Centering trick
                                >
                                    {title}
                                </motion.span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
