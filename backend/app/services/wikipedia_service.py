# app/services/wikipedia_service.py

import requests
from typing import List, Dict
from collections import Counter
import re

WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php"
STOPWORDS = {"the", "and", "of", "to", "in", "a", "is", "for", "that", "on", "with", "as", "by", "at", "an", "be", "this"}

def search_articles(query: str) -> List[Dict]:
    params = {
        "action": "query",
        "list": "search",
        "srsearch": query,
        "format": "json"
    }
    response = requests.get(WIKIPEDIA_API_URL, params=params)
    response.raise_for_status()
    results = response.json()["query"]["search"]
    return [{"title": r["title"], "snippet": r["snippet"], "pageid": r["pageid"]} for r in results]

def get_article_content(pageid: int) -> str:
    params = {
        "action": "query",
        "prop": "extracts",
        "explaintext": True,
        "pageids": pageid,
        "format": "json"
    }
    response = requests.get(WIKIPEDIA_API_URL, params=params)
    response.raise_for_status()
    pages = response.json()["query"]["pages"]
    page = pages[str(pageid)]
    return page.get("extract", "")

def analyze_content(text: str) -> Dict:
    words = re.findall(r'\b\w+\b', text.lower())
    filtered_words = [word for word in words if word not in STOPWORDS]
    most_common = Counter(filtered_words).most_common(10)
    return {
        "word_count": len(words),
        "most_common_words": most_common
    }

def summarize_text(text: str, max_sentences: int = 3) -> str:
    sentences = text.split('. ')
    return '. '.join(sentences[:max_sentences]) + '.' if sentences else text
