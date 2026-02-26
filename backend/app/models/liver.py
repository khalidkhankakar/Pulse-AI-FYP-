from pydantic import BaseModel, Field
from enum import Enum

class SexEnum(int, Enum):
    female = 0
    male = 1

class LiverRequest(BaseModel):
    Age: int = Field(..., example=50)
    Gender: SexEnum = Field(..., example=0)
    TB: float = Field(..., example=1.2)
    DB: float = Field(..., example=0.3)
    Alkphos: int = Field(..., example=230)
    Sgpt: int = Field(..., example=40)
    Sgot: int = Field(..., example=50)
    TP: float = Field(..., example=6.5)
    ALB: float = Field(..., example=3.5)
    A_G_Ratio: float = Field(..., alias='A/G_Ratio', example=0.9)

class LiverResponse(BaseModel):
    prediction: int
    prediction_label: str
    probability: float