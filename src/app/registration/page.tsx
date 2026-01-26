import MainRegistrationForm from '@/components/forms/MainRegistrationForm';

export const metadata = {
    title: 'Student Registration | ASTI',
    description: 'Register for our certificate, diploma, and advanced certification programmes.',
};

export default function RegistrationPage() {
    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto mb-8 text-center">
                    {/* Additional content if needed */}
                </div>
                <MainRegistrationForm />
            </div>
        </div>
    );
}
