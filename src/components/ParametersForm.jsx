const FIELDS = [
  { label: "Frete (R$)",           key: "frete",   placeholder: "ex: 20,00" },
  { label: "Taxa Plataforma (%)",  key: "taxa",    placeholder: "ex: 15" },
  { label: "Imposto (%)",          key: "imposto", placeholder: "ex: 6" },
  { label: "Custo Empresa (%)",    key: "empresa", placeholder: "ex: 5" },
];

export function ParametersForm({ values, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Parâmetros</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 10,
      }}>
        {FIELDS.map(({ label, key, placeholder }) => (
          <div key={key}>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{label}</div>
            <input
              value={values[key]}
              onChange={e => onChange(key, e.target.value)}
              placeholder={placeholder}
              style={{
                width: "100%", padding: "9px 11px",
                border: "1.5px solid var(--border)", borderRadius: 6,
                background: "var(--surface)", color: "var(--text)",
                fontSize: 14, outline: "none", transition: "border-color .15s",
              }}
              onFocus={e => (e.target.style.borderColor = "var(--accent)")}
              onBlur={e  => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
