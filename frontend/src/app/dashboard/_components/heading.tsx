'use client';
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Menu } from 'lucide-react'
import React from 'react'

const Heading = ({ textHeading }: { textHeading: string }) => {
  return (
    <div className='flex justify-between items-center mb-8'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground uppercase leading-tight'>
        {textHeading}
      </h1>
      <SidebarTrigger 
        icon={Menu} 
        className='md:hidden h-10 w-10 bg-muted hover:bg-accent text-foreground rounded-lg border border-border shadow-sm' 
      />
    </div>
  )
}

export default Heading
