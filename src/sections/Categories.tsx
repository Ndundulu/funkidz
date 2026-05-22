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
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-wide">
                        Sustainably made best-sellers
                    </h2>
                </div>

                {/* Mobile layout: Horizontal flex row. Desktop layout: 4-column grid */}
                <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-4 gap-x-5 gap-y-12 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[78vw] sm:min-w-[45vw] md:min-w-0 flex flex-col bg-white snap-start"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-gray-100 mb-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />

                                {/* Badges (Top Left) */}
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-1 z-10">
                                    {product.badges.map((badge, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[9px] md:text-[10px] font-bold tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 uppercase bg-white text-gray-700 border border-gray-100 shadow-sm"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>

                                {/* Heart Icon (Top Right) */}
                                <button className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black z-10 transition-colors shadow-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Product Metadata */}
                            <div className="text-center flex flex-col items-center flex-grow">
                                <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 tracking-tight">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-normal">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Shop All Button */}
                <div className="text-center mt-16 md:mt-20">
                    <a
                        href="#shop-all"
                        className="inline-block text-sm font-medium uppercase tracking-widest text-black border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                    >
                        Shop All
                    </a>
                </div>

            </div>
        </section>
    );
}