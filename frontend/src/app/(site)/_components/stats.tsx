
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { label: 'Disease Models', value: '3+' },
    { label: 'Average Accuracy', value: '95%+' },
    { label: 'Prediction Speed', value: 'Real-time' },
    { label: 'Backend Security', value: 'Encrypted' },
  ];

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-[2.5rem] p-8 lg:p-12 ">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="text-center group border-r border-border last:border-0 md:px-4"
              >
                <div className="text-3xl lg:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
