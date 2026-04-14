# 🧮 Calculadora de Preço Mínimo

Aplicação web para cálculo do preço mínimo de venda de produtos no e-commerce, com suporte a importação de planilhas CSV, validação de preços de campanha em lote e exportação dos resultados.

---

## 📋 Sobre o Projeto

A **Calculadora de Preço Mínimo** foi desenvolvida para vendedores de marketplace que precisam calcular rapidamente o preço mínimo viável de venda considerando frete, taxas de plataforma, impostos e custos operacionais.

O usuário importa um CSV com seus produtos, preenche os parâmetros e a aplicação aplica a fórmula abaixo para cada item:

```
Preço Mínimo = (Custo + Frete R$) ÷ (1 − Taxa Plataforma% − Imposto% − Custo Empresa%)
```

Se o CSV incluir uma coluna de **Campanha**, a ferramenta valida automaticamente se o preço da campanha cobre o mínimo calculado, retornando **APROVADO** ou **DESCLASSIFICADO** por produto.

### O que a aplicação faz

1. Importa um CSV com as colunas **SKU**, **Custo** e (opcional) **Campanha**.
2. Detecta automaticamente o delimitador do arquivo (`;` `,` ou tabulação).
3. Normaliza valores monetários no padrão brasileiro (`R$ 1.234,56`).
4. Recebe os parâmetros: **Frete (R$)**, **Taxa Plataforma (%)**, **Imposto (%)** e **Custo Empresa (%)**.
5. Calcula o **Preço Mínimo de Venda** para cada produto.
6. Valida o **Preço de Campanha**, exibindo **APROVADO** ou **DESCLASSIFICADO**.
7. Exibe os resultados em tabela e permite exportar um novo **CSV**.

---

## 🛠️ Tecnologias

| Ferramenta | Versão | Função |
|---|---|---|
| **React** | 18.3+ | Interface da aplicação |
| **Vite** | 5.4+ | Servidor de desenvolvimento e build |
| **@vitejs/plugin-react** | 4.3+ | Suporte a JSX |
| **Node.js** | 18+ | Ambiente de execução |

---

## 📦 Dependências

```
# Produção
react
react-dom

# Desenvolvimento
vite
@vitejs/plugin-react
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/)

### Instalação

```bash
# 1. Entre na pasta do projeto
cd "Calculadora Preço"

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

### Build de produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 📄 Formato do CSV de Entrada

O arquivo deve conter obrigatoriamente as colunas **SKU** e **Custo**. A coluna **Campanha** é opcional.

| SKU | Custo | Campanha |
|---|---|---|
| PRODUTO-ABC | R$ 217,39 | 250,00 |
| PRODUTO-XYZ | R$ 90,00 | 88,00 |

**Delimitadores aceitos:** `;` `,` ou tabulação  
**Formato monetário aceito:** `R$ 1.234,56` · `1234,56` · `1234.56`

---

## 📊 Arquivo de Saída

**Sem campanha:**

| SKU | Custo | Preço Mínimo |
|---|---|---|
| PRODUTO-ABC | 217,39 | 289,85 |

**Com campanha:**

| SKU | Custo | Preço Mínimo | Campanha | Status |
|---|---|---|---|---|
| PRODUTO-ABC | 217,39 | 289,85 | 250,00 | DESCLASSIFICADO |
| PRODUTO-XYZ | 90,00 | 119,99 | 88,00 | DESCLASSIFICADO |

---

## ⚙️ Arquitetura

O projeto é organizado em camadas com separação clara de responsabilidades:

```
src/
├── models/
│   └── Product.js          # Entidades: Product e ProductResult
├── services/
│   ├── CSVParser.js         # Leitura e normalização do CSV
│   ├── PriceCalculator.js   # Lógica de cálculo do preço mínimo
│   └── CSVExporter.js       # Geração do CSV de saída
├── components/
│   ├── FileUpload.jsx        # Zona de upload
│   ├── ParametersForm.jsx    # Inputs de frete e taxas
│   ├── ErrorBanner.jsx       # Exibição de erros
│   └── ResultsTable.jsx      # Tabela de resultados
├── styles/
│   └── theme.js              # Variáveis CSS (tema escuro)
├── App.jsx                   # Orquestrador: estado e handlers
└── main.jsx                  # Ponto de entrada React
```

**Fórmula implementada em `PriceCalculator.js`:**

```js
// frete: valor fixo em R$ somado ao custo
// taxa, imposto, empresa: percentuais no divisor
precoMinimo = (produto.custo + frete) / (1 - taxa/100 - imposto/100 - empresa/100)
```

---

## 📁 Estrutura de Arquivos

```
📁 Calculadora Preço/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── models/
    │   └── Product.js
    ├── services/
    │   ├── CSVParser.js
    │   ├── PriceCalculator.js
    │   └── CSVExporter.js
    ├── components/
    │   ├── FileUpload.jsx
    │   ├── ParametersForm.jsx
    │   ├── ErrorBanner.jsx
    │   └── ResultsTable.jsx
    └── styles/
        └── theme.js
```

---

## ⚠️ Observações

- O campo **Frete** deve ser preenchido em **R$** (valor fixo), não em percentual.
- O parser detecta o delimitador do CSV automaticamente — nenhum ajuste manual necessário.
- A coluna de campanha no CSV é opcional; se ausente, as colunas de status não aparecem.
- Nenhum dado é enviado para servidores externos — tudo roda localmente no navegador.

---

## 🐛 Solução de Problemas

| Problema | Solução |
|---|---|
| `npm: command not found` | Instale o Node.js em nodejs.org |
| `Cannot find module` | Execute `npm install` dentro da pasta do projeto |
| Porta 3000 ocupada | Altere `port` em `vite.config.js` |
| CSV não carrega | Verifique se o cabeçalho contém `SKU` e `Custo` |
| Valores zerados | Confirme que o decimal é vírgula e o arquivo está em UTF-8 |
| Campanha não aparece | A coluna deve se chamar `Campanha`, `Campaign` ou `Promo` |
