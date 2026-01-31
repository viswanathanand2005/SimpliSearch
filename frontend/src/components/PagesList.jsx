import SnippetCard from "./SnippetCard";
import { deleteSnippet } from "../api";
import { AnimatePresence, motion } from "framer-motion";

export default function PagesList({ pages, refreshPages }) {
  const handleDelete = async (id) => {
    await deleteSnippet(id);
    refreshPages();
  };

  if (!pages || pages.length === 0) {
    return (
      <p
        style={{
          color: "var(--text-sub)",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Your knowledge base is empty.
      </p>
    );
  }

  return (
    <div>
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "var(--text-main)", // FIX: This ensures it turns white in Dark Mode
          marginBottom: "20px",
          transition: "color 0.3s ease",
        }}
      >
        Your Knowledge Base
      </h2>
      <motion.div 
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
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
          {pages.map((page) => (
            <SnippetCard
              key={`page-${page.page_id}`}
              title={page.title}
              url={page.url}
              text={page.content}
              onDelete={() => handleDelete(page.page_id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
