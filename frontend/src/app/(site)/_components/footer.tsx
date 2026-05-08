
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 px-6 lg:px-10 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
        <div className="lg:col-span-2 space-y-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              P
            </div>
            <span className="text-xl font-black tracking-tighter text-foreground uppercase">Pulse AI</span>
          </Link>
          <p className="text-muted-foreground leading-relaxed max-w-sm font-medium text-sm md:text-base">
            Providing high-quality medical services using advanced artificial intelligence for reliable and hassle-free diagnostics.
          </p>
          <div className="flex gap-4">
             {[Facebook, Twitter, Instagram].map((Icon, i) => (
               <a key={i} href="#" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                 <Icon className="w-5 h-5" />
               </a>
             ))}
          </div>
        </div>

        <div>
          <h4 className="font-black text-foreground mb-8 uppercase text-[10px] tracking-[0.3em]">Services</h4>
          <ul className="space-y-4 text-muted-foreground text-xs md:text-sm font-black uppercase tracking-widest">
            <li><Link href="#" className="hover:text-primary transition-colors">Health Analysis</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Risk Scoring</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Clinical Insights</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Data Security</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-foreground mb-8 uppercase text-[10px] tracking-[0.3em]">Quick Links</h4>
          <ul className="space-y-4 text-muted-foreground text-xs md:text-sm font-black uppercase tracking-widest">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-foreground mb-8 uppercase text-[10px] tracking-[0.3em]">Contact</h4>
          <ul className="space-y-6 text-muted-foreground text-xs md:text-sm font-bold">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary" />
              <span className="tracking-widest">+880 1623-018240</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary" />
              <span className="lowercase tracking-widest">hello@pulseai.com</span>
            </li>
            <li className="flex items-start gap-3 leading-relaxed">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="uppercase tracking-tight">3511 Ranchview Dr. Richardson, California 62639</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-border/50 text-center">
         <div className="text-[9px] md:text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
           <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
           <span className="hidden sm:block text-border">•</span>
           <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
           <span className="hidden sm:block text-border">•</span>
           <span>© 2026 Pulse AI - Final Year Project</span>
         </div>
      </div>
    </footer>
  );
};
