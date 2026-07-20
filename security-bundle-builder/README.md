# Security Bundle Builder

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Data file

Product and bundle data is loaded at runtime from [`public/data/bundle.json`](public/data/bundle.json), fetched via `getBundleData()` in [`src/features/bundle-builder/api/get-bundle-data.ts`](src/features/bundle-builder/api/get-bundle-data.ts). Edit that file to change the products, pricing, or bundle contents shown in the app.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:
