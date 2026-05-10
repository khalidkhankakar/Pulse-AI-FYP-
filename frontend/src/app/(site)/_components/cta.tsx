'use client';
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export const CTA = () => {
  const metrics = [
    { value: '15M+', label: 'Clinical Records' },
    { value: '99.9%', label: 'API Uptime' },
    { value: '0.1%', label: 'False Positives' },
    { value: '$100M+', label: 'Hospital Savings' },
  ]

  return (
    <section className="overflow-hidden bg-background py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Metrics */}
        <div className="mb-16 grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card/40 shadow-xl backdrop-blur-xl lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="
                group flex flex-col items-center justify-center
                border-border border-dotted
                p-6 text-center transition-colors
                hover:bg-primary/5
                sm:p-8 md:p-10
                border-b lg:border-b-0 lg:border-r
                last:border-b-0 lg:last:border-r-0
              "
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="
                  mb-3 text-3xl font-extrabold tracking-tight
                  text-primary transition-transform
                  group-hover:scale-105
                  sm:text-4xl md:text-5xl lg:text-6xl
                "
              >
                {metric.value}
              </motion.div>

              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-widest text-muted-foreground
                "
              >
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Content */}
        <div className="mx-auto max-w-4xl space-y-10 px-2 text-center sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              text-balance text-3xl font-extrabold uppercase
              leading-none tracking-tight
              sm:text-4xl md:text-5xl lg:text-6xl
            "
          >
            12,450+ Medical Facilities Already{' '}
            <span className="italic text-primary">
              Signed Up.
            </span>
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="
              inline-flex items-center gap-4
              rounded-full border border-primary/20
              bg-primary px-8 py-4
              text-xs font-bold uppercase
              tracking-wider text-primary-foreground
              shadow-lg transition-all
              cursor-pointer
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              sm:px-10 sm:py-5
            "
          >
            Get Started Now

            <ArrowUpRight className="size-5 sm:size-6" />
          </motion.button>

          <p
            className="
              text-xs font-medium uppercase
              tracking-widest text-muted-foreground
            "
          >
            Join the revolution in predictive healthcare.
          </p>
        </div>
      </div>
    </section>
  )
}