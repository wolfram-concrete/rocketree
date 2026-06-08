import { CheckIcon, MinusIcon } from "@/components/icons";

const YES = [
  "ESG-Fragen regelmäßig bei wenigen Personen landen",
  "Kunden, Partner oder Auditoren konkrete Antworten erwarten",
  "im Unternehmen unterschiedliche Wissensstände bestehen",
  "ihr viele Informationen habt, aber wenig gemeinsame Anwendung",
  "mehrere Rollen ESG besser verstehen und mittragen sollen",
  "ihr mit einem konkreten Einstieg beginnen wollt",
];

const NO = [
  "ihr nur ein Zertifikat sucht",
  "ihr ESG komplett auslagern wollt",
  "ihr eine fertige Rechtsberatung erwartet",
  "intern niemand Zeit für Anwendung einplanen kann",
  "ihr nur allgemeine Informationen sammeln wollt",
];

export default function Fit() {
  return (
    <section className="fit section-pad" id="fuerwen">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="step">05</span> Ist das passend für uns?
          </div>
          <h2>Für Organisationen, die ESG nicht länger allein bei Einzelnen lassen wollen.</h2>
        </div>
        <div className="fit-grid">
          <div className="fit-col yes reveal">
            <div className="fh">
              <span className="fi">
                <CheckIcon />
              </span>
              <h3>Passt, wenn …</h3>
            </div>
            <ul className="fit-list">
              {YES.map((y) => (
                <li key={y}>
                  <span className="li">
                    <CheckIcon />
                  </span>
                  {y}
                </li>
              ))}
            </ul>
          </div>
          <div className="fit-col no reveal d1">
            <div className="fh">
              <span className="fi">
                <MinusIcon />
              </span>
              <h3>Passt eher nicht, wenn …</h3>
            </div>
            <ul className="fit-list">
              {NO.map((n) => (
                <li key={n}>
                  <span className="li">
                    <MinusIcon />
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
