from fastapi import FastAPI
from routes.heart import router as heart_router
from routes.liver import router as liver_router
from routes.stroke import router as stroke_router
from routes.diabetes import router as diabetes_router
from fastapi.middleware.cors import CORSMiddleware

my_app = FastAPI()
my_app = FastAPI(title="Pulse AI", description="A collection of machine learning models for health predictions", version="1.0.0")


# CORS (Cross-Origin Resource Sharing) middleware configuration
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

my_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@my_app.get("/")
def read_root():
    return {"Hello": "World"}


my_app.include_router(heart_router)
my_app.include_router(liver_router)
my_app.include_router(stroke_router)
my_app.include_router(diabetes_router)