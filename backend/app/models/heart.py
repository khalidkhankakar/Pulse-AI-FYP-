from pydantic import BaseModel, Field
from enum import Enum

# Enum definitions for categorical features
class SexEnum(int, Enum):
    female = 0
    male = 1

class CPEnum(int, Enum):
    typical_angina = 0
    atypical_angina = 1
    non_anginal_pain = 2
    asymptomatic = 3

class RestECGEnum(int, Enum):
    normal = 0
    st_t_abnormality = 1
    left_vent_hypertrophy = 2

class SlopeEnum(int, Enum):
    upsloping = 0
    flat = 1
    downsloping = 2

class ThalEnum(int, Enum):
    normal = 3
    fixed_defect = 6
    reversible_defect = 7

class HeartRequest(BaseModel):
    age: int = Field(..., example=70)
    sex: SexEnum = Field(..., example=0)
    cp: CPEnum = Field(..., example=1)
    trestbps: int = Field(..., example=150)
    chol: int = Field(..., example=240)
    fbs: int = Field(..., example=1)
    restecg: RestECGEnum = Field(..., example=1)
    thalach: int = Field(..., example=130)
    exang: int = Field(..., example=1)
    oldpeak: float = Field(..., example=1.8)
    slope: SlopeEnum = Field(..., example=2)
    ca: int = Field(..., example=1)
    thal: ThalEnum = Field(..., example=7)


class HeartResponse(BaseModel):
    prediction: int
    prediction_label: str