export class Product {
  constructor(sku, custo, campanha = null) {
    this.sku = sku;
    this.custo = custo;
    this.campanha = campanha;
  }
}

export class ProductResult extends Product {
  constructor(product, precoMinimo) {
    super(product.sku, product.custo, product.campanha);
    this.precoMinimo = precoMinimo;
    this.status =
      product.campanha !== null
        ? product.campanha >= precoMinimo
          ? "APROVADO"
          : "DESCLASSIFICADO"
        : null;
  }
}
