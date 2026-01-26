'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import DynamicFieldArray from '../common/DynamicFieldArray';
import type { MainFormData } from '@/lib/schemas/mainFormSchema';

export default function AcademicRecordsStep() {
    const { control, register, formState: { errors } } = useFormContext<MainFormData>();

    const examsFields = useFieldArray({
        control,
        name: "exams"
    });

    const institutionsFields = useFieldArray({
        control,
        name: "institutionsAttended"
    });

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Secondary School / Examinations</h2>
                <p className="text-sm text-gray-500 mb-4">
                    List examinations taken (CXC, CSEC, CAPE, GCE, etc.). Click &quot;Add Exam&quot; to add more rows.
                </p>

                <DynamicFieldArray
                    fields={examsFields.fields}
                    append={examsFields.append}
                    remove={examsFields.remove}
                    register={register}
                    errors={errors}
                    title="Examination Results"
                    addButtonLabel="Add Examination"
                    arrayName="exams"
                    columns={[
                        { name: 'examiningBody', label: 'Exam Body', placeholder: 'CXC / GCE' },
                        { name: 'subject', label: 'Subject', placeholder: 'Mathematics' },
                        { name: 'levelAttained', label: 'Level', placeholder: 'General / Units' },
                        { name: 'grade', label: 'Grade', placeholder: 'I / A' },
                        { name: 'dateAwarded', label: 'Year', placeholder: '2023', type: 'text' }, // Year is sufficient usually
                    ]}
                />
            </section>

            <section>
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6 mt-10">Tertiary Institutions Attended</h2>
                <p className="text-sm text-gray-500 mb-4">
                    List any colleges or tertiary institutions attended previously.
                </p>

                <DynamicFieldArray
                    fields={institutionsFields.fields}
                    append={institutionsFields.append}
                    remove={institutionsFields.remove}
                    register={register}
                    errors={errors}
                    title="Institutions"
                    addButtonLabel="Add Institution"
                    arrayName="institutionsAttended"
                    columns={[
                        { name: 'name', label: 'Institution Name', placeholder: 'UWI / SBCS' },
                        { name: 'programme', label: 'Programme', placeholder: 'BSc. Computing' },
                        { name: 'startDate', label: 'Start Date', type: 'date' },
                        { name: 'endDate', label: 'End Date', type: 'date' },
                        { name: 'grade', label: 'Final Grade/GPA', placeholder: '3.5' },
                    ]}
                />
            </section>
        </div>
    );
}
