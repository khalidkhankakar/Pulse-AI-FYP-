'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const llmProviders = [
  {
    name: 'Qwen-Plus',
    img: '/llms/qwen.png',
  },
  {
    name: 'Google Gemini',
    img: '/llms/gemini.png',
  },
  {
    name: 'Mistral',
    img: '/llms/mistral.png',
  },
]

export const Specialists = () => {
  return (
    <section className="py-24 px-6 lg:px-10 bg-background">
      <div className="mx-auto max-w-7xl space-y-16 text-center">

        {/* Heading */}
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-foreground">
            Validated by <br />
            <span className="text-primary italic">LLMs.</span>
          </h2>

          <p className="text-base md:text-lg font-medium leading-relaxed text-muted-foreground">
            We work with the world’s best LLMs to validate our ML model results,
            ensuring more reliable and accurate medical predictions.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {llmProviders.map((provider) => (
            <div
              key={provider.name}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative h-24 w-24 md:h-28 md:w-28">
                <Image
                  src={provider.img}
                  alt={provider.name}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-xs font-medium text-muted-foreground">
                {provider.name}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          className="
            mx-auto flex items-center gap-3
            rounded-full border border-primary/20
            bg-primary px-10 py-5
            text-xs font-black uppercase tracking-[0.2em]
            text-primary-foreground
            shadow-xl shadow-primary/20
            transition-all
            hover:scale-105 active:scale-95
          "
        >
          More coming soon
        </Button>
      </div>
    </section>
  )
}