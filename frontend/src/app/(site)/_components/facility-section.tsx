'use client'
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const FacilitySection= () => {
  return (
    <section className="py-24 px-6 lg:px-10  transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full"
        >
           <div className="rounded-[2.5rem] overflow-hidden shadow-2xl  relative group">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" 
                alt="Clinic" 
                className="w-full h-[400px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 dark:bg-slate-800/90 backdrop-blur-md p-6 rounded-3xl text-white">
                <div className="flex justify-between items-end">
                   <div>
                     <h4 className="font-bold mb-1 text-white">Premium Healthcare Services</h4>
                     <p className="text-sm text-white/70">Dedicated to high-end predictive wellness centers.</p>
                   </div>
                   <button className="bg-white dark:bg-blue-600 text-slate-900 dark:text-white p-3 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500 transition-colors cursor-pointer">
                     <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-10 w-full"
        >
          <div className="inline-flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
             <span className="bg-blue-600 text-white px-4 py-2 rounded-full">Specialist Clinics</span>
             <span className="px-4 py-2">Premium Suites</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Discover Excellence in AI-Driven Healthcare
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
             {[
               { title: 'Location', desc: 'Global centers equipped with latest prediction nodes.' },
               { title: 'Interior Design', desc: 'Calm, tech-forward healing environments.' },
               { title: 'Safety', desc: 'Secure data protocols and clinical safety.' },
               { title: 'Exterior', desc: 'Iconic architectural medical facilities.' }
             ].map((item, idx) => (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 key={idx} 
                 className="flex gap-4"
               >
                 <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-500" /></div>
                 <div>
                    <h5 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
