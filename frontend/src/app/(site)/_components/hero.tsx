'use client'
import { Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-10 overflow-hidden bg-background">
      {/* Animated ECG Waveform Background */}
      <div className="absolute bottom-0 left-0 w-full h-32 -translate-y-1/2 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            className="ecg-path stroke-primary"
            d="M0 50 L100 50 L110 30 L120 70 L130 50 L200 50 L210 10 L230 90 L250 50 L350 50 L360 40 L370 60 L380 50 L500 50 L510 20 L530 80 L550 50 L700 50 L710 40 L720 60 L730 50 L850 50 L860 10 L880 90 L900 50 L1000 50"
            fill="none"
            strokeWidth="2"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 dark:via-primary/10 to-transparent w-40 h-full -skew-x-12 animate-[scan-line_4s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">
            AI-Powered Diagnostics
          </div>
        </motion.div>
        
         <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground mb-8 leading-[0.9] tracking-tighter"
        >
          Predictive <span className="text-primary italic">Health</span><br />
          <span className="text-muted-foreground/50">for Everyone.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium px-4"
        >
          Pulse AI provides intelligent disease prediction using advanced ML models, ensuring proactive care for a healthier tomorrow.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <button 
            className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group cursor-pointer border border-primary/20"
          >
            Start Free Analysis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="flex items-center gap-4 px-6 py-4 font-black text-xs uppercase tracking-widest text-foreground hover:text-primary transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-card shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
              <Play className="w-4 h-4 fill-current ml-1" />
            </div>
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Hero Glow Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
};

