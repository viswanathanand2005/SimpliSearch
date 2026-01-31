from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import faiss
import numpy as np
from dotenv import load_dotenv
import os

from validation import InputModel, QueryModel
from preprocessing import clean_text, embed_text
from database import init_db, store, fetch, soft_delete_page, fetch_page_by_id

load_dotenv()

faiss_id_map = []  # [page_id]
index = faiss.IndexFlatIP(384)

app = FastAPI(title="Semantic Web Page Search")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def rebuild_index():
    global index, faiss_id_map

    index.reset()
    faiss_id_map = []

    pages = fetch()

    for page in pages:
        embedding = embed_text(page["content"])
        vector = np.array(embedding, dtype="float32").reshape(1, 384)
        faiss.normalize_L2(vector)

        index.add(vector)
        faiss_id_map.append(page["page_id"])


@app.on_event("startup")
def startup():
    init_db()
    rebuild_index()


@app.post("/save_page")
def save_page(page: InputModel):
    cleaned_text = clean_text(page.text)
    embedding = embed_text(cleaned_text)

    page_id = store(page.title, page.url, cleaned_text)

    vector = np.array(embedding, dtype="float32").reshape(1, 384)
    faiss.normalize_L2(vector)
    index.add(vector)

    faiss_id_map.append(page_id)

    return {"message": "Page saved successfully"}


@app.post("/search")
def search_pages(query: QueryModel):
    # We rely on the in-memory index being up to date (populated at startup + save_page)
    # Deletes are handled by checking DB existence below.
    
    if index.ntotal == 0:
        return {"similar pages": []}

    clean_query = clean_text(query.query)
    embedded_query = embed_text(clean_query)

    query_vector = np.array(embedded_query, dtype="float32").reshape(1, 384)
    faiss.normalize_L2(query_vector)

    scores, indices = index.search(query_vector, 5)

    results = []
    for score, i in zip(scores[0], indices[0]):
        if i >= len(faiss_id_map) or i < 0:
            continue

        db_page_id = faiss_id_map[i]

        page_details = fetch_page_by_id(db_page_id)
        if not page_details:
             continue

        results.append({
            "page_id": db_page_id,
            "similarity": float(score),
            "title": page_details["title"],
            "url": page_details["url"],
            "text": page_details["content"][:200] + "..." if len(page_details["content"]) > 200 else page_details["content"]
        })

    return {"similar pages": results}


@app.delete("/document/{p_id}")
def delete_page(p_id: int):
    flag = soft_delete_page(p_id)

    if not flag:
        raise HTTPException(status_code=404, detail="Page not found")

    return {"Status": "Success", "Message": "Page deleted"}


@app.get("/pages")
def display_pages():
    return fetch()


if __name__ == "__main__":
    uvicorn.run(app, host=os.getenv("HOST"), port=int(os.getenv("PORT")))
