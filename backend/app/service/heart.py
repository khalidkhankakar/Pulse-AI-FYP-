import joblib
import pandas as pd
import os

MODEL_PATH = os.path.join("app", "pickle-models", "heart", "heart.pkl")

# Load model once
model = joblib.load(MODEL_PATH)

def predict_heart(data: dict):
    
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]

    label = "Heart Disease" if prediction == 1 else "No Heart Disease"

    return {
        "prediction": int(prediction),
        "prediction_label": label,
    }