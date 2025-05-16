from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.api_router import api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
