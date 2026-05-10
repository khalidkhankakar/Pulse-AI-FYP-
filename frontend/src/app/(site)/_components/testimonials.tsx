'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote, ShieldCheck, Cpu, Zap, Microscope, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const testimonialsData = [
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Clinical Data Scientist',
    company: 'BioGen Research',
    text:
      "Pulse AI's Logistic Regression implementation for cardiac risk reduced our false discovery rate by 14% across our pilot cohort. The feature importance mapping improves clinician trust significantly.",
    badge: '89%+ Accuracy',
    icon: Cpu,
  },
  {
    name: 'Mark Zhang',
    role: 'CTO, HealthSync Solutions',
    company: 'HealthSync',
    text:
      'The REST API integration was seamless. We process 50k+ real-time inferences daily with sub-50ms latency. One of the most scalable ML pipelines we tested.',
    badge: 'Secure API',
    icon: Zap,
  },
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Oncology Researcher',
    company: "St. Jude's Informatics",
    text:
      'Validation on biopsy datasets showed 96.5% precision. Pulse AI is setting a new benchmark for clinical decision support systems.',
    badge: 'Validated Model',
    icon: Microscope,
  },
]

export const Testimonials: React.FC = () => {
  return (
    <section
      id="support"
      className="relative overflow-hidden bg-background py-24 px-6 lg:px-10"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-200 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl space-y-6 text-center md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
            <ShieldCheck className="h-3 w-3" />
            Peer-Validated Performance
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.95] text-foreground md:text-5xl lg:text-7xl">
            Trusted by Healthcare <br />
            <span className="text-primary italic">Innovators.</span>
          </h2>

          <p className="mx-auto max-w-2xl px-4 text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
            Clinical-grade AI systems delivering validated disease predictions
            through secure, high-performance ML pipelines.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {testimonialsData.map((t, idx) => {
            const Icon = t.icon
            

            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="
                  group flex flex-col justify-between
                  rounded-[2.5rem] border border-border
                  bg-card/40 p-8 shadow-sm backdrop-blur-xl
                  transition-all duration-500
                  hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5
                  md:p-10
                "
              >
                {/* Top */}
                <div className="space-y-8">
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Quote className="h-5 w-5 rotate-180" />
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-foreground transition-colors group-hover:border-primary/20">
                      <Icon className="h-4 w-4" />
                      {t.badge}
                    </div>
                  </div>

                  <p className="text-base font-medium italic leading-relaxed text-foreground/80 md:text-lg">
                    {t.text}
                  </p>
                </div>

                {/* User */}
                <div className="mt-10 flex items-center gap-4 border-t border-border pt-8 md:mt-12">
                  <div className="relative">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20 p-1 transition-colors group-hover:border-primary md:h-14 md:w-14">
                      <Avatar className='w-full h-full font-bold'>
                        <AvatarFallback >{t.name.split(' ')[0].charAt(0) + t.name.split(' ')[1].charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1 text-primary-foreground shadow-sm">
                      <Star className="h-2.5 w-2.5 fill-current" />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-black uppercase tracking-tight text-foreground md:text-base">
                      {t.name}
                    </div>
                    <div className="mt-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Partners */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale transition duration-500 hover:grayscale-0 md:gap-12">
          {['Harvard Informatics', 'NHS Digital', 'Stanford AI Lab', 'Mayo Clinic'].map(
            (p) => (
              <div
                key={p}
                className="text-lg font-black uppercase tracking-widest md:text-xl"
              >
                {p}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}