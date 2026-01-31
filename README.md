# SimpliSearch ⚡

SimpliSearch is an AI-powered knowledge retrieval engine that allows you to store web snippets and perform semantic searches over them. Unlike keyword matching, SimpliSearch understands the *meaning* of your query to find relevant results.

 <!-- Conceptual link, assuming one might exist or user will add one -->

## 🚀 Features

-   **Semantic Search**: Powered by `sentence-transformers` and FAISS for vector similarity.
-   **Modern UI**: Built with React & Vite, featuring a premium Glassmorphism design and smooth animations (`framer-motion`).
-   **Persistent Storage**: SQLite database for storing page content and metadata.
-   **Docker Ready**: Full stack deployable via Docker Compose.

## 🛠 Tech Stack

-   **Frontend**: React, Vite, Framer Motion, Vanilla CSS (Glassmorphism).
-   **Backend**: FastAPI, Python 3.9+, FAISS (Vector DB), Sentence Transformers (Embeddings).
-   **Database**: SQLite.
-   **Infrastructure**: Docker & Docker Compose.

## 🏁 Quick Start

The easiest way to run SimpliSearch is with **Docker Compose**.

1.  **Clone/Open** the repository.
2.  **Run** the application:
    ```bash
    docker-compose up --build
    ```
3.  **Open** your browser:
    *   Frontend: [http://localhost:3000](http://localhost:3000)
    *   Backend API Docs: [http://localhost:6767/docs](http://localhost:6767/docs)

> **Note**: The first startup may take a minute as the backend downloads the AI models.

## 🔧 Manual Setup

If you prefer running without Docker:

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*Runs on port 6767.*

### Frontend
```bash
cd frontend
npm install
npm run dev
```
*Runs on port 5173 (default Vite port).*

### Browser Extension (Optional)
The `extension/` folder contains a Chrome extension to save pages to SimpliSearch.
1.  Open Chrome Extensions (`chrome://extensions`).
2.  Enable "Developer Mode".
3.  Click "Load Unpacked" and select the `extension/` folder.

## 📂 Project Structure

-   `/backend` - FastAPI server, database, and vector search logic.
-   `/frontend` - React application.
-   `/extension` - Browser extension for saving content.
-   `docker-compose.yml` - Orchestration for full-stack deployment.

---

**License**: MIT
