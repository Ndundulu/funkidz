"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User } from "lucide-react";
import Image from "next/image";
import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";
import MobileDrawer from "./MobileDrawer";

const navLinks = [
    { href: "/shop", label: "SHOP ALL" },
    { href: "#", label: "HOME", isGuideTrigger: true, guideKey: "HOME" as const },
    { href: "#", label: "EDUCATION", isGuideTrigger: true, guideKey: "EDUCATION" as const },
    { href: "/hospital", label: "HOSPITAL" },
    { href: "/parent", label: "PARENT" },
    { href: "#", label: "CLUB", isGuideTrigger: true, guideKey: "CLUB" as const },
    { href: "/sale", label: "SALE" },
    { href: "/#trade-in", label: "TRADE-IN" },
    { href: "/contact", label: "CONTACT" },
];
export type GuideKey = "HOME" | "EDUCATION" | "CLUB" | null;
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeGuide, setActiveGuide] = useState<GuideKey>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const toggleGuide = (key: Exclude<GuideKey, null>) => {
        setActiveGuide(activeGuide === key ? null : key);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const closeAllGuides = () => setActiveGuide(null);

    const scrollToSection = (href: string) => {
        if (href.includes("#")) {
            const id = href.split("#")[1];
            const element = document.getElementById(id);
            if (element) {
                const navbarHeight = 85;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
    }, [isSearchOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeAllGuides();
                setIsSearchOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header className="w-full bg-white sticky top-0 z-50 border-b border-[#efefef]">
            {/* NAVBAR MAIN ROW */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between relative bg-white z-50">

                {/* MOBILE MENU BUTTON */}
                <div className="flex items-center lg:hidden">
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            if (isSearchOpen) setIsSearchOpen(false);
                            closeAllGuides();
                        }}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-all text-[#222]"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* LOGO */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 flex-shrink-0">
                    <Link href="/" onClick={closeAllGuides} className="flex items-center">
                        <Image src="/images/funkidz.png" alt="Funkidz Logo" width={125} height={36} className="h-8 w-auto object-contain" priority />
                    </Link>
                </div>

                {/* DESKTOP LINKS */}
                <nav className="hidden lg:flex items-center gap-5 xl:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {navLinks.map((link) => {
                        if (link.isGuideTrigger && link.guideKey) {
                            const isCurrentOpen = activeGuide === link.guideKey;
                            return (
                                <button
                                    key={link.label}
                                    onClick={() => toggleGuide(link.guideKey!)}
                                    className={`relative text-[11px] tracking-[0.14em] xl:tracking-[0.18em] font-medium whitespace-nowrap uppercase pb-1 border-b transition-all duration-300 ${
                                        isCurrentOpen ? "border-black text-black" : "border-transparent text-[#222] hover:text-black"
                                    }`}
                                >
                                    {link.label}
                                </button>
                            );
                        }
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                scroll={false}
                                onClick={() => {
                                    closeAllGuides();
                                    if (link.href.includes("#")) setTimeout(() => scrollToSection(link.href), 80);
                                }}
                                className={`relative text-[11px] tracking-[0.14em] xl:tracking-[0.18em] font-medium whitespace-nowrap transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:transition-all hover:after:w-full ${
                                    link.label === "SALE" ? "text-red-500 after:bg-red-500" : "text-[#222] after:bg-[#222]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* RIGHT UTILITY ICONS */}
                <div className="flex items-center gap-1 flex-shrink-0 z-10">
                    <button
                        onClick={() => {
                            setIsSearchOpen(!isSearchOpen);
                            if (isOpen) setIsOpen(false);
                            closeAllGuides();
                        }}
                        className={`p-2 rounded-full transition-all duration-200 ${isSearchOpen ? "bg-gray-100 text-black" : "hover:bg-gray-50 text-[#222]"}`}
                    >
                        {isSearchOpen ? <X className="w-5 h-5 stroke-[1.75]" /> : <Search className="w-5 h-5 stroke-[1.75]" />}
                    </button>

                    <Link href="/account" onClick={closeAllGuides} className="hidden lg:flex p-2 hover:bg-gray-50 rounded-full transition-all text-[#222]">
                        <User className="w-5 h-5 stroke-[1.75]" />
                    </Link>

                    {/* Cart Button SVG remain native here */}
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-all text-[#222] relative flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 25 L35 25" /><path d="M35 25 L88 25 L80 68 L38 68 Z" /><path d="M43 68 L42 75" /><path d="M75 68 L76 75" /><circle cx="42" cy="79" r="4" className="fill-white" /><circle cx="76" cy="79" r="4" className="fill-white" /><path d="M48 25 L48 68" /><path d="M59 25 L58 68" /><path d="M69 25 L67 68" /><path d="M79 25 L76 68" /><path d="M36 39 L86 39" /><path d="M37 54 L83 54" /><ellipse cx="60" cy="17" rx="4" ry="8" className="fill-none" strokeWidth="3" />
                        </svg>
                        <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">3</span>
                    </button>
                </div>
            </div>

            {/* ISOLATED SUB-PANELS */}
            <MegaMenu activeGuide={activeGuide} onClose={closeAllGuides} />
            <SearchBar isSearchOpen={isSearchOpen} inputRef={searchInputRef} />
            <MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen} onClose={closeAllGuides} />        </header>
    );
}