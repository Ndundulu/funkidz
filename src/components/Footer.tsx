export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

                <div>
                    <h3 className="text-2xl font-bold mb-4">
                        Funkidz
                    </h3>

                    <p className="text-gray-400">
                        Furniture designed for growing minds.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">
                        Quick Links
                    </h4>

                    <ul className="space-y-2 text-gray-400">
                        <li>Shop</li>
                        <li>Trade-In</li>
                        <li>Projects</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">
                        Support
                    </h4>

                    <ul className="space-y-2 text-gray-400">
                        <li>FAQs</li>
                        <li>Delivery</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">
                        Contact
                    </h4>

                    <ul className="space-y-2 text-gray-400">
                        <li>Nairobi, Kenya</li>
                        <li>info@funkidz.co.ke</li>
                    </ul>
                </div>

            </div>
        </footer>
    )
}