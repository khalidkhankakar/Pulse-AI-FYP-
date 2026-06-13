export interface PredictionResponse {
  prediction: number;
  prediction_label: string;
  probability?: number;
}

export const BASE_URL = process.env.BASE_URL || 'https://pulse-ai-fyp-zhzk.vercel.app';

export async function predictDisease<TRequest>(endpoint: string, values: TRequest): Promise<PredictionResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to fetch prediction. Please ensure the backend server is running.');
  }

  return response.json();
}
