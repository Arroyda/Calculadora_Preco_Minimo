import { Product } from "../models/Product.js";

export class CSVParser {
  // Detecta o delimitador olhando o cabeçalho (prefere ; e \t antes de ,
  // para não confundir com a vírgula decimal do padrão brasileiro)
  _detectDelimiter(headerLine) {
    if (headerLine.includes(";"))  return ";";
    if (headerLine.includes("\t")) return "\t";
    return ",";
  }

  _splitLine(line, delimiter) {
    return line.split(delimiter).map(c => c.trim());
  }

  _parseNumber(raw) {
    if (!raw) return 0;
    // Remove R$, espaços, pontos de milhar e converte vírgula decimal → ponto
    const clean = raw
      .replace(/[R$\s]/g, "")
      .replace(/\.(?=\d{3})/g, "")   // ponto de milhar (ex: 1.000,00)
      .replace(",", ".");
    return parseFloat(clean) || 0;
  }

  parse(text) {
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];

    const delimiter = this._detectDelimiter(lines[0]);
    const header = this._splitLine(lines[0], delimiter).map(h => h.toLowerCase());

    const skuIdx = header.findIndex(h => h === "sku" || h.includes("sku"));
    const custoIdx = header.findIndex(
      h =>
        h === "custo" ||
        h.includes("custo") ||
        h === "cost" ||
        h.includes("preço") ||
        h.includes("preco") ||
        h.includes("price")
    );
    const campIdx = header.findIndex(
      h =>
        h.includes("campanha") ||
        h.includes("ação") ||
        h.includes("acao") ||
        h.includes("campaign") ||
        h.includes("promo")
    );

    if (skuIdx === -1 || custoIdx === -1) return null;

    return lines
      .slice(1)
      .map(line => {
        const cols = this._splitLine(line, delimiter);
        return new Product(
          cols[skuIdx] || "",
          this._parseNumber(cols[custoIdx]),
          campIdx !== -1 ? this._parseNumber(cols[campIdx]) : null
        );
      })
      .filter(p => p.sku);
  }
}
