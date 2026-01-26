'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import DynamicFieldArray from '../common/DynamicFieldArray';
import type { MainFormData } from '@/lib/schemas/mainFormSchema';
import { useEffect } from 'react';

export default function ReferencesStep() {
    const { control, register, formState: { errors } } = useFormContext<MainFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "references"
    });

    // Ensure fully initialized with 2 empty references if for some reason they are missing
    useEffect(() => {
        if (fields.length < 2) {
            append({ name: '', organization: '', position: '', address: '', mobile: '', work: '', email: '' });
        }
    }, [fields.length, append]);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">References</h2>
            <p className="text-sm text-gray-500">
                Please provide two (2) references who can attest to your character and/or professional ability.
            </p>

            <DynamicFieldArray
                fields={fields}
                append={append}
                remove={remove}
                register={register}
                errors={errors}
                title="Personal / Professional References"
                addButtonLabel="Add Reference"
                maxRows={2} // Limit to exactly 2 references as per schema requirements
                arrayName="references"
                columns={[
                    { name: 'name', label: 'Full Name', required: true },
                    { name: 'organization', label: 'Organization', required: true },
                    { name: 'position', label: 'Position', placeholder: 'Manager' },
                    { name: 'mobile', label: 'Mobile Phone', required: true, placeholder: '(868) ...' },
                    { name: 'email', label: 'Email Address', required: true, type: 'text' },
                ]}
            />
        </div>
    );
}
