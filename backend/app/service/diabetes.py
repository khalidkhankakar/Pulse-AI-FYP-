import joblib
import pandas as pd
import os

# Get the directory of the current file and construct the path to the model
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "..", "pickle-models", "diabetes", "diabetes.pkl")


# Load model once
model = joblib.load(MODEL_PATH)

def predict_diabetes(data: dict):
    print(MODEL_PATH)
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]

    label = "Diabetes" if prediction == 1 else "No Diabetes"

    return {
        "prediction": int(prediction),
        "prediction_label": label,
        "probability": model.predict_proba(df)[0][1]
    }