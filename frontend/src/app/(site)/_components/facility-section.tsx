'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const facilityFeatures = [
  {
    title: 'Location',
    desc: 'Global centers equipped with advanced predictive healthcare infrastructure.',
  },
  {
    title: 'Environment',
    desc: 'Calm and technology-forward medical environments designed for patients.',
  },
  {
    title: 'Protocol',
    desc: 'Enterprise-grade security standards and clinical safety systems.',
  },
  {
    title: 'Design',
    desc: 'Modern healthcare architecture optimized for AI-driven workflows.',
  },
]

export const FacilitySection = () => {
  return (
    <section className="overflow-hidden bg-background py-20 md:py-24">
      <div
        className="
          container mx-auto max-w-7xl
          px-4 sm:px-6
        "
      >
        <div
          className="
            grid items-center gap-14
            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* Image Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="
                relative overflow-hidden
                rounded-3xl border border-border
                bg-card shadow-xl
              "
            >
              {/* Image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop"
                  alt="Premium AI healthcare facility"
                  className="
                    h-[420px] w-full object-cover
                    transition-transform duration-700
                    hover:scale-105
                    md:h-[520px]
                  "
                />

                {/* Gradient Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-background/80
                    via-background/10
                    to-transparent
                  "
                />
              </div>

              {/* Floating Card */}
              <div
                className="
                  absolute bottom-4 left-4 right-4
                  rounded-2xl border border-border
                  bg-card/90 p-5 backdrop-blur-md
                  md:bottom-6 md:left-6 md:right-6
                  md:p-6
                "
              >
                <div
                  className="
                    flex items-center justify-between
                    gap-4
                  "
                >
                  <div>
                    <h4
                      className="
                        text-lg font-bold
                        tracking-tight text-foreground
                        md:text-xl
                      "
                    >
                      Premium Facilities
                    </h4>

                    <p
                      className="
                        mt-1 text-sm
                        text-muted-foreground
                      "
                    >
                      Dedicated to predictive wellness.
                    </p>
                  </div>

                  <button
                    className="
                      flex size-12 items-center
                      justify-center rounded-xl
                      bg-primary text-primary-foreground
                      transition-transform
                      hover:scale-105
                      active:scale-95
                    "
                  >
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-10"
          >
            {/* Toggle Pills */}
            <div
              className="
                inline-flex flex-wrap items-center gap-2
                rounded-full border border-border
                bg-muted p-1
              "
            >
              <span
                className="
                  rounded-full bg-primary
                  px-5 py-2 text-xs
                  font-semibold uppercase
                  tracking-widest
                  text-primary-foreground
                "
              >
                Specialist Clinics
              </span>

              <span
                className="
                  px-5 py-2 text-xs
                  font-medium uppercase
                  tracking-widest
                  text-muted-foreground
                "
              >
                Premium Suites
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-6">
              <h2
                className="
                  text-4xl font-extrabold
                  leading-none tracking-tight
                  text-foreground
                  md:text-5xl lg:text-6xl
                "
              >
                Discover Excellence in{' '}
                <span className="italic text-primary">
                  AI Healthcare.
                </span>
              </h2>

              <p
                className="
                  max-w-xl text-base
                  leading-relaxed text-muted-foreground
                "
              >
                Our medical facilities combine intelligent
                healthcare infrastructure with modern patient
                experiences, enabling secure and scalable
                AI-powered diagnostics.
              </p>
            </div>

            {/* Features */}
            <div
              className="
                grid gap-8 pt-2
                sm:grid-cols-2
              "
            >
              {facilityFeatures.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.1,
                  }}
                  className="
                    flex items-start gap-4
                  "
                >
                  <div
                    className="
                      mt-1 flex size-10
                      items-center justify-center
                      rounded-xl bg-primary/10
                      text-primary
                    "
                  >
                    <CheckCircle2 className="size-5" />
                  </div>

                  <div>
                    <h5
                      className="
                        mb-2 text-sm font-semibold
                        uppercase tracking-wide
                        text-foreground
                      "
                    >
                      {item.title}
                    </h5>

                    <p
                      className="
                        text-sm leading-relaxed
                        text-muted-foreground
                      "
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}