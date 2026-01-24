'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NEWS_ITEMS = [
    {
        id: 1,
        title: 'ASTI Graduation Ceremony 2024',
        date: 'December 15, 2024',
        excerpt: 'Celebrating our newest graduates who are ready to make their mark in the technology industry.',
        image: '/images/news/event-1.png',
        category: 'Events',
    },
    {
        id: 2,
        title: 'AI & Future Skills Workshop',
        date: 'November 28, 2024',
        excerpt: 'Industry experts share insights on the skills needed for the future of work.',
        image: '/images/news/event-2.png',
        category: 'Workshops',
    },
    {
        id: 3,
        title: 'New Drone Technology Programme',
        date: 'November 10, 2024',
        excerpt: 'ASTI launches cutting-edge UAV operations certificate programme for aspiring pilots.',
        image: '/images/programmes/uav.png',
        category: 'Programmes',
    },
];

const EVENTS = [
    { title: 'Open Day 2025', date: 'January 20, 2025', time: '9:00 AM - 4:00 PM' },
    { title: 'Tech Career Fair', date: 'February 5, 2025', time: '10:00 AM - 3:00 PM' },
    { title: 'Guest Lecture: Cybersecurity', date: 'February 12, 2025', time: '2:00 PM - 4:00 PM' },
];

export default function NewsEvents() {
    return (
        <section className="py-20 bg-white" id="news">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* CLONEA-style centered heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-oswald font-bold text-navy uppercase tracking-wide">
                        News & <span className="text-maroon">Events</span>
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto mt-4" />
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                        Stay connected with the latest happenings at ASTI, from graduation ceremonies
                        to industry workshops and career opportunities.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* News Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {NEWS_ITEMS.map((item, index) => (
                            <motion.article
                                key={item.id}
                                className="group bg-gray-50 rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Image */}
                                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <span className="absolute top-3 left-3 px-3 py-1 bg-maroon text-white text-xs font-semibold uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col justify-center">
                                    <time className="text-sm text-gray-500 mb-2">{item.date}</time>
                                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-maroon transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {item.excerpt}
                                    </p>
                                    <Link
                                        href="/campus-life#events"
                                        className="inline-flex items-center text-sm font-semibold text-maroon mt-3 group-hover:underline"
                                    >
                                        Read More
                                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.article>
                        ))}

                        <div className="text-center pt-4">
                            <Link href="/campus-life#events" className="btn btn-secondary">
                                View All News
                            </Link>
                        </div>
                    </div>

                    {/* Upcoming Events Sidebar */}
                    <motion.div
                        className="bg-navy rounded-sm p-6 text-white h-fit"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-oswald font-bold uppercase mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Upcoming Events
                        </h3>
                        <div className="space-y-4">
                            {EVENTS.map((event) => (
                                <div
                                    key={event.title}
                                    className="p-4 bg-white/10 rounded-sm hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    <h4 className="font-semibold text-gold mb-1">{event.title}</h4>
                                    <p className="text-sm text-gray-300">{event.date}</p>
                                    <p className="text-xs text-gray-400">{event.time}</p>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/campus-life#events"
                            className="inline-flex items-center justify-center w-full mt-6 py-3 border border-gold/50 text-gold rounded-sm hover:bg-gold/10 transition-colors uppercase font-bold tracking-widest text-sm"
                        >
                            View All Events
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
