import Heading from "../../_components/heading"
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4 max-w-4xl mx-auto text-center">
        <Heading textHeading='Patient History' />
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Review and manage previous diagnostic records and AI analysis reports.
        </p>
      </div>

      <div className="bg-card border border-border rounded-3xl p-12 text-center text-muted-foreground">
        Patient history records will be displayed here.
      </div>
    </div>
  )
}

export default page
