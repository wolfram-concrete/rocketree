import Nav from "@/components/Nav";
import StickyCta from "@/components/StickyCta";
import RevealManager from "@/components/RevealManager";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Problem from "@/components/sections/Problem";
import UserBand from "@/components/sections/UserBand";
import Einstieg from "@/components/sections/Einstieg";
import Journey from "@/components/sections/Journey";
import Fit from "@/components/sections/Fit";
import Clarify from "@/components/sections/Clarify";
import Longterm from "@/components/sections/Longterm";
import Faq from "@/components/sections/Faq";
import Team from "@/components/sections/Team";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Problem />

        <UserBand
          variant="cream"
          image={{
            src: "/assets/user-thoughtful.jpg",
            alt: "Repräsentative Nutzerin von Rocketree",
            objectPosition: "center 16%",
          }}
          chip={{ title: "Nachhaltigkeit", sub: "Produzierendes Gewerbe" }}
          heading="Meistens trägt eine Person die ESG-Fragen – und damit das Risiko."
          body="Genau hier setzt Rocketree an: Aus dem Wissen einer einzelnen Person wird eine gemeinsame Grundlage, die das Unternehmen mitträgt."
          foot="Aus Einzelwissen wird gemeinsame Sprache"
        />

        <Einstieg />

        <UserBand
          variant="wash"
          right
          image={{
            src: "/assets/user-warm.png",
            alt: "Repräsentative Nutzerin von Rocketree",
            objectPosition: "center 14%",
          }}
          chip={{ title: "HR & Operations", sub: "Dienstleistung" }}
          heading="Gemeinsam an einem echten Anlass – statt allein im Tool."
          body="In den 90 Tagen arbeiten 3–5 Menschen aus eurer Organisation an derselben Frage. Unterschiedliche Rollen, eine gemeinsame Sprache."
          foot="3–5 Personen · ein gemeinsamer Anlass"
        />

        <Journey />
        <Fit />

        <UserBand
          variant="dark"
          image={{
            src: "/assets/user-lead.png",
            alt: "Repräsentativer Nutzer von Rocketree",
            objectPosition: "center 16%",
          }}
          chip={{ title: "Geschäftsführung", sub: "Mittelstand" }}
          heading="Für die, die ESG erklären und mittragen sollen – nicht nur verwalten."
          body="Ob Geschäftsführung, Einkauf oder Projektleitung: Rocketree macht ESG für die Menschen anschlussfähig, die Entscheidungen treffen und vertreten müssen."
          foot="ESG, das mehrere mittragen"
        />

        <Clarify />
        <Longterm />
        <Faq />
        <Team />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <RevealManager />
    </>
  );
}
