import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { deDE } from "@clerk/localizations";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
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
    <html lang="de" className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );

  if (!hasClerk) {
    return body;
  }

  return <ClerkProvider localization={deDE}>{body}</ClerkProvider>;
}
