'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldCheck,
  User,
  History,
  BarChart3,
  MonitorDot,
  LogOut,
  FileDown,
  ChevronRight,
} from 'lucide-react';

const DashboardSection: React.FC = () => {
  const [predictionCount, setPredictionCount] = useState(12480);

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictionCount(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const overviewCards = [
    { label: 'Predictions Made', value: predictionCount.toLocaleString(), trend: '+12%', icon: <Activity className="w-5 h-5" />, color: 'primary' },
    { label: 'Active ML Models', value: '4', trend: 'Stable', icon: <BrainCircuit className="w-5 h-5" />, color: 'chart-2' },
    { label: 'Avg. Accuracy', value: '94.2%', trend: '+0.5%', icon: <BarChart3 className="w-5 h-5" />, color: 'chart-1' },
    { label: 'High Risk Alerts', value: '142', trend: '-3%', icon: <ShieldCheck className="w-5 h-5" />, color: 'destructive' },
  ];

  const quickActions = [
    { name: 'Diabetes Risk', desc: 'Blood glucose analysis', icon: <Microscope className="w-6 h-6" />, type: 'Diabetes' },
    { name: 'Heart Disease', desc: 'Vascular pattern scoring', icon: <HeartPulse className="w-6 h-6" />, type: 'Heart' },
    { name: 'Stroke Scoring', desc: 'Neurological data core', icon: <Activity className="w-6 h-6" />, type: 'Stroke' },
  ];

  const recentPatients = [
    { name: 'James Wilson', age: 45, disease: 'Heart Disease', risk: 'High', date: 'Oct 24, 2026' },
    { name: 'Sarah Chen', age: 32, disease: 'Diabetes', risk: 'Low', date: 'Oct 24, 2026' },
    { name: 'Robert Fox', age: 67, disease: 'Stroke', risk: 'Medium', date: 'Oct 23, 2026' },
    { name: 'Elena Gilbert', age: 29, disease: 'Breast Cancer', risk: 'Low', date: 'Oct 22, 2026' },
  ];

  return (
    <section id="dashboard" className="py-24 px-6 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary"
          >
            <MonitorDot className="w-3 h-3" /> System Control Center
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground">
            Clinical <span className="text-primary italic">Intelligence.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium text-sm md:text-base">
            A production-ready SaaS dashboard designed for high-concurrency medical institutions.
          </p>
        </div>

        {/* Dashboard Application Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] md:rounded-[3.5rem] border border-border shadow-2xl overflow-hidden bg-card/40 backdrop-blur-3xl"
        >
          <div className="flex h-[700px] lg:h-[900px] overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:flex w-72 border-r border-border bg-muted/20 flex-col p-8 space-y-10">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black shadow-lg shadow-primary/20">P</div>
                <div>
                  <div className="font-black text-sm tracking-tighter text-foreground leading-none uppercase">PULSE AI</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Enterprise v4.2</div>
                </div>
              </div>
              
              <nav className="flex-1 space-y-2">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 px-3">Main Menu</div>
                {[
                  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview', active: true },
                  { icon: <BrainCircuit className="w-4 h-4" />, label: 'Diabetes Predictor' },
                  { icon: <HeartPulse className="w-4 h-4" />, label: 'Cardiac Analytics' },
                  { icon: <Activity className="w-4 h-4" />, label: 'Stroke Scoring' },
                  { icon: <History className="w-4 h-4" />, label: 'Patient History' },
                  { icon: <Terminal className="w-4 h-4" />, label: 'API Monitoring' },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-bold transition-all cursor-pointer group ${
                      item.active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </div>
                    {item.active && <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                ))}
              </nav>

              <div className="pt-6 border-t border-border space-y-2">
                {[
                  { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
                  { icon: <LogOut className="w-4 h-4 text-destructive" />, label: 'Logout', isDanger: true },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all cursor-pointer hover:bg-accent ${item.isDanger ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Application Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-background/30 overflow-hidden">
              {/* Application Top Navbar */}
              <header className="h-20 border-b border-border flex items-center justify-between px-6 md:px-10 bg-card/60 backdrop-blur-md">
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative max-w-md w-full hidden sm:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      disabled 
                      placeholder="Search patient UID, model, or logs..." 
                      className="w-full bg-muted/40 border border-border/50 rounded-2xl pl-11 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <button className="relative w-10 h-10 rounded-2xl border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
                  </button>
                  <div className="flex items-center gap-3 pl-2 border-l border-border/50">
                    <div className="text-right hidden md:block">
                      <div className="text-xs font-black text-foreground leading-none">Dr. Alexander</div>
                      <div className="text-[9px] font-bold text-muted-foreground uppercase mt-1">Chief Pathologist</div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black overflow-hidden shadow-sm">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </header>

              {/* Dashboard Internal Scroller */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto scrollbar-hide space-y-10">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {overviewCards.map((card, idx) => (
                    <div key={idx} className="bg-card border border-border p-6 rounded-[2rem] shadow-sm hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 group relative overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary transition-all group-hover:scale-110">
                          {card.icon}
                        </div>
                        <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${card.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                          {card.trend}
                        </span>
                      </div>
                      <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{card.label}</div>
                      <div className="text-2xl font-black text-foreground tracking-tight">{card.value}</div>
                    </div>
                  ))}
                </div>

                {/* Main Content Grid: Charts and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                  {/* Left Column: Analytics */}
                  <div className="lg:col-span-8 space-y-6 md:space-y-8">
                    <div className="bg-card border border-border p-6 md:p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden h-[350px] md:h-[400px]">
                      <div className="flex items-center justify-between mb-10">
                        <div>
                          <h4 className="text-base md:text-lg font-black tracking-tight uppercase">System Performance</h4>
                          <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-[0.2em]">Inference Latency vs Precision</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-primary" />
                             <span className="text-[9px] font-black uppercase">Active</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-muted" />
                             <span className="text-[9px] font-black uppercase">Baseline</span>
                           </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 opacity-50 px-8">
                        <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                            d="M0 150 Q 100 80, 200 120 T 400 40 T 600 130 T 800 20 T 1000 80" 
                            fill="none" className="stroke-primary" strokeWidth="6" strokeLinecap="round" 
                          />
                          <path d="M0 150 Q 100 80, 200 120 T 400 40 T 600 130 T 800 20 T 1000 80 V 200 H 0 Z" className="fill-primary/20" />
                        </svg>
                      </div>
                    </div>

                    {/* Recent Patient Activity Table */}
                    <div className="bg-card border border-border rounded-[2.5rem] shadow-sm overflow-hidden hidden md:block">
                       <div className="p-8 border-b border-border flex justify-between items-center">
                         <h4 className="text-lg font-black tracking-tight uppercase">Patient Risk Queue</h4>
                         <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
                           <FileDown className="w-4 h-4" /> Export Report
                         </button>
                       </div>
                       <div className="overflow-x-auto">
                         <table className="w-full text-left text-xs">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="p-6 font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground">Patient Name</th>
                                <th className="p-6 font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground">Condition</th>
                                <th className="p-6 font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground">Risk Level</th>
                                <th className="p-6 font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground text-right">Inference Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {recentPatients.map((row, idx) => (
                                <tr key={idx} className="hover:bg-accent/30 transition-colors group cursor-pointer">
                                  <td className="p-6">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-black text-[10px] uppercase">{row.name.charAt(0)}</div>
                                      <span className="font-bold text-foreground">{row.name}</span>
                                    </div>
                                  </td>
                                  <td className="p-6">
                                    <span className="px-3 py-1 bg-muted rounded-full text-[9px] font-black uppercase tracking-widest">{row.disease}</span>
                                  </td>
                                  <td className="p-6">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                                      row.risk === 'High' ? 'bg-destructive/10 text-destructive' : 
                                      row.risk === 'Medium' ? 'bg-chart-4/10 text-chart-4' : 'bg-primary/10 text-primary'
                                    }`}>
                                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                      {row.risk}
                                    </div>
                                  </td>
                                  <td className="p-6 text-right font-bold text-muted-foreground uppercase">{row.date}</td>
                                </tr>
                              ))}
                            </tbody>
                         </table>
                       </div>
                    </div>
                  </div>

                  {/* Right Column: Mini Widgets */}
                  <div className="lg:col-span-4 space-y-6 md:space-y-8">
                    {/* Quick Start Cards */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] px-2">Prediction Hubs</h5>
                      {quickActions.map((action, idx) => (
                        <div key={idx} className="bg-card border border-border p-5 rounded-[1.5rem] flex items-center justify-between hover:border-primary/50 transition-all cursor-pointer shadow-sm group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                              {action.icon}
                            </div>
                            <div>
                              <div className="font-black text-xs text-foreground uppercase">{action.name}</div>
                              <div className="text-[9px] font-bold text-muted-foreground uppercase mt-0.5">{action.desc}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        </div>
                      ))}
                    </div>

                    {/* Model Confidence Progress */}
                    <div className="bg-card border border-border p-6 md:p-8 rounded-[2.5rem] shadow-sm space-y-8">
                      <h5 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Accuracy Metrics</h5>
                      <div className="space-y-6">
                        {[
                          { label: 'Diabetes v2', value: 89 },
                          { label: 'Heart Engine', value: 94 },
                          { label: 'Stroke Scorer', value: 91 }
                        ].map((m, idx) => (
                          <div key={idx} className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase">
                              <span className="text-foreground">{m.label}</span>
                              <span className="text-primary">{m.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${m.value}%` }}
                                className="h-full bg-primary"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
