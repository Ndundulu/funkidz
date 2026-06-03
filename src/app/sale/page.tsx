"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Grid, LayoutGrid, List, Heart, Plus, ChevronDown, SlidersHorizontal } from "lucide-react";

const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Junior bed",
        price: 28,
        originalPrice: 36,
        discount: "SAVE 22%",
        image: "/Junior bed.jpg",
        category: "Decor",
    },
    {
        id: 2,
        name: "Double decker with pullout bed",
        price: 11,
        originalPrice: 15,
        discount: "SAVE 27%",
        image: "/Double decker with pull out bed.jpg",
        category: "Books",
    },
    {
        id: 3,
        name: "Change unit with a basin",
        price: 10,
        originalPrice: 14,
        discount: "SAVE 29%",
        image: "/Changeunit Storage with basin.jpeg",
        category: "Toys",
    },
    {
        id: 4,
        name: "Baby cot",
        price: 120,
        originalPrice: 140,
        discount: "SAVE 14%",
        image: "/Baby cot Crib.jpg",
        category: "Decor",
    },
];

export default function SalePage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<number>(150);
    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewLayout, setViewLayout] = useState<"grid-3" | "grid-4" | "list">("grid-3");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

    // Dynamic Filtering Logic
    const filteredProducts = useMemo(() => {
        return INITIAL_PRODUCTS.filter((product) => {
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesPrice = product.price <= priceRange;
            return matchesCategory && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "discount") {
                const getDiscountNum = (str: string) => parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
                return getDiscountNum(b.discount) - getDiscountNum(a.discount);
            }
            return a.id - b.id;
        });
    }, [selectedCategory, priceRange, sortBy]);

    // Dynamic dynamic counts based on items on sale
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        INITIAL_PRODUCTS.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    return (
        <main className="min-h-screen bg-white text-[#222]">
            {/* PAGE TITLE */}
            <div className="w-full text-center py-5 md:py-5 border-b border-[#E8E8E8]">
                <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-neutral-800">Sale</h1>
            </div>

            {/* --- DESKTOP FILTER BAR --- */}
            <div className="hidden lg:flex max-w-full mx-auto px-4 sm:px-6 lg:px-12 h-14 border-b border-[#E8E8E8] items-center justify-between text-xs tracking-wider text-neutral-500">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setViewLayout("grid-3")}
                        className={`p-1 transition-colors ${viewLayout === "grid-3" ? "text-black" : "text-gray-300"}`}
                    >
                        <Grid className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button
                        onClick={() => setViewLayout("grid-4")}
                        className={`p-1 transition-colors ${viewLayout === "grid-4" ? "text-black" : "text-gray-300"}`}
                    >
                        <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button
                        onClick={() => setViewLayout("list")}
                        className={`p-1 transition-colors ${viewLayout === "list" ? "text-black" : "text-gray-300"}`}
                    >
                        <List className="w-4 h-4 stroke-[1.5]" />
                    </button>
                </div>

                <div className="font-serif italic text-neutral-400">
                    {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                        className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors"
                    >
                        <span>Sort by ({sortBy === "featured" ? "Featured" : sortBy === "price-low" ? "Price low-high" : sortBy === "price-high" ? "Price high-low" : "Savings"})</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
                    {isSortDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E8E8E8] shadow-xl z-50 py-1 text-[13px]">
                            {[
                                { value: "featured", label: "Featured" },
                                { value: "price-low", label: "Price: Low to High" },
                                { value: "price-high", label: "Price: High to Low" },
                                { value: "discount", label: "Biggest Saving" },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSortBy(option.value);
                                        setIsSortDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700 block"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- MOBILE CONTROL BAR --- */}
            <div className="lg:hidden w-full border-b border-[#efefef] grid grid-cols-3 h-12 text-xs tracking-wider text-neutral-600 font-medium bg-white">
                <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="flex items-center justify-center gap-1.5 border-r border-[#efefef]"
                >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Filter</span>
                </button>

                <div className="relative flex items-center justify-center border-r border-[#efefef]">
                    <button
                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                        className="flex items-center gap-1 w-full h-full justify-center"
                    >
                        <span>Sort by</span>
                        <ChevronDown className="w-3 h-3 text-neutral-400" />
                    </button>
                    {isSortDropdownOpen && (
                        <div className="absolute top-full left-0 w-full min-w-[160px] bg-white border-b border-[#E5E5E5] shadow-lg z-50 py-1">
                            {["featured", "price-low", "price-high", "discount"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setSortBy(option);
                                        setIsSortDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-xs capitalize hover:bg-neutral-50"
                                >
                                    {option.replace("-", " ")}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button onClick={() => setViewLayout("list")} className={viewLayout === "list" ? "text-black" : "text-neutral-300"}>
                        <List className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewLayout("grid-3")} className={viewLayout === "grid-3" || viewLayout === "grid-4" ? "text-black" : "text-neutral-300"}>
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* WORKSPACE AREA */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-10 flex flex-col lg:flex-row gap-12">

                {/* SIDEBAR FILTERS */}
                <aside className={`w-full lg:w-60 flex-shrink-0 space-y-8 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}>
                    <div className="border-b border-[#efefef] pb-6">
                        <div className="flex items-center justify-between text-[13px] font-medium tracking-widest mb-4">
                            <span>Product type</span>
                            <ChevronDown className="w-4 h-4 text-neutral-400 lg:hidden" />
                        </div>
                        <ul className="space-y-2.5 text-[13px] text-neutral-600">
                            <li>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`hover:text-black transition-colors ${!selectedCategory ? "text-black font-semibold" : ""}`}
                                >
                                    All Items
                                </button>
                            </li>
                            {Object.entries(categoryCounts).map(([name, count]) => (
                                <li key={name}>
                                    <button
                                        onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                                        className={`hover:text-black transition-colors flex items-center gap-1 ${
                                            selectedCategory === name ? "text-black font-semibold" : ""
                                        }`}
                                    >
                                        {name} <span className="text-neutral-400 text-xs">({count})</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-[13px] font-medium tracking-widest mb-4">
                            <span>Price</span>
                        </div>
                        <div className="px-1">
                            <input
                                type="range"
                                min="0"
                                max="150"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-[2px] bg-neutral-200 appearance-none cursor-pointer accent-black"
                            />
                            <div className="flex items-center justify-between mt-4 text-xs text-neutral-500">
                                <div className="flex items-center gap-1 border border-neutral-200 px-3 py-2 w-20">
                                    <span className="text-neutral-400">KSH</span>
                                    <input type="number" value="0" readOnly className="w-full bg-transparent outline-none pointer-events-none" />
                                </div>
                                <span className="text-neutral-400 font-serif italic">to</span>
                                <div className="flex items-center gap-1 border border-neutral-200 px-3 py-2 w-24">
                                    <span className="text-neutral-400">KSH</span>
                                    <input
                                        type="number"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full bg-transparent outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* PRODUCTS GRID */}
                <section className="flex-1">
                    <div className={`grid gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 ${
                        viewLayout === "grid-4" && "lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
                    } ${
                        viewLayout === "list" && "grid-cols-1"
                    } ${
                        viewLayout === "grid-3" && "lg:grid-cols-3 md:grid-cols-3 grid-cols-2"
                    }`}>
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`group relative flex ${
                                    viewLayout === "list"
                                        ? "flex-col lg:flex-row lg:gap-6 lg:items-center border-b border-[#efefef] pb-6"
                                        : "flex-col"
                                }`}
                            >
                                {/* IMAGE BOX CONTAINER */}
                                <div className={`relative bg-[#f9f9f9] overflow-hidden ${
                                    viewLayout === "list"
                                        ? "w-full lg:w-48 aspect-[4/5] lg:h-48 lg:flex-shrink-0"
                                        : "aspect-[4/5] w-full"
                                }`}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                        className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                                    />

                                    <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col items-start gap-0.5 md:gap-1">
                                        <span className="bg-[#d93838] text-white text-[8px] md:text-[9px] font-bold tracking-wider px-1.5 py-0.5">
                                            {product.discount}
                                        </span>
                                    </div>

                                    <button className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 bg-white/80 backdrop-blur-xs rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xs hover:bg-white text-neutral-700">
                                        <Heart className="w-4 h-4 stroke-[1.5]" />
                                    </button>

                                    <button className="absolute bottom-3 right-3 p-1.5 md:p-2 bg-white text-black shadow-md rounded-xs hover:bg-neutral-100 transition-all">
                                        <Plus className="w-4 h-4 stroke-[2]" />
                                    </button>
                                </div>

                                {/* DETAILS BOX AREA */}
                                <div className={`flex flex-col text-center mt-3 md:mt-4 ${
                                    viewLayout === "list"
                                        ? "text-center lg:text-left mt-4 lg:mt-0 lg:flex-1"
                                        : ""
                                }`}>
                                    <h3 className="text-sm md:text-[13px] text-neutral-800 tracking-wide font-normal group-hover:underline cursor-pointer">
                                        {product.name}
                                    </h3>
                                    <div className={`flex items-center gap-1.5 justify-center mt-1 text-sm md:text-[13px] ${
                                        viewLayout === "list" ? "justify-center lg:justify-start" : ""
                                    }`}>
                                        <span className="text-[#d93838] font-medium">KSH {product.price}.00</span>
                                        <span className="text-neutral-400 line-through text-[11px] md:text-xs">KSH {product.originalPrice}.00</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}