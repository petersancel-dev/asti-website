'use client';

import { useEffect, useRef, useCallback } from 'react';

// =============================================================================
// CONSTELLATION BACKGROUND
// Subtle animated particle network effect for the Programme Galaxy
// =============================================================================

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export default function ConstellationBackground({
    particleCount = 50,
    connectionDistance = 120,
    particleColor = 'rgba(196, 165, 46, 0.4)', // Gold
    lineColor = 'rgba(196, 165, 46, 0.08)',
    speed = 0.3
}: {
    particleCount?: number;
    connectionDistance?: number;
    particleColor?: string;
    lineColor?: string;
    speed?: number;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | undefined>(undefined);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    // Initialize particles
    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                radius: Math.random() * 2.5 + 1,
                opacity: Math.random() * 0.6 + 0.4
            });
        }
        particlesRef.current = particles;
    }, [particleCount, speed]);

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const particles = particlesRef.current;
        const mouse = mouseRef.current;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges (with padding)
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;

            // Stronger mouse repulsion
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200 && dist > 0) {
                const force = (200 - dist) / 200 * 0.05;
                particle.vx -= (dx / dist) * force;
                particle.vy -= (dy / dist) * force;
            }

            // Limit velocity
            const maxSpeed = speed * 1.5;
            const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (currentSpeed > maxSpeed) {
                particle.vx = (particle.vx / currentSpeed) * maxSpeed;
                particle.vy = (particle.vy / currentSpeed) * maxSpeed;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor.replace('0.4', String(particle.opacity));
            ctx.fill();

            // Draw connections to nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const other = particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = lineColor.replace('0.08', String(opacity));
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [connectionDistance, lineColor, particleColor, speed]);

    // Setup
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = parent.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            initParticles(rect.width, rect.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Start animation
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate, initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-auto"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
