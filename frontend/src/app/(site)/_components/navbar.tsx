'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/shared/theme-switcher';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
                ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
                : 'py-6 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-black shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                        P
                    </div>
                    <span className="text-xl font-black tracking-tighter text-foreground">
                        PULSE AI
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
                    {['Home', 'About Us', 'Team', 'Testimonial'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="px-4 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-background rounded-full transition-all"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <Link
                        href="/dashboard"
                        className="hidden sm:block bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 hover:opacity-90 shadow-lg shadow-primary/20 border border-primary/20"
                    >
                        Try Predictions
                    </Link>
                    {/* Mobile Menu Trigger Placeholder - if needed */}
                </div>
            </div>
        </nav>
    );
};

