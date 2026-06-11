"use client";

import { useState, useMemo } from "react";
import { Grid, LayoutGrid, List, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Junior bed",
        price: 28,
        originalPrice: 36,
        image: "/Junior-bed.jpg",
        category: "Decor",
    },
    {
        id: 2,
        name: "Double decker with pullout bed",
        price: 11,
        originalPrice: 15,
        image: "/Double-decker-with-trundle.jpg",
        category: "Books",
    },
    {
        id: 3,
        name: "Change unit with a basin",
        price: 10,
        originalPrice: 14,
        image: "/Changeunit-Storage-with-basin.jpeg",
        category: "Toys",
    },
    {
        id: 4,
        name: "Baby cot",
        price: 120,
        originalPrice: 140,
        image: "/Baby-cot-Crib.jpg",
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

    const filteredProducts = useMemo(() => {
        return INITIAL_PRODUCTS.filter((product) => {
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesPrice = product.price <= priceRange;
            return matchesCategory && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            return a.id - b.id;
        });
    }, [selectedCategory, priceRange, sortBy]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        INITIAL_PRODUCTS.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    const resetFilters = () => {
        setSelectedCategory(null);
        setPriceRange(150);
    };

    return (
        <main className="min-h-screen bg-white text-[#222]">
            {/* PAGE TITLE */}
            <div className="w-full text-center py-5 md:py-8 border-b border-[#E8E8E8]">
                <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-neutral-800">Sale</h1>
            </div>

            {/* DESKTOP FILTER BAR */}
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
                    {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </div>

                <div className="relative">
                    <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors">
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
                                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700 block"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE CONTROL BAR */}
            <div className="lg:hidden w-full border-b border-[#efefef] grid grid-cols-3 h-12 text-xs tracking-wider text-neutral-600 font-medium bg-white">
                <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="flex items-center justify-center gap-1.5 border-r border-[#efefef]"
                >
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

            {/* MAIN CONTENT */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-10 flex flex-col lg:flex-row gap-12">
                {/* DESKTOP SIDEBAR */}
                <aside className="hidden lg:block w-60 flex-shrink-0 space-y-8">
                    <div className="border-b border-[#efefef] pb-6">
                        <div className="flex items-center justify-between text-[13px] font-medium tracking-widest mb-4 uppercase">
                            <span>Product type</span>
                        </div>
                        <ul className="space-y-2.5 text-[13px] text-neutral-600">
                            <li>
                                <button onClick={() => setSelectedCategory(null)} className={`hover:text-black transition-colors ${!selectedCategory ? "text-black font-semibold" : ""}`}>
                                    All Items
                                </button>
                            </li>
                            {Object.entries(categoryCounts).map(([name, count]) => (
                                <li key={name}>
                                    <button
                                        onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                                        className={`hover:text-black transition-colors flex items-center gap-1 ${selectedCategory === name ? "text-black font-semibold" : ""}`}
                                    >
                                        {name} <span className="text-neutral-400 text-xs">({count})</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-[13px] font-medium tracking-widest mb-4 uppercase">
                            <span>Price Range</span>
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
                                <div className="border border-neutral-200 px-3 py-2 w-20">KSH 0</div>
                                <span className="text-neutral-400 font-serif italic">to</span>
                                <div className="border border-neutral-800 px-3 py-2 w-24 text-black font-medium">KSH {priceRange}</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={resetFilters}
                        className="text-xs text-neutral-500 hover:text-black underline"
                    >
                        Reset Filters
                    </button>
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
                            <ProductCard
                                key={product.id}
                                product={product}
                                viewLayout={viewLayout}
                                showDiscount={true}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* MOBILE FILTER ACTION SHEET */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setIsMobileFilterOpen(false)}
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                            <h2 className="text-lg font-medium">Filters</h2>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 -mr-2 text-neutral-500"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-6 space-y-8">
                            {/* Product Type */}
                            <div>
                                <div className="text-[13px] font-medium tracking-widest mb-4 uppercase">Product type</div>
                                <ul className="space-y-3 text-[15px]">
                                    <li>
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className={`w-full text-left py-1 ${!selectedCategory ? "text-black font-medium" : "text-neutral-600"}`}
                                        >
                                            All Items
                                        </button>
                                    </li>
                                    {Object.entries(categoryCounts).map(([name, count]) => (
                                        <li key={name}>
                                            <button
                                                onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                                                className={`w-full text-left py-1 flex justify-between ${selectedCategory === name ? "text-black font-medium" : "text-neutral-600"}`}
                                            >
                                                <span>{name}</span>
                                                <span className="text-neutral-400">({count})</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Range */}
                            <div>
                                <div className="text-[13px] font-medium tracking-widest mb-4 uppercase">Price Range</div>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="150"
                                        step="1"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-black"
                                    />
                                    <div className="flex justify-between text-sm mt-4 text-neutral-600">
                                        <span>KSH 0</span>
                                        <span>KSH {priceRange}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-neutral-200 p-4 flex gap-3">
                            <button
                                onClick={resetFilters}
                                className="flex-1 py-3.5 text-sm font-medium border border-neutral-300 rounded-full"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="flex-1 py-3.5 text-sm font-medium bg-black text-white rounded-full"
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}