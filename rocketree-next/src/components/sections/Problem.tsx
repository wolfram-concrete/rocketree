const CARDS = [
  {
    n: "01",
    title: "Eine Anfrage kommt rein",
    text: "Ein Kunde, Auditor oder Partner stellt eine ESG-Frage. Intern ist nicht sofort klar, wer antwortet und auf welcher Grundlage.",
    delay: "",
  },
  {
    n: "02",
    title: "Wissen liegt bei wenigen",
    text: "Eine Person sammelt Informationen, aber das Unternehmen wird dadurch nicht automatisch sicherer.",
    delay: "d1",
  },
  {
    n: "03",
    title: "Begriffe werden unterschiedlich verstanden",
    text: "Management, HR, Einkauf und Operations sprechen über ESG, aber nicht immer mit derselben Bedeutung.",
    delay: "d1",
  },
  {
    n: "04",
    title: "Entscheidungen bleiben reaktiv",
    text: "Neue Anforderungen lösen Abstimmungen und Unsicherheit aus. Beim nächsten Thema beginnt vieles wieder von vorn.",
    delay: "d2",
  },
];

export default function Problem() {
  return (
    <section className="problem section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="step">02</span> Warum braucht es das?
          </div>
          <h2>Wenn ESG an Einzelnen hängen bleibt, wird Unsicherheit zum Risiko.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Viele Organisationen haben Zugang zu ESG-Wissen. Schwierig wird es, wenn eine konkrete
            Frage im Unternehmen landet: Wer ordnet sie ein? Welche Anforderungen sind relevant? Was
            lässt sich intern vertreten? Und wer trägt die Entscheidung mit?
          </p>
        </div>

        <div className="grid-2">
          {CARDS.map((c) => (
            <article key={c.n} className={`card prob-card reveal${c.delay ? " " + c.delay : ""}`}>
              <div className="pmark">
                <span className="pn">{c.n}</span>
                <span className="pbar" />
              </div>
              <h3>{c.title}</h3>
              <p className="ctext">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
