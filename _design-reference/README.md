# Handoff: Rocketree Onepager

## Overview
Hi-Fi, voll interaktiver Marketing-Onepager (Deutsch) für **Rocketree**, eine Lern- und
Austauschplattform, mit der Organisationen ESG verstehen, anwenden und im Unternehmen verankern.
Der Onepager verkauft den Einstieg („90 Tage Rocketree, 3–5 Personen, 490 € einmalig"), positioniert
das Produkt aber bewusst als *moderne Akademie*, nicht als ESG-/Reporting-Tool.

Die Seite besteht aus einer Sticky-Nav, 10 Inhaltssektionen + 3 „Nutzer-Bändern" mit Bildmaterial +
Footer, einer animierten 90-Tage-Journey, einem FAQ-Accordion und einem (optionalen) Tweaks-Panel.

## About the Design Files
Die Dateien in diesem Bundle sind **Design-Referenzen, erstellt in statischem HTML/CSS/JS** — ein
Prototyp, der Look, Inhalt und Verhalten final zeigt. Sie sind **kein Production-Code zum 1:1-Kopieren**.

Aufgabe in Claude Code: **dieses Design in eurer Zielumgebung nachbauen** (z. B. Next.js/React,
Astro, Vue, Nuxt, SvelteKit …) mit euren etablierten Patterns, Komponenten und eurem Build-Setup.
Gibt es noch keine Umgebung, ist für einen marketing-orientierten Onepager **Astro** oder **Next.js
(App Router) mit Tailwind** eine gute Wahl. Die Texte sind final und auf Deutsch — wörtlich übernehmen.

> Hinweis: Der HTML-Prototyp enthält einige Workarounds für die Vorschau-Umgebung (z. B. ein
> „frozen-context"-Sicherheitsnetz in `app.js`, das CSS-Transitions bei eingefrorener Uhr per
> `transition:none` final setzt). In einem echten Browser/Framework sind diese **nicht nötig** —
> nutzt stattdessen einen sauberen `IntersectionObserver` für Scroll-Reveals (siehe unten).

## Fidelity
**High-fidelity (hifi).** Finale Farben, Typografie, Spacing, Copy und Interaktionen. UI pixelnah
mit den Libraries/Patterns eures Codebase nachbauen. Alle exakten Werte stehen unten unter *Design Tokens*.

---

## Tech-Stack des Prototyps (zur Orientierung)
- Reines HTML + ein globales Stylesheet (`styles.css`) + Vanilla-JS (`app.js`).
- **Visualisierungs-Layer** (`viz.css` + `viz.js`): generiert alle SVG-Grafiken (Hero-Netz,
  Journey-Infografiken, Mind-Map, Tangle→Pfeil) deterministisch per JS aus einer Sage-Palette.
  Elemente werden über `data-viz="<key>"`-Attribute gemountet.
- **Tweaks-Panel** (`tweaks-app.jsx` + `tweaks-panel.jsx`, React via Babel): reines Vorschau-/Demo-Tool
  zum Live-Umschalten von Schrift-Paarung, Journey-Darstellung und Flächenstil. **Für Production
  optional** — entweder weglassen oder als CSS-Theme-Klassen auf `<html>` übernehmen (siehe *State*).
- **image-slot.js**: Drag-&-Drop-Bildplatzhalter (Web Component). Im Onepager aktuell **nicht mehr
  verwendet** (Hero nutzt SVG-Grafik) — kann ignoriert/entfernt werden.
- Fonts: Google Fonts (Bricolage Grotesque, Hanken Grotesk, Instrument Serif, Space Grotesk, IBM Plex Sans).

---

## Screens / Views
Single-Page, vertikal gescrollt. Inhalts-Container: `max-width: 1180px`, zentriert,
seitliches Padding `clamp(20px, 5vw, 64px)`. Sektions-Abstand vertikal `clamp(72px, 9vw, 132px)`.
Reihenfolge im DOM:

1. **Sticky-Nav** (`header.nav`) — Höhe 76px, transparent; ab 24px Scroll `+.scrolled`
   (weißer Blur-Hintergrund `rgba(255,255,255,.86)` + 14px backdrop-blur, untere 1px-Linie `--line`).
   Links: Logo (`assets/Rocketree-Logo.png`, 34px hoch), Nav-Links (Pills, Hover `--green-wash`,
   aktiver Link via Scrollspy `--green-800`), Primär-CTA „Einstieg anfragen". Mobiles Burger-Menü < 960px.
   Darüber: 3px **Scroll-Progress-Bar** (`#progress`, Gradient `--green-700 → --lime`), `position:fixed`, top.

2. **Hero** (`.hero`) — 2-Spalten-Grid `1.04fr 0.96fr`, gap `clamp(36px,5vw,76px)`, vertikal zentriert.
   - Links: Eyebrow „Lern- & Austauschplattform für ESG"; H1 (3 Zeilen, letzte Zeile `.accent` =
     `--green-700`); Subline; „entry-hint"-Box (grün, mit Bildmarke); Fact-Chips (90 Tage / 3–5 Personen /
     490 € — letzte mit rotem Punkt); CTA-Reihe (Primär-Button + Text-Link).
   - Rechts: **Hero-Netzgrafik** (`.hero-graph[data-viz="hero-net"]`, generiertes SVG): ESG-Themen-Pills
     (CSRD, Reporting, Audit, Lieferkette, CO₂, Einkauf, HR) verbinden sich über ein Punkt-Mesh zu zwei
     dunklen Pills „Gemeinsames Verständnis" → „Handlungsfähigkeit" (mit Ripples). Schwebendes
     90-Tage-Badge (Donut-Ring) + Legende darunter.

