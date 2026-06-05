"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, LayoutGrid, List, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";   // Adjust path if needed

const CRIBS_PRODUCTS = [
    {
        id: 1,
        name: "Le Minimalist Classic Crib",
        price: 45000,
        originalPrice: 58000,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80",
        category: "Cribs",
        filterSlug: "standard"
    },
    {
        id: 2,
        name: "Le Convertible Growth Crib",
        price: 62000,
        originalPrice: 75000,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80",
        category: "Convertible Crib",
        filterSlug: "convertible"
    },
    {
        id: 3,
        name: "Le Sleigh Toddler Bed",
        price: 32000,
        originalPrice: 45000,
        image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80",
        category: "Toddler Bed",
        filterSlug: "standard"
    },
    {
        id: 4,
        name: "Le Heritage Conversion Frame",
        price: 54000,
        originalPrice: 62000,
        image: "https://images.unsplash.com/photo-1531256456869-ce942a665e80?auto=format&fit=crop&w=500&q=80",
        category: "Convertible Crib",
        filterSlug: "conversion-kits"
    },
];

function CribsPageContent() {
    const searchParams = useSearchParams();
    const activeUrlFilter = searchParams.get("filter");

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<number>(100000);
    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewLayout, setViewLayout] = useState<"grid-3" | "grid-4" | "list">("grid-3");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

    const filteredProducts = useMemo(() => {
        return CRIBS_PRODUCTS.filter((product) => {
            const matchesUrl = activeUrlFilter ? product.filterSlug === activeUrlFilter : true;
            const matchesSidebar = selectedCategory ? product.category === selectedCategory : true;
            const matchesPrice = product.price <= priceRange;
            return matchesUrl && matchesSidebar && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            return a.id - b.id;
        });
    }, [activeUrlFilter, selectedCategory, priceRange, sortBy]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        CRIBS_PRODUCTS.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    const resetFilters = () => {
        setSelectedCategory(null);
        setPriceRange(100000);
    };

    return (
        <main className="min-h-screen bg-white text-[#222] relative">
            <div>
                {/* PAGE TITLE */}
                <div className="w-full text-center py-8 border-b border-[#efefef]">
                    <h1 className="text-2xl md:text-3xl font-serif tracking-wide text-neutral-800">
                        Cribs
                    </h1>
                    {activeUrlFilter && (
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">
                            Filtered by: {activeUrlFilter.replace("-", " ")}
                        </p>
                    )}
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
                        {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
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
                                    <button onClick={() => setSelectedCategory(null)} className={`hover:text-black transition-colors ${!selectedCategory ? "text-black font-bold underline underline-offset-4" : ""}`}>
                                        All Items
                                    </button>
                                </li>
                                {["Cribs", "Toddler Bed", "Convertible Crib"].map((name) => {
                                    const count = categoryCounts[name] || 0;
                                    return (
                                        <li key={name}>
                                            <button
                                                onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                                                className={`hover:text-black transition-colors flex items-center gap-1 ${selectedCategory === name ? "text-black font-bold" : ""}`}
                                            >
                                                {name} <span className="text-neutral-400 text-xs">({count})</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-[13px] font-medium tracking-widest mb-4 uppercase">
                                <span>Price Range</span>
                            </div>
                            <div className="px-1">
                                <input
                                    type="range"
                                    min="10000"
                                    max="100000"
                                    step="5000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-[2px] bg-neutral-200 appearance-none cursor-pointer accent-black"
                                />
                                <div className="flex items-center justify-between mt-4 text-xs text-neutral-500">
                                    <div className="border border-neutral-200 px-2 py-1.5 w-24">KSH 10,000</div>
                                    <span className="text-neutral-400 font-serif italic">to</span>
                                    <div className="border border-neutral-800 px-2 py-1.5 w-28 text-black font-medium">KSH {priceRange.toLocaleString()}</div>
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

                    {/* PRODUCT GRID */}
                    <section className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 text-neutral-400 font-serif italic">
                                No products found matching criteria.
                            </div>
                        ) : (
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
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
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
                                    {["Cribs", "Toddler Bed", "Convertible Crib"].map((name) => {
                                        const count = categoryCounts[name] || 0;
                                        return (
                                            <li key={name}>
                                                <button
                                                    onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                                                    className={`w-full text-left py-1 flex justify-between ${selectedCategory === name ? "text-black font-medium" : "text-neutral-600"}`}
                                                >
                                                    <span>{name}</span>
                                                    <span className="text-neutral-400">({count})</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div>
                                <div className="text-[13px] font-medium tracking-widest mb-4 uppercase">Price Range</div>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="10000"
                                        max="100000"
                                        step="5000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-black"
                                    />
                                    <div className="flex justify-between text-sm mt-4 text-neutral-600">
                                        <span>KSH 10,000</span>
                                        <span>KSH {priceRange.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

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

// Default export wrapper containing the Suspense boundary
export default function CribsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center font-serif italic text-neutral-400">
                Loading catalogue...
            </div>
        }>
            <CribsPageContent />
        </Suspense>
    );
}