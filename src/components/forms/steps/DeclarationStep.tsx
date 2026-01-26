'use client';

import { useFormContext } from 'react-hook-form';
import { FormField, inputStyles, selectStyles } from '../common/FormField';
import type { MainFormData } from '@/lib/schemas/mainFormSchema';

export default function DeclarationStep() {
    const { register, formState: { errors } } = useFormContext<MainFormData>();

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Declaration</h2>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-sm text-blue-800 leading-relaxed">
                <p className="font-bold mb-2">Please read carefully:</p>
                <p>
                    I hereby certify that the information given in this application is true and correct to the best of my knowledge
                    and belief. I understand that any false information may result in the cancellation of my admission.
                    I agree to abide by the rules and regulations of the Advanced Solutions Technical Institute (ASTI).
                </p>
            </div>

            <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-300">
                    <input
                        type="checkbox"
                        {...register('declarationAccepted')}
                        className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        I accept the declaration above and confirm that all details provided are accurate.
                    </span>
                </label>
                {errors.declarationAccepted && (
                    <p className="text-sm text-red-600 ml-4">{errors.declarationAccepted.message}</p>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                <FormField label="Digital Signature (Type Full Name)" error={errors.signatureName?.message} required>
                    <input
                        type="text"
                        {...register('signatureName')}
                        placeholder="John Doe"
                        className={inputStyles}
                    />
                    <p className="text-xs text-gray-500 mt-1">By submitting this form, your typed name acts as your digital signature.</p>
                </FormField>

                <FormField label="Date" error={errors.signatureDate?.message} required>
                    <input
                        type="date"
                        {...register('signatureDate')}
                        className={inputStyles}
                    />
                </FormField>

                <div className="md:col-span-2">
                    <FormField label="How did you hear about ASTI?" error={errors.marketingSource?.message} required>
                        <select {...register('marketingSource')} className={selectStyles}>
                            <option value="Internet/Website">Internet/Website</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Referral">Referral</option>
                            <option value="Newspaper">Newspaper</option>
                            <option value="School/College Fair">School/College Fair</option>
                            <option value="ASTI Alumni">ASTI Alumni</option>
                            <option value="Other">Other</option>
                        </select>
                    </FormField>
                </div>
            </div>
        </div>
    );
}
