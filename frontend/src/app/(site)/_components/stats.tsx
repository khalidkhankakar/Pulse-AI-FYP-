'use client'

import React from 'react'

const statsData = [
  { label: 'Disease Models', value: '4+' },
  { label: 'Avg. Accuracy', value: '94%+' },
  { label: 'Inference Speed', value: 'Real-time' },
  { label: 'Data Security', value: 'AES-256' },
]

const Stats: React.FC = () => {
  return (
    <section className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">

        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-10 shadow-xl shadow-primary/5 md:p-12 lg:p-16">

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-10 lg:grid-cols-4">
            {statsData.map((stat, idx) => (
              <div
                key={stat.label}
                className={`
                  text-center transition-transform duration-300
                  ${idx !== statsData.length - 1 ? 'lg:border-r border-border' : ''}
                `}
              >
                <div className="mb-3 text-4xl font-black tracking-tighter text-primary transition-transform duration-300 hover:scale-105 md:text-5xl lg:text-6xl">
                  {stat.value}
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Background Blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
        </div>

      </div>
    </section>
  )
}

export default Stats