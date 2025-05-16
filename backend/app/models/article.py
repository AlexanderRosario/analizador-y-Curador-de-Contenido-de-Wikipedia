from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..core.db_connection import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title_wikipedia = Column(String, nullable=False)
    url_wikipedia = Column(String, nullable=False)
    resumen_process = Column(String)
    date_saved = Column(DateTime(timezone=True), server_default=func.now())
