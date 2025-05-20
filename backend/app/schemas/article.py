from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Este modelo se utiliza para crear un artículo nuevo en la base de datos
class ArticleBase(BaseModel):
    id_page: int
    title: str
    wikipedia_url: str
    original_content: Optional[str]
    summary: str

# Este modelo se utiliza para crear un artículo nuevo en la base de datos
class ArticleCreate(ArticleBase):
    id_page: int
    title: str

    

# Este modelo se utiliza para devolver un artículo guardado desde la base de datos
class ArticleOut(ArticleBase):
    id: int
    id_page: int
    title: str

    created_at: datetime
    class Config:
        orm_mode = True 
    model_config = {
        "from_attributes": True
    }
