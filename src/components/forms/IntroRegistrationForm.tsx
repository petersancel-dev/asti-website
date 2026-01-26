'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { introFormSchema, introFormDefaults, type IntroFormData } from '@/lib/schemas/introFormSchema';

// Form field component for consistent styling
interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

const FormField = ({ label, error, required, children }: FormFieldProps) => (
    <div className="space-y-1.5">
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

// Input styles
const inputStyles = `
  w-full px-4 py-2.5 rounded-lg border border-gray-300 
  bg-white text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  transition-all duration-200
  disabled:bg-gray-100 disabled:cursor-not-allowed
`;

const selectStyles = `
  w-full px-4 py-2.5 rounded-lg border border-gray-300 
  bg-white text-gray-900
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  transition-all duration-200
`;

// Section header component
const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
);

export default function IntroRegistrationForm() {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<IntroFormData>({
        resolver: zodResolver(introFormSchema as any),
        defaultValues: introFormDefaults,
        mode: 'onBlur',
    });

    const hasDisability = watch('hasDisability');

    const onSubmit = async (data: IntroFormData) => {
        setSubmitStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formType: 'introduction', data }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Submission failed');
            }

            setSubmitStatus('success');
            reset();
        } catch (err) {
            setSubmitStatus('error');
            setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    };

    // Success state
    if (submitStatus === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto p-8 bg-green-50 rounded-2xl border border-green-200 text-center"
            >
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Submitted!</h2>
                <p className="text-green-700 mb-6">
                    Thank you for registering. We&apos;ll be in touch shortly to confirm your enrollment.
                </p>
                <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Register Another Student
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Introduction Course Registration</h1>
                <p className="text-gray-600">Complete the form below to register for an introduction course at ASTI</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit, (errors) => console.error('Intro Form Validation Errors:', errors))} className="space-y-8">
                {/* Section 1: Programme Information */}
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <SectionHeader title="Programme Information" icon="📚" />

                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField label="Course Registering For" error={errors.courseRegisteringFor?.message} required>
                            <input
                                type="text"
                                {...register('courseRegisteringFor')}
                                placeholder="e.g., Introduction to Fiber Optics"
                                className={inputStyles}
                            />
                        </FormField>

                        <FormField label="Are you a returning student?">
                            <div className="flex items-center gap-4 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" {...register('isReturningStudent')} value="false" defaultChecked />
                                    <span>No</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" {...register('isReturningStudent')} value="true" />
                                    <span>Yes</span>
                                </label>
                            </div>
                        </FormField>
                    </div>
                </motion.section>

                {/* Section 2: Personal Details */}
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <SectionHeader title="Personal Details" icon="👤" />

                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField label="First Name" error={errors.firstName?.message} required>
                            <input type="text" {...register('firstName')} placeholder="John" className={inputStyles} />
                        </FormField>

                        <FormField label="Surname" error={errors.surname?.message} required>
                            <input type="text" {...register('surname')} placeholder="Doe" className={inputStyles} />
                        </FormField>

                        <FormField label="Gender" error={errors.gender?.message} required>
                            <select {...register('gender')} className={selectStyles}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </FormField>

                        <FormField label="Date of Birth" error={errors.dateOfBirth?.message} required>
                            <input type="date" {...register('dateOfBirth')} className={inputStyles} />
                        </FormField>

                        <FormField label="Address" error={errors.address?.message} required>
                            <input
                                type="text"
                                {...register('address')}
                                placeholder="123 Main Street, Town"
                                className={inputStyles}
                            />
                        </FormField>

                        <FormField label="Mobile Phone" error={errors.mobilePhone?.message} required>
                            <input type="tel" {...register('mobilePhone')} placeholder="(868) 123-4567" className={inputStyles} />
                        </FormField>

                        <FormField label="Home Phone" error={errors.homePhone?.message}>
                            <input type="tel" {...register('homePhone')} placeholder="(868) 123-4567" className={inputStyles} />
                        </FormField>

                        <FormField label="Email Address" error={errors.email?.message} required>
                            <input type="email" {...register('email')} placeholder="john@example.com" className={inputStyles} />
                        </FormField>

                        <div className="md:col-span-2 space-y-4">
                            <FormField label="Do you have any disability or impairment?">
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" {...register('hasDisability')} className="w-4 h-4" />
                                        <span>Yes, I have a disability or impairment</span>
                                    </label>
                                </div>
                            </FormField>

                            <AnimatePresence>
                                {hasDisability && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <FormField label="Please specify">
                                            <input
                                                type="text"
                                                {...register('disabilitySpecification')}
                                                placeholder="Please describe your disability or impairment"
                                                className={inputStyles}
                                            />
                                        </FormField>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <FormField label="How did you hear about ASTI?" error={errors.marketingSource?.message} required>
                            <select {...register('marketingSource')} className={selectStyles}>
                                <option value="Referral">Referral</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Newspaper">Newspaper</option>
                                <option value="School/College Fair">School/College Fair</option>
                                <option value="ASTI Alumni">ASTI Alumni</option>
                                <option value="Internet">Internet</option>
                                <option value="Website">Website</option>
                                <option value="Other">Other</option>
                            </select>
                        </FormField>
                    </div>
                </motion.section>

                {/* Section 3: Employment Details */}
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <SectionHeader title="Employment Details" icon="💼" />
                    <p className="text-sm text-gray-500 mb-6">Optional - Fill in if currently employed</p>

                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField label="Job Title / Profession" error={errors.jobTitle?.message}>
                            <input type="text" {...register('jobTitle')} placeholder="Software Engineer" className={inputStyles} />
                        </FormField>

                        <FormField label="Employer" error={errors.employer?.message}>
                            <input type="text" {...register('employer')} placeholder="Company name" className={inputStyles} />
                        </FormField>

                        <FormField label="Employer Address" error={errors.employerAddress?.message}>
                            <input
                                type="text"
                                {...register('employerAddress')}
                                placeholder="Company address"
                                className={inputStyles}
                            />
                        </FormField>

                        <FormField label="Employer Tel" error={errors.employerTel?.message}>
                            <input type="tel" {...register('employerTel')} placeholder="(868) 123-4567" className={inputStyles} />
                        </FormField>

                        <FormField label="Employer Email" error={errors.employerEmail?.message}>
                            <input
                                type="email"
                                {...register('employerEmail')}
                                placeholder="hr@company.com"
                                className={inputStyles}
                            />
                        </FormField>
                    </div>
                </motion.section>

                {/* Section 4: Emergency Contact */}
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <SectionHeader title="Emergency Contact Information" icon="🆘" />

                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField label="Contact Name" error={errors.emergencyContactName?.message} required>
                            <input
                                type="text"
                                {...register('emergencyContactName')}
                                placeholder="Jane Doe"
                                className={inputStyles}
                            />
                        </FormField>

                        <FormField label="Relationship to Student" error={errors.emergencyRelationship?.message} required>
                            <input
                                type="text"
                                {...register('emergencyRelationship')}
                                placeholder="Parent, Spouse, etc."
                                className={inputStyles}
                            />
                        </FormField>

                        <FormField label="Home Phone" error={errors.emergencyHomePhone?.message}>
                            <input
                                type="tel"
                                {...register('emergencyHomePhone')}
                                placeholder="(868) 123-4567"
                                className={inputStyles}
                            />
                        </FormField>

                        <FormField label="Mobile Phone" error={errors.emergencyMobilePhone?.message} required>
                            <input
                                type="tel"
                                {...register('emergencyMobilePhone')}
                                placeholder="(868) 123-4567"
                                className={inputStyles}
                            />
                        </FormField>
                    </div>
                </motion.section>

                {/* Error Message */}
                <AnimatePresence>
                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
                        >
                            <p className="font-bold">Error submitting form:</p>
                            <p>{errorMessage}</p>
                            <p className="text-xs mt-2 text-red-500">Please check your internet connection or try again later.</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center"
                >
                    <button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        className={`
              px-8 py-3 rounded-xl font-semibold text-white
              transition-all duration-300 transform
              ${submitStatus === 'submitting'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-100'
                            }
            `}
                    >
                        {submitStatus === 'submitting' ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Submitting...
                            </span>
                        ) : (
                            'Submit Registration'
                        )}
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
}
