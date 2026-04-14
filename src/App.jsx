import { useState, useRef } from "react";
import { CSVParser } from "./services/CSVParser.js";
import { CSVExporter } from "./services/CSVExporter.js";
import { PriceCalculator } from "./services/PriceCalculator.js";
import { FileUpload } from "./components/FileUpload.jsx";
import { ParametersForm } from "./components/ParametersForm.jsx";
import { ErrorBanner } from "./components/ErrorBanner.jsx";
import { ResultsTable } from "./components/ResultsTable.jsx";
import { FONT_URL, GLOBAL_STYLES } from "./styles/theme.js";

const cardStyle = {
  background: "var(--surface)", border: "1px solid var(--border)",
  borderRadius: 8, padding: "1.25rem", marginBottom: "1rem",
};

const parser = new CSVParser();
const exporter = new CSVExporter();

const parseNum = val => parseFloat(String(val).replace(",", ".")) || 0;

export default function App() {
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({ frete: "", taxa: "", imposto: "", empresa: "" });
  const [results, setResults] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleParamChange = (key, value) =>
    setParams(prev => ({ ...prev, [key]: value }));

  const handleFile = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setResults(null);
    const reader = new FileReader();
    reader.onload = ev => {
      const parsed = parser.parse(ev.target.result);
      if (!parsed) {
        setError("Não encontrei colunas 'SKU' e 'Custo' na planilha. Verifique o arquivo.");
        setItems([]);
      } else if (parsed.length === 0) {
        setError("Planilha vazia ou sem dados válidos.");
        setItems([]);
      } else {
        setItems(parsed);
      }
    };
    reader.readAsText(file);
  };

  const handleCalculate = () => {
    const calculator = new PriceCalculator({
      frete:   parseNum(params.frete),   // R$ fixo somado ao custo
      taxa:    parseNum(params.taxa),    // %
      imposto: parseNum(params.imposto), // %
      empresa: parseNum(params.empresa), // %
    });
    try {
      setError("");
      setResults(calculator.calculate(items));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => exporter.export(results);

  return (
    <>
      <link href={FONT_URL} rel="stylesheet" />
      <style>{GLOBAL_STYLES}</style>
      <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2.5rem 1rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--text)" }}>
              Calculadora de Preço
            </h1>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              (Custo + Frete) ÷ (1 − Taxa Plataforma% − Imposto% − Custo Empresa%)
            </p>
          </div>

          {/* Upload + Parâmetros em card único */}
          <div style={cardStyle}>
            <FileUpload
              fileName={fileName}
              itemCount={items.length}
              fileRef={fileRef}
              onFileChange={handleFile}
            />
            <ParametersForm values={params} onChange={handleParamChange} />
            <ErrorBanner error={error} />
            <button
              onClick={handleCalculate}
              disabled={items.length === 0}
              style={{
                width: "100%", padding: "10px",
                borderRadius: 6, border: "none",
                background: items.length > 0 ? "var(--accent)" : "var(--border)",
                color: items.length > 0 ? "#ffffff" : "var(--muted)",
                fontSize: 14, fontWeight: 600,
                cursor: items.length > 0 ? "pointer" : "not-allowed",
                transition: "opacity .15s",
              }}
              onMouseEnter={e => { if (items.length > 0) e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Calcular Preço Mínimo
            </button>
          </div>

          <ResultsTable results={results} onDownload={handleDownload} />
        </div>
      </div>
    </>
  );
}
