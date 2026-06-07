import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteName = "TypeFlow";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteOrigin = new URL(siteUrl);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: {
    default: "TypeFlow — Premium Typing Speed Practice",
    template: "%s | TypeFlow",
  },
  description:
    "TypeFlow is a premium typing practice app for developers, with real-time WPM tracking, accuracy analytics, performance insights, and polished UI. Built by Salek Masud Parvez.",
  keywords: [
    "typing test",
    "WPM",
    "typing practice",
    "speed typing",
    "developer typing",
    "programmer practice",
    "keyboard skills",
  ],
  authors: [{ name: "Salek Masud Parvez", url: "mailto:salekmasudparvez@gmail.com" }],
  creator: "Salek Masud Parvez",
  publisher: "Salek Masud Parvez",
  applicationName: siteName,
  category: "productivity",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "TypeFlow — Premium Typing Speed Practice",
    description:
      "Practice typing with real-time analytics, developer-focused prompts, and a polished performance dashboard.",
    type: "website",
    siteName,
    url: "/",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "TypeFlow typing practice preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeFlow — Premium Typing Speed Practice",
    description:
      "Practice typing with real-time analytics, developer-focused prompts, and a polished performance dashboard.",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070d" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: siteName,
              url: siteUrl,
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web",
              description:
                "A premium typing practice web application with live WPM and accuracy analytics.",
              author: {
                "@type": "Person",
                name: "Salek Masud Parvez",
                email: "salekmasudparvez@gmail.com",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
