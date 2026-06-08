"use client";

import { useEffect, useRef, useState } from "react";
import { PhaseScatter, PhaseNetwork, PhaseRings } from "@/lib/viz";
import { CheckIcon } from "@/components/icons";

const PHASES = [
  {
    n: 1,
    viz: <PhaseScatter />,
    month: "Monat 1",
    verb: "Einordnen",
    text: "Ihr klärt, worum es bei eurer ESG-Herausforderung wirklich geht: relevante Begriffe, Anforderungen, Rollen, Risiken und offene Fragen.",
  },
  {
    n: 2,
    viz: <PhaseNetwork />,
    month: "Monat 2",
    verb: "Anwenden",
    text: "Ihr arbeitet an eurem konkreten Anlass. Dabei nutzt ihr passende Lernpfade, Austausch und Q&A, statt die Frage allein zu bearbeiten.",
  },
  {
    n: 3,
    viz: <PhaseRings />,
    month: "Monat 3",
    verb: "Weitergeben",
    text: "Ihr haltet fest, was daraus für euer Unternehmen folgt: gemeinsame Sprache, nächste Schritte, interne Argumente und eine bessere Grundlage für ähnliche Situationen.",
  },
];

const OUTPUT = [
  "worum es bei eurer ESG-Herausforderung geht",
  "welche Anforderungen und Begriffe relevant sind",
  "wer im Unternehmen mitdenken sollte",
  "wie ihr intern über das Thema sprecht",
  "welche nächsten Schritte sinnvoll sind",
  "wie Rocketree weiter genutzt werden kann",
];

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const [on, setOn] = useState([false, false, false]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = () => {
      setAnimate(true);
      if (reduce) {
        setOn([true, true, true]);
        return;
      }
      PHASES.forEach((_, i) => {
        setTimeout(() => {
          setOn((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 250 + i * 320);
      });
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            obs.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -35% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="journey section-pad"
      id="ablauf"
      data-mode="timeline"
      data-animate={animate ? "in" : undefined}
    >
      <div className="wrap">
        <div className="journey-head">
          <div className="reveal">
            <div className="eyebrow">
              <span className="step">04</span> Was passiert in den 90 Tagen?
            </div>
            <h2>Was in den 90 Tagen passiert.</h2>
          </div>
          <p className="lede reveal d1" style={{ maxWidth: "42ch" }}>
            Drei Phasen, ein konkreter Anlass. Der Einstieg ist nicht vage – ihr wisst von Anfang an,
            woran ihr arbeitet.
          </p>
        </div>

        <div className="journey-body">
          <div className="journey-left">
            <div className="timeline">
              <div className="tl-track">
                <span className="tl-fill" style={{ width: animate ? "100%" : 0 }} />
              </div>
              <div className="tl-phases">
                {PHASES.map((p, i) => (
                  <div key={p.n} className={`tl-phase${on[i] ? " on" : ""}`} data-phase={p.n}>
                    <div className="tl-node">{p.n}</div>
                    <div className="tl-viz">{p.viz}</div>
                    <div className="tl-month">{p.month}</div>
                    <div className="tl-verb">{p.verb}</div>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="output reveal d2">
            <div className="o-tag">
              <span className="sq" />
              Output nach 90 Tagen
            </div>
            <h3>Was danach klarer sein sollte</h3>
            <ul>
              {OUTPUT.map((o) => (
                <li key={o}>
                  <span className="oc">
                    <CheckIcon />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
            <div className="out-timeline" aria-hidden="true">
              <span className="ot-node">
                90
                <br />
                TAGE
              </span>
              <span className="ot-line" />
              <span className="ot-dot soft" />
              <span className="ot-line" />
              <span className="ot-dot soft" />
              <span className="ot-line" />
              <span className="ot-dot" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
