import joblib
import pandas as pd
import os

# Get the directory of the current file and construct the path to the model
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "..", "pickle-models", "liver", "liver.pkl")


# Load model once
model = joblib.load(MODEL_PATH)

def predict_liver(data: dict):
    # Convert field name to match what the model was trained with
    if 'A/G_Ratio' in data:
        data['A/G Ratio'] = data.pop('A/G_Ratio')
    # Reorder columns to match the order the model was trained with
    feature_order = ['Age', 'Gender', 'TB', 'DB', 'Alkphos', 'Sgpt', 'Sgot', 'TP', 'ALB', 'A/G Ratio']
    df = pd.DataFrame([data])[feature_order]
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][0]

    label = "Liver Disease" if prediction == 1 else "No Liver Disease"

    return {
        "prediction": int(prediction),
        "prediction_label": label,
        "probability": float(probability)
    }