import WikipediaLink from "./wikiLink";

function ArticleDisplay({ article, onSave }) {
  return (
    <div className="article-display">
      {/* ...otros contenidos si los hay... */}
      <WikipediaLink url={article.url_wikipedia} />
      <button onClick={() => onSave(article)}>Guardar artículo</button>
    </div>
  );
}
