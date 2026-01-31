from pydantic import BaseModel
class InputModel(BaseModel):
    url: str
    title: str
    text: str

class OutputModel(BaseModel):
    url: str
    title: str
    similarity_score: float

class QueryModel(BaseModel):
    query: str