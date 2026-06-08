import Image from "next/image";
import { Heart, Plus } from "lucide-react";

type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    filterSlug?: string;
    slug?: string;
    description?: string;
    stock?: number;
};

type ProductCardProps = {
    product: Product;
    viewLayout: "grid-3" | "grid-4" | "list";
    showDiscount?: boolean;     // true for Sale page, false for normal pages
};

export default function ProductCard({
                                        product,
                                        viewLayout,
                                        showDiscount = false
                                    }: ProductCardProps) {

    // Calculate discount dynamically
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;

    const discountPercent = hasDiscount
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0;

    const discountLabel = `SAVE ${discountPercent}%`;

    return (
        <div
            className={`group relative flex ${
                viewLayout === "list"
                    ? "flex-col lg:flex-row lg:gap-6 lg:items-center border-b border-[#efefef] pb-6"
                    : "flex-col"
            }`}
        >
            <div className={`relative bg-[#f9f9f9] overflow-hidden ${
                viewLayout === "list"
                    ? "w-full lg:w-56 aspect-[4/5] lg:h-56 lg:flex-shrink-0"
                    : "aspect-[4/5] w-full"
            }`}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />

                {/* Discount Badge */}
                {showDiscount && hasDiscount && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                        <span className="bg-[#d93838] text-white text-[8px] md:text-[9px] font-bold tracking-wider px-1.5 py-0.5">
                            {discountLabel}
                        </span>
                    </div>
                )}

                <button className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 bg-white/80 backdrop-blur-xs rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xs hover:bg-white text-neutral-700">
                    <Heart className="w-4 h-4 stroke-[1.5]" />
                </button>

                <button className="absolute bottom-3 right-3 p-1.5 md:p-2 bg-white text-black shadow-md rounded-xs hover:bg-neutral-100 transition-all">
                    <Plus className="w-4 h-4 stroke-[2]" />
                </button>
            </div>

            <div className={`flex flex-col text-center mt-3 md:mt-4 ${
                viewLayout === "list" ? "text-center lg:text-left mt-4 lg:mt-0 lg:flex-1" : ""
            }`}>
                <h3 className="text-sm md:text-[13px] text-neutral-800 tracking-wide font-normal group-hover:underline cursor-pointer">
                    {product.name}
                </h3>

                <div className={`flex items-center gap-1.5 justify-center mt-1 text-sm md:text-[13px] ${
                    viewLayout === "list" ? "justify-center lg:justify-start" : ""
                }`}>
                    <span className="text-[#d93838] font-medium">
                        KSH {product.price.toLocaleString()}.00
                    </span>

                    {showDiscount && hasDiscount && (
                        <span className="text-neutral-400 line-through text-[11px] md:text-xs">
                            KSH {product.originalPrice!.toLocaleString()}.00
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}