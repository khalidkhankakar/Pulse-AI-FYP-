'use client';
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Menu } from 'lucide-react'
import React from 'react'

const Heading = ({textHeading}:{textHeading:string}) => {
  return (
       <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>{textHeading}</h1>
        <SidebarTrigger icon={Menu} className='md:hidden' />
      </div>
  )
}

export default Heading
