'use client'
import React, { useState } from 'react'
import PredicationCard from '@/components/shared/predication-card'
import AIInsightCard from '@/components/shared/ai-insight-card'
import AnotherMakeForm from '@/components/shared/another-make-form'
import { liverInputFields } from '@/lib/constant'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { predictDisease } from '@/lib/api-client'
import { liverSchema, LiverFormValues } from '@/lib/schemas'

const LiverForm = () => {
  const [lastValues, setLastValues] = useState<LiverFormValues | null>(null)

  const { mutate, data: result, isPending } = useMutation({
    mutationFn: (values: LiverFormValues) => predictDisease('/liver/predict', values),
    onSuccess: (data, values) => {
      setLastValues(values)
      toast.success('Liver disease prediction generated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong')
    }
  })

  const handleSubmit = (values: LiverFormValues) => {
    mutate(values)
  }

  return (
    <div className="flex flex-col gap-8">
    <div className="grid grid-cols-1 mt-4 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <AnotherMakeForm
          formSchema={liverSchema}
          defaultValues={{
            Age: 50,
            Gender: 0,
            TB: 1.2,
            DB: 0.3,
            Alkphos: 230,
            Sgpt: 40,
            Sgot: 50,
            TP: 6.5,
            ALB: 3.5,
            'A/G_Ratio': 0.9,
          }}
          inputFields={liverInputFields}
          onSubmit={handleSubmit}
          submitLabel={isPending ? "Predicting..." : "Predict"}
        />
      </div>

      <div className="lg:col-span-4 space-y-6">
        <PredicationCard
          predication={result?.prediction}
          predication_label={result?.prediction_label}
          probability={result?.probability}
        />
      </div>
      </div>
        <AIInsightCard 
          disease_type="Liver Disease"
          prediction={result}
          input_data={lastValues}
        />
    </div>
  )
}

export default LiverForm
