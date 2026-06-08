const CARDS = [
  {
    label: "Rechtsberatung",
    text: "Rocketree hilft bei Orientierung und Anwendung. Rechtliche Prüfung bleibt Aufgabe spezialisierter Beratung.",
    delay: "",
  },
  {
    label: "Reporting-Tool",
    text: "Rocketree ersetzt keine ESG-Software. Es schafft die Grundlage, damit Anforderungen besser verstanden und eingeordnet werden.",
    delay: "d1",
  },
  {
    label: "Onlinekurs",
    text: "Kein allgemeiner Onlinekurs: Ihr arbeitet mit Rocketree an einem realen Anlass aus eurem Unternehmen.",
    delay: "d2",
  },
  {
    label: "Outsourcing",
    text: "Verantwortung bleibt im Unternehmen. Rocketree hilft, sie besser zu teilen.",
    delay: "d3",
  },
];

export default function Clarify() {
  return (
    <section className="clarify section-pad">
      <div className="wrap">
        <div className="clarify-top">
          <div className="reveal">
            <div className="eyebrow">Einordnung</div>
            <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>
              Wann Rocketree der richtige Einstieg ist.
            </h2>
          </div>
          <p className="lede reveal d1">
            Rocketree ist sinnvoll, wenn ESG im Unternehmen bereits Druck erzeugt, aber noch keine
            gemeinsame Anwendung entstanden ist. Es geht nicht darum, alle Fragen sofort abschließend
            zu beantworten – sondern eine aktuelle Herausforderung so zu bearbeiten, dass mehrere
            Menschen sie verstehen, einordnen und intern besser weitertragen können.
          </p>
        </div>
        <div className="grid-4">
          {CARDS.map((c) => (
            <article key={c.label} className={`card reveal${c.delay ? " " + c.delay : ""}`}>
              <h3>
                <span className="nope">kein</span> {c.label}
              </h3>
              <p className="ctext" style={{ marginTop: 10 }}>
                {c.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
