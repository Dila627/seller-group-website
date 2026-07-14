# Seller Group corporate website

Premium React/Vite/Tailwind website for Seller Group, an official distributor
and supplier of construction and finishing materials imported from Russia and
Turkey.

## Structure

```text
src/
  components/   shared UI components
  data/         translatable catalog and company data
  lib/          routing, assets and SEO helpers
  pages/        lazy-loaded page modules
public/assets/  optimized visual assets
```

## Commands

```bash
npm install
npm run dev
npm run build
```

Brands and products are data-driven. Add a new brand or product in
`src/data/catalog.js`, then place any required assets in `public/assets`.
