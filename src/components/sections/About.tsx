import type { ReactNode } from "react";

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CARDS: { icon: ReactNode; title: string; text: string; delay?: string }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <circle cx="6" cy="18.5" r="2.2" />
        <circle cx="18" cy="5.5" r="2.2" />
        <path d="M8 18.5h4.5a3 3 0 0 0 3-3v-4a3 3 0 0 1 3-3" />
        <path d="M6 16.3V11" />
      </svg>
    ),
    title: "Lernpfade",
    text: "Relevante ESG-Themen werden verständlich aufgebaut und in sinnvolle Schritte gegliedert.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <circle cx="12" cy="12" r="8.2" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
    title: "Anwendung",
    text: "ESG wird nicht nur erklärt, sondern an echten Situationen aus dem Unternehmen bearbeitet.",
    delay: "d1",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v3A2.5 2.5 0 0 1 13.5 12H8l-4 3z" />
        <path d="M9 15.2v.3A2.5 2.5 0 0 0 11.5 18H16l4 3v-8.5A2.5 2.5 0 0 0 17.5 10" />
      </svg>
    ),
    title: "Austausch",
    text: "Die Community hilft, Fragen einzuordnen und Erfahrungen aus ähnlichen Situationen nutzbar zu machen.",
    delay: "d2",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...s} aria-hidden="true">
        <circle cx="12" cy="12" r="8.4" />
        <path d="M9.7 9.4a2.3 2.3 0 0 1 4.5.6c0 1.6-2.2 1.8-2.2 3.3" />
        <circle cx="12" cy="16.4" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Q&A",
    text: "Regelmäßige Gruppenformate geben Raum für offene Fragen, Einordnung und nächste Schritte.",
    delay: "d3",
  },
];

export default function About() {
  return (
    <section className="about section-pad" id="was">
      <div className="wrap">
        <div className="about-top">
          <div>
            <div className="eyebrow reveal">
              <span className="step">01</span> Was ist Rocketree?
            </div>
            <h2 className="reveal">Rocketree überträgt ESG-Wissen in die Praxis.</h2>
          </div>
          <p className="lede reveal d1">
            Rocketree verbindet strukturierte Lernpfade, Austausch, Gruppen-Q&amp;A und konkrete
            Anwendung. Organisationen nutzen Rocketree, um ESG-Anforderungen besser einzuordnen, eine
            gemeinsame Sprache zu entwickeln und Entscheidungen im Alltag sicherer zu treffen.
          </p>
        </div>

        <div className="grid-4">
          {CARDS.map((c) => (
            <article key={c.title} className={`card hoverable reveal${c.delay ? " " + c.delay : ""}`}>
              <div className="card-ic">{c.icon}</div>
              <h3>{c.title}</h3>
              <p className="ctext">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
