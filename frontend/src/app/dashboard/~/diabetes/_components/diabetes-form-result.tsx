'use client'
import React from 'react'
import MakeForm from '@/components/shared/make-form'
import PredicationCard from '@/components/shared/predication-card'
import { z } from 'zod'


import {
  Activity,
  BrainCircuit,
  Droplets,
  Scale,
  User,
  Stethoscope,
  Heart,
} from 'lucide-react'

const schema = z.object({
  pregnancies: z.coerce.number(),
  glucose: z.coerce.number().int().gt(0),
  bloodPressure: z.coerce.number().int().gt(0),
  skinThickness: z.coerce.number().int().gt(0),
  insulin: z.coerce.number().int().gt(0),
  bmi: z.coerce.number().gt(0),
  diabetesPedigree: z.coerce.number().gt(0),
  age: z.coerce.number().int().gt(0),
})

const inputFields = [
  {
    name: 'pregnancies',
    label: 'Pregnancies',
    placeholder: 'e.g. 2',
    fieldType: 'input',
    icon: <User className="w-4 h-4" />,
    desc: 'Number of times pregnant',
    typeInput: 'number',
  },
  {
    name: 'glucose',
    label: 'Glucose',
    fieldType: 'input',
    placeholder: 'e.g. 120',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Plasma glucose concentration',
    typeInput: 'number',
  },
  {
    name: 'bloodPressure',
    label: 'Blood Pressure',
    fieldType: 'input',
    placeholder: 'e.g. 80',
    icon: <Activity className="w-4 h-4" />,
    desc: 'Diastolic blood pressure',
    typeInput: 'number',
  },
  {
    name: 'skinThickness',
    label: 'Skin Thickness',
    placeholder: 'e.g. 20',
    fieldType: 'input',
    icon: <Stethoscope className="w-4 h-4" />,
    desc: 'Triceps skin fold thickness',
    typeInput: 'number',
  },
  {
    name: 'insulin',
    label: 'Insulin',
    fieldType: 'input',
    placeholder: 'e.g. 85',
    icon: <Droplets className="w-4 h-4" />,
    desc: '2-Hour serum insulin',
    typeInput: 'number',
  },
  {
    name: 'bmi',
    label: 'BMI',
    fieldType: 'input',
    placeholder: 'e.g. 24.5',
    icon: <Scale className="w-4 h-4" />,
    desc: 'Body mass index',
    typeInput: 'number',
  },
  {
    name: 'diabetesPedigree',
    label: 'Pedigree Function',
    placeholder: 'e.g. 0.47',
    fieldType: 'input',
    icon: <BrainCircuit className="w-4 h-4" />,
    desc: 'Genetic risk score',
    typeInput: 'number',
  },
  {
    name: 'age',
    label: 'Age',
    placeholder: 'e.g. 35',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Age in years',
    fieldType: 'input',
    typeInput: 'number',
  },
] as const


const DiabetesFormResult = () => {

      const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log(values)
  }
  
    return (
        <div className="grid grid-cols-1 mt-4 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
                <MakeForm
                    formSchema={schema}
                    defaultValues={{
                        pregnancies: 0,
                        glucose: 0,
                        bloodPressure: 0,
                        skinThickness: 0,
                        insulin: 0,
                        bmi: 0,
                        diabetesPedigree: 0,
                        age: 0,
                    }}
                    inputFields={inputFields}
                    onSubmit={handleSubmit}
                    submitLabel="Predict"
                />
            </div>

            <div className="lg:col-span-4 space-y-6">
                <PredicationCard />
            </div>
        </div>
    )
}

export default DiabetesFormResult
