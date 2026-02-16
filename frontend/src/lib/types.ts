
export enum DiseaseType {
  DIABETES = 'Diabetes',
  STROKE = 'Stroke',
  HEART_DISEASE = 'Heart Disease',
  BREAST_CANCER = 'Breast Cancer'
}

export interface PredictionInput {
  age: number;
  gender: string;
  glucose?: number;
  bloodPressure?: number;
  bmi?: number;
  cholesterol?: string;
  smokingStatus?: string;
}

export interface PredictionResult {
  riskScore: number;
  assessment: string;
  recommendations: string[];
}

export interface ModelCardProps {
  name: string;
  accuracy: string;
  algorithm: string;
  datasetSize: string;
  type: DiseaseType;
  onSelect: (type: DiseaseType) => void;
}
