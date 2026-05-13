export default function Navbar() {
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Funkidz</h1>

                <nav className="flex gap-6">
                    <a href="#">Home</a>
                    <a href="#">Shop</a>
                    <a href="#">Trade-In</a>
                    <a href="#">Schools</a>
                    <a href="#">Contact</a>
                </nav>
            </div>
        </header>
    )
}