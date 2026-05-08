
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { label: 'Disease Models', value: '4+' },
    { label: 'Avg. Accuracy', value: '94%+' },
    { label: 'Inference Speed', value: 'Real-time' },
    { label: 'Data Security', value: 'AES-256' },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-card border border-border rounded-[2.5rem] p-10 md:p-12 lg:p-16 shadow-xl shadow-primary/5 relative overflow-hidden group">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="text-center group border-border last:border-0 md:px-4 lg:border-r"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
