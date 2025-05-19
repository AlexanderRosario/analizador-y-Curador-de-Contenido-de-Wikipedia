# app/api/routes/wikipedia.py

from fastapi import APIRouter, Query
from backend.app.services.wikipedia_service import search_articles, get_article_content, summarize_text, analyze_content


router = APIRouter()

@router.get("/wikipedia/search")
def search_wikipedia(q: str = Query(..., min_length=1)):
    return {"results": search_articles(q)}

@router.get("/wikipedia/article")
def get_article(pageid: int):
    content = get_article_content(pageid)
    summary = summarize_text(content)
    analysis = analyze_content(content)
    return {
        "summary": summary,
        "analysis": analysis,
        "full_text": content
    }


