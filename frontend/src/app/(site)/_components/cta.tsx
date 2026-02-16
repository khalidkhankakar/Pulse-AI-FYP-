'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';



export const CTA = () => {
  const metrics = [
    { value: '15M+', label: 'Clinical Records' },
    { value: '99.9%', label: 'API Uptime' },
    { value: '0.1%', label: 'False Positives' },
    { value: '$100M+', label: 'Hospital Savings' },
  ];

  return (
    <section className=" py-8 px-6 overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        {/* Metric Grid with Dotted Borders */}
 <div
  className="
    grid grid-cols-2 lg:grid-cols-4
    rounded-[2.5rem]
    overflow-hidden
    mb-20
    bg-white/70 dark:bg-zinc-900/70
    backdrop-blur-xl
    border border-black/10 dark:border-white/10

  "
>
  {metrics.map((metric, idx) => (
    <div
      key={idx}
      className="
        p-12
        text-center
        flex flex-col justify-center items-center
        border-black/10 dark:border-white/10
        border-dotted
        border-b lg:border-b-0
        border-r
        last:border-r-0
        lg:last:border-r-0
      "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="
          text-5xl lg:text-7xl
          font-black
          text-primary
          mb-3
          tracking-tighter
        "
      >
        {metric.value}
      </motion.div>

      <div
        className="
          text-zinc-500 dark:text-white/60
          text-[10px] lg:text-xs
          font-black
          uppercase
          tracking-[0.3em]
        "
      >
        {metric.label}
      </div>
    </div>
  ))}
</div>

        {/* Text and Button Section */}
        <div className="text-center space-y-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl lg:text-4xl font-black  tracking-tighter max-w-4xl mx-auto leading-[1.1]"
          >
            12,450+ Medical facilities already signed up. <br />
            <span className="text-primary italic underline decoration-background/20 underline-offset-8">Don't get left behind.</span>
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.95 }}

            className="inline-flex items-center gap-5 bg-primary text-primary-foreground px-4 py-3 rounded-full text-sm lg:text-lg uppercase tracking-tighter transition-all cursor-pointer "
          >
            Get Started
            <ArrowUpRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};


