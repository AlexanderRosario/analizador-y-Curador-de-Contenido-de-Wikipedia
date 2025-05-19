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


{
  "id_page": 4463182,
  "summary": "Reyes (Spanish, 'kings') may refer to:\n\nReyes (name), including a list of people and fictional characters\nReyes, Bolivia, city capital of the José Ballivián Province in the Beni Department\nReyes rendering, a computer software architecture\nPoint Reyes, a prominent cape on the Pacific coast of northern California, U.S.\nReyes, a name for Epiphany (holiday)\nReyes Holdings, an American food manufacturer\n\n\n== Other uses ==\nAll pages with titles containing Reyes\n\n\n== See also ==\nDe los Reyes (disambiguation)\nReye syndrome, a brain disease.",
  "title_wikipedia":"Reyes",
  "url_wikipedia": "https://en.wikipedia.org/?curid=4463182",
  "resumen_process": "string"
}