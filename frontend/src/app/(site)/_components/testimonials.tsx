
import { Quote, Star } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 lg:px-10  transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
         <div className="space-y-10">
            <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">State-of-the-art Healthcare Designed for your Well-Being.</h2>
            
            <div className="relative p-10 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 transition-colors">
               <Quote className="absolute -top-6 -left-6 w-12 h-12 text-blue-100 dark:text-blue-900 rotate-180 opacity-50" />
               <p className="text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed mb-8 font-medium">
                 "Receiving prediction results from Pulse AI was an absolute pleasure. They helped me find the best healthcare solution in no time! The medical team was professional and attentive, finalizing my treatment plan seamlessly."
               </p>
               <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/100?u=brooklyn" className="w-14 h-14 rounded-full" alt="User" />
                  <div>
                     <div className="font-bold text-slate-900 dark:text-white">Brooklyn Simmons</div>
                     <div className="text-sm text-slate-500 dark:text-slate-400">President of AI Lab</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="relative w-full">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop" 
                 className="w-full h-[400px] lg:h-[500px] object-cover" 
                 alt="Facility"
               />
            </div>
            <div className="absolute -bottom-10 right-10 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 transition-colors">
               <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-slate-900 dark:text-white text-lg">4.9 Overall</span>
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">1200+ Patient Feedbacks</p>
            </div>
         </div>
      </div>
    </section>
  );
};