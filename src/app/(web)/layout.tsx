import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marius - Latest activity",
  description: "My latest activity gathered from a diverse set of APIs",
  manifest: "/manifest.json",
  icons: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png", "/favicon-192x192.png", "/favicon-256x256.png"],
};

const pacifico = Pacifico({
  display: "swap",
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pacifico.variable}>
      <body>{children}</body>
    </html>
  );
}
