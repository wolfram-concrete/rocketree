import { TangleArrow } from "@/lib/viz";

export default function FinalCta() {
  return (
    <section className="final section-pad" id="anfragen">
      <div className="wrap">
        <div className="eyebrow reveal" style={{ justifyContent: "center", color: "var(--lime)" }}>
          <span className="ey-line" style={{ background: "var(--lime)" }} /> Einstieg anfragen
        </div>
        <h2 className="reveal d1">Startet mit 90 Tagen Rocketree.</h2>
        <p className="reveal d1">
          Arbeitet mit 3–5 Personen an eurer aktuellen ESG-Herausforderung.
        </p>
        <div className="final-viz reveal d2" aria-hidden="true">
          <TangleArrow stroke="#cfe6a6" />
        </div>
        <p className="fnote reveal d2" style={{ marginTop: -14, marginBottom: 26 }}>
          Je früher ihr einsteigt, desto weniger kostet Unklarheit – und desto mehr schafft ihr
          internen Wert.
        </p>
        <div className="ffacts reveal d2">
          <span>90 Tage</span>
          <span className="fdot" />
          <span>3–5 Personen</span>
          <span className="fdot" />
          <span>490 € einmalig</span>
        </div>
        <div className="reveal d2">
          <a className="btn btn-white btn-lg" href="#kontakt">
            Einstieg anfragen <span className="arr">→</span>
          </a>
        </div>
        <p className="fnote reveal d3">
          Wir klären gemeinsam, ob eure aktuelle ESG-Herausforderung für den Einstieg geeignet ist.
        </p>
        <div className="fstrip reveal d3">
          <span>Lernen</span>
          <span>Anwenden</span>
          <span>Austausch</span>
          <span>Weiterarbeiten</span>
        </div>
      </div>
    </section>
  );
}
