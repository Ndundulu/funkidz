"use client";

import React, { useState } from "react";
import TradeInPortal from "@/components/TradeInPortal";

export default function TradeInSection() {
    const [isPortalOpen, setIsPortalOpen] = useState(false);

    return (
        <>
            <section className="w-full bg-[#F5F2EB] font-sans">
                {/* Grid Container: Stacked on mobile, side-by-side on md screens and up */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-[1440px] mx-auto">

                    {/* Image Container */}
                    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-[#F5F2EB]">
                        <img
                            src="/Trade-in.png"
                            alt="Furniture Trade-In Program"
                            className="w-full h-auto max-h-[500px] md:max-h-full object-contain"
                            loading="lazy"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="text-center md:text-left px-6 py-12 sm:py-16 md:px-16 lg:px-24">

                        {/* Uppercase Small Label */}
                        <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-gray-800 mb-4">
                            Trade-In Program
                        </p>

                        {/* Main Headline */}
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#1A1A1A] leading-snug tracking-wide mb-5">
                            Out with the old, in with the growth. Give your furniture a second story.
                        </h2>

                        {/* Subtext Description */}
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 font-light leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
                            As your children grow, your space transitions too. Trade in your gently used setups for store credit towards their next milestone stage.
                        </p>

                        {/* Updated CTA Button */}
                        <div>
                            <button
                                onClick={() => setIsPortalOpen(true)}
                                className="inline-block bg-[#1A1A1A] text-white text-xs md:text-sm font-medium uppercase tracking-widest px-8 py-3.5 hover:bg-gray-800 transition-colors duration-300"
                            >
                                Trade-In Now
                            </button>
                        </div>

                    </div>

                </div>
            </section>

            {/* ==================== Trade-In Portal Modal ==================== */}
            {isPortalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-auto rounded-2xl shadow-2xl relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsPortalOpen(false)}
                            className="absolute top-6 right-6 text-4xl text-gray-400 hover:text-gray-600 z-10"
                        >
                            ×
                        </button>

                        <TradeInPortal />
                    </div>
                </div>
            )}
        </>
    );
}