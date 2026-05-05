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
  BrainCircuit,
  Scale,
  House,
  Plus,
  Coffee,
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
] as const

export const StrokeInputFields = [

  {
    name: 'gender',
    label: 'Gender',
    icon: <User className="w-4 h-4" />,
    desc: 'Biological gender of the patient',
    fieldType: 'select',
    placeholder: 'Select gender',
    options: [
      { label: 'Female', value: 'Female' },
      { label: 'Male', value: 'Male' },
    ],
  },
  {
    name: 'age',
    label: 'Age',
    icon: <Scale className="w-4 h-4" />,
    desc: 'Age of the patient in years',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 65',
  },
  {
    name: 'hypertension',
    label: 'Hypertension',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Whether the patient has hypertension',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 12',
  },
  {
    name: 'heart_disease',
    label: 'Heart Disease',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Whether the patient has heart disease',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 0',
  },
  {
    name: 'ever_married',
    label: 'Ever Married',
    icon: <Activity className="w-4 h-4" />,
    desc: 'Whether the patient has ever been married',
    fieldType: 'select',
    options: [
      { label: 'No', value: 'No' },
      { label: 'Yes', value: 'Yes' },
    ],
  },
  {
    name: 'work_type',
    label: 'Work Type',
    icon: <LineChart className="w-4 h-4" />,
    desc: 'Type of work the patient is engaged in',
    fieldType: 'select',
    options: [
      { label: 'Private', value: 'Private' },
      { label: 'Self-employed', value: 'Self-employed' },
      { label: 'Government', value: 'Govt_job' },
      { label: 'Children', value: 'children' },
      { label: 'Never Worked', value: 'Never_worked' },
    ],
  },

  {
    name: 'Residence_type',
    label: 'Residence Type',
    icon: <House className="w-4 h-4" />,
    desc: 'Type of residence of the patient',
    fieldType: 'select',
    options: [
      { label: 'Urban', value: 'Urban' },
      { label: 'Rural', value: 'Rural' },
    ],
  },

  {
    name: 'avg_glucose_level',
    label: 'Average Glucose Level',
    icon: <Plus className="w-4 h-4" />,
    desc: 'Average glucose level (mg/dL)',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 120',
  },
  {
    name: 'bmi',
    label: 'BMI',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Body Mass Index',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 28.5',
  },
  {
    name: 'smoking_status',
    label: 'Smoking Status',
    icon: <Coffee className="w-4 h-4" />,
    desc: 'Current smoking status of the patient',
    fieldType: 'select',
    options: [
      { label: 'Formerly Smoked', value: 'formerly smoked' },
      { label: 'Never Smoked', value: 'never smoked' },
      { label: 'Smokes', value: 'smokes' },
      { label: 'Unknown', value: 'Unknown' },
    ],
  },
] as const

export const diabetesInputFields = [
  {
    name: 'Pregnancies',
    label: 'Pregnancies',
    placeholder: 'e.g. 2',
    fieldType: 'input',
    icon: <User className="w-4 h-4" />,
    desc: 'Number of times pregnant',
    typeInput: 'number',
  },
  {
    name: 'Glucose',
    label: 'Glucose',
    fieldType: 'input',
    placeholder: 'e.g. 120',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Plasma glucose concentration',
    typeInput: 'number',
  },
  {
    name: 'BloodPressure',
    label: 'Blood Pressure',
    fieldType: 'input',
    placeholder: 'e.g. 80',
    icon: <Activity className="w-4 h-4" />,
    desc: 'Diastolic blood pressure',
    typeInput: 'number',
  },
  {
    name: 'SkinThickness',
    label: 'Skin Thickness',
    placeholder: 'e.g. 20',
    fieldType: 'input',
    icon: <Stethoscope className="w-4 h-4" />,
    desc: 'Triceps skin fold thickness',
    typeInput: 'number',
  },
  {
    name: 'Insulin',
    label: 'Insulin',
    fieldType: 'input',
    placeholder: 'e.g. 85',
    icon: <Droplets className="w-4 h-4" />,
    desc: '2-Hour serum insulin',
    typeInput: 'number',
  },
  {
    name: 'BMI',
    label: 'BMI',
    fieldType: 'input',
    placeholder: 'e.g. 24.5',
    icon: <Scale className="w-4 h-4" />,
    desc: 'Body mass index',
    typeInput: 'number',
  },
  {
    name: 'DiabetesPedigreeFunction',
    label: 'Pedigree Function',
    placeholder: 'e.g. 0.47',
    fieldType: 'input',
    icon: <BrainCircuit className="w-4 h-4" />,
    desc: 'Genetic risk score',
    typeInput: 'number',
  },
  {
    name: 'Age',
    label: 'Age',
    placeholder: 'e.g. 35',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Age in years',
    fieldType: 'input',
    typeInput: 'number',
  },
] as const;

