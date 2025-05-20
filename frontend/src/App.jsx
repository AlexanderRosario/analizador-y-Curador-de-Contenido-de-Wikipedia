/*import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "./style.css";
import Results from "./Results";
import Analyzer from "./Analyzer";
import { fetchWikiSearchResults, fetchWikiArticleSummary } from "./wikiApi";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const analizarTexto = (texto) => {
    const palabras = texto.trim().split(/\s+/).filter(Boolean);
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

      setSelectedArticle(article);

      if (article.analysis) {
        setAnalysis({
          palabras: article.analysis.word_count,
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
          !loading &&
          !error &&
          !selectedArticle && (
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
              style={{
                marginTop: "1rem",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Volver a resultados
            </button>
          </div>
        )}
      </main>

      <footer>WikiAnalyzer — Esta es una aplicación de demostración</footer>
    </>
  );
}

export default App;
*/

/*import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "./style.css";
import Results from "./Results";
import Analyzer from "./Analyzer";
import {
  fetchWikiSearchResults,
  fetchWikiArticleSummary,
  saveArticleToBackend,
} from "./wikiApi";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const analizarTexto = (texto) => {
    const palabras = texto.trim().split(/\s+/).filter(Boolean);
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

    // Asegurar que pageid quede guardado
    setSelectedArticle({
      ...article,
      pageid,
    });

    if (article.analysis) {
      setAnalysis({
        palabras: article.analysis.word_count,
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


  const handleSaveArticle = async () => {
    if (!selectedArticle) return;
    setError("");
    try {
      const pageId = selectedArticle.pageid || selectedArticle.id || 0;

      const articleData = {
        id_page: pageId,
        title: selectedArticle.title || "Sin título",
        wikipedia_url: `https://es.wikipedia.org/?curid=${pageId}`,
        original_content: selectedArticle.extract || "",
        summary: selectedArticle.summary || "",
      };

      console.log("Artículo enviado al backend:", articleData); // ← CONSOLE.LOG agregado

      const saved = await saveArticleToBackend(articleData);
      alert("Artículo guardado con éxito: " + saved.title);
    } catch (err) {
      setError("Error al guardar el artículo: " + err.message);
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
          !loading &&
          !error &&
          !selectedArticle && (
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

            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  marginRight: "1rem",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                Volver a resultados
              </button>

              <button
                onClick={handleSaveArticle}
                style={{
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Guardar artículo
              </button>
            </div>
          </div>
        )}
      </main>

      <footer>WikiAnalyzer — Esta es una aplicación de demostración</footer>
    </>
  );
}

export default App;
*/

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./style.css";
import Results from "./Results";
import Analyzer from "./Analyzer";
import SavedArticles from "./SavedArticles";
import {
  fetchWikiSearchResults,
  fetchWikiArticleSummary,
  saveArticleToBackend,
  fetchSavedArticles,
  deleteSavedArticle,
} from "./wikiApi";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [savedArticles, setSavedArticles] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const analizarTexto = (texto) => {
    const palabras = texto.trim().split(/\s+/).filter(Boolean);
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
      tiempoLectura,
      palabrasFrecuentes: frecuentes,
    };
  };

  const loadSavedArticles = async () => {
    setLoadingSaved(true);
    setError("");
    try {
      const data = await fetchSavedArticles();
      setSavedArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSaved(false);
    }
  };

  useEffect(() => {
    loadSavedArticles();
  }, []);

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

      const selectedResult = searchResults.find((r) => r.pageid === pageid);

      setSelectedArticle({
        ...article,
        pageid,
        title: selectedResult ? selectedResult.title : "Sin título",
      });

      if (article.analysis) {
        setAnalysis({
          palabras: article.analysis.word_count,
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

  const handleSelectSavedArticle = (article) => {
    setSelectedArticle(article);
    if (article.summary) {
      setAnalysis(analizarTexto(article.summary));
    } else {
      setAnalysis(null);
    }
  };

  const handleSaveArticle = async () => {
    if (!selectedArticle) return;
    setError("");
    try {
      console.log("Artículo seleccionado para guardar:", selectedArticle);
      const pageId = selectedArticle.pageid || selectedArticle.id || 0;

      const articleData = {
        id_page: pageId,
        title: selectedArticle.title || "Sin título",
        wikipedia_url: `https://es.wikipedia.org/?curid=${pageId}`,
        original_content: selectedArticle.extract || "",
        summary: selectedArticle.summary || "",
      };

      const saved = await saveArticleToBackend(articleData);
      alert("Artículo guardado con éxito: " + saved.title);
      loadSavedArticles();
    } catch (err) {
      setError("Error al guardar el artículo: " + err.message);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    setError("");
    try {
      await deleteSavedArticle(articleId);
      alert("Artículo eliminado con éxito.");
      loadSavedArticles();
    } catch (err) {
      setError("Error al eliminar el artículo: " + err.message);
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
        <SavedArticles
          articles={savedArticles}
          loading={loadingSaved}
          onSelectArticle={handleSelectSavedArticle}
          onDeleteArticle={handleDeleteArticle}
        />

        {searchResults.length > 0 && !selectedArticle && (
          <Results results={searchResults} onSelectArticle={handleSelectArticle} />
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

            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  marginRight: "1rem",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                Volver a resultados
              </button>

              <button
                onClick={handleSaveArticle}
                style={{
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Guardar artículo
              </button>
            </div>
          </div>
        )}
      </main>

      <footer>WikiAnalyzer — Esta es una aplicación de demostración</footer>
    </>
  );
}

export default App;











