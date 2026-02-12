
import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';


export const Specialists = () => {
  const doctors = [
    { name: 'Dr. James Anderson', role: 'Cardiologist', phone: '+1 555-1234', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Dr. Sophia Martinez', role: 'Dermatologist', phone: '+44 20 5555 6789', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop' },
    { name: 'Dr. Emily Chen', role: 'Pediatrician', phone: '+61 2 5555 7890', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop' }
  ];

  return (
    <section className="py-24 px-6 lg:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-6">
           <h2 className="text-5xl font-bold text-slate-900 dark:text-white">Best Specialists</h2>
           <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">We work with the world's best doctors to validate our AI results, ensuring you get the most accurate medical advice available today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {doctors.map((doc, idx) => (
             <div key={idx} className="group  rounded-[2.5rem] overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="h-80 overflow-hidden">
                   <img src={doc.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={doc.name} />
                </div>
                <div className="p-8 text-left space-y-4">
                   <div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest">{doc.role}</p>
                   </div>
                   <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-bold">{doc.phone}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-100 dark:shadow-blue-900/20 flex items-center gap-2 mx-auto group transition-all"
        >
          Discover more Doctors
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
};