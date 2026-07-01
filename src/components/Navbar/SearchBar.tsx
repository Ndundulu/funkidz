import { Search, X, Loader2 } from "lucide-react";
import { RefObject, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";

interface SearchBarProps {
    isSearchOpen: boolean;
    inputRef: RefObject<HTMLInputElement | null>;
    onClose: () => void;
}

interface ProductResult {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string | null;
}

export default function SearchBar({ isSearchOpen, inputRef, onClose }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<ProductResult[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        if (!query.trim()) {
            setProducts([]);
            setSuggestions([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("id, name, price, image, slug")
                    .ilike("name", `%${query}%`)
                    .limit(5);

                if (error) {
                    console.error("Supabase query error:", error);
                    return;
                }

                if (data) {
                    setProducts(data as ProductResult[]);
                    setSuggestions(data.map(p => p.name.toLowerCase()).slice(0, 4));
                }
            } catch (err) {
                console.error("Search fetch exception:", err);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className={`w-full bg-white border-t border-b border-[#efefef] absolute left-0 transition-all duration-300 ease-in-out origin-top z-50 ${
            isSearchOpen ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}>
            <div className="max-w-3xl mx-auto px-4 py-3 max-h-[85vh] overflow-y-auto flex flex-col">

                {/* SEARCH INPUT ROW */}
                <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center border-b border-[#efefef] pb-2">
                    <Search className="absolute left-2 w-5 h-5 text-gray-700 stroke-[1.75]" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for..."
                        className="w-full bg-transparent pl-10 pr-10 py-3 text-[#222] font-medium text-base placeholder-gray-400 focus:outline-none"
                    />

                    <div className="absolute right-2 flex items-center gap-2">
                        {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="p-1 text-gray-500 hover:text-black transition-colors"
                            >
                                <X className="w-5 h-5 stroke-[1.75]" />
                            </button>
                        )}
                    </div>
                </form>

                {/* DYNAMIC LIVE RESULTS PANEL */}
                {query.length > 0 && (
                    <div className="mt-4 flex flex-col gap-5">

                        {/* 1. SUGGESTIONS */}
                        {suggestions.length > 0 && (
                            <div>
                                <span className="text-xs text-gray-400 font-serif tracking-wide block mb-2">Suggestions</span>
                                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar text-sm text-gray-600">
                                    {suggestions.map((suggestion, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setQuery(suggestion)}
                                            className="whitespace-nowrap hover:text-black transition-colors capitalize"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. LIVE PRODUCTS DROPDOWN VIEW */}
                        <div className="flex flex-col gap-4">
                            {products.length === 0 && !loading ? (
                                <p className="text-sm text-gray-400 py-2">No matching products found.</p>
                            ) : (
                                products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug || product.id}`} // Updated routing path to match your folder
                                        onClick={onClose}
                                        className="flex items-center gap-4 py-2 hover:bg-gray-50/50 rounded-md transition-colors cursor-pointer w-full text-left"
                                    >
                                        {/* Thumbnail Container */}
                                        <div className="w-23 h-23 bg-gray-50 rounded flex-shrink-0 relative overflow-hidden border border-[#efefef]">
                                            {product.image ? (
                                                <Image
                                                    src={product.image}
                                                    alt={product.name || "Product image"}
                                                    fill
                                                    sizes="64px"
                                                    className="object-contain p-1"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-neutral-100" />
                                            )}
                                        </div>

                                        {/* Product Metadata Info */}
                                        <div className="flex flex-col">
                                            <span className="text-base font-medium text-gray-900 block">
                                                {product.name}
                                            </span>
                                            <span className="text-base text-gray-500 mt-0.5 block">
                                                {formatCurrency(product.price)}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* 3. VIEW ALL BUTTON */}
                        <Link
                            href={`/search?q=${encodeURIComponent(query)}`}
                            onClick={onClose}
                            className="w-full text-center bg-[#111] text-white py-3.5 tracking-[0.15em] font-medium text-xs uppercase hover:bg-black transition-colors mt-2 block"
                        >
                            View All Results
                        </Link>

                    </div>
                )}
            </div>
        </div>
    );
}