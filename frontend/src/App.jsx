import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import PagesList from "./components/PagesList";
import { searchSnippets, getAllPages } from "./api";

export default function App() {
  const [results, setResults] = useState([]);
  const [pages, setPages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- THEME SETUP ---
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- DATA LOADING & AUTO-REFRESH ---
  const loadPages = async () => {
    // Only fetch if we aren't currently searching (prevents overwriting search results)
    if (results.length === 0) {
      const data = await getAllPages();
      // Only update state if data actually changed to prevent unnecessary re-renders
      setPages((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data)) return data;
        return prev;
      });
    }
  };

  useEffect(() => {
    // 1. Initial Load
    loadPages();

    // 2. Auto-Poll every 3 seconds
    const intervalId = setInterval(loadPages, 3000);

    // 3. Instant Refresh on Tab Focus (User switches back to this tab)
    const handleFocus = () => loadPages();
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [results.length]); // Dependency ensures we don't refresh while viewing search results

  // --- SEARCH HANDLER ---
  const handleSearch = async (query) => {
    setIsSearching(true);
    if (!query.trim()) {
      setResults([]); // Clear results
      loadPages(); // Show all pages again
      setIsSearching(false);
      return;
    }
    const data = await searchSnippets(query);
    setResults(data["similar pages"] || []);
    setIsSearching(false);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const success = await import("./api").then(mod => mod.deleteSnippet(id)); // Dynamic import or just import at top?
    // Better to modify import at top, but for replace_file_content simplicity I will rely on top level import if it exists, or add it.
    // Checking previous file view, api is imported as: import { searchSnippets, getAllPages } from "./api";
    // I need to update the import.
    
    // Actually, I can't update imports in this tool call easily if they are far away.
    // I will do separate Calls.
    if (success) {
      setResults((prev) => prev.filter((item) => item.page_id !== id));
      setPages((prev) => prev.filter((page) => page.page_id !== id));
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div style={styles.appContainer}>
      <div style={styles.blurBlob1} />
      <div style={styles.blurBlob2} />

      <div style={styles.contentWrapper}>

        <div style={styles.topNav}>
          <div style={{ marginRight: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             {/* User ID Removed */}
          </div>
          <button onClick={toggleTheme} style={styles.themeBtn}>

            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <header style={styles.header}>
          <div
            style={styles.logoCont}
            onClick={() => {
              setResults([]);
              loadPages();
            }}
          >
            <div style={styles.logoIcon}>⚡</div>
            <h1 style={styles.title}>SimpliSearch</h1>
          </div>
          <p style={styles.subtitle}>AI-powered knowledge retrieval engine.</p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        <main style={{ marginTop: "40px", position: "relative" }}>
          
            {results.length > 0 ? (
              <ResultsList
                key="res"
                results={results}
                onClear={() => {
                  setResults([]);
                  loadPages();
                }}
                onDelete={handleDelete}
              />
            ) : (
              <PagesList key="pages" pages={pages} refreshPages={loadPages} />
            )}
          
        </main>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: "100vh",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  blurBlob1: {
    position: "absolute",
    top: "-100px",
    right: "-100px",
    width: "400px",
    height: "400px",
    background: "rgba(59, 130, 246, 0.08)",
    filter: "blur(80px)",
    borderRadius: "50%",
    zIndex: 0,
  },
  blurBlob2: {
    position: "absolute",
    bottom: "-100px",
    left: "-100px",
    width: "400px",
    height: "400px",
    background: "rgba(59, 130, 246, 0.05)",
    filter: "blur(80px)",
    borderRadius: "50%",
    zIndex: 0,
  },
  contentWrapper: {
    maxWidth: "800px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  topNav: { display: "flex", justifyContent: "flex-end", marginBottom: "20px" },
  themeBtn: {
    background: "var(--card-bg)",
    color: "var(--text-main)",
    border: "1px solid var(--border-color)",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "600",
    backdropFilter: "blur(10px)",
  },
  header: { textAlign: "center", marginBottom: "40px" },
  logoCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "900",
    color: "var(--text-main)",
    margin: 0,
    letterSpacing: "-1.5px",
  },
  subtitle: { color: "var(--text-sub)", fontSize: "1.1rem", marginTop: "8px" },
};
