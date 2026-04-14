export function ErrorBanner({ error }) {
  if (!error) return null;
  return (
    <div style={{
      border: "1px solid var(--danger)", borderRadius: 6,
      padding: "0.75rem 1rem", color: "var(--danger)",
      fontSize: 13, marginBottom: "1rem", background: "transparent",
    }}>
      {error}
    </div>
  );
}
