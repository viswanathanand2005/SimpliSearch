
import { motion } from "framer-motion";

export default function SnippetCard({
  title,
  url,
  text,
  similarity,
  onDelete,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      style={styles.card}
      whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div style={styles.cardHeader}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={styles.cardTitle}>{title || "Untitled Snippet"}</h3>
          <a href={url} target="_blank" rel="noreferrer" style={styles.cardUrl}>
            {url}
          </a>
        </div>
        {onDelete && (
          <button onClick={onDelete} style={styles.deleteBtn}>
            Delete
          </button>
        )}
      </div>

      <p style={styles.cardText}>{text}</p>

      {similarity !== undefined && (
        <div style={styles.similarityCont}>
          <div style={styles.barBg}>
            <div style={{ ...styles.barFill, width: `${similarity * 100}%` }} />
          </div>
          <span style={styles.simText}>
            {(similarity * 100).toFixed(0)}% Match
          </span>
        </div>
      )}
    </motion.div>
  );
}

const styles = {
  card: {
    background: "var(--card-bg)",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "16px",
    border: "1px solid var(--border-color)",
    backdropFilter: "blur(12px)", // The "Glass" effect
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "12px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "19px",
    color: "var(--text-main)",
    fontWeight: "800",
  },
  cardUrl: {
    fontSize: "12px",
    color: "var(--accent-color)",
    textDecoration: "none",
    wordBreak: "break-all",
    display: "block",
    marginTop: "4px",
  },
  cardText: {
    color: "var(--text-sub)",
    fontSize: "15px",
    lineHeight: "1.7",
    marginTop: "12px",
  },
  deleteBtn: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    border: "none",
    padding: "6px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "12px",
  },
  similarityCont: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  barBg: {
    flex: 1,
    height: "8px",
    background: "var(--border-color)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg, #10b981, #34d399)",
  },
  simText: { fontSize: "12px", fontWeight: "800", color: "#10b981" },
};
