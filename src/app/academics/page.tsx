import { Metadata } from 'next';
import { ACADEMICS_CONTENT, ACADEMIC_CALENDAR, FACULTY_PLACEHOLDER } from '@/constants/academics';

export const metadata: Metadata = {
    title: 'Academics | ASTI',
    description: 'Explore our innovative academic programs, faculty, academic calendar, and distance learning options at ASTI.',
};

export default function AcademicsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy to-navy-dark py-24 text-white">
                <div className="section-container text-center">
                    <h1 className="mb-4">{ACADEMICS_CONTENT.pageTitle}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {ACADEMICS_CONTENT.pageSubtitle}
                    </p>
                </div>
            </section>

            {/* Academic Overview */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-center mb-6">{ACADEMICS_CONTENT.overview.title}</h2>
                        <p className="text-gray-600 text-lg mb-6">{ACADEMICS_CONTENT.overview.introduction}</p>
                        <div className="glass p-6 rounded-xl">
                            <p className="font-semibold text-navy mb-2">Our Mission:</p>
                            <p className="text-gray-600 italic">&quot;{ACADEMICS_CONTENT.overview.mission}&quot;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academic Calendar */}
            <section id="calendar" className="section-padding bg-gray-50">
                <div className="section-container">
                    <h2 className="text-center mb-8">{ACADEMIC_CALENDAR.title}</h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="card">
                            <div className="grid gap-4">
                                {ACADEMIC_CALENDAR.highlights.map((item) => (
                                    <div key={item.date} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="text-center min-w-[80px]">
                                            <span className="block text-sm text-gray-500">
                                                {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="block text-2xl font-bold text-navy">
                                                {new Date(item.date).getDate()}
                                            </span>
                                        </div>
                                        <p className="font-medium">{item.event}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Faculty Preview */}
            <section id="faculty" className="section-padding bg-gray-50 scroll-mt-24">
                <div className="section-container text-center">
                    <h2 className="mb-4">{FACULTY_PLACEHOLDER.title}</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">{FACULTY_PLACEHOLDER.description}</p>
                    <div className="flex justify-center gap-8 flex-wrap">
                        {FACULTY_PLACEHOLDER.sampleFaculty.map((faculty) => (
                            <div key={faculty.id} className="card text-center w-64">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-light mx-auto mb-4 flex items-center justify-center text-navy font-bold text-2xl overflow-hidden">
                                    {faculty.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                                    ) : (
                                        faculty.name.split(' ').map(n => n[0]).join('')
                                    )}
                                </div>
                                <h4 className="font-semibold text-navy">{faculty.name}</h4>
                                <p className="text-sm text-gray-500">{faculty.title}</p>
                                <p className="text-xs text-gray-400">{faculty.department}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-br from-maroon to-maroon-dark text-white">
                <div className="section-container text-center">
                    <h2 className="text-white mb-4">Ready to Advance Your Education?</h2>
                    <p className="text-gray-200 mb-8 max-w-xl mx-auto">
                        Explore our programs and take the first step toward a successful career.
                    </p>
                    <a href="/admissions" className="btn btn-gold">
                        View Programs & Apply
                    </a>
                </div>
            </section>
        </>
    );
}
