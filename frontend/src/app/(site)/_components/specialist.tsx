
import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Specialists = () => {
  const doctors = [
    { name: 'Qwen-Plus', role: '', phone: '+1 555-1234', img: '/llms/qwen.png' },
    { name: 'Google Gemini', role: 'Dermatologist', phone: '+44 20 5555 6789', img: '/llms/gemini.png' },
    { name: 'Mistral', role: 'Pediatrician', phone: '+61 2 5555 7890', img: '/llms/mistral.png' }
  ];

  return (
    <section className="py-24 px-6 lg:px-10 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-6 px-4">
           <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground tracking-tighter uppercase leading-[0.95]">
             Validated by <br />
             <span className="text-primary italic">LLMs.</span>
           </h2>
           <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed">
             We work with the world&apos;s best LLMs to validate our ML model results, ensuring you get the most accurate medical advice available today.
           </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12">
           {doctors.map((doc, idx) => ( 
            <div className='flex flex-col items-center justify-center gap-3' key={idx}>
                   <Image
                   
                   src={doc.img} 
                   className="w-3/4 h-3/4 object-fit " 
                   width={200}
                   height={200}
                   alt={doc.name} 
                   />
                  <p className='text-muted-foreground text-xs'>{doc.name}</p>
                   </div>
           ))}
        </div>

        <Button 
          className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center gap-4 mx-auto group transition-all hover:scale-105 active:scale-95 border border-primary/20 cursor-pointer"
        >
          More coming soon
        
        </Button>
      </div>
    </section>
  );
};