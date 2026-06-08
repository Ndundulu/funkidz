import Link from "next/link";
import Image from "next/image";

const products = [
    {
        slug: "moss-crib",
        name: "Moss Crib",
        price: "KSh 45,000",
        image: "/assets/carbed.jpg",
    },
    {
        slug: "study-desk",
        name: "Study Desk",
        price: "KSh 28,000",
        image: "/assets/Desk.jpg",
    },
    {
        slug: "bunk-bed",
        name: "Bunk Bed",
        price: "KSh 65,000",
        image: "/assets/Space-Saving Kid's Loft Bed.jpg",
    },
];

export default function ShopPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-12">

            {/* HEADER */}
            <div className="mb-12">
                <h1 className="text-3xl tracking-wide font-light">
                    Shop All Furniture
                </h1>

                <p className="text-gray-500 mt-2 text-sm">
                    Made-to-order furniture for children and teens.
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                {products.map((product) => (
                    <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="group"
                    >
                        <div className="bg-[#f7f7f7] rounded-xl overflow-hidden">

                            <div className="relative w-full h-[320px]">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                        </div>

                        <div className="mt-4">
                            <h3 className="text-sm font-medium tracking-wide">
                                {product.name}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                {product.price}
                            </p>
                        </div>
                    </Link>
                ))}

            </div>
        </main>
    );
}