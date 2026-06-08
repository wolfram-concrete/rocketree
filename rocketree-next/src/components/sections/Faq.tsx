"use client";

import { useRef, useState } from "react";
import { PlusIcon } from "@/components/icons";

const ITEMS = [
  {
    q: "Müssen wir schon genau wissen, mit welchem Thema wir starten?",
    a: "Nein. Ein konkreter Anlass reicht. Im Einstieg wird gemeinsam eingeordnet, welche ESG-Herausforderung für die 90 Tage sinnvoll ist.",
  },
  {
    q: "Ist Rocketree nur für 90 Tage gedacht?",
    a: "Nein. Rocketree ist auf langfristige Nutzung ausgelegt. Die 90 Tage sind der konkrete Einstieg, um Rocketree an einem realen Thema kennenzulernen und eine erste Grundlage zu schaffen.",
  },
  {
    q: "Wer sollte teilnehmen?",
    a: "Sinnvoll sind 3–5 Personen, die ESG im Unternehmen einordnen, erklären oder mitentscheiden müssen. Zum Beispiel Geschäftsführung, Nachhaltigkeit, HR, Einkauf, Operations oder Projektverantwortliche.",
  },
  {
    q: "Ist Rocketree Rechtsberatung?",
    a: "Nein. Rocketree hilft bei Einordnung, Lernen und Anwendung. Rechtliche Bewertung muss bei Bedarf separat erfolgen.",
  },
  {
    q: "Was passiert nach den 90 Tagen?",
    a: "Einzelne Personen können Rocketree weiter nutzen. Später können Teams oder weitere Bereiche eingebunden werden.",
  },
  {
    q: "Warum kostet der Einstieg 490 €?",
    a: "Der Einstieg soll leicht entscheidbar sein, aber verbindlich bleiben. Es ist kein kostenloser Test, sondern ein klar begrenzter Einstieg in die Arbeit mit Rocketree.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faqsec section-pad" id="faq">
      <div className="wrap">
        <div className="section-head center reveal">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Häufige Fragen
          </div>
          <h2>Was Organisationen vor dem Einstieg fragen.</h2>
        </div>
        <div className="faq reveal d1">
          {ITEMS.map((item, i) => (
            <FaqItem
              key={item.q}
              {...item}
              isOpen={open === i}
              onToggle={() => setOpen((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const inner = useRef<HTMLDivElement>(null);
  return (
    <div className={`faq-item${isOpen ? " open" : ""}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={isOpen}>
        {q}
        <span className="faq-icon">
          <PlusIcon />
        </span>
      </button>
      <div
        className="faq-a"
        style={{ maxHeight: isOpen ? inner.current?.scrollHeight ?? 400 : 0 }}
      >
        <div className="faq-a-inner" ref={inner}>
          {a}
        </div>
      </div>
    </div>
  );
}
