const steps = [
    "Buy Funkidz furniture",
    "Child outgrows furniture",
    "Request assessment",
    "Receive trade-in value",
]

export default function TradeIn() {
    return (
        <section className="bg-black text-white py-24 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

                <div>
                    <p className="uppercase tracking-[0.2em] text-sm text-orange-400 mb-4">
                        Trade-In Program
                    </p>

                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        Furniture That Grows With Your Child
                    </h2>

                    <p className="text-gray-300 text-lg mb-8">
                        Upgrade your child's furniture as they grow and receive
                        trade-in value toward the next stage.
                    </p>

                    <button className="bg-orange-600 px-6 py-3 rounded-full">
                        Start Trade-In
                    </button>
                </div>

                <div className="space-y-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 rounded-2xl p-6 flex items-center gap-4"
                        >
                            <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center font-bold">
                                {index + 1}
                            </div>

                            <p>{step}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}