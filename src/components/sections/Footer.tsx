import Image from "next/image";

export default function Footer() {
  return (
    <footer className="foot" id="kontakt">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Image
              src="/assets/Rocketree-Logo-white.png"
              alt="Rocketree"
              width={1669}
              height={557}
              style={{ width: "auto", height: "30px" }}
            />
            <p className="ftag">
              Lern- und Austauschplattform für Organisationen, die ESG im Arbeitsalltag verstehen,
              anwenden und teilbar machen wollen.
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Plattform</h4>
              <a href="#was">Was ist Rocketree</a>
              <a href="#einstieg">Einstieg</a>
              <a href="#ablauf">Ablauf</a>
              <a href="#fuerwen">Für wen</a>
            </div>
            <div className="foot-col">
              <h4>Mehr</h4>
              <a href="#faq">FAQ</a>
              <a href="#anfragen">Einstieg anfragen</a>
              <a href="#kontakt">Kontakt</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Rocketree</span>
          <span>Impressum · Datenschutz</span>
        </div>
      </div>
    </footer>
  );
}
