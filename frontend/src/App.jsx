import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./style.css";
import Results from "./Results";
import Analyzer from "./Analyzer";
import ArticleDisplay from "./ArticleDisplay";
import SavedArticles from "./SavedArticles";
import { fetchWikiSearchResults, fetchWikiArticleSummary } from "./wikiApi";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]); // ✅

  // ✅ Cargar artículos guardados al iniciar
  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await fetch("https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/articles");
        if (!response.ok) throw new Error("Error al cargar artículos guardados.");
        const data = await response.json();
        setSavedArticles(data);
      } catch (err) {
        console.error("Error al obtener artículos guardados:", err);
      }
    };

    fetchSavedArticles();
  }, []);

  const analizarTexto = (texto) => {
    const palabras = texto.trim().split(/\s+/).filter(Boolean);
    const oraciones = (texto.match(/[.!?]+/g) || []).length;
    const tiempoLectura = Math.ceil(palabras.length / 200);
    const frecuencia = palabras.reduce((acc, palabra) => {
      const limpia = palabra.toLowerCase().replace(/[.,!?¡¿"]/g, "");
      if (limpia.length > 3) {
        acc[limpia] = (acc[limpia] || 0) + 1;
      }
      return acc;
    }, {});
    const frecuentes = Object.entries(frecuencia)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([palabra, cuenta]) => `${palabra}: ${cuenta} veces`);
    return {
      palabras: palabras.length,
      oraciones,
      tiempoLectura,
      palabrasFrecuentes: frecuentes,
    };
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError("");
    setSearchResults([]);
    setSelectedArticle(null);
    setAnalysis(null);

    try {
      const results = await fetchWikiSearchResults(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectArticle = async (pageid) => {
  setLoading(true);
  setError("");
  setSelectedArticle(null);
  setAnalysis(null);

  try {
    const article = await fetchWikiArticleSummary(pageid);
const hasUrl = article?.content_urls?.desktop?.page;
const hasTitle = article?.title && typeof article.title === "string" && article.title.trim() !== "";

article.url_wikipedia = hasUrl
  ? article.content_urls.desktop.page
  : hasTitle
  ? `https://es.wikipedia.org/wiki/${encodeURIComponent(article.title.trim())}`
  : null;


    setSelectedArticle(article);

    if (article.analysis) {
      setAnalysis({
        palabras: article.analysis.word_count,
        oraciones: 0,
        tiempoLectura: Math.ceil(article.analysis.word_count / 200),
        palabrasFrecuentes: article.analysis.most_common_words.map(
          ([palabra, cuenta]) => `${palabra}: ${cuenta} veces`
        ),
      });
    } else if (article.summary) {
      setAnalysis(analizarTexto(article.summary));
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleSaveArticle = async (article) => {
    try {
      const resumen = String(article.summary || "").trim();
      if (!resumen) throw new Error("El artículo no tiene resumen para guardar.");

      const analisis = analysis || analizarTexto(resumen);
      const articleToSave = {
  title_wikipedia: String(article.title || "").trim(),
  url_wikipedia: article.url_wikipedia, // ✅ Usamos el valor ya calculado
  resumen_process: resumen,
  analisis: {
    numero_palabras: analisis.palabras,
    numero_oraciones: analisis.oraciones,
    tiempo_estimado_lectura: `${analisis.tiempoLectura} min`,
    palabras_mas_frecuentes: analisis.palabrasFrecuentes,
  },
};


      const response = await fetch(
        "https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/articles/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleToSave),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al guardar artículo: ${response.status} ${errorText}`);
      }

      alert("Artículo guardado correctamente.");

      // ✅ Actualizar lista de guardados
      const updatedResponse = await fetch("https://nalizador-y-curador-de-contenido-de-tlf8.onrender.com/articles");
      const updatedData = await updatedResponse.json();
      setSavedArticles(updatedData);

    } catch (error) {
      alert(`Error al guardar artículo: ${error.message}`);
    }
  };

  return (
    <>
      <header>
        <h1>Analizador de Wikipedia</h1>
        <p>Obtén estadísticas detalladas y análisis de cualquier artículo de Wikipedia</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="loading-message">Cargando…</p>}
      {error && <p className="error-message">{error}</p>}

      <main>
        {searchResults.length > 0 && !selectedArticle ? (
          <Results results={searchResults} onSelectArticle={handleSelectArticle} />
        ) : (
          !loading && !error && !selectedArticle && (
            <>
              <h2>Analizador de Wikipedia</h2>
              <p>Buscar un artículo para analizarlo</p>
            </>
          )
        )}

        {selectedArticle && (
          <div style={{ marginTop: "2rem" }}>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.summary || "Sin resumen disponible."}</p>

            {selectedArticle.summary ? (
              <Analyzer analysis={analysis} />
            ) : (
              <p style={{ color: "red" }}>No hay resumen disponible para analizar.</p>
            )}

            <button
              onClick={() => setSelectedArticle(null)}
              style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
            >
              Volver a resultados
            </button>

            <div style={{ marginTop: "2rem" }}>
              <ArticleDisplay article={selectedArticle} onSave={handleSaveArticle} />
            </div>
          </div>
        )}

        {/* ✅ Sección de artículos guardados */}
        {savedArticles.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2>Artículos guardados</h2>
            <SavedArticles articles={savedArticles} />
          </div>
        )}
      </main>

      <footer>WikiAnalyzer — Esta es una aplicación de demostración</footer>
    </>
  );
}

export default App;



