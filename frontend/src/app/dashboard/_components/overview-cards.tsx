import React from 'react'
import { Activity, BarChart3, BrainCircuit, Info, RefreshCw, ShieldCheck } from 'lucide-react';

const overviewCards = [
  { label: 'Predictions Made', value: '12480', trend: '+12%', icon: <Activity className="w-5 h-5" />, color: 'primary' },
  { label: 'Active ML Models', value: '4', trend: 'Stable', icon: <BrainCircuit className="w-5 h-5" />, color: 'blue' },
  { label: 'Avg. Accuracy', value: '94.2%', trend: '+0.5%', icon: <BarChart3 className="w-5 h-5" />, color: 'emerald' },
  { label: 'High Risk Alerts', value: '142', trend: '-3%', icon: <ShieldCheck className="w-5 h-5" />, color: 'rose' },
];
export const OverviewCards = () => {
  return (
     <div>
        <h1 className='text-2xl font-semibold'>Statistics of Models</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
          {overviewCards.map((card, idx) => (
            <div key={idx} className="bg-card border border-border p-6 rounded-[2.5rem] shadow-sm hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 group relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {card.icon}
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${card.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                  {card.trend}
                </span>
              </div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{card.label}</div>
              <div className="text-3xl font-black text-foreground tracking-tight">{card.value}</div>
            </div>
          ))}
        </div>
      </div>
  )
}