import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Heart, Minus, Plus } from "lucide-react";
import ProductGallery from "@/components/Product/ProductGallery";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const supabase = await createClient();

    let query = supabase.from("products").select("*");

    if (!isNaN(Number(slug))) {
        query = query.eq("id", Number(slug));
    } else {
        query = query.eq("slug", slug);
    }

    const {data: product, error} = await query.single();

    if (error || !product) {
        console.error("Product fetch error:", error);
        notFound();
    }

    const hasDiscount = product.original_price && product.original_price > product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
        : 0;

    const productImages = [product.image];

    return (
        <main className="bg-white min-h-screen text-[#222]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

                    {/* PRODUCT GALLERY */}
                    <div className="md:col-span-7">

                        <ProductGallery
                            images={productImages}
                            productName={product.name}
                            hasDiscount={hasDiscount}
                            discountPercent={discountPercent}
                        />

                    </div>
                    {/* RIGHT COLUMN: PURCHASING PANEL */}
                    <div className="md:col-span-5 flex flex-col space-y-8 md:max-w-[420px] md:sticky md:top-8 h-fit">
                        <div>
                        <span className="text-[11px] font-sans tracking-widest text-neutral-400 uppercase block mb-3">
                            {product.category}
                        </span>
                            <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-neutral-800 leading-tight">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price Display */}
                        <div className="flex items-baseline gap-3 pt-2 border-t border-neutral-100">
                        <span
                            className={`text-2xl font-light tracking-wide ${hasDiscount ? "text-[#d93838]" : "text-neutral-900"}`}>
                            KSH {product.price.toLocaleString()}.00
                        </span>
                            {hasDiscount && (
                                <span className="text-neutral-400 line-through text-sm font-light">
                                KSH {product.original_price!.toLocaleString()}.00
                            </span>
                            )}
                        </div>

                        {/* Narrative */}
                        <div className="text-sm text-neutral-600 leading-relaxed font-light font-sans tracking-wide">
                            <p>{product.description}</p>
                        </div>

                        {/* EDITORIAL VALUE LABELS */}
                        <div className="pt-6 border-t border-neutral-100">
                            <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-800 mb-4">Why
                                Parents Choose It</h3>
                            <ul className="space-y-3 text-sm text-neutral-600 font-light font-sans tracking-wide">
                                <li className="flex items-start gap-2">
                                    <span className="text-neutral-400 mt-[2px]">•</span>
                                    <span>Made from sustainably sourced solid wood and premium board profiles</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-neutral-400 mt-[2px]">•</span>
                                    <span>Finished with completely non-toxic, child-safe structural eco-coatings</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-neutral-400 mt-[2px]">•</span>
                                    <span>Rigidly engineered to exceed safety benchmarks for children's spaces</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-neutral-400 mt-[2px]">•</span>
                                    <span>Intelligently constructed to adapt and endure across multiple generational phases</span>
                                </li>
                            </ul>
                        </div>

                        {/* Actions block */}
                        <div className="space-y-4 pt-6 border-t border-neutral-100">
                            <div
                                className="flex items-center justify-between border border-neutral-200 h-12 px-4 text-sm font-sans">
                                <span className="text-neutral-400 text-xs tracking-wider uppercase">Quantity</span>
                                <div className="flex items-center gap-6">
                                    <button className="text-neutral-400 hover:text-black transition-colors"><Minus
                                        size={14}/></button>
                                    <span className="font-medium text-neutral-800 w-4 text-center select-none">1</span>
                                    <button className="text-neutral-400 hover:text-black transition-colors"><Plus
                                        size={14}/></button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    className="flex-1 bg-black hover:bg-neutral-900 text-white text-xs font-medium tracking-widest py-4 transition-all duration-300 uppercase">
                                    Add to Bag
                                </button>
                                <button
                                    className="border border-neutral-200 hover:border-neutral-400 text-neutral-600 hover:text-black px-4 flex items-center justify-center transition-colors">
                                    <Heart size={18} className="stroke-[1.2]"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LOWER TECHNICAL SPECIFICATIONS LAYOUT */}
                <div
                    className="mt-24 pt-16 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-16 text-neutral-800 font-sans font-light">
                    <div>
                        <h2 className="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-4">Safety
                            Standards</h2>
                        <p className="text-sm text-neutral-600 leading-relaxed tracking-wide">
                            Safety is our primary foundation. Every product utilizes structural components engineered to
                            provide perfect stability and resilience, while maintaining structural health standards free
                            of VOC hazards for closed nurseries and indoor family zones.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-4">Specifications</h2>
                        <div className="divide-y divide-neutral-100 text-sm text-neutral-600">
                            {/* Dimensions Row */}
                            <div className="flex justify-between py-3.5">
                                <span className="text-neutral-400">Dimensions</span>
                                <span className="font-medium text-neutral-800 font-mono text-xs">
                                    {product.dimensions}
                                </span>
                            </div>
                            {/* Weight Row */}
                            <div className="flex justify-between py-3.5">
                                <span className="text-neutral-400">Weight</span>
                                <span className="font-medium text-neutral-800">
                                    {product.weight}
                                </span>
                            </div>
                            {/* Materials Block */}
                            <div className="flex flex-col gap-1 py-3.5">
                                <span className="text-neutral-400 mb-1">Materials</span>
                                <span className="font-light text-neutral-600 leading-relaxed text-xs">
                                    {product.materials}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );

}