import React from "react";

function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, "");
}

function Results({ results, onSelectArticle }) {
  return (
    <ul className="search-results">
      {results.map((result) => (
        <li
          key={result.pageid}
          onClick={() => onSelectArticle(result.pageid)}
          className="search-result-item"
          style={{ cursor: "pointer", marginBottom: "1rem" }}
        >
          <strong>{result.title}</strong>
          <p>{stripHtmlTags(result.snippet)}...</p>
        </li>
      ))}
    </ul>
  );
}

export default Results;

