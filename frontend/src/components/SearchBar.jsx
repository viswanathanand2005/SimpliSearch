import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      style={styles.container}
      whileFocusWithin={{
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
      }}
    >
      <input
        type="text"
        placeholder="Search your knowledge base..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? "..." : "Search"}
      </button>
    </motion.form>
  );
}

const styles = {
  container: {
    display: "flex",
    background: "white",
    padding: "8px",
    borderRadius: "99px",
    border: "1px solid #e2e8f0",
    transition: "0.3s",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    outline: "none",
    background: "transparent",
  },
  button: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px 28px",
    borderRadius: "99px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
