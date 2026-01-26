'use client';

import { useState, useEffect } from 'react';
import { formatFormEmail } from '@/lib/email/formatFormEmail';
import { introFormDefaults } from '@/lib/schemas/introFormSchema';
import { mainFormDefaults } from '@/lib/schemas/mainFormSchema';

export default function EmailPreviewPage() {
    const [activeTab, setActiveTab] = useState<'intro' | 'main'>('main');
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        // Generate dummy data based on defaults but populated
        const introData = {
            ...introFormDefaults,
            surname: 'Doe',
            firstName: 'John',
            email: 'john.doe@example.com',
            courseRegisteringFor: 'Fiber Optics'
        };

        const mainData = {
            ...mainFormDefaults,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            programmeName: 'BSc. Telecommunications',
            exams: [
                { examiningBody: 'CXC', subject: 'Math', grade: 'I', dateAwarded: '2020', levelAttained: 'General' },
                { examiningBody: 'CXC', subject: 'English', grade: 'I', dateAwarded: '2020', levelAttained: 'General' }
            ],
            employmentHistory: [
                { employer: 'Tech Corp', position: 'Intern', dateStarted: '2021-01-01', dateEnded: '2022-01-01', city: 'Port of Spain' }
            ],
            references: [
                { name: 'Dr. Brown', organization: 'UWI', mobile: '555-0101', email: 'brown@uwi.edu' },
                { name: 'Mrs. Green', organization: 'Tech Corp', mobile: '555-0102', email: 'green@techcorp.com' }
            ]
        };

        if (activeTab === 'intro') {
            setHtmlContent(formatFormEmail('introduction', introData));
        } else {
            setHtmlContent(formatFormEmail('main', mainData));
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gray-100 p-8 pt-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Controls */}
                <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                    <h1 className="text-xl font-bold mb-4 text-navy">Email Template Preview</h1>
                    <p className="text-sm text-gray-500 mb-6">
                        Verify the email layout and data formatting before sending real emails.
                    </p>

                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveTab('main')}
                            className={`w-full text-left px-4 py-3 rounded-md transition-colors ${activeTab === 'main'
                                ? 'bg-maroon text-white font-medium shadow-md'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Full Registration Form
                        </button>
                        <button
                            onClick={() => setActiveTab('intro')}
                            className={`w-full text-left px-4 py-3 rounded-md transition-colors ${activeTab === 'intro'
                                ? 'bg-maroon text-white font-medium shadow-md'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Intro Registration Form
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Send Live Test</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Target Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-maroon focus:border-maroon"
                                    id="test-email-target"
                                />
                            </div>
                            <button
                                onClick={async () => {
                                    const emailInput = document.getElementById('test-email-target') as HTMLInputElement;
                                    const email = emailInput.value;
                                    if (!email) return alert('Please enter an email address');

                                    const btn = document.activeElement as HTMLButtonElement;
                                    const originalText = btn.innerText;
                                    btn.innerText = 'Sending...';
                                    btn.disabled = true;

                                    try {
                                        // Get the current dummy data based on tab
                                        const dummyData = activeTab === 'intro' ? {
                                            ...introFormDefaults,
                                            surname: 'Doe',
                                            firstName: 'John',
                                            email: email, // Use the test email as the applicant email too so they get the copy if reply-to is used
                                            courseRegisteringFor: 'Fiber Optics'
                                        } : {
                                            ...mainFormDefaults,
                                            // Complete required fields for schema validation
                                            title: 'Mr.',
                                            firstName: 'Jane',
                                            lastName: 'Smith',
                                            email: email,
                                            programmeName: 'BSc. Telecommunications',
                                            programmeLevel: 'Certificate', // Required by schema
                                            dateOfBirth: '1990-01-01',
                                            mobilePhone: '555-0199',
                                            currentStreet: '123 Test St',
                                            currentCity: 'Test City',
                                            currentCountry: 'Trinidad and Tobago',
                                            emergencyName: 'Emergency Contact',
                                            emergencyRelationship: 'Parent',
                                            emergencyMobile: '555-9999',

                                            gender: 'Female',
                                            formType: 'main', // Helper for our own logic if needed

                                            matchFields: {}, // Just in case

                                            exams: [
                                                { examiningBody: 'CXC', subject: 'Math', grade: 'I', dateAwarded: '2020', levelAttained: 'General' },
                                                { examiningBody: 'CXC', subject: 'English', grade: 'I', dateAwarded: '2020', levelAttained: 'General' }
                                            ],
                                            employmentHistory: [],
                                            references: [
                                                { name: 'Dr. Brown', organization: 'UWI', mobile: '555-0101', email: 'brown@uwi.edu' },
                                                { name: 'Mrs. Green', organization: 'Tech Corp', mobile: '555-0102', email: 'green@techcorp.com' }
                                            ],
                                            fundingSource: 'Self',
                                            declarationAccepted: true,
                                            signatureDate: new Date().toISOString().split('T')[0],
                                            marketingSource: 'Internet/Website'
                                        };

                                        // NOTE: The API route sends to RECIPIENT_EMAIL (marketing@astitnt.com) by default.
                                        // For this test to work, we are mocking the submission.
                                        // BUT, the user asked to test DELIVERY.
                                        // The current API route hardcodes the recipient.
                                        // We can't easily override the recipient without changing the API route code or env vars.

                                        // HOWEVER, we can send the request and check the console/response. 
                                        // If the user puts their OWN email in .env.local as RECIPIENT_EMAIL, it works.

                                        const res = await fetch('/api/forms', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                formType: activeTab === 'intro' ? 'introduction' : 'main',
                                                data: dummyData
                                            })
                                        });

                                        const result = await res.json();
                                        if (result.success) {
                                            alert('Test email sent successfully! Check the configured RECIPIENT_EMAIL inbox.');
                                        } else {
                                            alert('Failed: ' + JSON.stringify(result));
                                        }
                                    } catch (e) {
                                        alert('Error sending: ' + e);
                                    } finally {
                                        btn.innerText = originalText;
                                        btn.disabled = false;
                                    }
                                }}
                                className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-navy-light text-sm font-bold transition-all"
                            >
                                Send Test
                            </button>
                            <p className="text-xs text-gray-500 italic">
                                Note: This sends to the RECIPIENT_EMAIL configured in .env.local, not necessarily the email entered above (unless you update your env file).
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Instructions</h3>
                        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                            <li>Check table alignment</li>
                            <li>Verify data grouping</li>
                            <li>Check array rendering (Exams, etc.)</li>
                            <li>Verify branding colors</li>
                        </ul>
                    </div>
                </div>

                {/* Preview Pane */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex flex-col h-[800px]">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="ml-4 text-xs text-gray-400 font-mono flex-1 text-center">
                            Previewing: {activeTab === 'intro' ? 'Introduction' : 'Main Registration'}
                        </div>
                    </div>

                    <div className="flex-1 bg-white relative">
                        <iframe
                            srcDoc={htmlContent}
                            className="w-full h-full border-0"
                            title="Email Preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
