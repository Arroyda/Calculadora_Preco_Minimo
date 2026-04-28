import { useState } from "react";

const TEMPLATE_CSV =
  "SKU;Custo;Campanha\n" +
  "PRODUTO-ABC-42;217,39;250,00\n" +
  "PRODUTO-XYZ-38;90,00;88,00\n" +
  "PRODUTO-DEF-41;156,00;\n";

function downloadTemplate() {
  const blob = new Blob([TEMPLATE_CSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "template_calculadora.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function FileUpload({ fileName, itemCount, fileRef, onFileChange }) {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = e => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = e => {
    // só desativa se sair da zona inteira (ignora filhos)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragging(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    // reutiliza o handler do App criando um evento sintético
    const syntheticEvent = { target: { files: [file] } };
    onFileChange(syntheticEvent);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          Importar planilha — CSV com SKU, Custo e (opcional) Campanha
        </p>
        <button
          onClick={e => { e.stopPropagation(); downloadTemplate(); }}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 5,
            border: "1px solid var(--border)", background: "transparent",
            color: "var(--muted)", fontSize: 11, cursor: "pointer",
            whiteSpace: "nowrap", transition: "border-color .15s, color .15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--muted)";
          }}
        >
          ⬇ Baixar template CSV
        </button>
      </div>

      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `1.5px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 8,
          padding: "2rem 1.5rem",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "rgba(59,130,246,0.06)" : "var(--surface)",
          transition: "border-color .15s, background .15s",
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.txt"
          onChange={onFileChange}
          style={{ display: "none" }}
        />

        {/* ícone */}
        <div style={{ fontSize: 28, marginBottom: 8, userSelect: "none" }}>
          {dragging ? "📂" : "📁"}
        </div>

        {/* estado do arquivo */}
        {fileName ? (
          <div style={{ fontSize: 13, color: "var(--success)", fontWeight: 500 }}>
            {fileName}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>
              Arraste o arquivo aqui
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              ou <span style={{ color: "var(--accent)", textDecoration: "underline" }}>
                clique para abrir o explorador
              </span>
            </div>
          </>
        )}

        {/* contador de produtos */}
        {itemCount > 0 && (
          <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 6 }}>
            {itemCount} produto{itemCount > 1 ? "s" : ""} carregado{itemCount > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
