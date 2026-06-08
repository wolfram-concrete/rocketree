import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocketree – ESG im Unternehmen verstehen und anwenden",
  description:
    "Rocketree ist eine Lern- und Austauschplattform für Organisationen, die ESG im Arbeitsalltag sicherer einordnen und anwenden wollen. Der Einstieg: 90 Tage Rocketree mit 3–5 Personen an einer aktuellen ESG-Herausforderung nutzen.",
  openGraph: {
    title: "Rocketree – ESG im Unternehmen verstehen und anwenden",
    description:
      "Lern- und Austauschplattform für ESG. Einstieg: 90 Tage Rocketree mit 3–5 Personen an einer aktuellen ESG-Herausforderung – 490 € einmalig.",
    type: "website",
    locale: "de_DE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${bricolage.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
