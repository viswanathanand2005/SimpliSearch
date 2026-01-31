
import SnippetCard from "./SnippetCard";
import { AnimatePresence, motion } from "framer-motion";

export default function ResultsList({ results, onClear, onDelete }) {
  const uniqueResults = results.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.text === item.text),
  );

  return (
    <div
      style={{
        padding: "10px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "var(--text-main)", fontSize: "1.25rem" }}>
          Semantic Match Results ({uniqueResults.length})
        </h2>
        <button
          onClick={onClear}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent-color)",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Back Home
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <AnimatePresence mode='popLayout'>
          {uniqueResults.map((item, idx) => (
            <SnippetCard 
              key={`res-${idx}`} 
              {...item} 
              onDelete={ item.page_id && onDelete ? () => onDelete(item.page_id) : undefined }
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
