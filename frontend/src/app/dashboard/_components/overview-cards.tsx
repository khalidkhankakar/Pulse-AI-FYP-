import { Activity, BarChart3, BrainCircuit,  ShieldCheck } from 'lucide-react';
import Heading from './heading';
import { cn } from '@/lib/utils';

const overviewCards = [
  { label: 'Predictions Made', value: '12,480', trend: '+12%', icon: Activity, color: 'primary' },
  { label: 'Active ML Models', value: '4', trend: 'Stable', icon: BrainCircuit, color: 'chart-2' },
  { label: 'Avg. Accuracy', value: '94.2%', trend: '+0.5%', icon: BarChart3, color: 'chart-1' },
  { label: 'High Risk Alerts', value: '142', trend: '-3%', icon: ShieldCheck, color: 'destructive' },
];

export const OverviewCards = () => {
  return (
     <div className="space-y-8">
      <Heading textHeading='Overview' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
          {overviewCards.map((card, idx) => (
            <div 
              key={idx} 
              className="bg-card border border-border p-6 rounded-3xl shadow-sm hover:ring-1 hover:ring-primary/20 transition-all hover:shadow-lg group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground border border-border/50">
                  <card.icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-border/50 backdrop-blur-sm shadow-sm",
                  card.trend.startsWith('+') ? 'bg-primary/5 text-primary border-primary/20' : 
                  card.trend === 'Stable' ? 'bg-muted text-muted-foreground' : 
                  'bg-destructive/5 text-destructive border-destructive/20'
                )}>
                  {card.trend}
                </span>
              </div>

              <div className="space-y-1 relative z-10">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {card.label}
                </div>
                <div className="text-3xl font-bold text-foreground tracking-tight">
                  {card.value}
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
  )
}