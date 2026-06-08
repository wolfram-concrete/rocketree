import Image from "next/image";
import { CalendarIcon, MailIcon, LinkedInIcon } from "@/components/icons";

interface Founder {
  photo: string;
  objectPosition?: string;
  role: string;
  name: string;
  bio: string;
  mailSubject: string;
  linkedin: string;
}

const FOUNDERS: Founder[] = [
  {
    photo: "/assets/founder-boonrat.png",
    objectPosition: "72% 18%",
    role: "Strategy & Product Lead",
    name: "Boonrat Swasdio Sievert",
    bio: "Boonrat verantwortet das Was und Warum von Rocketree. Sie verbindet Produktdesign, KI und echten Nutzen – und sorgt dafür, dass wir das Richtige bauen: auf die richtige Weise, für die richtigen Menschen.",
    mailSubject: "Rocketree%20Einstieg%20%E2%80%93%20Anfrage%20an%20Boonrat",
    linkedin: "https://www.linkedin.com/in/boonratswasdio/",
  },
  {
    photo: "/assets/founder-sunshine.png",
    role: "Operations & Sales Lead",
    name: "Sunshine Lampert",
    bio: "Sunshine macht aus großen Ideen funktionierende Abläufe. Sie führt alles, was Rocketree am Laufen hält – von Team und Partnern bis zu Piloten – und verbindet Vision, Umsetzung und Wachstum.",
    mailSubject: "Rocketree%20Einstieg%20%E2%80%93%20Anfrage%20an%20Sunshine",
    linkedin: "https://www.linkedin.com/in/sunshinelampert/",
  },
];

const BOOKING_URL = "https://cal.com/rocketree";

export default function Team() {
  return (
    <section className="team section-pad" id="team">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Eure Ansprechpartnerinnen</div>
          <h2>Sprecht direkt mit den Gründerinnen.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Rocketree ist für uns mehr als ein Produkt – Nachhaltigkeit ist Kultur, nicht Häkchen.
            Wenn ihr über euren Einstieg sprechen wollt, meldet euch direkt bei uns. Persönlich, ohne
            Umweg.
          </p>
        </div>
        <div className="team-grid">
          {FOUNDERS.map((f, i) => (
            <article key={f.name} className={`persona reveal${i === 1 ? " d1" : ""}`}>
              <div className="persona-photo">
                <Image
                  src={f.photo}
                  alt={f.name}
                  fill
                  loading="lazy"
                  sizes="(min-width: 860px) 200px, 100vw"
                  style={f.objectPosition ? { objectPosition: f.objectPosition } : undefined}
                />
              </div>
              <div className="persona-body">
                <div className="persona-role">{f.role}</div>
                <h3>{f.name}</h3>
                <p className="persona-bio">{f.bio}</p>
                <div className="persona-actions">
                  <a
                    className="btn btn-primary btn-sm"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener"
                  >
                    <CalendarIcon />
                    Termin buchen
                  </a>
                  <a
                    className="btn btn-ghost btn-sm"
                    href={`mailto:hello@rocketree.eu?subject=${f.mailSubject}`}
                  >
                    <MailIcon />
                    E-Mail
                  </a>
                  <a
                    className="btn-icon"
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${f.name.split(" ")[0]} auf LinkedIn`}
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
