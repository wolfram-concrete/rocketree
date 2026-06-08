"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#was", label: "Was ist Rocketree" },
  { href: "#einstieg", label: "Einstieg" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#fuerwen", label: "Für wen" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

const SPY_IDS = ["was", "einstieg", "ablauf", "fuerwen", "team", "faq", "anfragen"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const progressRef = useRef<HTMLDivElement>(null);

  // scroll progress bar + sticky-nav state
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (st / h) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = pct + "%";
      setScrolled(st > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SPY_IDS.forEach((id) => {
      const s = document.getElementById(id);
      if (s) spy.observe(s);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <>
      <div id="progress" ref={progressRef} />
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Rocketree">
            <Image
              src="/assets/Rocketree-Logo.png"
              alt="Rocketree"
              width={1669}
              height={557}
              priority
              style={{ width: "auto", height: "34px" }}
            />
          </a>
          <nav className="nav-links" aria-label="Hauptnavigation">
            {LINKS.map((l) => (
              <a
                key={l.href}
                className={`nav-link${active === l.href.slice(1) ? " active" : ""}`}
                href={l.href}
              >
                {l.label}
              </a>
            ))}
            <a className="btn btn-primary btn-sm nav-cta" href="#anfragen">
              Einstieg anfragen
            </a>
          </nav>
          <button
            className="btn btn-ghost btn-sm nav-toggle"
            aria-label="Menü"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            Menü
          </button>
        </div>
        <div className="mobile-menu" hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
          {LINKS.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-primary" href="#anfragen">
            Einstieg anfragen
          </a>
        </div>
      </header>
    </>
  );
}
