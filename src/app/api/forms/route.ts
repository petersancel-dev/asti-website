import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { introFormSchema, type IntroFormData } from '@/lib/schemas/introFormSchema';
import { mainFormSchema, type MainFormData } from '@/lib/schemas/mainFormSchema';
import { formatFormEmail } from '@/lib/email/formatFormEmail';

// Target email for form submissions
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'info@astint.com';

// Sender email (must be verified domain or use Resend default)
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

export async function POST(request: NextRequest) {
    // Initialize Resend lazily to avoid build-time errors
    const resend = new Resend(process.env.RESEND_API_KEY);



    try {
        const body = await request.json();
        const { formType, data } = body as { formType: string; data: unknown };

        // Validate form type
        if (!formType || !['introduction', 'main'].includes(formType)) {
            return NextResponse.json(
                { success: false, error: 'Invalid form type' },
                { status: 400 }
            );
        }

        let applicantName: string;
        let applicantEmail: string;
        let emailHtml: string;
        let formTypeLabel: string;

        // Process based on form type with proper typing
        if (formType === 'introduction') {
            const parseResult = introFormSchema.safeParse(data);
            if (!parseResult.success) {
                console.error('Validation errors:', parseResult.error.flatten());
                return NextResponse.json(
                    { success: false, error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
                    { status: 400 }
                );
            }
            const validated: IntroFormData = parseResult.data;
            applicantName = `${validated.firstName} ${validated.surname}`;
            applicantEmail = validated.email;
            emailHtml = formatFormEmail('introduction', validated);
            formTypeLabel = 'Introduction Course Registration';
        } else {
            const parseResult = mainFormSchema.safeParse(data);
            if (!parseResult.success) {
                console.error('Validation errors:', parseResult.error.flatten());
                return NextResponse.json(
                    { success: false, error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
                    { status: 400 }
                );
            }
            const validated: MainFormData = parseResult.data;
            applicantName = `${validated.firstName} ${validated.lastName}`;
            applicantEmail = validated.email;
            emailHtml = formatFormEmail('main', validated);
            formTypeLabel = 'Full Programme Application';
        }

        // Send via Resend
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: `ASTI Website <${SENDER_EMAIL}>`,
            to: [RECIPIENT_EMAIL],
            subject: `New ${formTypeLabel}: ${applicantName}`,
            html: emailHtml,
            replyTo: applicantEmail,
        });

        if (emailError) {
            console.error('Resend error:', emailError);
            return NextResponse.json(
                { success: false, error: 'Failed to send email.', details: emailError },
                { status: 500 }
            );
        }

        console.log('Email sent successfully:', emailData?.id);

        return NextResponse.json({
            success: true,
            message: 'Registration submitted successfully',
            emailId: emailData?.id
        });

    } catch (error) {
        console.error('Form submission error:', error);

        // Handle JSON parse errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { success: false, error: 'Invalid request format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
