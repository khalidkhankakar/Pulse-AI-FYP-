'use client'
import React from 'react'
import MakeForm from '@/components/shared/make-form'
import PredicationCard from '@/components/shared/predication-card'
import { z } from 'zod'

import {
  User,
  Heart,
  Activity,
  Droplets,
  LineChart,
  TrendingUp,
  Stethoscope,
  Brain,
  BarChart3,
} from 'lucide-react'

export const heartInputFields = [
  {
    name: 'age',
    label: 'Age',
    icon: <User className="w-4 h-4" />,
    desc: 'Age of the patient in years',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 65',
  },
  {
    name: 'sex',
    label: 'Sex',
    icon: <User className="w-4 h-4" />,
    desc: 'Biological sex of the patient',
    fieldType: 'select',
    placeholder: 'Select sex',
    options: [
      { label: 'Female', value: '0' },
      { label: 'Male', value: '1' },
    ],
  },
  {
    name: 'cp',
    label: 'Chest Pain Type',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Type of chest pain experienced',
    fieldType: 'select',
    options: [
      { label: 'Typical Angina', value: '0' },
      { label: 'Atypical Angina', value: '1' },
      { label: 'Non-anginal Pain', value: '2' },
      { label: 'Asymptomatic', value: '3' },
    ],
  },
  {
    name: 'trestbps',
    label: 'Resting Blood Pressure',
    icon: <Activity className="w-4 h-4" />,
    desc: 'Resting blood pressure (mm Hg)',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 160',
  },
  {
    name: 'chol',
    label: 'Cholesterol',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Serum cholesterol in mg/dL',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 280',
  },
  {
    name: 'fbs',
    label: 'Fasting Blood Sugar',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Fasting blood sugar > 120 mg/dL',
    fieldType: 'select',
    options: [
      { label: 'False (< 120 mg/dL)', value: '0' },
      { label: 'True (> 120 mg/dL)', value: '1' },
    ],
  },
  {
    name: 'restecg',
    label: 'Resting ECG',
    icon: <LineChart className="w-4 h-4" />,
    desc: 'Resting electrocardiographic results',
    fieldType: 'select',
    options: [
      { label: 'Normal', value: '0' },
      { label: 'ST-T Abnormality', value: '1' },
      { label: 'Left Ventricular Hypertrophy', value: '2' },
    ],
  },
  {
    name: 'thalach',
    label: 'Max Heart Rate',
    icon: <TrendingUp className="w-4 h-4" />,
    desc: 'Maximum heart rate achieved',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 120',
  },
  {
    name: 'exang',
    label: 'Exercise Induced Angina',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Chest pain induced by exercise',
    fieldType: 'select',
    options: [
      { label: 'No', value: '0' },
      { label: 'Yes', value: '1' },
    ],
  },
  {
    name: 'oldpeak',
    label: 'ST Depression',
    icon: <BarChart3 className="w-4 h-4" />,
    desc: 'ST depression induced by exercise',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 2.5',
  },
  {
    name: 'slope',
    label: 'ST Slope',
    icon: <Activity className="w-4 h-4" />,
    desc: 'Slope of peak exercise ST segment',
    fieldType: 'select',
    options: [
      { label: 'Upsloping', value: '0' },
      { label: 'Flat', value: '1' },
      { label: 'Downsloping', value: '2' },
    ],
  },
  {
    name: 'ca',
    label: 'Major Vessels',
    icon: <Stethoscope className="w-4 h-4" />,
    desc: 'Number of major vessels colored by fluoroscopy',
    fieldType: 'select',
    options: [
      { label: '0 Vessels', value: '0' },
      { label: '1 Vessel', value: '1' },
      { label: '2 Vessels', value: '2' },
      { label: '3 Vessels', value: '3' },
    ],
  },
  {
    name: 'thal',
    label: 'Thalassemia',
    icon: <Brain className="w-4 h-4" />,
    desc: 'Blood disorder type',
    fieldType: 'select',
    options: [
      { label: 'Normal', value: '3' },
      { label: 'Fixed Defect', value: '6' },
      { label: 'Reversible Defect', value: '7' },
    ],
  },
]

export const heartSchema = z.object({
  age: z.coerce.number().int().gt(0),
  sex: z.enum(['0', '1']),
  cp: z.enum(['0', '1', '2', '3']),
  trestbps: z.coerce.number().int().gt(0),
  chol: z.coerce.number().int().gt(0),
  fbs: z.enum(['0', '1']),
  restecg: z.enum(['0', '1', '2']),
  thalach: z.coerce.number().int().gt(0),
  exang: z.enum(['0', '1']),
  oldpeak: z.coerce.number().gt(0),
  slope: z.enum(['0', '1', '2']),
  ca: z.enum(['0', '1', '2', '3']),
  thal: z.enum(['3', '6', '7']),
})

export type HeartSchemaType = z.infer<typeof heartSchema>




const HeartFormResult = () => {

  const handleSubmit = (values: z.infer<typeof heartSchema>) => {
    console.log(values)
  }

  return (
    <div className="grid grid-cols-1 mt-4 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <MakeForm
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
          onSubmit={(values) => console.log(values)}
          submitLabel="Predict Heart Disease"
        />
      </div>

      <div className="lg:col-span-4 space-y-6">
        <PredicationCard />
      </div>
    </div>
  )
}

export default HeartFormResult
