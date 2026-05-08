'use client'
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const FacilitySection= () => {
  return (
    <section className="py-24 px-6 lg:px-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full"
        >
           <div className="rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative group border border-border">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" 
                alt="Clinic" 
                className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-xl p-8 rounded-[2rem] border border-border shadow-2xl">
                <div className="flex justify-between items-center gap-4">
                   <div>
                     <h4 className="font-black text-lg md:text-xl mb-1 text-foreground uppercase tracking-tight">Premium Facilities</h4>
                     <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-widest">Dedicated to predictive wellness.</p>
                   </div>
                   <button className="bg-primary text-primary-foreground p-4 rounded-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/20 shrink-0">
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
          <div className="inline-flex gap-2 p-1 bg-muted rounded-full border border-border">
             <span className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10">Specialist Clinics</span>
             <span className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Premium Suites</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground leading-[0.95] tracking-tighter">
            Discover Excellence in <span className="text-primary italic">AI Healthcare.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
             {[
               { title: 'Location', desc: 'Global centers equipped with latest prediction nodes.' },
               { title: 'Environment', desc: 'Calm, tech-forward healing environments.' },
               { title: 'Protocol', desc: 'Secure data standards and clinical safety.' },
               { title: 'Design', desc: 'Iconic architectural medical facilities.' }
             ].map((item, idx) => (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 key={idx} 
                 className="flex gap-4 group"
               >
                 <div className="mt-1 transition-transform group-hover:scale-110"><CheckCircle2 className="w-5 h-5 text-primary" /></div>
                 <div>
                    <h5 className="font-black text-foreground mb-1 uppercase text-sm tracking-tight">{item.title}</h5>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
