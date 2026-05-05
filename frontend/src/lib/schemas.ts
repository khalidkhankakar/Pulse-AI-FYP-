import { z } from 'zod'

export const diabetesSchema = z.object({
  Pregnancies: z.coerce.number(),
  Glucose: z.coerce.number().int().gt(0),
  BloodPressure: z.coerce.number().int().gt(0),
  SkinThickness: z.coerce.number().int().gt(0),
  Insulin: z.coerce.number().int().gt(0),
  BMI: z.coerce.number().gt(0),
  DiabetesPedigreeFunction: z.coerce.number().gt(0),
  Age: z.coerce.number().int().gt(0),
})

export type DiabetesFormValues = z.infer<typeof diabetesSchema>

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

export type HeartFormValues = z.infer<typeof heartSchema>

export const liverSchema = z.object({
  Age: z.coerce.number().int().min(0),
  Gender: z.coerce.number().int().min(0).max(1),
  TB: z.coerce.number().min(0),
  DB: z.coerce.number().min(0),
  Alkphos: z.coerce.number().int().min(0),
  Sgpt: z.coerce.number().int().min(0),
  Sgot: z.coerce.number().int().min(0),
  TP: z.coerce.number().min(0),
  ALB: z.coerce.number().min(0),
  'A/G_Ratio': z.coerce.number().min(0),
})

export type LiverFormValues = z.infer<typeof liverSchema>

export const strokeSchema = z.object({
  gender: z.enum(['Female', 'Male']),
  age: z.coerce.number().int().min(0),
  hypertension: z.coerce.number().int().min(0),
  heart_disease: z.coerce.number().int().min(0),
  ever_married: z.enum(['No', 'Yes']),
  work_type: z.enum(['Private', 'Self-employed', 'Govt_job', 'children', 'Never_worked']),
  Residence_type: z.enum(['Urban', 'Rural']),
  avg_glucose_level: z.coerce.number().min(0),
  bmi: z.coerce.number().min(0),
  smoking_status: z.enum(['formerly smoked', 'never smoked', 'smokes', 'Unknown']),
})

export type StrokeFormValues = z.infer<typeof strokeSchema>
