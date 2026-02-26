import joblib
import pandas as pd
import os

MODEL_PATH = os.path.join("app", "pickle-models", "liver", "liver.pkl")

# Load model once
model = joblib.load(MODEL_PATH)

def predict_liver(data: dict):
    
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    label = "Liver Disease" if prediction == 1 else "No Liver Disease"

    return {
        "prediction": int(prediction),
        "prediction_label": label,
        "probability": float(probability)
    }