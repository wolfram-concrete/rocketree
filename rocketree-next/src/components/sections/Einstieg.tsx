import { CheckIcon } from "@/components/icons";
import { MindMap } from "@/lib/viz";

const ANLASS = [
  "Eine Kundenanfrage",
  "Eine Audit-Frage",
  "Eine Lieferkettenanforderung",
  "Unklare Zuständigkeiten",
  "Ein Thema, das intern immer wieder hängen bleibt",
];

const OFFER_LIST = [
  "Einstieg in eure aktuelle ESG-Herausforderung",
  "Zugang zu passenden Lernpfaden",
  "Austausch in der Community",
  "Monatliches Gruppen-Q&A",
  "Gemeinsame Einordnung eures konkreten Anlasses",
  "Ergebnisse, die intern weitergegeben werden können",
];

export default function Einstieg() {
  return (
    <section className="einstieg section-pad" id="einstieg">
      <div className="wrap einstieg-grid">
        <div className="einstieg-copy reveal">
          <div className="eyebrow">
            <span className="step">03</span> Wie funktioniert das?
          </div>
          <h2>Der Einstieg: 90 Tage Rocketree nutzen.</h2>
          <p className="lede">
            Ihr startet mit einer aktuellen ESG-Herausforderung aus eurem Unternehmen. Mit Rocketree
            ordnet ihr diese Herausforderung ein, arbeitet gemeinsam daran und schafft eine erste
            Grundlage für die weitere ESG-Arbeit.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "var(--muted)",
              marginBottom: 14,
              fontWeight: 600,
              letterSpacing: ".02em",
            }}
          >
            Das kann sein:
          </p>
          <div className="anlass-chips">
            {ANLASS.map((a) => (
              <span key={a} className="ac">
                {a}
              </span>
            ))}
          </div>
        </div>

        <aside className="offer reveal d1">
          <div className="o-eyebrow">90 Tage Rocketree</div>
          <h3>Für 3–5 Personen aus eurer Organisation.</h3>
          <div className="offer-facts">
            <div className="of">
              <b>90</b>
              <span>Tage</span>
            </div>
            <div className="of">
              <b>3–5</b>
              <span>Personen</span>
            </div>
            <div className="of">
              <b>490 €</b>
              <span>einmalig</span>
            </div>
          </div>
          <ul className="offer-list">
            {OFFER_LIST.map((li) => (
              <li key={li}>
                <span className="check">
                  <CheckIcon />
                </span>
                {li}
              </li>
            ))}
          </ul>
          <div className="offer-price">
            <span className="pv">490 €</span>
            <span className="pl">einmalig · kein Abo</span>
          </div>
          <a className="btn btn-primary btn-lg" href="#anfragen">
            Einstieg anfragen <span className="arr">→</span>
          </a>
        </aside>
      </div>

      <div className="wrap mindmap-band reveal">
        <div className="mindmap-head">
          <span className="mh-tag">
            <span className="sq" />
            So sieht ein Arbeitsbereich aus
          </span>
          <p>
            Eine ESG-Herausforderung wird in ihre Bestandteile zerlegt – sichtbar, teilbar,
            bearbeitbar.
          </p>
        </div>
        <div
          className="mindmap-wrap"
          aria-label="Mind-Map einer ESG-Herausforderung mit verbundenen Teilthemen"
        >
          <MindMap />
        </div>
      </div>
    </section>
  );
}
