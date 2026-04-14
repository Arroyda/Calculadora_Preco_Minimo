export class CSVExporter {
  export(results, filename = "precos_calculados.csv") {
    const hasCamp = results.some(r => r.campanha !== null);
    const header = hasCamp
      ? "SKU;Custo;Preço Mínimo;Preço Campanha;Status\n"
      : "SKU;Custo;Preço Mínimo\n";

    const rows = results
      .map(r => {
        const base = `${r.sku};${r.custo.toFixed(2).replace(".", ",")};${r.precoMinimo.toFixed(2).replace(".", ",")}`;
        return hasCamp
          ? `${base};${r.campanha !== null ? r.campanha.toFixed(2).replace(".", ",") : ""};${r.status || ""}`
          : base;
      })
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
