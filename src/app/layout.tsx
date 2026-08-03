import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { deDE } from "@clerk/localizations";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CDU Zornheim",
  description:
    "Ortsverband CDU Zornheim – Neuigkeiten, Termine und Mitmachen vor Ort.",
  icons: {
    icon: [{ url: "/images/wappen-zornheim.png", type: "image/png" }],
    apple: [{ url: "/images/wappen-zornheim.png", type: "image/png" }],
  },
  openGraph: {
    title: "CDU Zornheim",
    description: "Neuigkeiten und Termine aus dem Ortsverband Zornheim.",
    locale: "de_DE",
  },
};

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const body = (
    <html lang="de" className={`${inter.variable} ${ibmPlexSerif.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );

  if (!hasClerk) {
    return body;
  }

  return <ClerkProvider localization={deDE}>{body}</ClerkProvider>;
}
