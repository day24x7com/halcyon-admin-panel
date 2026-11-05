# Halcyon — Angular Admin Panel

**Live demo:** https://day24x7com.github.io/halcyon-admin-panel/

A full admin panel built with Angular 22 (standalone components, signals, lazy-loaded routes)
and styled with the **Theme Factory** palettes. All 10 curated themes are built in and can be
switched live from the top bar — the choice persists across reloads.

## Pages

| Route | What it does |
| --- | --- |
| `/dashboard` | KPI cards with sparklines, traffic/revenue bar chart, channel breakdown, recent orders, activity feed |
| `/analytics` | Revenue area chart, sessions donut, top-pages table, plan mix, device rings |
| `/orders` | 28 orders — live search, status filter tabs, sortable columns, pagination, detail drawer |
| `/customers` | Customer cards with lifetime stats, search, plan filter, profile drawer |
| `/products` | Inventory grid with stock states, category filter, ratings, sold counts |
| `/settings` | Tabbed forms — profile, theme picker, notification toggles, billing |

Everything is client-side and interactive: no backend required.

## Themes included

| Theme | Type | Primary |
| --- | --- | --- |
| Ocean Depths | Dark | `#2d8b8b` |
| Sunset Boulevard | Light | `#e76f51` |
| Forest Canopy | Light | `#2d4a2b` |
| Modern Minimalist | Light | `#36454f` |
| Golden Hour | Light | `#c1666b` |
| Arctic Frost | Light | `#4a6fa5` |
| Desert Rose | Light | `#b87d6d` |
| Tech Innovation | Dark | `#0066ff` |
| Botanical Garden | Light | `#4a7c59` |
| Midnight Galaxy | Dark | `#a490c2` |

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production bundle in dist/
```

## Structure

```
src/app/
  app.ts, app.html, app.scss        shell: sidebar, top bar, theme picker, router outlet
  app.routes.ts                     lazy-loaded routes
  core/
    themes.ts                       Theme registry + themeVars() -> CSS custom properties
    theme.service.ts                theme signal, persisted to localStorage
    data.ts                         typed mock data for every page
    icons.ts                        IconName union + SVG path map
  shared/
    pill.ts                         status pill
    drawer.ts                       slide-in detail panel
  pages/
    dashboard/ analytics/ orders/ customers/ products/ settings/
src/styles.scss                     global design tokens + shared primitives (.card, .btn, .input…)
```

## How theming works

Each theme is a plain object of colours and font stacks. `themeVars()` flattens the active
theme into CSS custom properties (`--bg`, `--surface`, `--primary`, `--heading-font`, …) which
are bound once on the shell element:

```html
<div class="shell" [ngStyle]="vars()" [attr.data-theme]="theme().id">
```

Because every rule in the app reads those variables, switching a theme re-skins the entire UI
in one repaint — no per-component overrides. Shared primitives live in `src/styles.scss` so
routed page components can use them; the shell's own chrome lives in `app.scss`.

## Adding a theme

Append an object to `THEMES` in `src/app/core/themes.ts` — it appears in the top-bar picker and
in Settings → Appearance automatically.
