'use client'
import React, { useState } from 'react';
import { Brain, Database, Cpu, Activity, ShieldCheck, HeartPulse, Microscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

enum DiseaseType {
  DIABETES = 'DIABETES',
  HEART_DISEASE = 'HEART_DISEASE',
  STROKE = 'STROKE',
  LIVER = 'LIVER',
}

const modelsData = [
  {
    type: DiseaseType.DIABETES,
    name: 'Diabetes Analysis',
    acc: '89.4%',
    algo: 'Random Forest',
    dataset: '768 Clinical Patients',
    image: '/disease/diabetes.jpg',
    icon: <Brain className="w-6 h-6" />,
    tagline: 'Predictive Glucose Mapping'
  },
  {
    type: DiseaseType.HEART_DISEASE,
    name: 'Cardiac Risk',
    acc: '94.2%',
    algo: 'XGBoost Engine',
    dataset: '1,025 Heart Patients',
    image: '/disease/heart.jpg',
    icon: <HeartPulse className="w-6 h-6" />,
    tagline: 'Vascular Pattern Recognition'
  },
  {
    type: DiseaseType.STROKE,
    name: 'Stroke Prediction',
    acc: '91.8%',
    algo: 'Logistic Reg.',
    dataset: '5,110 Medical Records',
    image: '/disease/stroke.jpg',
    icon: <Activity className="w-6 h-6" />,
    tagline: 'Neurological Risk Scoring'
  },
  {
    type: DiseaseType.LIVER,
    name: 'Liver Detection',
    acc: '96.5%',
    algo: 'SVM Classifier',
    dataset: '569 Biopsy Records',
    image: '/disease/liver.jpg',
    icon: <Microscope className="w-6 h-6" />,
    tagline: 'Cellular Morphology Analysis'
  },
];

export const DiseaseModelsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModel = modelsData[activeIndex];

  return (
    <section className="py-24 px-6 lg:px-10 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Side: Visual Display */}
        <div className="flex-1 relative w-full h-[500px] md:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.05, x: 20 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="absolute inset-0"
            >
              <div className="relative h-full shadow-2xl rounded-[3rem] overflow-hidden group border border-border">
                <img 
                  src={activeModel.image} 
                  alt={activeModel.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4000ms]"
                />
                
                {/* Info Card Overlay */}
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 bg-card/80 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-border shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                        {activeModel.icon}
                      </div>

                      <div>
                        <h4 className="font-black text-lg md:text-xl tracking-tighter text-foreground uppercase">
                          {activeModel.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">
                            {activeModel.tagline}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ShieldCheck className="hidden sm:block w-6 h-6 text-muted-foreground/30" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-muted/50 p-4 rounded-2xl border border-border/50 hover:bg-muted transition-colors">
                      <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">Accuracy</div>
                      <div className="text-xl md:text-2xl font-black text-primary">{activeModel.acc}</div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-2xl border border-border/50 hover:bg-muted transition-colors">
                      <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">Algorithm</div>
                      <div className="text-xs md:text-sm font-black text-foreground uppercase">{activeModel.algo}</div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-2xl border border-border/50 col-span-2 flex items-center justify-between hover:bg-muted transition-colors">
                      <div>
                        <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">Dataset Size</div>
                        <div className="text-xs md:text-sm font-bold text-foreground uppercase">{activeModel.dataset}</div>
                      </div>
                      <Database className="w-5 h-5 text-primary/40" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Navigation & Info */}
        <div className="flex-1 space-y-10 lg:space-y-12 w-full">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary"
            >
              <Cpu className="w-3 h-3" /> Real-time Inference Grid
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground leading-[0.95] tracking-tighter">
              Machine Learning <br />
              <span className="text-primary italic">Intelligence.</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium max-w-xl">
              Switch between our specialized medical neural networks. Each model is trained on distinct clinical features to provide hyper-accurate risk assessments for critical conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modelsData.map((m, idx) => (
              <motion.button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-6 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden ${
                  activeIndex === idx 
                  ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10' 
                  : 'bg-muted/30 border-border hover:border-primary/40'
                }`}
              >
                {activeIndex === idx && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/5 pointer-events-none"
                  />
                )}
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className={`font-black tracking-tight text-lg uppercase transition-colors ${activeIndex === idx ? 'text-primary' : 'text-foreground'}`}>
                    {m.name.split(' ')[0]}
                  </span>
                  <span className={`font-black text-[10px] transition-colors ${activeIndex === idx ? 'text-primary' : 'text-muted-foreground'}`}>
                    {m.acc}
                  </span>
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors relative z-10">
                  {m.algo}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
