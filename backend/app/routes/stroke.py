from fastapi import APIRouter
from models.stroke import StrokeRequest, StrokeResponse
from service.stroke import predict_stroke

router = APIRouter(
    prefix="/stroke",
    tags=["Stroke Prediction"]
)

@router.post("/predict", response_model=StrokeResponse)
def predict(request: StrokeRequest):
    result = predict_stroke(request.dict())
    return result