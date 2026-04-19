import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OperPath — Production AI for Industrial Distributors",
  description:
    "Custom AI agents that take over the messy, nuance-heavy manual work buried inside your ERP. Shipment receiving, ship-date tracking, exception workflows — built around how your team actually operates.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "OperPath — Production AI for Industrial Distributors",
    description:
      "Custom AI agents that take over the messy, nuance-heavy manual work buried inside your ERP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
