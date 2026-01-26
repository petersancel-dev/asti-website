'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '@/lib/store';
import {
    nextStep,
    prevStep,
    updateFormSection,
    startSubmission,
    submissionSuccess,
    submissionFailure,
    clearError
} from '@/lib/features/registration/registrationSlice';
import {
    mainFormSchema,
    type MainFormData,
    programmeInfoSchema,
    personalInfoSchema,
    academicRecordsSchema,
    employmentHistorySchema,
    referencesStepSchema,
    financialSupportSchema,
    declarationSchema
} from '@/lib/schemas/mainFormSchema';
import FormProgress from './common/FormProgress';

// Step Components
import ProgrammeInfoStep from './steps/ProgrammeInfoStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import AcademicRecordsStep from './steps/AcademicRecordsStep';
import EmploymentStep from './steps/EmploymentStep';
import ReferencesStep from './steps/ReferencesStep';
import FinancialSupportStep from './steps/FinancialSupportStep';
import DeclarationStep from './steps/DeclarationStep';

const STEP_TITLES = [
    'Programme Info',
    'Personal Info',
    'Academic Records',
    'Employment',
    'References',
    'Financial Support',
    'Declaration',
];

// Map steps to their schemas for validation
const stepSchemas = [
    programmeInfoSchema,
    personalInfoSchema,
    academicRecordsSchema,
    employmentHistorySchema,
    referencesStepSchema,
    financialSupportSchema,
    declarationSchema,
];

export default function MainRegistrationForm() {
    const dispatch = useDispatch();
    const { currentStep, formData, isSubmitting, submissionError, submissionSuccess: isSuccess } = useSelector(
        (state: RootState) => state.registration
    );

    // Use z.input for form state to handle string | boolean inputs from DOM (via z.union)
    // The resolver will transform these to MainFormData (Output) for handleSubmit
    type MainFormInput = z.input<typeof mainFormSchema>;

    const methods = useForm<MainFormInput>({
        resolver: zodResolver(mainFormSchema),
        // Deep clone to prevent RHF from mutating read-only Redux state
        defaultValues: JSON.parse(JSON.stringify(formData)),
        mode: 'onBlur',
    });

    // Load Redux data into React Hook Form ONLY when step changes (or on mount)
    // We do NOT want this to run when formData changes, as that causes the infinite loop
    useEffect(() => {
        // Deep clone here as well to ensure RHF receives a mutable object
        methods.reset(JSON.parse(JSON.stringify(formData)));
    }, [currentStep, methods]); // Removed formData from dependencies

    // Autosave to Redux on field change
    useEffect(() => {
        const subscription = methods.watch((value) => {
            // Deep clone the value before dispatching to Redux
            // This is CRITICAL: Redux Toolkit freezes state (Immer). If we pass RHF's internal value reference
            // to Redux, it gets frozen. RHF then tries to mutate it on the next keystroke, causing
            // "Cannot assign to read only property..." errors, especially with arrays.
            const clonedValue = JSON.parse(JSON.stringify(value));
            dispatch(updateFormSection(clonedValue));
        });
        return () => subscription.unsubscribe();
    }, [methods.watch, dispatch]);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('asti-registration-form', JSON.stringify(formData));
    }, [formData]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('asti-registration-form');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Dispatch action to update Redux store would go here if we exported it
                // For now, relies on initial state or manual rehydration logic
            } catch (e) {
                console.error('Failed to load saved form', e);
            }
        }
    }, []);

    // Clear errors when step changes
    useEffect(() => {
        if (submissionError) {
            dispatch(clearError());
        }
    }, [currentStep, dispatch, submissionError]);

    const handleNext = async () => {
        console.log('handleNext called, currentStep:', currentStep);

        // Dynamically get fields to validate from the current step's schema
        const currentSchema = stepSchemas[currentStep];
        const fieldsToValidate = Object.keys(currentSchema.shape) as (keyof MainFormData)[];

        const isValid = await methods.trigger(fieldsToValidate);

        if (!isValid) {
            dispatch(submissionFailure('Please correct the validation errors before proceeding.'));
        } else {
            dispatch(clearError());
            dispatch(nextStep());
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        dispatch(prevStep());
        window.scrollTo(0, 0);
    };

    const handleSubmitForm = async () => {
        const isValid = await methods.trigger();
        if (!isValid) return;

        dispatch(startSubmission());

        try {
            const response = await fetch('/api/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formType: 'main', data: formData }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Submission failed');
            }

            dispatch(submissionSuccess());
            localStorage.removeItem('asti-registration-form'); // Clear saved data
        } catch (error) {
            dispatch(submissionFailure(error instanceof Error ? error.message : 'Submission failed'));
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto p-12 bg-white rounded-2xl shadow-xl border-t-4 border-green-500 text-center"
            >
                <div className="text-7xl mb-6">✅</div>
                <h2 className="text-3xl font-oswald font-bold text-navy mb-4">Application Submitted!</h2>
                <p className="text-gray-600 mb-8 text-lg">
                    Thank you for applying to ASTI. We have received your registration and a confirmation email has been sent to <strong>{formData.email}</strong>.
                </p>
                <p className="text-sm text-gray-500">
                    Our admissions team will review your documents and contact you within 3-5 business days.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-navy p-6 text-white text-center">
                <h1 className="text-3xl font-oswald font-bold uppercase tracking-wide">
                    Student Registration
                </h1>
                <p className="text-white/80 mt-2">Complete all sections to apply</p>
            </div>

            <div className="p-6 md:p-10">
                <FormProgress
                    currentStep={currentStep}
                    totalSteps={STEP_TITLES.length}
                    stepTitles={STEP_TITLES}
                />

                <FormProvider {...methods}>
                    <form onSubmit={(e) => e.preventDefault()} className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentStep === 0 && <ProgrammeInfoStep />}
                                {currentStep === 1 && <PersonalInfoStep />}
                                {currentStep === 2 && <AcademicRecordsStep />}
                                {currentStep === 3 && <EmploymentStep />}
                                {currentStep === 4 && <ReferencesStep />}
                                {currentStep === 5 && <FinancialSupportStep />}
                                {currentStep === 6 && <DeclarationStep />}
                            </motion.div>
                        </AnimatePresence>

                        {submissionError && (
                            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                <p className="font-bold">Error submitting form:</p>
                                <p>{submissionError}</p>
                            </div>
                        )}

                        <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleBack}
                                disabled={currentStep === 0 || isSubmitting}
                                className={`
                  px-6 py-3 rounded-lg font-medium transition-colors
                  ${currentStep === 0
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-navy'
                                    }
                `}
                            >
                                ← Back
                            </button>

                            {currentStep < STEP_TITLES.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all hover:scale-105"
                                >
                                    Next Step →
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmitForm}
                                    disabled={isSubmitting}
                                    className={`
                    px-8 py-3 bg-green-600 text-white rounded-lg font-bold 
                    transition-all hover:scale-105 flex items-center gap-2
                    ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-green-700'}
                  `}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application ✅'}
                                </button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
