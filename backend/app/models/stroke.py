# gender : Male, Female
# age: int
# hypertension: int
# heart_disease: int
# ever_married : Yes, No
# work_type : Private, Self-employed, Govt_job, children, Never_worked
# Residence_type : Urban, Rural
# avg_glucose_level: int
# bmi: int
# smoking_status: formerly smoked, never smoked, smokes, Unknown
from pydantic import BaseModel, Field
from enum import Enum

class GenderEnum(str , Enum):
    Male = "Male"
    Female = "Female"

class EverMarriedEnum(str , Enum):
    Yes = "Yes"
    No = "No"

class WorkTypeEnum(str , Enum):
    Private = "Private"
    Self_employed = "Self-employed"
    Govt_job = "Govt_job"
    children = "children"
    Never_worked = "Never_worked"

class ResidenceTypeEnum(str , Enum):
    Urban = "Urban"
    Rural = "Rural"

class SmokingStatusEnum(str , Enum):
    formerly_smoked = "formerly smoked"
    never_smoked = "never smoked"
    smokes = "smokes"
    Unknown = "Unknown"

class StrokeRequest(BaseModel):
    gender: GenderEnum = Field(..., example="Male")
    age: int = Field(..., example=45)
    hypertension: int = Field(..., example=0)
    heart_disease: int = Field(..., example=0)
    ever_married: EverMarriedEnum = Field(..., example="No")
    work_type: WorkTypeEnum = Field(..., example="Self-employed")
    Residence_type: ResidenceTypeEnum = Field(..., example="Urban")
    avg_glucose_level: int = Field(..., example=85)
    bmi: int = Field(..., example=22)
    smoking_status: SmokingStatusEnum = Field(..., example="never smoked")


class StrokeResponse(BaseModel):
    prediction: int
    prediction_label: str