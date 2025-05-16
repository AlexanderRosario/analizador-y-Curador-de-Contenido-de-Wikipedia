from fastapi import APIRouter
from backend.app.api.routes import articles, wikipedia
api_router = APIRouter()
api_router.include_router(articles.router, prefix="/articles", tags=["Articles"])
api_router.include_router(wikipedia.router, tags=["Wikipedia"])