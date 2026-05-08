
import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

export const Specialists = () => {
  const doctors = [
    { name: 'Dr. James Anderson', role: 'Cardiologist', phone: '+1 555-1234', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Dr. Sophia Martinez', role: 'Dermatologist', phone: '+44 20 5555 6789', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop' },
    { name: 'Dr. Emily Chen', role: 'Pediatrician', phone: '+61 2 5555 7890', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop' }
  ];

  return (
    <section className="py-24 px-6 lg:px-10 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-6 px-4">
           <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground tracking-tighter uppercase leading-[0.95]">
             Validated by <br />
             <span className="text-primary italic">Clinical Specialists.</span>
           </h2>
           <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed">
             We work with the world's best doctors to validate our AI results, ensuring you get the most accurate medical advice available today.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
           {doctors.map((doc, idx) => (
             <div key={idx} className="group bg-card rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="h-72 md:h-80 overflow-hidden">
                   <img 
                    src={doc.img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                    alt={doc.name} 
                   />
                </div>
                <div className="p-8 text-left space-y-4">
                   <div>
                      <h4 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">{doc.name}</h4>
                      <p className="text-primary font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1">{doc.role}</p>
                   </div>
                   <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-xs md:text-sm font-black tracking-widest">{doc.phone}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <button 
          className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center gap-4 mx-auto group transition-all hover:scale-105 active:scale-95 border border-primary/20 cursor-pointer"
        >
          Discover more Doctors
          <div className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
};