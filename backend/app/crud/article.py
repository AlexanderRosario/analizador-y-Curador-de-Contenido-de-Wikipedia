from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.app.models.article import Article
from backend.app.schemas.article import ArticleCreate

async def create_article(db: AsyncSession, article: ArticleCreate):
    db_article = Article(**article.dict())
    db.add(db_article)
    await db.commit()
    await db.refresh(db_article)
    return db_article

async def get_articles(db: AsyncSession):
    result = await db.execute(select(Article))
    return result.scalars().all()


