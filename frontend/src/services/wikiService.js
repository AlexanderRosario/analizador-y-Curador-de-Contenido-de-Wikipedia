// src/services/wikiService.js

/*const API_BASE_URL = "http://TU_API_URL"; // Reemplaza con tu base real

export async function fetchWikiSearchResults(searchTerm) {
  const response = await fetch(
    `https://es.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(
      searchTerm
    )}&utf8=&format=json`
  );

  if (!response.ok) {
    throw new Error("Error al buscar resultados en Wikipedia");
  }

  const data = await response.json();
  return data.query.search;
}

export async function fetchWikiArticleSummary(pageid) {
  const response = await fetch(
    `https://es.wikipedia.org/api/rest_v1/page/summary/${pageid}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener el resumen del artículo");
  }

  return await response.json();
}

export async function saveArticleToBackend(article) {
  const response = await fetch(`${API_BASE_URL}/articles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail?.[0]?.msg || "Error al guardar el artículo"
    );
  }

  return await response.json();
}
*/
