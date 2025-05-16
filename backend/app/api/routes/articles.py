from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.schemas.article import ArticleCreate, ArticleOut
from app.crud.article import create_article, get_articles
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=ArticleOut)
async def save_article(article: ArticleCreate, db: AsyncSession = Depends(get_db)):
    return await create_article(db, article)

@router.get("/", response_model=List[ArticleOut])
async def list_articles(db: AsyncSession = Depends(get_db)):
    return await get_articles(db)
