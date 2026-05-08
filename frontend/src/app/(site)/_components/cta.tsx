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
    <section className="py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-20 bg-card/40 backdrop-blur-xl border border-border shadow-2xl">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-8 md:p-12 text-center flex flex-col justify-center items-center border-border border-dotted border-b lg:border-b-0 lg:border-r last:border-b-0 lg:last:border-r-0 hover:bg-primary/5 transition-colors group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-3 tracking-tighter group-hover:scale-110 transition-transform"
              >
                {metric.value}
              </motion.div>

              <div className="text-muted-foreground text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Text and Button Section */}
        <div className="text-center space-y-12 max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tighter leading-[0.95] uppercase"
          >
            12,450+ Medical facilities already <span className="text-primary italic">Signed Up.</span>
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-6 bg-primary text-primary-foreground px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all cursor-pointer border border-primary/20"
          >
            Get Started Now
            <ArrowUpRight className="w-6 h-6" />
          </motion.button>
          
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
            Join the revolution in predictive healthcare.
          </p>
        </div>
      </div>
    </section>
  );
};


