import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";

export default function ProductPage({
                                        params,
                                    }: {
    params: { slug: string };
}) {
    const product = products.find((p) => p.slug === params.slug);

    if (!product) return notFound();

    return (
        <main className="max-w-6xl mx-auto px-6 py-12">

            <div className="grid md:grid-cols-2 gap-12">

                <div className="relative h-[500px] bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-light">
                        {product.name}
                    </h1>

                    <p className="text-xl mt-4 text-gray-600">
                        {product.price}
                    </p>

                    <p className="mt-6 text-gray-500">
                        {product.description}
                    </p>

                    <button className="mt-8 bg-black text-white px-6 py-3">
                        Add to Cart
                    </button>
                </div>

            </div>

        </main>
    );
}