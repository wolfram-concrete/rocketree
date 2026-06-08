# Rocketree Onepager — Next.js

Pixel-naher Nachbau des Rocketree-Marketing-Onepagers (Deutsch) als **Next.js (App Router) +
Tailwind CSS + TypeScript**. Quelle der Wahrheit für Inhalt & Design war der statische
HTML/CSS/JS-Prototyp im übergeordneten Ordner (`../Rocketree Onepager.html`, `../styles.css`,
`../viz.js` …) sowie die `../README.md` (Handoff).

## Starten

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build (statisch prerendert)
```

## Architektur

```
src/
├── app/
│   ├── layout.tsx        # next/font (Bricolage Grotesque + Hanken Grotesk), Metadata/SEO, <html lang="de">
│   ├── page.tsx          # komponiert alle Sektionen in DOM-Reihenfolge
│   └── globals.css       # Design-System (Tokens + Komponenten-Layer), portiert aus styles.css/viz.css
├── lib/
│   └── viz.tsx           # SVG-Generatoren als deterministische React-Komponenten (seeded RNG → SSR-stabil)
└── components/
    ├── Nav.tsx           # 'use client' — Sticky-Nav, Scroll-Progress, Scrollspy, Mobile-Menü
    ├── StickyCta.tsx     # 'use client' — mobiler Sticky-CTA
    ├── RevealManager.tsx # 'use client' — sauberer IntersectionObserver für .reveal + Viz-.play
    ├── icons.tsx         # Inline-SVG-Icons
    └── sections/         # Hero, About, Problem, UserBand, Einstieg, Journey, Fit,
                          # Clarify, Longterm, Faq, Team, FinalCta, Footer
```

Default sind **Server Components**; `'use client'` nur dort, wo Interaktion/State nötig ist
(Nav, StickyCta, RevealManager, Journey-Animation, FAQ-Accordion).

## Bewusste Abweichungen vom Prototyp (laut Handoff-Empfehlung)

- **Tweaks-Panel entfernt.** Schrift/Flächen sind fix auf `font-warm` + `surface-soft` gesetzt
  (die Token-Werte sind direkt in `:root` gebacken). Die Editorial/Klar- und Crisp-Varianten
  wurden nicht übernommen.
- **90-Tage-Journey** rendert nur die Default-Darstellung `timeline` (die `cards`/`progress`-Modi
  waren nur über das Tweaks-Panel erreichbar).
- **Saubere Scroll-Reveals** über einen einzigen `IntersectionObserver` (`RevealManager`),
  statt des „frozen-context"-Sicherheitsnetzes aus `app.js`. `prefers-reduced-motion` wird respektiert.
- **Viz-Layer** (`viz.js`) ist nach React/TSX portiert (`src/lib/viz.tsx`) — gleicher seeded RNG,
  damit Layouts deterministisch und hydrationssicher sind. Funktionen: `HeroNet`, `PhaseScatter`,
  `PhaseNetwork`, `PhaseRings`, `MindMap`, `TangleArrow`.
- **Bilder** über `next/image` (lokale Assets in `public/assets/`).
- Ungenutzte Prototyp-Teile (`image-slot.js`, alte Hero-Photo-/Overlay-Styles) wurden weggelassen.

## Platzhalter (vor Go-live ersetzen)

- **Booking-URL:** `https://cal.com/rocketree` in `src/components/sections/Team.tsx` (`BOOKING_URL`).
- **E-Mail:** `mailto:hello@rocketree.eu`.
- Personen-/Gründerinnen-Fotos sind generierte Modelfotos – bei Bedarf austauschbar.

## Payload-CMS-Ready (optional, nächster Schritt)

Die Sektionen sind als eigenständige Komponenten mit klaren Props modelliert (z. B. `UserBand`),
sodass sie sich später 1:1 auf Payload-Blocks abbilden lassen. Aktuell bewusst **ohne**
Payload-Dependency (Frontend-only).
