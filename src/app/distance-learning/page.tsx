import { Metadata } from 'next';
import Link from 'next/link';
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
            <section className="relative bg-gradient-to-br from-navy via-navy-dark to-slate-900 py-24 md:py-32 text-white overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6">
                            200+ Online Courses Available
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {content.hero.heading}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-4">
                            {content.hero.tagline}
                        </p>
                        <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
                            {content.hero.description}
                        </p>
                        <a
                            href={content.hero.ctaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 btn btn-gold text-lg px-8 py-4"
                        >
                            {content.hero.ctaText}
                            <ExternalLink className="w-5 h-5" />
                        </a>
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
                                <a
                                    key={index}
                                    href={content.partner.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative p-6 rounded-2xl bg-gradient-to-br ${category.color} text-white text-center hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`}
                                >
                                    <div className="absolute inset-0 bg-black/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Icon className="w-10 h-10 mx-auto mb-3 drop-shadow-lg" />
                                    <span className="font-semibold text-lg drop-shadow">{category.name}</span>
                                </a>
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
                        <a
                            href={content.cta.primaryButton.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 btn btn-gold text-lg px-8 py-4"
                        >
                            {content.cta.primaryButton.text}
                            <ExternalLink className="w-5 h-5" />
                        </a>
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

            {/* Partner Info */}
            <section className="section-padding bg-gray-50">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm text-gray-500 mb-4">Powered by</p>
                        <h3 className="text-2xl font-semibold text-navy mb-4">ed2go</h3>
                        <p className="text-gray-600 mb-6">
                            {content.partner.description}
                        </p>
                        <a
                            href={content.partner.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold-dark font-medium inline-flex items-center gap-1"
                        >
                            Visit our ed2go portal
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
