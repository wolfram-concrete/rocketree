import { ChevronIcon } from "@/components/icons";

interface Stage {
  start?: boolean;
  badge?: string;
  step: string;
  title: string;
  text: string;
  price?: string;
}

const STAGES: Stage[] = [
  {
    start: true,
    badge: "Start",
    step: "Schritt 0",
    title: "90-Tage-Einstieg",
    text: "3–5 Personen an einem konkreten Anlass. Der bewusst kleine erste Schritt.",
  },
  {
    step: "Schritt 1",
    title: "Einzelpersonen",
    text: "Menschen, die ESG erklären und weitertragen müssen, nutzen Rocketree dauerhaft über das Solo-Abo.",
    price: "29 € / Monat · 249 € / Jahr",
  },
  {
    step: "Schritt 2",
    title: "Teams",
    text: "Mehrere Rollen oder Abteilungen arbeiten mit gemeinsamen Lernpfaden, Austausch und Q&A.",
  },
  {
    step: "Schritt 3",
    title: "Organisation",
    text: "ESG wird nicht nur bei Einzelnen gehalten, sondern breiter im Unternehmen nutzbar gemacht.",
  },
  {
    step: "Schritt 4",
    title: "Supply Chain",
    text: "Später können auch Anforderungen einbezogen werden, die über das eigene Unternehmen hinausgehen.",
  },
];

export default function Longterm() {
  return (
    <section className="longterm section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="step">06</span> Wie geht es danach weiter?
          </div>
          <h2>Rocketree wächst mit dem Bedarf im Unternehmen.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Der 90-Tage-Einstieg schafft eine erste gemeinsame Grundlage. Danach kann Rocketree weiter
            genutzt werden: von einzelnen Personen, von Teams oder später breiter in der Organisation.
            So wird aus dem ersten Anlass keine einmalige Maßnahme, sondern der Beginn einer
            Arbeitsweise, mit der ESG im Unternehmen verständlicher, teilbarer und langfristig besser
            bearbeitbar wird.
          </p>
        </div>

        <div className="roadmap-wrap reveal d1">
          <div className="roadmap">
            {STAGES.map((s, i) => (
              <div key={s.step} className={`rm-stage${s.start ? " start" : ""}`}>
                {s.badge && <span className="rm-badge">{s.badge}</span>}
                <div className="rm-step">
                  <span className="rd" />
                  {s.step}
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {s.price && <span className="rm-price">{s.price}</span>}
                {i < STAGES.length - 1 && (
                  <div className="rm-connect">
                    <ChevronIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
