export async function fetchWikiSearchResults(searchTerm) {
  if (!searchTerm) throw new Error("El término de búsqueda es obligatorio");

  const endpoint = `https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/wikipedia/search?q=${encodeURIComponent(
    searchTerm
  )}&format=json&origin=*`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Artículo no encontrado");

  const data = await response.json();
  console.log(data.results);
  return data.results;
}

export async function fetchWikiArticleSummary(pageid) {
  if (!pageid) throw new Error("El pageid es obligatorio");

  const endpoint = `https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/wikipedia/article?pageid=${pageid}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Artículo no encontrado: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  // ✅ Asegurar que 'summary' siempre tenga texto, usando 'extract' como respaldo
  data.summary = (data.summary && data.summary.trim()) || data.extract || "";

  return data;
}

export async function saveArticleToBackend(article) {
  // const endpoint = `https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/articles`;
  const endpoint ='http://127.0.0.1:8000/articles'

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error guardando artículo: ${response.status} ${errorText}`
    );
  }

  return await response.json();
}
