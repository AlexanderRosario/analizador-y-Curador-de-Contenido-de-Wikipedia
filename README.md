# Analizador y Curador de Contenido de Wikipedia

Este proyecto es una aplicación web que permite buscar, analizar y guardar artículos de Wikipedia. Incluye un backend construido con **FastAPI** y un frontend en **React** usando **Vite**.

## Características

- Búsqueda de artículos en Wikipedia.
- Visualización de resúmenes y análisis de texto (palabras, oraciones, tiempo de lectura, palabras más frecuentes).
- Guardado de artículos analizados en una base de datos.
- Listado de artículos guardados.

---

## Estructura del Proyecto

```
backend/    # API y lógica de negocio (FastAPI, SQLAlchemy)
frontend/   # Aplicación web (React + Vite)
```

---

## Requisitos

- Python 3.9+
- Node.js 18+
- PostgreSQL (o el motor de base de datos que configures)

---

## Instalación

### 1. Backend (FastAPI)

1. Ve al directorio del backend:

   ```sh
   cd backend
   ```

2. Crea y activa un entorno virtual:

   ```sh
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. Instala las dependencias:

   ```sh
   pip install -r requirements.txt
   ```

4. Configura las variables de entorno en un archivo `.env` en `backend/app/`:

   ```
   DATABASE_URL=postgresql+asyncpg://usuario:contraseña@localhost:5432/nombre_db
   ```

5. Inicializa la base de datos:

   ```sh
   python backend/app/core/init_db.py
   ```

6. Ejecuta el servidor:
   ```sh
   uvicorn backend.app.main:app --reload
   ```

---

### 2. Frontend (React + Vite)

1. Ve al directorio del frontend:

   ```sh
   cd frontend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Ejecuta la aplicación en modo desarrollo:

   ```sh
   npm run dev
   ```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Uso

1. Busca un artículo de Wikipedia usando la barra de búsqueda.
2. Selecciona un resultado para ver el resumen y el análisis.
3. Guarda el artículo si lo deseas; aparecerá en la lista de artículos guardados.

---

## Estructura de Carpetas

- **backend/app/**: Código fuente del backend (API, modelos, esquemas, servicios).
- **frontend/src/**: Componentes y lógica del frontend.

---

## Notas

- Asegúrate de que el backend y el frontend apunten a las URLs correctas (verifica los endpoints en `frontend/src/wikiApi.js`).
- Puedes desplegar el backend en servicios como Render, Railway, etc.
