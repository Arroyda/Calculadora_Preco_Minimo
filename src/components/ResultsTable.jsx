const fmt = v =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function ResultsTable({ results, onDownload }) {
  if (!results) return null;

  const hasCamp = results.some(r => r.campanha !== null);
  const headers = [
    "SKU", "Custo (R$)", "Preço Mínimo (R$)",
    ...(hasCamp ? ["Campanha (R$)", "Status"] : []),
  ];

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: 8, overflow: "hidden",
    }}>
      {/* barra superior */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0.85rem 1.25rem", borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>
          {results.length} produto{results.length > 1 ? "s" : ""}
        </span>
        <button
          onClick={onDownload}
          style={{
            padding: "6px 14px", borderRadius: 6,
            border: "1px solid var(--border)", background: "var(--surface)",
            color: "var(--text)", fontSize: 13, cursor: "pointer",
            transition: "border-color .15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          Baixar CSV
        </button>
      </div>

      {/* tabela */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--bg)" }}>
              {headers.map((h, i) => (
                <th key={i} style={{
                  padding: "9px 16px", fontWeight: 500, fontSize: 11,
                  color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5,
                  textAlign: i === 0 ? "left" : i === 4 ? "center" : "right",
                  borderBottom: "1px solid var(--border)",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "9px 16px" }}>{r.sku}</td>
                <td style={{ padding: "9px 16px", textAlign: "right" }}>{fmt(r.custo)}</td>
                <td style={{
                  padding: "9px 16px", textAlign: "right",
                  color: "var(--accent)", fontWeight: 600,
                }}>
                  {fmt(r.precoMinimo)}
                </td>
                {r.campanha !== null && (
                  <>
                    <td style={{ padding: "9px 16px", textAlign: "right" }}>
                      {fmt(r.campanha)}
                    </td>
                    <td style={{
                      padding: "9px 16px", textAlign: "center", fontWeight: 600,
                      color: r.status === "APROVADO" ? "var(--success)" : "var(--danger)",
                    }}>
                      {r.status}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
