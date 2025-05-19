function Analyzer({ analysis }) {
  if (!analysis) {
    return <p>No hay análisis disponible.</p>;
  }

  return (
    <div>
      <h3>Análisis del texto</h3>
      <p><strong>Número de palabras:</strong> {analysis.palabras}</p>
      <p><strong>Número de oraciones:</strong> {analysis.oraciones}</p>
      <p><strong>Tiempo estimado de lectura:</strong> {analysis.tiempoLectura} minuto(s)</p>

      <h4>Palabras más frecuentes:</h4>
      <ul>
        {analysis.palabrasFrecuentes.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Analyzer;



