import sqlite3
from dotenv import load_dotenv
import os

load_dotenv()

def create_connection():
    return sqlite3.connect(f"{os.getenv('DB_PATH')}")

def init_db():
    conn = create_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS pages(
            page_id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            content TEXT NOT NULL,
            is_deleted INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


def store(title, url, text):
    conn = create_connection()
    cur = conn.cursor()

    # user_id is NOT NULL in the existing schema, so we insert a dummy value (1)
    cur.execute(
        "INSERT INTO pages (title, url, content) VALUES (?, ?, ?)",
        (title, url, text)
    )

    page_id = cur.lastrowid
    conn.commit()
    conn.close()
    return page_id


def soft_delete_page(p_id):
    conn = create_connection()
    cur = conn.cursor()

    cur.execute(
        "UPDATE pages SET is_deleted = 1 WHERE page_id = ?",
        (p_id,)
    )

    conn.commit()
    success = cur.rowcount > 0
    conn.close()
    return success


def fetch():
    conn = create_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT page_id, title, url, content FROM pages WHERE is_deleted = 0"
    )

    rows = cur.fetchall()
    conn.close()

    return [
        {
            "page_id": row[0],
            "title": row[1],
            "url": row[2],
            "content": row[3]
        }
        for row in rows
    ]


def fetch_page_by_id(page_id):
    conn = create_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT page_id, title, url, content FROM pages WHERE page_id = ? AND is_deleted = 0",
        (page_id,)
    )

    row = cur.fetchone()
    conn.close()

    if row:
        return {
            "page_id": row[0],
            "title": row[1],
            "url": row[2],
            "content": row[3]
        }
    return None
