import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center">

            {/* Background Image */}
            <Image
                src="/backgroundcv.jpg"     // ← Change to your image path
                alt="Kids furniture background"
                fill
                className="object-cover"
                priority
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
                <div className="max-w-3xl">
                    <p className="uppercase tracking-[0.2em] text-sm text-orange-400 mb-4">
                        Made-to-order furniture
                    </p>

                    <h1 className="text-6xl font-bold leading-tight mb-6 text-white">
                        Furniture Designed to Grow With Your Child
                    </h1>

                    <p className="text-lg text-gray-200 mb-8">
                        Premium furniture for children, teens, schools, and institutions.
                    </p>

                    <div className="flex gap-4">
                        <button className="bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition">
                            Explore Furniture
                        </button>

                        <button className="border border-white text-white px-8 py-3.5 rounded-full hover:bg-white/10 transition">
                            Trade-In Program
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}