import Navbar from "@/components/Navbar/Navbar"
import Hero from "@/sections/Hero"
import Categories from "@/sections/Categories";
import Footer from "@/components/Footer";
import TradeInSection from "@/sections/trade-in";

export default function Home() {
    return (
        <main>
            <Hero />
            <Categories/>
            <TradeInSection/>
            <Footer/>
        </main>
    )
}