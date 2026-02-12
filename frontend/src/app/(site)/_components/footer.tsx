
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 px-6 lg:px-10 border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Pulse AI</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
            Providing high-quality medical services using advanced artificial intelligence for reliable and hassle-free diagnostics.
          </p>
          <div className="flex gap-4">
             {[Facebook, Twitter, Instagram].map((Icon, i) => (
               <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all">
                 <Icon className="w-5 h-5" />
               </a>
             ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Services</h4>
          <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-bold">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Health Care</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Gym</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fitness</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Yoga</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Quick Links</h4>
          <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-bold">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Property Listings</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Contact</h4>
          <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-bold">
            <li className="text-slate-900 dark:text-white">+880 1623-018240</li>
            <li>hellopulse@gmail.com</li>
            <li className="leading-relaxed">3511 Ranchview Dr. Richardson, California 62639</li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
         <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
           <span>Privacy Policy</span>
           <span className="hidden sm:block">•</span>
           <span>Terms of Service</span>
           <span className="hidden sm:block">•</span>
           <span>© 2026 Pulse AI - Final Year Project</span>
         </p>
      </div>
    </footer>
  );
};