3. **02 Was ist Rocketree** (`#was`) — Intro-Grid (H2 + Lede) + 4er-Karten-Grid (`.grid-4`):
   Lernpfade · Anwendung · Austausch · Q&A. Karten weiß, `--radius-md`, `--shadow-card`, Hover hebt an.

4. **03 Problem** (`.problem`, Hintergrund `--surface-2`) — Section-Head + 4 Karten (2×2, `.grid-2`),
   nummeriert 01–04.

5. **Nutzer-Band A** (`.user-band.ub-cream`) — volle Breite, hell. Großes Portrait links
   (`assets/user-thoughtful.jpg`), Text rechts. Logo-Formakzente: spitze Ellipse („Blatt",
   `border-radius:0 100% 0 100%`, `--lime`) + Kreis-Outline (`--green-500`). Persona-Chip mit Bildmarke.

6. **04 Der konkrete Einstieg** (`#einstieg`) — Grid `1fr 0.92fr`: links Copy + „Anlass"-Chips;
   rechts **Angebots-Box** (`.offer`, weiß, 4px-Gradient-Topborder, 90-Tage-Facts, Checkliste,
   Preis 490 €, CTA). Darunter volle Breite: **Mind-Map** (`.mindmap-wrap[data-viz="mindmap"]`,
   generiertes SVG „Beispiel: Arbeitsbereich" — zentrale ESG-Herausforderung verzweigt in 6 Teilthemen).

7. **Nutzer-Band B** (`.user-band.ub-wash.ub-right`) — hellgrün, Foto rechts (`assets/user-warm.png`).

8. **05 Was in den 90 Tagen passiert** (`#ablauf`, `.journey`, Hintergrund `--surface-2`) —
   Grid `1.5fr 1fr`. Links die **90-Tage-Journey** mit 3 umschaltbaren Darstellungen (siehe *Interactions*):
   `timeline` (default) / `cards` / `progress`. Jede Phase hat eine generierte Infografik
   (`data-viz="phase-scatter|phase-network|phase-rings"`). Rechts dunkelgrüne **Output-Box**
   („Was danach klarer sein sollte", 6 Punkte, Mini-90-Tage-Timeline).

9. **06 Für wen** (`#fuerwen`) — 2 Spalten: „Passt, wenn…" (grün) vs. „Passt eher nicht, wenn…" (neutral).

10. **Nutzer-Band C** (`.user-band.ub-dark`) — **dunkelgrün** (`--green-800`, weißer Text),
    Foto links (`assets/user-lead.png`), lime Akzente.

11. **Einordnung / Wann richtig** (`.clarify`, `--surface-2`) — Intro + 4 „kein …"-Karten.

12. **06 Langfristige Nutzung** (`.longterm`) — Section-Head + **Roadmap** (`.roadmap`, 5 Stages mit
    Pfeil-Connectoren): 90-Tage-Einstieg → Einzelpersonen (29 €/Mo · 249 €/Jahr) → Teams → Organisation → Supply Chain.

13. **Team** (`#team`) — 2 Persona-Karten (Gründerinnen): Foto + Rolle + Bio + Aktionen
    (Termin buchen / E-Mail / LinkedIn-Icon-Button). Fotos: `assets/founder-boonrat.png`, `assets/founder-sunshine.png`.

14. **FAQ** (`#faq`) — zentriert, max 860px, 6 Accordion-Items.

15. **Abschluss-CTA** (`#anfragen`, `.final`, dunkelgrün) — zentriert, H2 + Tangle→Pfeil-Grafik
    (`.final-viz[data-viz="tangle"]`) + Fact-Reihe + weißer CTA + Schlagwort-Strip.

16. **Footer** (`footer.foot`, `#kontakt`, sehr dunkel `#0f1813`) — Logo (white) + Tagline, 2 Link-Spalten, Copyright.

---

## Interactions & Behavior
- **Sticky-Nav**: ab `scrollY > 24` Klasse `.scrolled`. Scroll-Progress-Bar-Breite = Scroll-Prozent.
- **Scrollspy**: aktiver Nav-Link je sichtbarer Sektion (`was, einstieg, ablauf, fuerwen, team, faq, anfragen`).
  Im Prototyp via `IntersectionObserver` mit `rootMargin: '-45% 0px -50% 0px'`.
- **Scroll-Reveal**: Elemente mit `.reveal` faden hoch (`opacity 0→1`, `translateY(22px)→0`,
  `.7s cubic-bezier(.22,1,.36,1)`). Stagger-Klassen `.d1`–`.d4` (Delay 80/160/240/320ms).
  → In Production sauber per `IntersectionObserver` lösen, `.in` toggeln. `prefers-reduced-motion` respektieren.
- **90-Tage-Journey-Animation**: beim Sichtbarwerden zeichnet sich der Timeline-Fortschrittsbalken
  (`.tl-fill`, Breite 0→100%, 1.4s), Phasen-Knoten aktivieren gestaffelt (`+.on`, 320ms-Versatz),
  Progress-Bars füllen je `data-w`. Phase 3 nutzt den roten Akzent (Rakete).
- **Journey-Darstellung umschalten** (Tweak): Attribut `data-mode` auf `#ablauf` =
  `timeline` | `cards` | `progress`. CSS blendet die jeweilige Variante ein/aus.
- **FAQ-Accordion**: Klick öffnet ein Item (`+.open`), schließt andere (single-open). `max-height`-Transition;
  Plus-Icon rotiert 45° zu ×.
- **Hover-States**: Buttons heben an + Schatten; Karten `translateY(-4px)` + `--shadow-lift`;
  Text-Links vergrößern `gap`/unterstreichen; Icon-Buttons invertieren auf `--green-800`.
- **Nutzer-Bänder**: `.ub-right` spiegelt Layout (Foto rechts) und die Logo-Formakzente.
- **Responsive**: Breakpoints **1080 / 960 / 860 / 640 px**. < 960px: Nav-Links → Burger,
  Hero/Grids stapeln. Journey-Timeline wird < 640px zur vertikalen Liste. Sticky-Mobile-CTA < 640px.

## State Management
Der Prototyp ist weitgehend zustandslos. Benötigte UI-Zustände im Zielframework:
- `navScrolled: boolean` (Scroll > 24)
- `activeSection: string` (Scrollspy)
- `openFaqIndex: number | null` (Accordion, single-open)
- `journeyMode: 'timeline' | 'cards' | 'progress'` (nur falls umschaltbar gewünscht; sonst fix `timeline`)
- `journeyPlayed: boolean` (Animation einmalig triggern)
- Theme-Klassen auf `<html>` (optional, aus dem Tweaks-System):
  `font-warm|font-editorial|font-klar` und `surface-soft|surface-crisp`.
  **Empfehlung Production:** fix `font-warm surface-soft` setzen, Tweaks-Panel weglassen.
- Kein Data-Fetching. „Termin buchen" → externe Booking-URL (Platzhalter `https://cal.com/rocketree`,
  echte URL einsetzen). „E-Mail" → `mailto:hello@rocketree.eu`. LinkedIn-Profile sind hinterlegt.

---

## Design Tokens

### Farben (Brand, aus Logo gesampelt)
| Token | Hex | Einsatz |
|---|---|---|
| `--green-900` | `#00532e` | dunkelstes Grün, Button-Hover |
| `--green-800` | `#006c3c` | **Primärgrün** (Wortmarke, CTA, dunkle Sektionen, Ink-Akzent) |
| `--green-700` | `#009048` | Eyebrows, Icons, Primär-Akzent |
| `--green-600` | `#1a9b4e` | aktive Knoten, Pfeile |
| `--green-500` | `#3cb448` | helles Grün, Hover-Borders, Akzentkreise |
| `--green-400` | `#5cc35a` | — |
| `--lime` | `#90cc3c` | Lime-Akzent (Progress-Gradient, Blatt-Form, Strip-Dots) |
| `--lime-soft` | `#cfe8a8` | — |
| `--red` | `#e41830` | **Rakete** — sehr sparsamer Akzent (Phase-3-Knoten, ein Fact-Punkt) |
| `--red-dark` | `#b4243c` | roter Tiefton |

### Neutrale / Flächen
| Token | Hex |
|---|---|
| `--ink` | `#15201a` |
| `--ink-soft` | `#46544c` |
| `--muted` | `#6c7a71` |
| `--faint` | `#9aa79f` |
| `--line` | `#e4eae5` |
| `--line-soft` | `#eef2ee` |
| `--surface` | `#ffffff` |
| `--surface-2` | `#f5f8f4` |
| `--surface-3` | `#eef3ec` |
| `--green-wash` | `#f1f7f1` |
| `--green-wash2` | `#e7f1e6` |
| Footer-BG | `#0f1813` |

### SVG-Viz-Palette (Sage, in `viz.js`)
`dark #0f2e1f · deep #16412a · mid #3f8f57 · soft #88b98d · faint #bcd6b7 · line #a8c8a3 · dot #d6e8d0 · cream #eef3ec`

### Typografie
- **Display/Headlines:** „Bricolage Grotesque", `font-weight: 700`, `letter-spacing: -0.02em`, `line-height: 1.06`, `text-wrap: balance`.
- **Body:** „Hanken Grotesk", Basis `18px`, `line-height: 1.6`.
- Alternative Paarungen (Tweak, optional): *Editorial* = Instrument Serif + Hanken; *Klar* = Space Grotesk + IBM Plex Sans.
- Skala (clamp, fluid):
  - H1 Hero `clamp(38px, 5.2vw, 66px)`, `line-height: 1.02`
  - H2 Sektion `clamp(28px, 3.6vw, 44px)`
  - Lede `clamp(18px, 1.9vw, 21px)`, Farbe `--ink-soft`, `line-height: 1.62`
  - Eyebrow `13px`, `weight 600`, `letter-spacing .14em`, uppercase, `--green-700`
  - Body/Karten-Text `16px`, `--ink-soft`

### Radius (surface-soft, default)
`xs 10 · sm 14 · md 20 · lg 28 · xl 36` (px). Variante *crisp*: `4 / 6 / 10 / 14 / 18`.

### Schatten
- `--shadow-card`: `0 1px 2px rgba(20,40,28,.04), 0 10px 30px -18px rgba(20,40,28,.20)`
- `--shadow-lift`: `0 2px 6px rgba(20,40,28,.05), 0 28px 56px -28px rgba(20,40,28,.30)`
- `--shadow-float`: `0 12px 40px -12px rgba(20,40,28,.22)`

### Layout
- Content max-width `1180px`; Gutter `clamp(20px, 5vw, 64px)`; Sektions-Padding `clamp(72px, 9vw, 132px)`.
- Buttons: Radius `999px` (Pill). Primär = `--green-800` Fill, weiß; Ghost = transparent + `--line`-Border.
  Größen: `btn-sm` / Standard / `btn-lg`. Hover: `translateY(-2px)` + verstärkter Schatten.

---

## Assets
Alle in `assets/` (mitgeliefert):
- `Rocketree-Logo.png` / `Rocketree-Logo-white.png` — Wortmarke (dunkel/weiß)
- `Rocketree-Bildmarke.png` / `Rocketree-Bildmarke-white.png` — Bildmarke (Icon)
- `user-thoughtful.jpg`, `user-warm.png`, `user-lead.png` — repräsentative Nutzer:innen (Nutzer-Bänder A/B/C). *Generierte Model-Fotos — bei Bedarf durch echte Teilnehmer:innen ersetzbar.*
- `founder-boonrat.png`, `founder-sunshine.png` — Gründerinnen (Team-Sektion)

Icons sind **inline-SVG** (kein Icon-Font). Alle Grafiken/Diagramme werden in `viz.js` als SVG erzeugt —
beim Nachbau entweder die SVGs aus dem gerenderten DOM übernehmen oder die Generatoren nach
React/Vue-Komponenten portieren (Funktionen: `heroNet`, `phaseScatter`, `phaseNetwork`, `phaseRings`, `mindMap`, `tangleArrow`).

## Files (in diesem Bundle)
- `Rocketree Onepager.html` — vollständige Seitenstruktur + finale Copy (Quelle der Wahrheit für Inhalt/Reihenfolge)
- `styles.css` — komplettes Design-System (Tokens, Layout, Komponenten, Responsive)
- `app.js` — Interaktionen (Nav, Scrollspy, Reveal, FAQ, Journey). *Frozen-context-Workarounds ignorierbar.*
- `viz.css` + `viz.js` — SVG-Visualisierungs-Layer
- `tweaks-app.jsx` + `tweaks-panel.jsx` — optionales Demo-Tweaks-Panel (für Production verzichtbar)
- `image-slot.js` — ungenutzt, kann entfernt werden
- `assets/` — Logos, Bildmarken, Personen-Fotos
