# Halcyon — Angular Admin Panel

**Live demo:** https://day24x7com.github.io/halcyon-admin-panel/

A responsive admin dashboard styled with the **Theme Factory** palettes. All 10 curated themes
are built in and can be switched live from the palette button in the top bar.

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

- `src/app/themes.ts` — theme registry (`Theme` objects + `themeVars()` → CSS custom properties)
- `src/app/dashboard-data.ts` — typed mock data (KPIs, orders, traffic, channels, activity)
- `src/app/app.ts` — standalone component, signals for theme/nav/range state
- `src/app/app.html` — layout: sidebar, top bar, theme picker, KPI cards, charts, table, feed
- `src/app/app.scss` — all styling driven by `--bg`, `--surface`, `--primary`, `--heading-font`, …

Theming works by binding `[ngStyle]="vars()"` on the shell element, so switching a theme
re-maps every CSS variable at once — no per-component overrides needed.

## Adding a theme

Append an object to `THEMES` in `src/app/themes.ts`; it appears in the picker automatically.
