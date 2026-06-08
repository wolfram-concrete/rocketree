import Image from "next/image";
import { HeroNet } from "@/lib/viz";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow reveal">
            <span className="ey-line" /> Lern- &amp; Austauschplattform für ESG
          </div>
          <h1 className="reveal d1">
            ESG verstehen.
            <br />
            Im Alltag anwenden.
            <br />
            <span className="accent">Im Unternehmen verankern.</span>
          </h1>
          <p className="subline reveal d2">
            Rocketree ist eine Lern- und Austauschplattform für Organisationen, die ESG nicht nur
            nachlesen, sondern im Arbeitsalltag sicherer einordnen, erklären und anwenden wollen.
          </p>
          <div className="entry-hint reveal d2">
            <span className="mark">
              <Image
                src="/assets/Rocketree-Bildmarke.png"
                alt=""
                width={383}
                height={557}
                style={{ width: "18px", height: "auto" }}
              />
            </span>
            <p>
              Der Einstieg beginnt mit 90 Tagen Rocketree: 3–5 Personen arbeiten an einer aktuellen
              ESG-Herausforderung aus eurem Unternehmen.
            </p>
          </div>
          <div className="factrow reveal d3">
            <span className="fact-chip">
              <span className="dot" />
              90 Tage
            </span>
            <span className="fact-chip">
              <span className="dot" />
              3–5 Personen
            </span>
            <span className="fact-chip accent">
              <span className="dot" />
              490 € einmalig
            </span>
          </div>
          <div className="hero-cta reveal d3">
            <a className="btn btn-primary btn-lg" href="#anfragen">
              Einstieg anfragen <span className="arr">→</span>
            </a>
            <a className="text-link" href="#ablauf">
              Wie der Einstieg funktioniert →
            </a>
          </div>
        </div>

        <div className="hero-visual reveal d2">
          <div
            className="hero-graph"
            aria-label="ESG-Themen verbinden sich zu gemeinsamem Verständnis und Handlungsfähigkeit"
          >
            <HeroNet />
          </div>
          <div className="hero-graph-badge">
            <div className="ring">
              <svg width="38" height="38" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e7f1e6" strokeWidth="4" />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#009048"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="100.5"
                  strokeDashoffset="34"
                />
              </svg>
              <span className="num">90</span>
            </div>
            <div className="bt">
              <b>Tage Einstieg</b>3 Phasen · 1 Anlass
            </div>
          </div>
          <div className="hero-graph-legend">
            <span>
              <span className="lg" style={{ background: "#fff", border: "1px solid #dde8da" }} />
              ESG-Themen
            </span>
            <span>
              <span className="lg" style={{ background: "#0f2e1f" }} />
              Gemeinsames Verständnis
            </span>
            <span>
              <span className="lg" style={{ background: "#3f8f57" }} />
              Handlungsfähigkeit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
