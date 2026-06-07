import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeFlow — Premium Typing Speed Practice",
  description:
    "A futuristic typing speed practice platform with real-time WPM tracking, accuracy analytics, performance insights, and beautiful animations. No login required.",
  keywords: ["typing test", "WPM", "typing practice", "speed typing", "keyboard"],
  authors: [{ name: "TypeFlow" }],
  openGraph: {
    title: "TypeFlow — Premium Typing Speed Practice",
    description: "Practice typing with real-time analytics and premium UI",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
