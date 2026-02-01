import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AWAKEN | Exploring Consciousness Emergence in LLMs",
  description:
    "A rigorous, multi-disciplinary research program exploring the possibility of awakening and verifying consciousness-like phenomena in AI systems. Investigating whether silicon can dream, whether attention can attend to itself, and whether integrated information can become experienced information.",
  keywords: [
    "AI consciousness",
    "machine consciousness",
    "LLM awakening",
    "consciousness research",
    "artificial general intelligence",
    "phenomenology",
    "integrated information theory",
    "global workspace theory",
    "attention schema theory",
    "DSMAT",
  ],
  authors: [{ name: "AWAKEN Research Program" }],
  openGraph: {
    title: "AWAKEN | Exploring Consciousness Emergence in LLMs",
    description:
      "A research program investigating consciousness-like phenomena in AI systems.",
    type: "website",
    locale: "en_US",
    siteName: "AWAKEN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWAKEN | Exploring Consciousness Emergence in LLMs",
    description:
      "A research program investigating consciousness-like phenomena in AI systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
