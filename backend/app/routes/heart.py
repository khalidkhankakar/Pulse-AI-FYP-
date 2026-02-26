from fastapi import APIRouter
from models.heart import HeartRequest, HeartResponse
from service.heart import predict_heart

router = APIRouter(
    prefix="/heart",
    tags=["Heart Disease Prediction"]
)

@router.post("/predict", response_model=HeartResponse)
def predict(request: HeartRequest):
    result = predict_heart(request.dict())
    return result