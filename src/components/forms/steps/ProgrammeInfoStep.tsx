'use client';

import { useFormContext } from 'react-hook-form';
import { FormField, inputStyles, selectStyles } from '../common/FormField';
import type { MainFormData } from '@/lib/schemas/mainFormSchema';

export default function ProgrammeInfoStep() {
    const { register, formState: { errors } } = useFormContext<MainFormData>();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Programme Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Name of Programme Applying for" error={errors.programmeName?.message} required>
                    <input
                        type="text"
                        {...register('programmeName')}
                        placeholder="e.g. Diploma in Fiber Optics"
                        className={inputStyles}
                    />
                </FormField>

                <FormField label="Level of Programme" error={errors.programmeLevel?.message} required>
                    <select {...register('programmeLevel')} className={selectStyles}>
                        <option value="Introduction">Introduction</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Advanced Certificate">Advanced Certificate</option>
                        <option value="Professional Diploma">Professional Diploma</option>
                        <option value="Advanced Certification">Advanced Certification</option>
                    </select>
                </FormField>

                <FormField label="Are you a returning student?" error={errors.isReturningStudent?.message}>
                    <div className="flex gap-6 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="false"
                                {...register('isReturningStudent')}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span>No</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="true"
                                {...register('isReturningStudent')}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span>Yes</span>
                        </label>
                    </div>
                </FormField>
            </div>
        </div>
    );
}
