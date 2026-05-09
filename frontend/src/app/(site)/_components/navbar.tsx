'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ThemeSwitcher from '@/components/shared/theme-switcher'

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonial', href: '#testimonial' },
]

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-300
        ${
          isScrolled
            ? 'border-b border-border bg-background/80 py-3 backdrop-blur-xl shadow-sm'
            : 'bg-transparent py-6'
        }
      `}
    >
      <div
        className="
          container mx-auto max-w-7xl
          px-4 sm:px-6 lg:px-10
        "
      >
        <div
          className="
            flex items-center
            justify-between
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              flex items-center gap-3
              transition-transform
              active:scale-95
            "
          >
            <div
              className="
                flex size-10 items-center
                justify-center rounded-full
                bg-primary text-lg
                font-bold text-primary-foreground
              "
            >
              P
            </div>

            <span
              className="
                text-xl font-extrabold
                tracking-tight text-foreground
              "
            >
              PULSE AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div
            className="
              hidden items-center gap-1
              rounded-full border
              border-border/50
              bg-muted/40 p-1
              md:flex
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  rounded-full px-4 py-1.5
                  text-xs font-semibold
                  text-muted-foreground
                  transition-colors
                  hover:bg-background
                  hover:text-foreground
                "
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeSwitcher />

            <Link
              href="/dashboard"
              className="
                hidden rounded-full
                border border-primary/20
                bg-primary px-6 py-2.5
                text-xs font-semibold
                uppercase tracking-widest
                text-primary-foreground
                shadow-md shadow-primary/20
                transition-all
                hover:opacity-90
                active:scale-95
                sm:block
              "
            >
              Try Predictions
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}