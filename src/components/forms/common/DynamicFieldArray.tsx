'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UseFieldArrayReturn, UseFormRegister, FieldValues, Path, FieldErrors } from 'react-hook-form';
import { inputStyles } from './FormField';

interface Column<T> {
    name: string;
    label: string;
    type?: 'text' | 'date' | 'select';
    options?: readonly string[]; // For select type
    placeholder?: string;
    required?: boolean;
}

interface DynamicFieldArrayProps<T extends FieldValues> {
    fields: UseFieldArrayReturn<T, any>['fields'];
    append: UseFieldArrayReturn<T, any>['append'];
    remove: UseFieldArrayReturn<T, any>['remove'];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    columns: Column<T>[];
    title: string;
    emptyMessage?: string;
    addButtonLabel?: string;
    maxRows?: number;
    arrayName: string; // The name of the array field in the schema (e.g., "exams")
}

export default function DynamicFieldArray<T extends FieldValues>({
    fields,
    append,
    remove,
    register,
    errors,
    columns,
    title,
    emptyMessage = "No items added yet.",
    addButtonLabel = "Add Item",
    maxRows,
    arrayName,
}: DynamicFieldArrayProps<T>) {
    // Helper to get nested error safely
    const getError = (index: number, colName: string) => {
        // @ts-ignore - dynamic access to deep errors
        return errors?.[arrayName]?.[index]?.[colName]?.message;
    };

    const handleAdd = () => {
        if (maxRows && fields.length >= maxRows) return;
        // Create empty object based on columns
        const emptyRow = columns.reduce((acc, col) => ({ ...acc, [col.name]: '' }), {});
        append(emptyRow as any); // Type assertion needed for generic append
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {(!maxRows || fields.length < maxRows) && (
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span>+</span> {addButtonLabel}
                    </button>
                )}
            </div>

            {fields.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                    {emptyMessage}
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence initial={false}>
                        {fields.map((field, index) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group"
                            >
                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    aria-label="Remove item"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-8">
                                    {columns.map((col) => (
                                        <div key={col.name} className="min-w-0">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                {col.label} {col.required && <span className="text-red-500">*</span>}
                                            </label>

                                            {col.type === 'select' && col.options ? (
                                                <select
                                                    {...register(`${arrayName}.${index}.${col.name}` as Path<T>)}
                                                    className={`${inputStyles} py-2 text-sm`}
                                                >
                                                    <option value="">Select...</option>
                                                    {col.options.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={col.type || 'text'}
                                                    placeholder={col.placeholder}
                                                    {...register(`${arrayName}.${index}.${col.name}` as Path<T>)}
                                                    className={`${inputStyles} py-2 text-sm`}
                                                />
                                            )}

                                            {getError(index, col.name) && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    {getError(index, col.name)}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
