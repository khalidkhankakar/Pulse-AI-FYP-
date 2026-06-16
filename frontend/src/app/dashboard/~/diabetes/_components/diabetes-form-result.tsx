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
import { savePredictionHistory } from '@/app/dashboard/_actions/history'

const DiabetesFormResult = () => {
  const [lastValues, setLastValues] = useState<DiabetesFormValues | null>(null)

  const { mutate, data: result, isPending } = useMutation({
    mutationFn: (values: DiabetesFormValues) => predictDisease('/diabetes/predict', values),
    onSuccess: async (data, values) => {
      setLastValues(values)
      toast.success('Prediction generated successfully')
      
      try {
        await savePredictionHistory({
          diseaseType: 'Diabetes',
          inputs: values,
          prediction: String(data.prediction),
          predictionLabel: data.prediction_label,
          probability: data.probability,
        })
      } catch (error) {
        console.error('Failed to save history:', error)
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong')
    }
  })



  const handleSubmit = (values: DiabetesFormValues) => {
    mutate(values)
  }
  
    return (
    <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
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
                    submitLabel={isPending ? "Analyzing Data..." : "Run Diagnostic"}
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
                disease_type='Diabetes'
                prediction={result}
                input_data={lastValues}
            />
        </div>
    </div>
    )
}

export default DiabetesFormResult
