import IntroRegistrationForm from '@/components/forms/IntroRegistrationForm';

export const metadata = {
    title: 'Intro Course Registration | ASTI',
    description: 'Register for our introductory courses and workshops.',
};

export default function IntroRegistrationPage() {
    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <IntroRegistrationForm />
            </div>
        </div>
    );
}
