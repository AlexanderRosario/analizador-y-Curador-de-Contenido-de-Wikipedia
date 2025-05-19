function ArticleDisplay({ article, onSave }) {
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

      <button onClick={() => onSave(article)}>Guardar artículo</button>
    </div>
  );
}

export default ArticleDisplay;


