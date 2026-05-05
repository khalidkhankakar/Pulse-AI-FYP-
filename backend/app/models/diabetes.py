    # "Pregnancies": 4,
    # "Glucose": 150,
    # "BloodPressure": 80,
    # "SkinThickness": 35,
    # "Insulin": 130,
    # "BMI": 28.5,
    # "DiabetesPedigreeFunction": 0.65,
    # "Age": 45


from pydantic import BaseModel, Field


class DiabetesRequest(BaseModel):
    Pregnancies: int = Field(..., example=4)
    Glucose: int = Field(..., example=150)
    BloodPressure: int = Field(..., example=80)
    SkinThickness: int = Field(..., example=35)
    Insulin: int = Field(..., example=130)
    BMI: float = Field(..., example=28.5)
    DiabetesPedigreeFunction: float = Field(..., example=0.65)
    Age: int = Field(..., example=45)


class DiabetesResponse(BaseModel):
    prediction: int
    prediction_label: str
    probability: float