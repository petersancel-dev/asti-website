'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const FormField = ({ label, error, required, className = '', children }: FormFieldProps) => (
    <div className={`space-y-1.5 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {children}
        <AnimatePresence mode="wait">
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-sm text-red-600"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);

export const inputStyles = `
  w-full px-4 py-2.5 rounded-lg border border-gray-300 
  bg-white text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  transition-all duration-200
  disabled:bg-gray-100 disabled:cursor-not-allowed
`;

export const selectStyles = `
  w-full px-4 py-2.5 rounded-lg border border-gray-300 
  bg-white text-gray-900
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  transition-all duration-200
`;
