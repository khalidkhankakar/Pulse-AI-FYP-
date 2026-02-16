'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  HeartPulse, 
  Activity, 
  Microscope, 
  Terminal, 
  Search, 
  Bell, 
  Settings,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const DashboardSection: React.FC = () => {
  const accuracyCards = [
    { label: 'Diabetes', value: '89%', icon: <BrainCircuit className="w-4 h-4" /> },
    { label: 'Heart Risk', value: '91%', icon: <HeartPulse className="w-4 h-4" /> },
    { label: 'Stroke', value: '87%', icon: <Activity className="w-4 h-4" /> },
    { label: 'Cancer', value: '93%', icon: <Microscope className="w-4 h-4" /> },
  ];

  const recentActivity = [
    { id: 'P-1024', model: 'Heart', result: 'Positive', time: '2m ago' },
    { id: 'P-1025', model: 'Diabetes', result: 'Negative', time: '15m ago' },
    { id: 'P-1026', model: 'Stroke', result: 'Negative', time: '1h ago' },
  ];

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary"
          >
            <Terminal className="w-3 h-3" /> Professional Interface
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground">
            Analytics <span className="text-primary italic">Engine.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
            Clinical-grade dashboard providing real-time data visualization and high-precision model monitoring for medical professionals.
          </p>
        </div>

        {/* Dashboard Mockup Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative glass-card rounded-[3.5rem] border border-border shadow-2xl overflow-hidden bg-card/30 backdrop-blur-3xl group"
        >
          <div className="flex h-[600px] lg:h-[750px] overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-border bg-muted/20 flex-col p-6 space-y-8">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black text-xs">P</div>
                <span className="font-black text-sm tracking-tighter">PULSE ANALYTICS</span>
              </div>
              
              <nav className="flex-1 space-y-2">
                {[
                  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', active: true },
                  { icon: <BrainCircuit className="w-4 h-4" />, label: 'Diabetes Model' },
                  { icon: <HeartPulse className="w-4 h-4" />, label: 'Heart Risk' },
                  { icon: <Activity className="w-4 h-4" />, label: 'Stroke Model' },
                  { icon: <Microscope className="w-4 h-4" />, label: 'Oncology' },
                  { icon: <Terminal className="w-4 h-4" />, label: 'API Logs' },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${item.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}>
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </nav>

              <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">System Status</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-black text-foreground">API Active</span>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-background/20">
              {/* Header */}
              <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/40">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input 
                      disabled 
                      placeholder="Search patient records..." 
                      className="w-full bg-muted/30 border border-border/50 rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Bell className="w-4 h-4 text-muted-foreground cursor-pointer" />
                  <Settings className="w-4 h-4 text-muted-foreground cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-accent border border-border" />
                </div>
              </header>

              {/* Dashboard Content */}
              <div className="flex-1 p-8 overflow-y-auto space-y-8 scrollbar-hide">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Clinical Overview</h3>
                    <p className="text-xs text-muted-foreground font-medium">Real-time predictive insights across specialized nodes.</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> HIPAA COMPLIANT
                  </div>
                </div>

                {/* Grid of Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {accuracyCards.map((card, idx) => (
                    <div key={idx} className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          {card.icon}
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{card.label}</div>
                      <div className="text-2xl font-black text-foreground">{card.value} <span className="text-[10px] opacity-50 font-medium">ACC</span></div>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-card border border-border p-6 rounded-[2rem] shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="text-sm font-black uppercase tracking-widest">Prediction Volatility</h4>
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
                      </div>
                    </div>
                    {/* Simulated Chart SVG */}
                    <div className="h-48 w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M0 150 Q 100 120, 200 160 T 400 100 T 600 130 T 800 80 T 1000 110" 
                          fill="none" 
                          stroke="var(--color-primary)" 
                          strokeWidth="4" 
                          strokeLinecap="round"
                        />
                        <path 
                          d="M0 150 Q 100 120, 200 160 T 400 100 T 600 130 T 800 80 T 1000 110 V 200 H 0 Z" 
                          fill="url(#gradient-chart)"
                        />
                      </svg>
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                        <div className="border-t border-foreground w-full h-0" />
                        <div className="border-t border-foreground w-full h-0" />
                        <div className="border-t border-foreground w-full h-0" />
                        <div className="border-t border-foreground w-full h-0" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border p-6 rounded-[2rem] shadow-sm flex flex-col">
                    <h4 className="text-sm font-black uppercase tracking-widest mb-8">Disease Weight</h4>
                    <div className="flex-1 flex items-center justify-center">
                       <div className="relative w-40 h-40">
                         <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary/10" strokeWidth="4" />
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="4" strokeDasharray="75, 100" />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <div className="text-2xl font-black">75%</div>
                           <div className="text-[8px] font-black text-muted-foreground uppercase">Cardiac Focus</div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Table Area */}
                <div className="bg-card border border-border rounded-[2rem] shadow-sm overflow-hidden">
                   <div className="p-6 border-b border-border flex justify-between items-center">
                     <h4 className="text-sm font-black uppercase tracking-widest">Recent Inferences</h4>
                     <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All Records</button>
                   </div>
                   <div className="overflow-x-auto">
                     <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="p-4 font-black">Patient ID</th>
                            <th className="p-4 font-black">AI Node</th>
                            <th className="p-4 font-black">Result</th>
                            <th className="p-4 font-black text-right">Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {recentActivity.map((row, idx) => (
                            <tr key={idx} className="hover:bg-muted/20 transition-colors">
                              <td className="p-4 font-bold">{row.id}</td>
                              <td className="p-4">
                                <span className="bg-accent px-2 py-1 rounded-md text-[10px] font-black">{row.model}</span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${row.result === 'Positive' ? 'bg-destructive' : 'bg-primary'}`} />
                                  <span className="font-bold">{row.result}</span>
                                </div>
                              </td>
                              <td className="p-4 text-right text-muted-foreground">{row.time}</td>
                            </tr>
                          ))}
                        </tbody>
                     </table>
                   </div>
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
