from fastapi import APIRouter
from models.liver import LiverRequest, LiverResponse
from service.liver import predict_liver

router = APIRouter(
    prefix="/liver",
    tags=["Liver Disease Prediction"]
)

@router.post("/predict", response_model=LiverResponse)
def predict(request: LiverRequest):
    result = predict_liver(request.dict())
    return result