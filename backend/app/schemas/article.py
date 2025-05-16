from pydantic import BaseModel
from datetime import datetime

class ArticleBase(BaseModel):
    title_wikipedia: str
    url_wikipedia: str
    resumen_process: str

class ArticleCreate(ArticleBase):
    pass

class ArticleOut(ArticleBase):
    id: int
    date_saved: datetime

    class Config:
        orm_mode = True
