'use client';

import { useFormContext } from 'react-hook-form';
import { FormField, inputStyles, selectStyles } from '../common/FormField';
import type { MainFormData } from '@/lib/schemas/mainFormSchema';
import { motion, AnimatePresence } from 'framer-motion';

export default function PersonalInfoStep() {
    const { register, watch, formState: { errors } } = useFormContext<MainFormData>();

    const hasDisability = watch('hasDisability');
    const isStaffMember = watch('isStaffMember');
    const isDependentOfStaff = watch('isDependentOfStaff');

    return (
        <div className="space-y-8">
            {/* 1. Basic Details */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Title" error={errors.title?.message} required>
                        <select {...register('title')} className={selectStyles}>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                        </select>
                    </FormField>

                    <FormField label="Gender" error={errors.gender?.message} required>
                        <select {...register('gender')} className={selectStyles}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </FormField>

                    <FormField label="First Name" error={errors.firstName?.message} required>
                        <input type="text" {...register('firstName')} placeholder="John" className={inputStyles} />
                    </FormField>

                    <FormField label="Last Name" error={errors.lastName?.message} required>
                        <input type="text" {...register('lastName')} placeholder="Doe" className={inputStyles} />
                    </FormField>

                    <FormField label="Date of Birth" error={errors.dateOfBirth?.message} required>
                        <input type="date" {...register('dateOfBirth')} className={inputStyles} />
                    </FormField>

                    <FormField label="Country of Birth" error={errors.countryOfBirth?.message}>
                        <input type="text" {...register('countryOfBirth')} placeholder="Trinidad and Tobago" className={inputStyles} />
                    </FormField>

                    <FormField label="Religion / Denomination" error={errors.religiousDenomination?.message}>
                        <input type="text" {...register('religiousDenomination')} placeholder="Optional" className={inputStyles} />
                    </FormField>
                </div>
            </section>

            {/* 2. Contact Info */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Mobile Phone" error={errors.mobilePhone?.message} required>
                        <input type="tel" {...register('mobilePhone')} placeholder="(868) 123-4567" className={inputStyles} />
                    </FormField>

                    <FormField label="Home Phone" error={errors.homePhone?.message}>
                        <input type="tel" {...register('homePhone')} placeholder="(868) 123-4567" className={inputStyles} />
                    </FormField>

                    <div className="md:col-span-2">
                        <FormField label="Email Address" error={errors.email?.message} required>
                            <input type="email" {...register('email')} placeholder="john@example.com" className={inputStyles} />
                        </FormField>
                    </div>

                    <FormField label="Work Phone" error={errors.workPhone?.message}>
                        <input type="tel" {...register('workPhone')} placeholder="(868) 123-4567" className={inputStyles} />
                    </FormField>

                    <FormField label="Work Extension" error={errors.workExtension?.message}>
                        <input type="text" {...register('workExtension')} placeholder="Ext. 123" className={inputStyles} />
                    </FormField>
                </div>
            </section>

            {/* 3. Address */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Current Address</h2>
                <div className="space-y-4">
                    <FormField label="Street Address" error={errors.currentStreet?.message} required>
                        <input type="text" {...register('currentStreet')} placeholder="123 Main Street" className={inputStyles} />
                    </FormField>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <FormField label="City / Town" error={errors.currentCity?.message} required>
                                <input type="text" {...register('currentCity')} placeholder="Port of Spain" className={inputStyles} />
                            </FormField>
                        </div>

                        <FormField label="Zip Code" error={errors.currentZip?.message}>
                            <input type="text" {...register('currentZip')} placeholder="00000" className={inputStyles} />
                        </FormField>

                        <FormField label="Country" error={errors.currentCountry?.message} required>
                            <input type="text" {...register('currentCountry')} defaultValue="Trinidad and Tobago" className={inputStyles} />
                        </FormField>
                    </div>
                </div>
            </section>

            {/* 4. Emergency Contact */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Emergency Contact</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Name" error={errors.emergencyName?.message} required>
                        <input type="text" {...register('emergencyName')} placeholder="Full Name" className={inputStyles} />
                    </FormField>

                    <FormField label="Relationship" error={errors.emergencyRelationship?.message} required>
                        <input type="text" {...register('emergencyRelationship')} placeholder="Parent, Spouse, etc." className={inputStyles} />
                    </FormField>

                    <FormField label="Mobile Phone" error={errors.emergencyMobile?.message} required>
                        <input type="tel" {...register('emergencyMobile')} placeholder="(868) 123-4567" className={inputStyles} />
                    </FormField>

                    <FormField label="Home Phone" error={errors.emergencyHome?.message}>
                        <input type="tel" {...register('emergencyHome')} placeholder="(868) 123-4567" className={inputStyles} />
                    </FormField>
                </div>
            </section>

            {/* 5. Additional Info */}
            <section className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Additional Information</h2>

                {/* Disability */}
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" {...register('hasDisability')} className="w-5 h-5 text-blue-600 rounded" />
                        <span className="text-gray-700 font-medium">Do you have a disability or impairment?</span>
                    </label>

                    <AnimatePresence>
                        {hasDisability && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-8"
                            >
                                <FormField label="Please specify details">
                                    <input type="text" {...register('disabilitySpecification')} className={inputStyles} />
                                </FormField>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Staff Member */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" {...register('isStaffMember')} className="w-5 h-5 text-blue-600 rounded" />
                        <span className="text-gray-700 font-medium">Are you a staff member?</span>
                    </label>

                    <AnimatePresence>
                        {isStaffMember && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-8 grid md:grid-cols-2 gap-4"
                            >
                                <FormField label="Position">
                                    <input type="text" {...register('staffPosition')} className={inputStyles} />
                                </FormField>
                                <FormField label="Department">
                                    <input type="text" {...register('staffDepartment')} className={inputStyles} />
                                </FormField>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Dependent of Staff */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" {...register('isDependentOfStaff')} className="w-5 h-5 text-blue-600 rounded" />
                        <span className="text-gray-700 font-medium">Are you a dependent of a staff member?</span>
                    </label>

                    <AnimatePresence>
                        {isDependentOfStaff && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-8 grid md:grid-cols-2 gap-4"
                            >
                                <FormField label="Staff Name">
                                    <input type="text" {...register('dependentStaffName')} className={inputStyles} />
                                </FormField>
                                <FormField label="Staff Position">
                                    <input type="text" {...register('dependentStaffPosition')} className={inputStyles} />
                                </FormField>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
