from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from backend.app.core.db_connection import Base

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    id_page = Column(Integer, unique=True, index=True)
    title = Column(String, index=True)
    wikipedia_url = Column(String, unique=True)
    summary = Column(Text)
    original_content= Column(Text)
    # word_count = Column(Integer)
    # top_words = Column(String)  # Almacenaremos como JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    