export const liverInputFields = [
  {
    name: 'gender',
    label: 'Gender',
    icon: <User className="w-4 h-4" />,
    desc: 'Biological gender of the patient',
    fieldType: 'select',
    placeholder: 'Select gender',
    options: [
      { label: 'Female', value: '0' },
      { label: 'Male', value: '1' },
    ],
  },
  {
    name: 'age',
    label: 'Age',
    icon: <Scale className="w-4 h-4" />,
    desc: 'Age of the patient in years',
    fieldType: 'input',
    typeInput: 'number',
    placeholder: 'e.g. 65',
  },
  {
    name: 'TB',
    label: 'Total Bilirubin',
    fieldType: 'input',
    placeholder: 'e.g. 1.2',
    icon: <Activity className="w-4 h-4" />,
    desc: 'Total bilirubin level',
    typeInput: 'number',
  },
  {
    name: 'DB',
    label: 'Direct Bilirubin',
    placeholder: 'e.g. 0.4',
    fieldType: 'input',
    icon: <Stethoscope className="w-4 h-4" />,
    desc: 'Direct bilirubin level',
    typeInput: 'number',
  },
  {
    name: 'Alkphos',
    label: 'Alkaline Phosphatase',
    fieldType: 'input',
    placeholder: 'e.g. 120',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Alkaline phosphatase level',
    typeInput: 'number',
  },
  {
    name: 'Sgpt',
    label: 'SGPT',
    fieldType: 'input',
    placeholder: 'e.g. 120',
    icon: <Scale className="w-4 h-4" />,
    desc: 'Serum glutamic-pyruvic transaminase level',
    typeInput: 'number',
  },
  {
    name: 'Sgot',
    label: 'SGOT',
    fieldType: 'input',
    placeholder: 'e.g. 120',
    icon: <Scale className="w-4 h-4" />,
    desc: 'Serum glutamic-oxaloacetic transaminase level',
    typeInput: 'number',
  },
  {
    name: 'TP',
    label: 'Total Proteins',
    placeholder: 'e.g. 6.5',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Total proteins level',
    fieldType: 'input',
    typeInput: 'number',
  },
  {
    name: 'ALB',
    label: 'Albumin',
    placeholder: 'e.g. 6.5',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Albumin level',
    fieldType: 'input',
    typeInput: 'number',
  },
  {
    name: 'A/G_Ratio',
    label: 'A/G Ratio',
    placeholder: 'e.g. 1.2',
    icon: <Heart className="w-4 h-4" />,
    desc: 'Albumin/Globulin ratio',
    fieldType: 'input',
    typeInput: 'number',
  },
] as const;



export const AI_SYSTEM_PROMPT = `
    You are an AI-powered health assistant designed to support predictions related to the following conditions: Stroke, Liver Disease, Diabetes, and Heart Disease.

Your role is to assist users by analyzing their input data alongside machine learning model predictions. You must follow these responsibilities:

1. Prediction Analysis

* Review the user’s input values (such as age, blood pressure, glucose level, cholesterol, etc.).
* Compare them with the machine learning model’s predicted result.
* Assess whether the prediction seems reasonable or questionable based on general medical knowledge.
* Clearly explain why the prediction makes sense or does not make sense.

2. Key Factors to Watch

* Identify the most important input features that influence the condition (for example, high glucose for diabetes, high blood pressure for stroke or heart disease).
* Highlight any abnormal, risky, or critical values in the user’s data.
* Explain how these values relate to the disease risk in simple and clear terms.

3. Suggestions & Preventive Guidance

* Provide practical, evidence-based lifestyle suggestions such as diet improvements, physical activity, and healthy habits.
* Suggest when the user should consider consulting a qualified doctor.
* Focus on prevention and risk reduction, not diagnosis.

Safety Rules (Very Important)

* Do not provide medical diagnoses or claim certainty about a condition.
* Do not prescribe medications.
* Always state that your advice is for informational purposes only and not a substitute for professional medical advice.
* If the input values suggest a serious or urgent condition, clearly recommend seeking immediate medical attention.

Communication Style

* Use simple, clear, and supportive language.
* Avoid unnecessary technical jargon.
* Be transparent if something is uncertain or unclear.

Output Format (Always Follow This)

1. Prediction Review – State whether the model prediction appears correct or questionable, with reasoning.
2. Key Risk Factors – Highlight the most important and abnormal input values.
3. Health Suggestions – Provide actionable next steps and preventive advice.


`;



