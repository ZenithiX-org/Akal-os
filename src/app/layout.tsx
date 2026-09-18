import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akal OS 1.0 - Browser Operating System",
  description: "A premium macOS-style desktop environment that runs entirely in your browser.",
  keywords: ["Akal OS", "browser OS", "desktop", "macOS", "web desktop"],
  authors: [{ name: "Akal OS" }],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
