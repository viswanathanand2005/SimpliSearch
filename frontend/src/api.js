const API_BASE_URL = "http://localhost:6767";

export const searchSnippets = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Search failed:", error);
    return { "similar pages": [] };
  }
};

export const getAllPages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pages`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch pages");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch pages failed:", error);
    return [];
  }
};

export const deleteSnippet = async (id) => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/document/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete snippet");
    }
    
    return true;
  } catch (error) {
    console.error("Delete failed:", error);
    return false;
  }
};