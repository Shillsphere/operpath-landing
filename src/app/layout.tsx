import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OperPath — AI Workflow Automation",
  description:
    "AI agents that take over manual data entry in your business software. Shipment receiving, invoices, purchase orders — automated.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "OperPath — AI Workflow Automation",
    description:
      "AI agents that take over manual data entry in your business software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
