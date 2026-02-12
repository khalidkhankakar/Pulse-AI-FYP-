'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';



export const CTA= () => {
  const metrics = [
    { value: '15M+', label: 'Patient records analyzed' },
    { value: '99.9%', label: 'Clinical precision rate' },
    { value: '<0.05s', label: 'Inference latency' },
    { value: '$250M+', label: 'Healthcare costs saved' },
  ];

  return (
    <section className=" py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Metric Grid with Dotted Borders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-2  border-dashed  overflow-hidden mb-16">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              className={`p-10 text-center  flex flex-col justify-center border-dashed items-center
                ${idx < 2 ? 'border-b  lg:border-b-0' : ''} 
                ${idx % 2 === 0 ? 'border-r' : 'lg:border-r'}
                ${idx === 1 ? 'lg:border-r' : ''}
                ${idx === 3 ? 'lg:border-r-0' : ''}
                border-dotted`}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-6xl font-black text-[#bef264] mb-3 tracking-tighter"
              >
                {metric.value}
              </motion.div>
              <div className=" text-xs lg:text-sm font-bold uppercase tracking-widest">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Text and Button Section */}
        <div className="text-center space-y-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-4xl font-bold tracking-tight"
          >
            12,450+ Medical facilities already signed up. <span className="text-[#bef264]">Don&apos;t get left behind.</span>
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#d9f99d' }}
            whileTap={{ scale: 0.95 }}
        
            className="inline-flex items-center gap-3 bg-[#bef264] text-black px-10 py-5 rounded-full font-black text-xs lg:text-sm uppercase tracking-tighter shadow-[0_0_40px_rgba(190,242,100,0.3)] transition-all"
          >
            START AI DIAGNOSTICS
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};


