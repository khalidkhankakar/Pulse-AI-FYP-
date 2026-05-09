'use client'

import React from 'react'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

const socialLinks = [
  {
    icon: Facebook,
    href: '#',
    label: 'Facebook',
  },
  {
    icon: Twitter,
    href: '#',
    label: 'Twitter',
  },
  {
    icon: Instagram,
    href: '#',
    label: 'Instagram',
  },
]

const services = [
  'Health Analysis',
  'Risk Scoring',
  'Clinical Insights',
  'Data Security',
]

const quickLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'About Us',
    href: '#',
  },
  {
    label: 'Contact Us',
    href: '#',
  },
]

const contactInfo = [
  {
    icon: Phone,
    text: '+880 1623-018240',
  },
  {
    icon: Mail,
    text: 'hello@pulseai.com',
  },
  {
    icon: MapPin,
    text: '3511 Ranchview Dr. Richardson, California 62639',
  },
]

export const Footer: React.FC = () => {
  return (
    <footer
      className="
        border-t border-border
        bg-background
      "
    >
      <div
        className="
          container mx-auto max-w-7xl
          px-4 py-20 sm:px-6
          lg:py-24
        "
      >
        {/* Main Grid */}
        <div
          className="
            grid gap-14
            md:grid-cols-2
            lg:grid-cols-5
          "
        >
          {/* Brand */}
          <div className="space-y-8 lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              className="
                inline-flex items-center gap-3
              "
            >
              <div
                className="
                  flex size-11 items-center
                  justify-center rounded-xl
                  bg-primary text-lg
                  font-bold text-primary-foreground
                "
              >
                P
              </div>

              <span
                className="
                  text-2xl font-extrabold
                  tracking-tight text-foreground
                "
              >
                Pulse AI
              </span>
            </Link>

            {/* Description */}
            <p
              className="
                max-w-md text-sm
                leading-relaxed text-muted-foreground
                md:text-base
              "
            >
              Providing intelligent healthcare solutions
              powered by advanced artificial intelligence
              for reliable diagnostics and predictive
              medical analysis.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon

                return (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="
                      flex size-11 items-center
                      justify-center rounded-xl
                      border border-border
                      bg-card text-muted-foreground
                      transition-colors
                      hover:bg-primary
                      hover:text-primary-foreground
                    "
                  >
                    <Icon className="size-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4
              className="
                text-sm font-semibold
                uppercase tracking-widest
                text-foreground
              "
            >
              Services
            </h4>

            <ul className="space-y-4">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    className="
                      text-sm text-muted-foreground
                      transition-colors
                      hover:text-primary
                    "
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4
              className="
                text-sm font-semibold
                uppercase tracking-widest
                text-foreground
              "
            >
              Quick Links
            </h4>

            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="
                      text-sm text-muted-foreground
                      transition-colors
                      hover:text-primary
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4
              className="
                text-sm font-semibold
                uppercase tracking-widest
                text-foreground
              "
            >
              Contact
            </h4>

            <ul className="space-y-5">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon

                return (
                  <li
                    key={idx}
                    className="
                      flex items-start gap-3
                    "
                  >
                    <div
                      className="
                        mt-0.5 text-primary
                      "
                    >
                      <Icon className="size-4" />
                    </div>

                    <span
                      className="
                        text-sm leading-relaxed
                        text-muted-foreground
                      "
                    >
                      {item.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-16 border-t border-border
            pt-8
          "
        >
          <div
            className="
              flex flex-col items-center
              justify-between gap-4
              text-center text-xs
              text-muted-foreground
              sm:flex-row sm:text-left
            "
          >
            <div
              className="
                flex flex-wrap items-center
                justify-center gap-4
                sm:justify-start
              "
            >
              <Link
                href="#"
                className="
                  transition-colors
                  hover:text-primary
                "
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="
                  transition-colors
                  hover:text-primary
                "
              >
                Terms of Service
              </Link>
            </div>

            <p>
              © 2026 Pulse AI — Final Year Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}