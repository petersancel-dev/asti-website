'use client';

import { useFormContext } from 'react-hook-form';
import { FormField, inputStyles, selectStyles } from '../common/FormField';
import type { MainFormData } from '@/lib/schemas/mainFormSchema';

export default function FinancialSupportStep() {
    const { register, watch, formState: { errors } } = useFormContext<MainFormData>();

    const fundingSource = watch('fundingSource');
    const showSponsorFields = fundingSource === 'Sponsor' || fundingSource === 'Work';

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Financial Support</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Source of Funding" error={errors.fundingSource?.message} required>
                    <select {...register('fundingSource')} className={selectStyles}>
                        <option value="Self">Self</option>
                        <option value="Parents">Parents</option>
                        <option value="Loan">Loan</option>
                        <option value="Work">Work / Employer</option>
                        <option value="Sponsor">Other Sponsor</option>
                    </select>
                </FormField>
            </div>

            {showSponsorFields && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="font-medium text-gray-700">Sponsor Details</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField label="Sponsor Name / Organization" error={errors.sponsorName?.message}>
                            <input
                                type="text"
                                {...register('sponsorName')}
                                placeholder="Company or Person Name"
                                className={inputStyles}
                            />
                        </FormField>

                        <FormField label="Contact Person / Details" error={errors.sponsorContact?.message}>
                            <input
                                type="text"
                                {...register('sponsorContact')}
                                placeholder="Phone or Email"
                                className={inputStyles}
                            />
                        </FormField>

                        <div className="md:col-span-2">
                            <FormField label="Sponsor Address" error={errors.sponsorAddress?.message}>
                                <input
                                    type="text"
                                    {...register('sponsorAddress')}
                                    placeholder="Full Address"
                                    className={inputStyles}
                                />
                            </FormField>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
