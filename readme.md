# 🫀 Pulse AI

Pulse AI is a full-stack, production-oriented healthcare AI platform designed to provide disease-wise medical prediction and classification using Machine Learning models. Each disease is handled by a dedicated ML model, deployed through Flask APIs and consumed by a modern web interface.

---

## 🚀 Project Vision

The goal of Pulse AI is to build a scalable, modular, and real-world healthcare AI system — not just a typical academic FYP. The project focuses on:
- Clean ML pipelines
- API-based model deployment
- Modern frontend integration
- Production-ready architecture

---

## 🧠 Supported Diseases (Planned)

- Hypertension / Blood Pressure
- Heart Disease
- Stroke Prediction
- Diabetes Prediction
- Breast Cancer
- Liver Disease
- Chronic Kidney Disease
- Brain Tumor (MRI Images)
- Pneumonia (Chest X-ray)

---

## 🏗️ Tech Stack

### Machine Learning
- Python
- Scikit-learn
- Pandas, NumPy
- TensorFlow / PyTorch (for image-based models)

### Backend
- Flask
- REST APIs
- Model Serialization (Pickle / Joblib)

### Frontend
- Next.js
- React.js
- Tailwind CSS

### Others
- Git & GitHub
- REST API Architecture
- Modular Project Structure

---

## ⚙️ System Architecture (High Level)

1. Disease-specific datasets are preprocessed and used to train ML models  
2. Each trained model is exposed via a Flask REST API  
3. Frontend (Next.js + React) consumes APIs for prediction  
4. Results are displayed in a clean, user-friendly web interface  

