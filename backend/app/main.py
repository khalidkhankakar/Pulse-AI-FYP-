import uvicorn
from fastapi import FastAPI
from routes.heart import router as heart_router
from routes.liver import router as liver_router
from routes.stroke import router as stroke_router
from routes.diabetes import router as diabetes_router
from fastapi.middleware.cors import CORSMiddleware

my_app = FastAPI(
    title="Pulse AI",
    description="A collection of machine learning models for health predictions",
    version="1.0.0"
)

# CORS (Cross-Origin Resource Sharing) middleware configuration
my_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

my_app.include_router(heart_router)
my_app.include_router(liver_router)
my_app.include_router(stroke_router)
my_app.include_router(diabetes_router)

@my_app.get("/")
def read_root():
    return {"message": "Welcome to Pulse AI API", "status": "running"}

if __name__ == "__main__":
    uvicorn.run("main:my_app", host="0.0.0.0", port=8000, reload=True)