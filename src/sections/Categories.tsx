"use client";

import React from "react";

const products = [
    {
        id: 1,
        title: "Crib",
        price: "KSH 142,000",
        image: "/Crib.jpeg",
        badges: ["BEST SELLER"],
    },
    {
        id: 2,
        title: "Shelf",
        price: "KSH 112,000",
        image: "/Shelf.jpg",
        badges: ["BEST SELLER"],
    },
    {
        id: 3,
        title: "Change Unit",
        price: "KSH 52,920",
        image: "/changeunit.jpg",
        badges: ["FREE INSTALLATION", "BEST SELLER"],
    },
    {
        id: 4,
        title: "Perch Twin Bunk Bed",
        price: "KSH 286,000",
        image: "/loftbed.jpeg",
        badges: ["FREE INSTALLATION", "BEST SELLER"],
    },
];

export default function BestSellers() {
    return (
        <section className="w-full bg-white py-12 md:py-16 font-sans overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">

                {/* Section Title */}
                <div className="text-center mb-8 md:mb-14">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-wide">
                        Sustainably made best-sellers
                    </h2>
                </div>

                {/* Mobile layout: Trimmed card width to 64vw to reduce image size and mimic the screenshot's peek effect */}
                <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-4 gap-x-4 md:gap-x-5 gap-y-12 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[64vw] sm:min-w-[45vw] md:min-w-0 flex flex-col bg-white snap-start"
                        >
                            {/* Downscaled Image Container */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-gray-100 mb-3 md:mb-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />

                                {/* Ultra-minimalist Badges matching the mobile screenshot */}
                                <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 flex flex-col gap-1 z-10">
                                    {product.badges.map((badge, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[8px] md:text-[10px] tracking-wider px-1.5 py-0.5 uppercase bg-white text-gray-500 border border-gray-100/60 font-light"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>

                                {/* Light Heart Icon */}
                                <button className="absolute top-2.5 right-2.5 md:top-4 md:right-4 p-1.5 rounded-full bg-white/80 text-gray-700 z-10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className="w-4 h-4 md:w-5 md:h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Downscaled Metadata block */}
                            <div className="text-center flex flex-col items-center max-w-[90%] mx-auto">
                                <h3 className="text-xs md:text-base font-normal text-gray-800 mb-0.5 tracking-tight">
                                    {product.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 font-light">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Perfectly aligned Shop All Anchor */}
                <div className="text-center mt-10 md:mt-20">
                    <a
                        href="#shop-all"
                        className="inline-block text-xs md:text-sm font-medium uppercase tracking-widest text-black border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
                    >
                        Shop All
                    </a>
                </div>

            </div>
        </section>
    );
}