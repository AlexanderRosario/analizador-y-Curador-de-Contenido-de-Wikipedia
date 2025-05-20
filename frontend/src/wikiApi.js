// wikiApi.js

export async function fetchWikiSearchResults(searchTerm) {
  if (!searchTerm) throw new Error("El término de búsqueda es obligatorio");

  const endpoint = `https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/wikipedia/search?q=${encodeURIComponent(
    searchTerm
  )}&format=json&origin=*`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Error en la búsqueda de artículos");

  const data = await response.json();

  // data.results debe ser un arreglo con objetos que tengan 'pageid' y 'title'
  if (!Array.isArray(data.results)) {
    throw new Error("Resultados inválidos recibidos");
  }

  return data.results.filter((item) => item.pageid && item.title); // solo resultados válidos
}

export async function fetchWikiArticleSummary(pageid) {
  if (!pageid) throw new Error("El pageid es obligatorio para obtener resumen");

  const endpoint = `https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/wikipedia/article?pageid=${pageid}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Artículo no encontrado: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (!data.pageid) console.warn("Warning: 'pageid' faltante en el artículo");
  if (!data.title || !data.title.trim())
    console.warn("Warning: 'title' faltante o vacío");
  if (!data.content_urls?.desktop?.page) {
    console.warn(
      "Warning: URL de Wikipedia faltante en content_urls.desktop.page"
    );
  }

  // Asigna summary con fallback a extract
  data.summary =
    data.summary && data.summary.trim() ? data.summary : data.extract || "";

  return {
    pageid: data.pageid,
    title: data.title,
    summary: data.summary,
    extract: data.extract || "",
    content_urls: data.content_urls,
    analysis: data.analysis || null,
  };
}

export async function saveArticleToBackend(article) {
  const endpoint = /*`https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/articles`*/ `http://127.0.0.1:8000/articles`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error detalle:", response.status, errorText);
    throw new Error(
      `Error guardando artículo: ${response.status} ${errorText}`
    );
  }

  return await response.json();
}

export async function fetchSavedArticles() {
  const endpoint = "http://127.0.0.1:8000/articles";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error detalle:", response.status, errorText);
    throw new Error(
      `Error obteniendo artículos: ${response.status} ${errorText}`
    );
  }

  return await response.json();
}

export async function deleteSavedArticle(articleId) {
  if (!articleId)
    throw new Error("El ID del artículo es obligatorio para eliminar");

  const endpoint = `http://127.0.0.1:8000/articles/${articleId}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error eliminando artículo: ${response.status} ${errorText}`
    );
  }

  return true; // Confirmación de eliminación exitosa
}
