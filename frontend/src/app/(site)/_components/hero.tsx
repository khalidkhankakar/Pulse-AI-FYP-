'use client'
import { Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';


export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-10  overflow-hidden transition-colors duration-300">
      {/* Animated ECG Waveform Background */}
      <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            className="ecg-path"
            d="M0 50 L100 50 L110 30 L120 70 L130 50 L200 50 L210 10 L230 90 L250 50 L350 50 L360 40 L370 60 L380 50 L500 50 L510 20 L530 80 L550 50 L700 50 L710 40 L720 60 L730 50 L850 50 L860 10 L880 90 L900 50 L1000 50"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 dark:via-primary/10 to-transparent w-20 h-full -skew-x-12 animate-[scan-line_4s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >

          <div className="px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
            AI-Powered Diagnostics
          </div>
        </motion.div>
        
         <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-7xl font-extrabold text-foreground mb-8 leading-[1.1] tracking-tighter"
        >
          Predictive <span className="text-primary italic">Health</span><br />for Everyone.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Pulse AI provides intelligent disease prediction using advanced ML models, ensuring proactive care for a healthier tomorrow.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <button 
            className="w-full sm:w-auto bg-primary hover:opacity-90 text-primary-foreground px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Book Analysis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center gap-3 font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-card shadow-sm">
              <Play className="w-4 h-4 fill-foreground" />
            </div>
            Get Started
          </button>
        </motion.div>

        {/* Hero Visual Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-4xl mx-auto mt-10"
        >
          <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-card border border-border relative group">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop" 
              alt="Medical Tech" 
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-1 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] absolute top-0 animate-[scan-vertical_3s_ease-in-out_infinite]" />
            </div>
          </div>
          
          {/* Floating UI Elements */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute -top-10 -right-10 hidden lg:block"
          >
            <div className="bg-card/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-border w-64 text-left">
              <div className="flex items-center gap-4 mb-4">
                <img src="https://i.pravatar.cc/100?u=doc1" className="w-12 h-12 rounded-full" alt="Doctor" />
                <div>
                  <div className="font-bold text-foreground">Dr. Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">Calling...</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-primary">
                  <span>VITAL SIGNS</span>
                  <span className="pulse-glow">LIVE</span>
                </div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="h-full bg-primary" 
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.4 }}
            className="absolute -bottom-10 -left-10 hidden lg:block"
          >
            <div className="bg-primary text-primary-foreground p-6 rounded-3xl shadow-xl w-48 text-center animate-bounce duration-[3s]">
              <div className="text-3xl font-bold mb-1">800+</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-widest">Doctors</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

