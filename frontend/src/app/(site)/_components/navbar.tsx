'use client';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export const Navbar = () => {

    const { setTheme, theme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDarkMode = theme === 'dark'

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-3 bg-white/80 dark:bg-primary/10 backdrop-blur-lg shadow-sm'
                : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">P</div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Pulse AI</span>
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    {['Home', 'About Us', 'Team', 'Testimonial'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
                        className="p-2.5 rounded-full transition-all border shadow-sm"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>

                    <Button
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 border border-slate-200 dark:border-slate-700 shadow-sm hover:opacity-90"
                    >
                        Try Predications
                    </Button>
                </div>
            </div>
        </nav>
    );
};

