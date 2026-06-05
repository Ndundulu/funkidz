"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, LayoutGrid, List, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const DRESSERS_PRODUCTS = [
    {
        id: 1,
        name: "Le Minimalist 3-Drawer Dresser",
        price: 45000,
        originalPrice: 58000,
        image: "https://images.unsplash.com/photo-1555041469-a586c61cb103?auto=format&fit=crop&w=500&q=80",
        category: "Dressers",
        filterSlug: "dressers"
    },
    {
        id: 2,
        name: "Le Wide 6-Drawer Chest",
        price: 68000,
        originalPrice: 85000,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80",
        category: "Chests",
        filterSlug: "chests"
    },
    {
        id: 3,
        name: "Le Nursery Changing Dresser",
        price: 52000,
        originalPrice: 65000,
        image: "https://images.unsplash.com/photo-1617806118233-18e1e1d9c7d5?auto=format&fit=crop&w=500&q=80",
        category: "Dressers",
        filterSlug: "dressers"
    },
    {
        id: 4,
        name: "Le Tall Bookshelf Storage Unit",
        price: 38000,
        originalPrice: 48000,
        image: "https://images.unsplash.com/photo-1585208798174-6cedd78e0198?auto=format&fit=crop&w=500&q=80",
        category: "Storage",
        filterSlug: "storage"
    },
    {
        id: 5,
        name: "Le Modern Wardrobe Cabinet",
        price: 92000,
        originalPrice: 115000,
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=500&q=80",
        category: "Storage",
        filterSlug: "storage"
    },
    {
        id: 6,
        name: "Le Compact 2-Drawer Nightstand",
        price: 28000,
        originalPrice: 35000,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=80",
        category: "Nightstands",
        filterSlug: "nightstands"
    },
];

function DressersPageContent() {
    const searchParams = useSearchParams();
    const activeUrlFilter = searchParams.get("filter");

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<number>(150000);
    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewLayout, setViewLayout] = useState<"grid-3" | "grid-4" | "list">("grid-3");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

    const filteredProducts = useMemo(() => {
        return DRESSERS_PRODUCTS.filter((product) => {
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
        DRESSERS_PRODUCTS.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    const resetFilters = () => {
        setSelectedCategory(null);
        setPriceRange(150000);
    };

    return (
        <main className="min-h-screen bg-white text-[#222] relative">
            <div>
                {/* PAGE TITLE */}
                <div className="w-full text-center py-8 border-b border-[#efefef]">
                    <h1 className="text-2xl md:text-3xl font-serif tracking-wide text-neutral-800">
                        Dressers & Storage
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
                                {Object.entries(categoryCounts).map(([name, count]) => (
                                    <li key={name}>
                                        <button
                                            onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                                            className={`hover:text-black transition-colors flex items-center gap-1 ${selectedCategory === name ? "text-black font-bold" : ""}`}
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
                                    min="10000"
                                    max="150000"
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
                                        showDiscount={false}
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

                            <div>
                                <div className="text-[13px] font-medium tracking-widest mb-4 uppercase">Price Range</div>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="10000"
                                        max="150000"
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

// Root export wrapped securely with a Suspense Boundary
export default function DressersPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center font-serif italic text-neutral-400">
                Loading catalogue...
            </div>
        }>
            <DressersPageContent />
        </Suspense>
    );
}