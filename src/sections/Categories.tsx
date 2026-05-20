const categories = [
    {
        title: "Kids Furniture",
        desc: "Creative and safe furniture for young children.",
    },
    {
        title: "Teen Furniture",
        desc: "Modern setups for study, gaming, and growth.",
    },
    {
        title: "School Furniture",
        desc: "Durable classroom and institution solutions.",
    },
]

export default function Categories() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
                <p className="uppercase tracking-[0.2em] text-sm text-orange-600 mb-3">
                    Categories
                </p>

                <h2 className="text-4xl font-bold">
                    Designed for Every Stage
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {categories.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border rounded-3xl p-8 shadow-sm"
                    >
                        <div className="h-52 rounded-2xl bg-gray-200 mb-6"></div>

                        <h3 className="text-2xl font-semibold mb-3">
                            {item.title}
                        </h3>

                        <p className="text-gray-600 mb-6">
                            {item.desc}
                        </p>

                        <button className="text-orange-600 font-medium">
                            Explore →
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}