'use client'
import React, { useState } from 'react'
import PredicationCard from '@/components/shared/predication-card'
import AIInsightCard from '@/components/shared/ai-insight-card'
import AnotherMakeForm from '@/components/shared/another-make-form'
import { diabetesInputFields } from '@/lib/constant'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { predictDisease } from '@/lib/api-client'
import { diabetesSchema, DiabetesFormValues } from '@/lib/schemas'

const DiabetesFormResult = () => {
  const [lastValues, setLastValues] = useState<DiabetesFormValues | null>(null)

  const { mutate, data: result, isPending } = useMutation({
    mutationFn: (values: DiabetesFormValues) => predictDisease('/diabetes/predict', values),
    onSuccess: (data, values) => {
      setLastValues(values)
      toast.success('Prediction generated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong')
    }
  })



  const handleSubmit = (values: DiabetesFormValues) => {
    mutate(values)
  }
  
    return (
    <div className="flex flex-col gap-8">

        <div className="grid grid-cols-1 mt-4 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
                <AnotherMakeForm
                    formSchema={diabetesSchema}
                    defaultValues={{
                        Pregnancies: 0,
                        Glucose: 12,
                        BloodPressure: 123,
                        SkinThickness: 12,
                        Insulin: 233,
                        BMI: 22,
                        DiabetesPedigreeFunction: 233,
                        Age: 233,
                    }}
                    inputFields={diabetesInputFields}
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
                  disease_type='Diabetes '
                  prediction={result}
                  input_data={lastValues}
                />
        </div>
    )
}

export default DiabetesFormResult
