'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import DynamicFieldArray from '../common/DynamicFieldArray';
import type { MainFormData } from '@/lib/schemas/mainFormSchema';

export default function EmploymentStep() {
    const { control, register, formState: { errors } } = useFormContext<MainFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "employmentHistory"
    });

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Employment Record</h2>
            <p className="text-sm text-gray-500">
                Please list your employment history, starting with your present or most recent job.
            </p>

            <DynamicFieldArray
                fields={fields}
                append={append}
                remove={remove}
                register={register}
                errors={errors}
                title="Employment History"
                addButtonLabel="Add Job"
                arrayName="employmentHistory"
                columns={[
                    { name: 'employer', label: 'Employer Name', placeholder: 'Company Ltd', required: true },
                    { name: 'position', label: 'Position Held', placeholder: 'Technician', required: true },
                    { name: 'dateStarted', label: 'Start Date', type: 'date', required: true },
                    { name: 'dateEnded', label: 'End Date (Leave blank if current)', type: 'date' },
                    { name: 'city', label: 'City', placeholder: 'Port of Spain' },
                ]}
            />
        </div>
    );
}
