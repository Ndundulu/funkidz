"use client";

import { useState, useMemo } from "react";
import { Grid, LayoutGrid, List, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// UPDATE THIS SECTION IN YOUR FILE
interface Product {
    id: number;
    name: string;
    price: number;
    original_price: number | null;
    image: string;
    category: string;
    slug: string | null;         // Kept: Matches your production table schema
    description?: string | null;  // Optional additions to keep interfaces tight
    stock?: number | null;
}

interface SubCategoryContentProps {
    initialProducts: Product[];
    overrideTitle: string;
}

export default function SubCategoryContent({ initialProducts = [], overrideTitle }: SubCategoryContentProps) {
    // 1. Safe array fallback protection
    const productsArray = initialProducts || [];

    // Automatically find the highest price in this subcategory to calibrate the slider max limit
    const maxPriceCeiling = useMemo(() => {
        if (productsArray.length === 0) return 150000; // Safe default ceiling (KSH)
        return Math.max(...productsArray.map((p) => p.price));
    }, [productsArray]);

    const [priceRange, setPriceRange] = useState<number>(maxPriceCeiling);
    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewLayout, setViewLayout] = useState<"grid-3" | "grid-4" | "list">("grid-3");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

    // 2. Reference the fallback array for your filter computations
    const filteredProducts = useMemo(() => {
        return productsArray
            .filter((product) => product.price <= priceRange)
            .sort((a, b) => {
                if (sortBy === "price-low") return a.price - b.price;
                if (sortBy === "price-high") return b.price - a.price;
                return a.id - b.id;
            });
    }, [productsArray, priceRange, sortBy]);

    const resetFilters = () => {
        setPriceRange(maxPriceCeiling);
    };

    return (
        <main className="min-h-screen bg-white text-[#222]">
            {/* CATEGORY TITLE */}
            <div className="w-full text-center py-5 md:py-8 border-b border-[#E8E8E8]">
                <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-neutral-800">
                    {overrideTitle}
                </h1>
            </div>

            {/* DESKTOP FILTER BAR SYSTEM */}
            <div className="hidden lg:flex max-w-full mx-auto px-4 sm:px-6 lg:px-12 h-14 border-b border-[#E8E8E8] items-center justify-between text-xs tracking-wider text-neutral-500">
                <div className="flex items-center gap-4">
                    <button onClick={() => setViewLayout("grid-3")} className={`p-1 transition-colors ${viewLayout === "grid-3" ? "text-black" : "text-gray-300"}`}>
                        <Grid className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button onClick={() => setViewLayout("grid-4")} className={`p-1 transition-colors ${viewLayout === "grid-4" ? "text-black" : "text-gray-300"}`}>
                        <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button onClick={() => setViewLayout("list")} className={`p-1 transition-colors ${viewLayout === "list" ? "text-black" : "text-gray-300"}`}>
                        <List className="w-4 h-4 stroke-[1.5]" />
                    </button>
                </div>

                <div className="font-serif italic text-neutral-400">
                    {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                </div>

                <div className="relative">
                    <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors select-none">
                        <span>Sort by ({sortBy === "featured" ? "Featured" : sortBy === "price-low" ? "Price low-high" : "Price high-low"})</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
                    {isSortDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E8E8E8] shadow-xl z-50 py-1 text-[13px]">
                            {[
                                { value: "featured", label: "Featured" },
                                { value: "price-low", label: "Price: Low to High" },
                                { value: "price-high", label: "Price: High to Low" },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => { setSortBy(option.value); setIsSortDropdownOpen(false); }}
                                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700 block font-medium"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE CONTROL BAR SYSTEM */}
            <div className="lg:hidden w-full border-b border-[#efefef] grid grid-cols-3 h-12 text-xs tracking-wider text-neutral-600 font-medium bg-white">
                <button onClick={() => setIsMobileFilterOpen(true)} className="flex items-center justify-center gap-1.5 border-r border-[#efefef]">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Filter</span>
                </button>

                <div className="relative flex items-center justify-center border-r border-[#efefef]">
                    <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} className="flex items-center gap-1 w-full h-full justify-center">
                        <span>Sort by</span>
                        <ChevronDown className="w-3 h-3 text-neutral-400" />
                    </button>
                    {isSortDropdownOpen && (
                        <div className="absolute top-full left-0 w-full min-w-[160px] bg-white border-b border-[#E5E5E5] shadow-lg z-50 py-1">
                            {["featured", "price-low", "price-high"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => { setSortBy(option); setIsSortDropdownOpen(false); }}
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

            {/* PRODUCT CATALOG CONTENT AREA */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-10 flex flex-col lg:flex-row gap-12">
                {/* PERSISTENT SIDEBAR DESKTOP FILTER */}
                <aside className="hidden lg:block w-60 flex-shrink-0 space-y-8">
                    <div>
                        <div className="flex items-center justify-between text-[13px] font-medium tracking-widest mb-4 uppercase text-neutral-800">
                            <span>Price Range</span>
                        </div>
                        <div className="px-1">
                            <input
                                type="range"
                                min="0"
                                max={maxPriceCeiling}
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-[2px] bg-neutral-200 appearance-none cursor-pointer accent-black"
                            />
                            <div className="flex items-center justify-between mt-4 text-xs text-neutral-500">
                                <div className="border border-neutral-200 px-3 py-2 w-20">KSH 0</div>
                                <span className="text-neutral-400 font-serif italic">to</span>
                                <div className="border border-neutral-800 px-3 py-2 w-24 text-black font-medium">KSH {priceRange}</div>
                            </div>
                        </div>
                    </div>

                    <button onClick={resetFilters} className="text-xs text-neutral-400 hover:text-black underline tracking-wider transition-colors">
                        Reset Filters
                    </button>
                </aside>

                {/* DYNAMIC LAYOUT GRID SECTIONS */}
                <section className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-neutral-200 rounded-xl">
                            <p className="font-serif italic text-neutral-400 text-lg">No products match your current filters.</p>
                        </div>
                    ) : (
                        <div className={`grid gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 ${
                            viewLayout === "grid-4" ? "lg:grid-cols-4 md:grid-cols-3 grid-cols-2" :
                                viewLayout === "list" ? "grid-cols-1" :
                                    "lg:grid-cols-3 md:grid-cols-3 grid-cols-2"
                        }`}>
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    viewLayout={viewLayout}
                                    showDiscount={true}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* MOBILE DRAWER MODAL SHEET */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsMobileFilterOpen(false)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col transition-transform duration-300">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                            <h2 className="text-lg font-medium">Filters</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 -mr-2 text-neutral-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-6 space-y-8">
                            <div>
                                <div className="text-[13px] font-medium tracking-widest mb-4 uppercase text-neutral-800">Price Range</div>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max={maxPriceCeiling}
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-black"
                                    />
                                    <div className="flex justify-between text-sm mt-4 text-neutral-600 font-medium">
                                        <span>KSH 0</span>
                                        <span>KSH {priceRange}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 p-4 flex gap-3 bg-neutral-50">
                            <button onClick={resetFilters} className="flex-1 py-3.5 text-sm font-semibold border border-neutral-300 rounded-full bg-white text-neutral-700">
                                Reset
                            </button>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="flex-1 py-3.5 text-sm font-semibold bg-black text-white rounded-full">
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}