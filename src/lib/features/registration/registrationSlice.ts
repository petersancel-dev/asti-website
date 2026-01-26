import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainFormData, mainFormDefaults } from '@/lib/schemas/mainFormSchema';

interface RegistrationState {
    currentStep: number;
    formData: MainFormData;
    totalSteps: number;
    visitedSteps: number[]; // Track which steps have been visited for validation state
    isSubmitting: boolean;
    submissionError: string | null;
    submissionSuccess: boolean;
}

const initialState: RegistrationState = {
    currentStep: 0,
    formData: mainFormDefaults,
    totalSteps: 7,
    visitedSteps: [0],
    isSubmitting: false,
    submissionError: null,
    submissionSuccess: false,
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        // Update entire form data (e.g. loading from local storage)
        setFormData: (state, action: PayloadAction<MainFormData>) => {
            state.formData = action.payload;
        },

        // Update specific field - tailored for React Hook Form integration if needed, 
        // but mostly we'll update chunks of data per step
        updateFormSection: (state, action: PayloadAction<Partial<MainFormData>>) => {
            state.formData = { ...state.formData, ...action.payload };
        },

        nextStep: (state) => {
            if (state.currentStep < state.totalSteps - 1) {
                state.currentStep += 1;
                if (!state.visitedSteps.includes(state.currentStep)) {
                    state.visitedSteps.push(state.currentStep);
                }
            }
        },

        prevStep: (state) => {
            if (state.currentStep > 0) {
                state.currentStep -= 1;
            }
        },

        setStep: (state, action: PayloadAction<number>) => {
            const step = action.payload;
            if (step >= 0 && step < state.totalSteps) {
                // Only allow jumping to visited steps or the next immediate step
                // Logic can be adjustable based on requirements
                state.currentStep = step;
                if (!state.visitedSteps.includes(step)) {
                    state.visitedSteps.push(step);
                }
            }
        },

        startSubmission: (state) => {
            state.isSubmitting = true;
            state.submissionError = null;
            state.submissionSuccess = false;
        },

        submissionSuccess: (state) => {
            state.isSubmitting = false;
            state.submissionSuccess = true;
            state.submissionError = null;
            // Optional: Clear data on success, but maybe we want to show a success page first
        },

        submissionFailure: (state, action: PayloadAction<string>) => {
            state.isSubmitting = false;
            state.submissionSuccess = false;
            state.submissionError = action.payload;
        },

        resetRegistration: (state) => {
            return initialState;
        },

        clearError: (state) => {
            state.submissionError = null;
        }
    },
});

export const {
    setFormData,
    updateFormSection,
    nextStep,
    prevStep,
    setStep,
    startSubmission,
    submissionSuccess,
    submissionFailure,
    resetRegistration,
    clearError
} = registrationSlice.actions;

export default registrationSlice.reducer;
