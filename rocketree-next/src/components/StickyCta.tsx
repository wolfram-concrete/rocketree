"use client";

import { useEffect, useState } from "react";

/** Mobile-only sticky CTA that appears after ~70% of the first viewport. */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      setShow(st > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta${show ? " show" : ""}`}>
      <a className="btn btn-primary" href="#anfragen">
        Einstieg anfragen · 490 €
      </a>
    </div>
  );
}
