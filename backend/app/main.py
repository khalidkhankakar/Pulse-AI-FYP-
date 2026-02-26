from fastapi import FastAPI
from routes.heart import router as heart_router
from routes.liver import router as liver_router
my_app = FastAPI()
my_app = FastAPI(title="Diabetes Prediction API")

@my_app.get("/")
def read_root():
    return {"Hello": "World"}


my_app.include_router(heart_router)
my_app.include_router(liver_router)