# OGame browser extension experiment

A Vue 3 and Vuetify browser extension experiment built with Vite and CRXJS. It adds a popup and a content script for Gameforge pages; review the requested permissions in `manifest.json` before installing it.

## Development

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
npm run build
```

Load the generated extension from `dist/` using Chrome's extension developer mode. This is an old game-specific experiment and its UI or selectors may need updates as OGame changes. No license is granted unless a `LICENSE` file is present.
