import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TradeInProvider } from "@/context/TradeInContext";
import Navbar from "@/components/Navbar";

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
            suppressHydrationWarning={true}
        >
        {/* GLOBAL NAVIGATION BAR */}
        <Navbar />

        {/* APP CONTEXTS & PAGE CONTENTS */}
        <TradeInProvider>
            {children}
        </TradeInProvider>

        {/* GLOBAL FLOATING CHAT BUTTON */}
        <div className="fixed bottom-4 right-4 z-40">
            <a
                href="https://wa.me/254740437298?text=Hi%20Funkidz!%20I%20have%20a%20question%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222] text-white text-xs tracking-wider px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-neutral-800 transition-all cursor-pointer no-underline"
            >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Have a question?
            </a>
        </div>
        </body>
        </html>
    );
}