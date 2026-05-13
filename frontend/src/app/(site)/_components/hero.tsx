'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export const Hero = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-background
        pt-28 pb-20
        md:pt-32 md:pb-24
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          -z-10 h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-primary/10
          blur-3xl
          md:h-[700px] md:w-[700px]
        "
      />

      {/* ECG Wave */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0
          h-32 overflow-hidden
          opacity-20 dark:opacity-10
        "
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0 50
              L100 50
              L110 30
              L120 70
              L130 50
              L200 50
              L210 10
              L230 90
              L250 50
              L350 50
              L360 40
              L370 60
              L380 50
              L500 50
              L510 20
              L530 80
              L550 50
              L700 50
              L710 40
              L720 60
              L730 50
              L850 50
              L860 10
              L880 90
              L900 50
              L1000 50
            "
            fill="none"
            strokeWidth="2"
            className="
              ecg-path stroke-primary
            "
          />
        </svg>

        {/* Scan Line */}
        <div
          className="
            absolute inset-y-0
            w-40 -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-primary/20
            to-transparent
            animate-[scan-line_4s_linear_infinite]
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          container relative z-10
          mx-auto max-w-7xl
          px-4 text-center
          sm:px-6
        "
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div
            className="
              inline-flex items-center
              rounded-full border
              border-primary/20
              bg-primary/10
              px-4 py-2
              text-xs font-semibold
              uppercase tracking-widest
              text-primary
              backdrop-blur-sm
            "
          >
            AI-Powered Diagnostics
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.1,
            duration: 0.7,
          }}
          className="
            mx-auto max-w-6xl
            text-5xl font-extrabold
            leading-none tracking-tight
            text-foreground
            sm:text-6xl
            lg:text-8xl
          "
        >
          Predictive{' '}
          <span className="italic text-primary border border-primary relative inline-block bg-primary/10 px-2">
            Health
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-black border-2 border-primary"></span>
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-black border-2 border-primary"></span>
            <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-black border-2 border-primary"></span>
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-black border-2 border-primary"></span>
          </span>
          <br />

          <span className="text-muted-foreground/60">
            for Everyone.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.25,
            duration: 0.7,
          }}
          className="
            mx-auto mt-8
            max-w-2xl
            px-2 text-base
            leading-relaxed
            text-muted-foreground
            md:text-lg
            lg:text-xl
          "
        >
          Pulse AI delivers intelligent disease
          prediction powered by advanced machine
          learning models, helping healthcare systems
          provide proactive and data-driven care.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.4,
            duration: 0.7,
          }}
          className="
            mt-12 flex flex-col
            items-center justify-center
            gap-4
            sm:flex-row sm:gap-6
          "
        >
          {/* Primary Button */}
          <Link href="/dashboard" className="cursor-pointer" >

          <button
            className="
              inline-flex w-full items-center
              justify-center gap-3
              rounded-full bg-primary
              px-8 py-4 text-sm
              font-semibold uppercase
              tracking-widest
              text-primary-foreground
              transition-transform
              hover:scale-[1.02]
              active:scale-[0.98]
              sm:w-auto
            "
          >
            Start Free Analysis

            <ArrowRight
              className="
                size-5 transition-transform
                group-hover:translate-x-1
              "
            />
          </button>
          </Link>

          {/* Secondary Button */}
          
        </motion.div>
      </div>
    </section>
  )
}