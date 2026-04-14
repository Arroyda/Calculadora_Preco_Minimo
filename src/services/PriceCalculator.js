import { ProductResult } from "../models/Product.js";

export class PriceCalculator {
  // frete: valor fixo em R$ somado ao custo
  // taxa, imposto, empresa: percentuais subtraídos no divisor
  constructor({ frete = 0, taxa = 0, imposto = 0, empresa = 0 } = {}) {
    this.frete = frete;
    this.taxa = taxa;
    this.imposto = imposto;
    this.empresa = empresa;
  }

  get divisor() {
    return 1 - this.taxa / 100 - this.imposto / 100 - this.empresa / 100;
  }

  isValid() {
    return this.divisor > 0;
  }

  // Fórmula: (Custo + Frete) ÷ (1 − Taxa% − Imposto% − Empresa%)
  calculate(products) {
    if (!this.isValid()) {
      throw new Error("A soma das taxas não pode ser 100% ou mais.");
    }
    return products.map(
      product => new ProductResult(product, (product.custo + this.frete) / this.divisor)
    );
  }
}
