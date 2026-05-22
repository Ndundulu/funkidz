"use client";

import React, { useState } from "react";

const products = [
    {
        id: 1,
        title: "Crib",
        price: "KSH 142,000",
        image: "/Crib.jpeg",
        badges: ["BEST SELLER"],
        colors: ["bg-[#C24126]", "bg-[#F5E6D3]"],
    },
    {
        id: 2,
        title: "Shelf",
        price: "KSH 112,000",
        image: "/Shelf.jpg",
        badges: ["BEST SELLER"],
        colors: ["bg-[#F5E6D3]"],
    },
    {
        id: 3,
        title: "Change Unit",
        price: "KSH 52,920",
        image: "/changeunit.jpg",
        badges: ["FREE INSTALLATION", "BEST SELLER"],
        colors: ["bg-[#EADBC8]"],
    },
    {
        id: 4,
        title: "Perch Twin Bunk Bed",
        price: "KSH 286,000",
        image: "/loftbed.jpeg",
        badges: ["FREE INSTALLATION", "BEST SELLER"],
        colors: ["bg-[#EADBC8]"],
    },
];

export default function BestSellers() {
    const [selectedColors, setSelectedColors] = useState<Record<number, number>>({});

    const handleColorSelect = (productId: number, colorIndex: number) => {
        setSelectedColors((prev) => ({ ...prev, [productId]: colorIndex }));
    };

    return (
        <section className="w-full mx-auto px-4 md:px-8 py-16 bg-white font-sans">
            {/* Section Title */}
            <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-wide">
                    Sustainably made best-sellers
                </h2>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {products.map((product) => (
                    <div key={product.id} className="group relative flex flex-col bg-white">
                        {/* Image Container */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-gray-100 mb-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Badges (Top Left) */}
                            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                                {product.badges.map((badge, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[10px] font-bold tracking-wider px-2.5 py-1 uppercase bg-white text-gray-700 border border-gray-100 shadow-sm"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            {/* Heart Icon (Top Right) */}
                            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black z-10 transition-colors shadow-sm">
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
                            <h3 className="text-base font-medium text-gray-900 mb-1 tracking-tight">
                                {product.title}
                            </h3>
                            <p className="text-sm font-semibold text-gray-600 mb-4">{product.price}</p>

                            {/* Color Swatches */}
                            <div className="flex gap-2.5 justify-center mt-auto">
                                {product.colors.map((colorClass, idx) => {
                                    const isSelected =
                                        selectedColors[product.id] === idx ||
                                        (!selectedColors[product.id] && idx === 0);

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleColorSelect(product.id, idx)}
                                            className={`w-4 h-4 rounded-full border ${colorClass} ${
                                                isSelected
                                                    ? "ring-1 ring-offset-2 ring-gray-400"
                                                    : "border-gray-300"
                                            } transition-all`}
                                            aria-label={`Select color option ${idx + 1}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}