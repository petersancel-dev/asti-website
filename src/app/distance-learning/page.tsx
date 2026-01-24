import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    Clock, Package, TrendingUp, BookOpen,
    Briefcase, Laptop, HeartPulse, GraduationCap,
    Shield, Cable, Scale, Wrench,
    ExternalLink, ArrowRight
} from 'lucide-react';
import { DISTANCE_LEARNING_PAGE } from '@/constants/distance-learning';

export const metadata: Metadata = {
    title: 'Online Learning | ASTI',
    description: 'Experience flexible online study with 200+ courses in Business, Technology, Healthcare, and more. Learn at your own pace with ASTI\'s Center for Online Learning.',
};

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'clock': Clock,
    'package': Package,
    'trending-up': TrendingUp,
    'book-open': BookOpen,
    'briefcase': Briefcase,
    'laptop': Laptop,
    'heart-pulse': HeartPulse,
    'graduation-cap': GraduationCap,
    'shield': Shield,
    'cable': Cable,
    'scale': Scale,
    'wrench': Wrench,
};

export default function DistanceLearningPage() {
    const content = DISTANCE_LEARNING_PAGE;

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/distance-learning-hero.jpg"
                        alt="Students learning online"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Gradient overlay - transparent at top, dark at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/30 to-navy/80 z-10" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-gold text-navy rounded-full text-sm font-semibold mb-6 shadow-lg">
                            200+ Online Courses Available
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                            {content.hero.heading}
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-semibold">
                            {content.hero.tagline}
                        </p>
                        <p className="text-lg text-gray-100 mb-10 max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                            {content.hero.description}
                        </p>
                        <Link
                            href={content.hero.ctaUrl}
                            className="inline-flex items-center gap-2 btn btn-gold text-lg px-8 py-4"
                        >
                            {content.hero.ctaText}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose ASTI Section */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <h2 className="text-center mb-4">{content.whyChoose.heading}</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Flexible, affordable, and designed for working professionals.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {content.whyChoose.benefits.map((benefit, index) => {
                            const Icon = iconMap[benefit.icon] || BookOpen;
                            return (
                                <div
                                    key={index}
                                    className="group p-6 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-navy hover:to-navy-dark transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-gold/10 group-hover:bg-gold/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                                        <Icon className="w-7 h-7 text-gold" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Course Categories */}
            <section className="section-padding bg-gray-50">
                <div className="section-container">
                    <h2 className="text-center mb-4">{content.categories.heading}</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        {content.categories.subheading}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {content.categories.items.map((category, index) => {
                            const Icon = iconMap[category.icon] || Briefcase;
                            return (
                                <Link
                                    key={index}
                                    href={category.href || '/programmes'}
                                    className={`group relative p-6 rounded-2xl bg-gradient-to-br ${category.color} text-white text-center hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`}
                                >
                                    <div className="absolute inset-0 bg-black/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Icon className="w-10 h-10 mx-auto mb-3 drop-shadow-lg" />
                                    <span className="font-semibold text-lg drop-shadow">{category.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <h2 className="text-center mb-4">{content.howItWorks.heading}</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Getting started with online learning is simple.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {content.howItWorks.steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Connector line */}
                                {index < content.howItWorks.steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold to-gold/30" />
                                )}

                                <div className="relative text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10">
                                        <span className="text-2xl font-bold text-navy">{step.number}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-br from-maroon via-maroon-dark to-slate-900 text-white">
                <div className="section-container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {content.cta.heading}
                    </h2>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        {content.cta.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={content.cta.primaryButton.url}
                            className="inline-flex items-center justify-center gap-2 btn btn-gold text-lg px-8 py-4"
                        >
                            {content.cta.primaryButton.text}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href={content.cta.secondaryButton.url}
                            className="inline-flex items-center justify-center gap-2 btn bg-white/10 hover:bg-white/20 text-white border border-white/30 text-lg px-8 py-4"
                        >
                            {content.cta.secondaryButton.text}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>


        </>
    );
}
