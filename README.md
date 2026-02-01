# SimpliSearch ⚡

SimpliSearch is an AI-powered knowledge retrieval engine that allows you to store web snippets and perform semantic searches over them. Unlike keyword matching, SimpliSearch understands the *meaning* of your query to find relevant results.



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

### Prerequisites
*   **Python**: 3.9 or higher.
*   **Node.js**: 18.20+ (v20+ recommended).
*   **Git**: To clone the repo.

### 1. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Start the server:
    ```bash
    python main.py
    ```
    *Server runs at: http://localhost:6767*

### 2. Frontend Setup
1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *App runs at: http://localhost:5173*

### Browser Extension (Optional)
The `extension/` folder contains a Chrome extension to save pages to SimpliSearch.
1.  Open Chrome Extensions (`chrome://extensions`).
2.  Enable "Developer Mode".
3.  Click "Load Unpacked" and select the `extension/` folder.

## 🕹️ Usage

Once the application is running:

1.  **Populate Data**:
    *   **Via Extension**: Navigate to any webpage, click the extension icon, and hit "Save Page".
    *   **Via API**: Send a POST request to `http://localhost:6767/save_page` with JSON: `{"title": "...", "url": "...", "text": "..."}`.
2.  **Search**:
    *   Go to [http://localhost:3000](http://localhost:3000).
    *   Type a query (e.g., "how to center a div" or "machine learning basics").
    *   The results will appear instantly with semantic matching logic!

## 📂 Project Structure

-   `/backend` - FastAPI server, database, and vector search logic.
-   `/frontend` - React application.
-   `/extension` - Browser extension for saving content.
-   `docker-compose.yml` - Orchestration for full-stack deployment.

---

**License**: MIT
