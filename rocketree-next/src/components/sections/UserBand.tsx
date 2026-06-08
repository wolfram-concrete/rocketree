import Image from "next/image";

export interface UserBandProps {
  variant: "cream" | "wash" | "dark";
  right?: boolean;
  image: { src: string; alt: string; objectPosition?: string };
  chip: { title: string; sub: string };
  heading: string;
  body: string;
  foot: string;
}

const VARIANT_CLASS: Record<UserBandProps["variant"], string> = {
  cream: "ub-cream",
  wash: "ub-wash",
  dark: "ub-dark",
};

export default function UserBand({ variant, right, image, chip, heading, body, foot }: UserBandProps) {
  return (
    <section className={`user-band ${VARIANT_CLASS[variant]}${right ? " ub-right" : ""}`}>
      <div className="wrap ub-inner">
        <figure className="ub-figure reveal">
          <span className="ub-leaf" />
          <span className="ub-ring" />
          <Image
            className="ub-img"
            src={image.src}
            alt={image.alt}
            width={440}
            height={550}
            loading="lazy"
            sizes="(min-width: 860px) 440px, 90vw"
            style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
          />
          <figcaption className="ub-cap">
            <span className="ub-mk">
              <Image
                src="/assets/Rocketree-Bildmarke.png"
                alt=""
                width={383}
                height={557}
                style={{ width: "17px", height: "auto" }}
              />
            </span>
            <span>
              <b>{chip.title}</b>
              <span>{chip.sub}</span>
            </span>
          </figcaption>
        </figure>
        <div className="ub-text reveal d1">
          <div className="eyebrow">
            <span className="ey-line" /> Repräsentative Nutzer:innen
          </div>
          <h2>{heading}</h2>
          <p>{body}</p>
          <span className="ub-foot">
            <span className="ub-line" /> {foot}
          </span>
        </div>
      </div>
    </section>
  );
}
