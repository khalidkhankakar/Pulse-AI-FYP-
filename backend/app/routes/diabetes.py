from fastapi import APIRouter
from models.diabetes import DiabetesRequest, DiabetesResponse
from service.diabetes import predict_diabetes

router = APIRouter(
    prefix="/diabetes",
    tags=["Diabetes Prediction"]
)


@router.post("/predict", response_model=DiabetesResponse)
def predict(request: DiabetesRequest):
    result = predict_diabetes(request.dict())
    return result