import React, { useState } from "react";
import "./style.css"; // Importamos estilos globales

function SavedArticles({ articles, loading, onSelectArticle, onDeleteArticle }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="saved-articles-container">
      <h2>
        Mis artículos guardados ({articles.length})
      </h2>

      {loading ? (
        <p>Cargando artículos guardados...</p>
      ) : articles.length === 0 ? (
        <p>No tienes artículos guardados aún.</p>
      ) : (
        <>
          <button
            className="toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="saved-articles-list"
          >
            {isExpanded ? "Ocultar artículos guardados" : "Mostrar artículos guardados"}
          </button>

          {isExpanded && (
            <ul id="saved-articles-list" className="saved-articles-list">
              {articles.map((art) => (
                <li key={art.id_page || art.id} className="saved-article-item">
                  <button
                    onClick={() => onSelectArticle(art)}
                    className="saved-article-button"
                    aria-label={`Seleccionar artículo ${art.title}`}
                  >
                    {art.title}
                  </button>
                  <button
                    onClick={() => onDeleteArticle(art.id_page || art.id)}
                    className="remove-btn"
                    aria-label={`Eliminar artículo ${art.title}`}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export default SavedArticles;



