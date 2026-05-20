import Navbar from "@/components/Navbar"
import Hero from "@/sections/Hero"
import TradeIn from "@/sections/TradeIn";
import Categories from "@/sections/Categories";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Categories/>
            <TradeIn/>
            <Footer/>
        </main>
    )
}