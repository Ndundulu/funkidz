export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-3xl">
                <p className="uppercase tracking-[0.2em] text-sm text-orange-600 mb-4">
                    Made-to-order furniture
                </p>

                <h1 className="text-6xl font-bold leading-tight mb-6">
                    Furniture Designed to Grow With Your Child
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Premium furniture for children, teens, schools, and institutions.
                </p>

                <div className="flex gap-4">
                    <button className="bg-black text-white px-6 py-3 rounded-full">
                        Explore Furniture
                    </button>

                    <button className="border px-6 py-3 rounded-full">
                        Trade-In Program
                    </button>
                </div>
            </div>
        </section>
    )
}