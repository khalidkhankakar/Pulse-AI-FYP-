'use client'
import React from 'react';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';


export const TopDoctors= () => {
  return (
    <section className="py-24 px-6 lg:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full"
        >
           <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-blue-50 dark:bg-blue-900/20 aspect-square relative group">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop" 
                alt="Doctor Ayesha" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10  p-6 rounded-3xl bg-secondary/50 shadow-xl backdrop-blur-lg min-w-[280px] transition-colors"
              >
                 <div className="flex items-center gap-4 mb-2">
                    <img src="https://i.pravatar.cc/100?u=ayesha" className="w-12 h-12 rounded-full" alt="Icon" />
                    <div>
                       <div className="font-bold text-slate-900 dark:text-white text-lg">Dr. Ayesha</div>
                       <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pediatrician Specialist</div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-1">
                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                       <span className="text-sm font-bold text-slate-900 dark:text-white">5.0 (400 Reviews)</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-600 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50">
                        <ArrowLeft />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-600 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50">
                        <ArrowRight />
                      </div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 w-full"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">Top Doctors, Ready to Serve You</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
            Pulse AI works alongside world-class medical professionals. Our engine serves as a diagnostic companion, allowing doctors to focus on personalized patient care.
          </p>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-100 dark:shadow-blue-900/20 flex items-center gap-2 group transition-all cursor-pointer"
          >
            Book Now
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
             {[
               { name: 'Dr. Ayesha', role: 'Pediatrician', img: 'https://i.pravatar.cc/100?u=ayesha' },
               { name: 'Dr. Bishal Akter', role: 'Dermatologist', img: 'https://i.pravatar.cc/100?u=bishal' },
               { name: 'Dr. Arif Hossain', role: 'Cardiologist', img: 'https://i.pravatar.cc/100?u=arif' }
             ].map((doc, idx) => (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 key={idx} 
                 className="bg-[#f8fbfe] dark:bg-slate-800/50 p-2 rounded-full border border-slate-100 dark:border-slate-700 flex items-center gap-2 transition-colors hover:shadow-lg transition-all"
               >
                  <img src={doc.img} className="w-14 h-14 rounded-full shadow-sm" alt={doc.name} />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{doc.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{doc.role}</div>
                  </div>
               </motion.div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

