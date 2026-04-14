export function FileUpload({ fileName, itemCount, fileRef, onFileChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
        Importar planilha — CSV com SKU, Custo e (opcional) Campanha
      </p>
      <div
        onClick={() => fileRef.current?.click()}
        style={{
          border: "1.5px dashed var(--border)", borderRadius: 8,
          padding: "1.5rem", textAlign: "center", cursor: "pointer",
          background: "var(--surface)", transition: "border-color .15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.txt"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <div style={{ fontSize: 13, color: fileName ? "var(--success)" : "var(--muted)" }}>
          {fileName || "Clique para selecionar arquivo"}
        </div>
        {itemCount > 0 && (
          <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 4 }}>
            {itemCount} produto{itemCount > 1 ? "s" : ""} carregado{itemCount > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
