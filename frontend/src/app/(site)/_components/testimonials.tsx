'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ShieldCheck, Cpu, Zap, Microscope, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Jenkins",
      role: "Clinical Data Scientist",
      company: "BioGen Research",
      text: "Pulse AI's XGBoost implementation for cardiac risk reduced our false discovery rate by 14% across our pilot cohort. The feature importance mapping is revolutionary for clinician trust.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      badge: "89%+ Accuracy",
      icon: <Cpu className="w-4 h-4" />
    },
    {
      name: "Mark Zhang",
      role: "CTO, HealthSync Solutions",
      company: "HealthSync",
      text: "The REST API integration was seamless. We're processing 50k+ real-time inferences daily with sub-50ms latency. It's the most scalable ML pipeline we've tested to date.",
      avatar: "https://i.pravatar.cc/150?u=mark",
      badge: "Secure REST API",
      icon: <Zap className="w-4 h-4" />
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Oncology Researcher",
      company: "St. Jude's Informatics",
      text: "Validation on our internal biopsy records showed 96.5% precision. Pulse AI is setting the new benchmark for clinical decision support in modern diagnostics.",
      avatar: "https://i.pravatar.cc/150?u=elena",
      badge: "Validated Dataset",
      icon: <Microscope className="w-4 h-4" />
    }
  ];

  return (
    <section id="support" className="py-32 px-6 lg:px-10 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <ShieldCheck className="w-3 h-3" /> Peer-Validated Performance
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black text-foreground tracking-tighter leading-none">
            Trusted by Healthcare <br />
            <span className="text-primary italic">Innovators & Researchers.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Pulse AI delivers clinical-grade, machine learning-powered disease predictions through secure, high-throughput APIs validated on real-world datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group bg-card/40 backdrop-blur-xl p-10 rounded-[3rem] border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/10 text-primary p-3 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                    <Quote className="w-6 h-6 rotate-180" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full border border-border text-[10px] font-black text-foreground uppercase tracking-widest group-hover:border-primary/20 transition-colors">
                    {t.icon}
                    {t.badge}
                  </div>
                </div>

                <p className="text-foreground/80 text-lg leading-relaxed font-medium italic">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-border flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 p-1 overflow-hidden group-hover:border-primary transition-colors">
                    <img 
                      src={t.avatar} 
                      className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all duration-500" 
                      alt={t.name} 
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <div>
                  <div className="font-black text-foreground tracking-tight">{t.name}</div>
                  <div className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
        >
          {/* Fictional clinical partners / dataset logos placeholder text */}
          <div className="text-xl font-black tracking-widest uppercase">Harvard Informatics</div>
          <div className="text-xl font-black tracking-widest uppercase">NHS Digital</div>
          <div className="text-xl font-black tracking-widest uppercase">Stanford AI Lab</div>
          <div className="text-xl font-black tracking-widest uppercase">Mayo Clinic</div>
        </motion.div>
      </div>
    </section>
  );
};

