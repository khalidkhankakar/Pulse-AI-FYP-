'use client'
import React, { useState } from 'react'
import PredicationCard from '@/components/shared/predication-card'
import AIInsightCard from '@/components/shared/ai-insight-card'
import { heartInputFields } from '@/lib/constant'
import AnotherMakeForm from '@/components/shared/another-make-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { predictDisease } from '@/lib/api-client'
import { heartSchema, HeartFormValues } from '@/lib/schemas'


const HeartFormResult = () => {
  const [lastValues, setLastValues] = useState<HeartFormValues | null>(null)

  const { mutate, data: result, isPending } = useMutation({
    mutationFn: (values: HeartFormValues) => predictDisease('/heart/predict', values),
    onSuccess: (data, values) => {
      setLastValues(values)
      toast.success('Heart disease prediction generated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong')
    }
  })

  const handleSubmit = (values: HeartFormValues) => {
    
    mutate(values)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <AnotherMakeForm
            formSchema={heartSchema}
            defaultValues={{
              age: 65,
              sex: '0',
              cp: '0',
              trestbps: 160,
              chol: 280,
              fbs: '1',
              restecg: '2',
              thalach: 120,
              exang: '1',
              oldpeak: 2.5,
              slope: '2',
              ca: '2',
              thal: '7',
            }}
            inputFields={heartInputFields}
            onSubmit={handleSubmit}
            submitLabel={isPending ? "Analyzing Cardiac Data..." : "Run Cardiac Diagnostic"}
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
          disease_type="Heart Disease"
          prediction={result}
          input_data={lastValues}
        />
      </div>
    </div>
  )
}

export default HeartFormResult
