function ArticleDisplay({ article }) {
  return (
    <div className="article-display">
      {/* ...otros contenidos si los hay... */}

      {article.url_wikipedia && (
        <p>
          <a
            href={article.url_wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            className="wikipedia-link"
          >
            Ver artículo original en Wikipedia
          </a>
        </p>
      )}
    </div>
  );
}

export default ArticleDisplay;
