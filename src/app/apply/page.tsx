'use client';

import { useState } from 'react';
import { PROGRAMMES, PROGRAMME_LEVELS } from '@/constants/programmes';

export default function ApplyPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', address: '',
        programme: '', deliveryMode: '', education: '', experience: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                    <h2 className="text-2xl font-bold text-navy mb-4">Application Submitted!</h2>
                    <p className="text-gray-600 mb-6">Thank you for applying to ASTI. Our admissions team will review your application and contact you within 2-3 business days.</p>
                    <a href="/" className="btn btn-primary">Return Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24">
            {/* Hero */}
            <section className="py-12" style={{ background: 'linear-gradient(135deg, #8B1A2D, #6D1424)' }}>
                <div className="section-container text-center">
                    <h1 className="text-white mb-2">Apply Now</h1>
                    <p className="text-white/80">Start your journey with ASTI - No application fee!</p>
                </div>
            </section>

            {/* Application Form */}
            <section className="section-padding">
                <div className="section-container max-w-2xl">
                    {/* Progress */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-maroon text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {s}
                                </div>
                                {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-maroon' : 'bg-gray-200'}`} />}
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-gray-500 mb-8">
                        Step {step} of 3: {step === 1 ? 'Personal Info' : step === 2 ? 'Programme Selection' : 'Background'}
                    </p>

                    <form onSubmit={handleSubmit} className="card">
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                        <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                            value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                        <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                            value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                    <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                        value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Programme of Interest *</label>
                                    <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                        value={formData.programme} onChange={(e) => setFormData({ ...formData, programme: e.target.value })}>
                                        <option value="">Select a programme</option>
                                        {PROGRAMMES.map((p) => (
                                            <option key={p.id} value={p.id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Delivery Mode *</label>
                                    <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                        value={formData.deliveryMode} onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}>
                                        <option value="">Select delivery mode</option>
                                        <option value="online">Online</option>
                                        <option value="face-to-face">Face-to-Face</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education Level *</label>
                                    <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                        value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })}>
                                        <option value="">Select education level</option>
                                        <option value="secondary">Secondary School</option>
                                        <option value="certificate">Certificate</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="bachelor">Bachelor&apos;s Degree</option>
                                        <option value="master">Master&apos;s Degree</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Experience</label>
                                    <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon"
                                        placeholder="Tell us about any relevant work or educational experience..."
                                        value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 mt-6">
                            {step > 1 && (
                                <button type="button" onClick={() => setStep(step - 1)} className="btn btn-secondary flex-1">Back</button>
                            )}
                            <button type="submit" className="btn btn-primary flex-1">
                                {step < 3 ? 'Next' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
