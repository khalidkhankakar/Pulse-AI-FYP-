'use client'
import React, { useState } from 'react'
import PredicationCard from '@/components/shared/predication-card'
import AIInsightCard from '@/components/shared/ai-insight-card'
import AnotherMakeForm from '@/components/shared/another-make-form'
import { StrokeInputFields } from '@/lib/constant'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { predictDisease } from '@/lib/api-client'
import { strokeSchema, StrokeFormValues } from '@/lib/schemas'

const StrokeForm = () => {
  const [lastValues, setLastValues] = useState<StrokeFormValues | null>(null)

  const { mutate, data: result, isPending } = useMutation({
    mutationFn: (values: StrokeFormValues) => predictDisease('/stroke/predict', values),
    onSuccess: (data, values) => {
      setLastValues(values)
      toast.success('Stroke prediction generated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong')
    }
  })

  const handleSubmit = (values: StrokeFormValues) => {
    mutate(values)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <AnotherMakeForm
            formSchema={strokeSchema}
            defaultValues={{
              gender: 'Female',
              age: 45,
              hypertension: 0,
              heart_disease: 0,
              ever_married: 'No',
              work_type: 'Private',
              Residence_type: 'Urban',
              avg_glucose_level: 85,
              bmi: 22,
              smoking_status: 'never smoked',
            }}
            inputFields={StrokeInputFields}
            onSubmit={handleSubmit}
            submitLabel={isPending ? "Analyzing Neurological Data..." : "Run Stroke Diagnostic"}
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <PredicationCard
            predication={result?.prediction}
            predication_label={result?.prediction_label}
            probability={result?.probability}
          />
        </div>
      </div>

      <div className="max-w-4xl">
        <AIInsightCard 
          disease_type="Stroke"
          prediction={result}
          input_data={lastValues}
        />
      </div>
    </div>
  )
}

export default StrokeForm
