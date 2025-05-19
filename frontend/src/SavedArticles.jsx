import React from "react";

function SavedArticles({ articles }) {
  if (!articles.length) return <p>No hay artículos guardados.</p>;

  return (
    <div>
      <h2>Artículos guardados</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <a href={article.url_wikipedia} target="_blank" rel="noopener noreferrer">
              <strong>{article.title_wikipedia}</strong>
            </a>
            <p>{article.resumen_process}</p>
            <ul>
              <li>Palabras: {article.analisis.numero_palabras}</li>
              <li>Oraciones: {article.analisis.numero_oraciones}</li>
              <li>Tiempo de lectura: {article.analisis.tiempo_estimado_lectura}</li>
              <li>
                Frecuencia:{" "}
                {article.analisis.palabras_mas_frecuentes.join(", ")}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedArticles;


