import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TradeInProvider } from "@/context/TradeInContext";   // ← Add this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Funkidz - Baby & Kids Furniture",
  description: "Trade-in your old items and upgrade to new ones",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body
            className="min-h-full flex flex-col"
            suppressHydrationWarning={true}   // ← Add this
        >
        <TradeInProvider>
            {children}
        </TradeInProvider>
        </body>
        </html>
    );
}