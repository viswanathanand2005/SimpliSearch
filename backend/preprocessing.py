import re
from sentence_transformers import SentenceTransformer
import numpy as np

embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

def clean_text(text):
    text = re.sub(r'[ \t]+',' ',text)
    text = re.sub(r'\n+','\n',text)
    text = re.sub(r'^\s+|\s+$','',text)
    return text[:3000]

def embed_text(text):
    embeddings = embedding_model.encode(text)
    return embeddings.astype(float).tolist()

