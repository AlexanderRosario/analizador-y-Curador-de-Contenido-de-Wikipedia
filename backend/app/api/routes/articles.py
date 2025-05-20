from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from backend.app.schemas.article import ArticleCreate, ArticleOut
from backend.app.crud.article import create_article, get_articles
from backend.app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=ArticleOut)
async def save_article(article: ArticleCreate, db: AsyncSession = Depends(get_db)):
    db_article = await create_article(db, article)
    return ArticleOut.from_orm(db_article)

@router.get("/", response_model=List[ArticleOut])
async def list_articles(db: AsyncSession = Depends(get_db)):
    return await get_articles(db)
