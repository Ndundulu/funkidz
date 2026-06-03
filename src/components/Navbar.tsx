"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const searchInputRef = useRef<HTMLInputElement>(null);

    const navLinks = [
        { href: "/shop", label: "SHOP ALL" },
        { href: "/beds", label: "BEDS" },
        { href: "/cribs", label: "CRIBS" },
        { href: "/dressers-storage", label: "DRESSERS & STORAGE" },
        { href: "/sale", label: "SALE" },
        { href: "#trade-in", label: "TRADE-IN" },
        { href: "/contact", label: "CONTACT" },
    ];

    // Custom smooth scroll function
    const scrollToSection = (href: string) => {
        if (href.startsWith("#")) {
            const id = href.replace("#", "");
            const element = document.getElementById(id);

            if (element) {
                const navbarHeight = 80; // Adjust if your navbar height changes
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }
    };

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <header className="w-full bg-white sticky top-0 z-50 border-b border-[#efefef]">

            {/* NAVBAR CONTAINER */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between relative bg-white">

                {/* MOBILE MENU BUTTON */}
                <div className="flex items-center lg:hidden">
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            if (isSearchOpen) setIsSearchOpen(false);
                        }}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-all text-[#222]"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* LOGO */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 flex-shrink-0">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/funkidz.png"
                            alt="Funkidz Logo"
                            width={125}
                            height={36}
                            className="h-8 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* DESKTOP NAVIGATION */}
                <nav className="hidden lg:flex items-center gap-5 xl:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            scroll={false}                    // ← Important: disabled default scroll
                            onClick={(e) => {
                                if (link.href.startsWith("#")) {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }
                            }}
                            className={`relative text-[11px] tracking-[0.14em] xl:tracking-[0.18em] font-medium whitespace-nowrap transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:transition-all hover:after:w-full ${
                                link.label === "SALE"
                                    ? "text-red-500 after:bg-red-500"
                                    : "text-[#222] after:bg-[#222]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* RIGHT SIDE ICONS */}
                <div className="flex items-center gap-1 flex-shrink-0 z-10">

                    {/* SEARCH BUTTON */}
                    <button
                        onClick={() => {
                            setIsSearchOpen(!isSearchOpen);
                            if (isOpen) setIsOpen(false);
                        }}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            isSearchOpen ? "bg-gray-100 text-black" : "hover:bg-gray-50 text-[#222]"
                        }`}
                    >
                        {isSearchOpen ? (
                            <X className="w-5 h-5 stroke-[1.75]" />
                        ) : (
                            <Search className="w-5 h-5 stroke-[1.75]" />
                        )}
                    </button>

                    {/* ACCOUNT ICON */}
                    <Link
                        href="/account"
                        className="hidden lg:flex p-2 hover:bg-gray-50 rounded-full transition-all text-[#222]"
                    >
                        <User className="w-5 h-5 stroke-[1.75]" />
                    </Link>

                    {/* CART ICON */}
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-all text-[#222] relative flex items-center justify-center">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-7 h-7 fill-none stroke-current"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 25 L35 25" />
                            <path d="M35 25 L88 25 L80 68 L38 68 Z" />
                            <path d="M43 68 L42 75" />
                            <path d="M75 68 L76 75" />
                            <circle cx="42" cy="79" r="4" className="fill-white" />
                            <circle cx="76" cy="79" r="4" className="fill-white" />
                            <path d="M48 25 L48 68" />
                            <path d="M59 25 L58 68" />
                            <path d="M69 25 L67 68" />
                            <path d="M79 25 L76 68" />
                            <path d="M36 39 L86 39" />
                            <path d="M37 54 L83 54" />
                            <ellipse cx="60" cy="17" rx="4" ry="8" className="fill-none" strokeWidth="3" />
                        </svg>

                        <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                            3
                        </span>
                    </button>
                </div>
            </div>

            {/* SEARCH BAR */}
            <div
                className={`w-full bg-white border-t border-b border-[#efefef] absolute left-0 transition-all duration-300 ease-in-out origin-top z-10 ${
                    isSearchOpen
                        ? "opacity-100 translate-y-0 visible pointer-events-auto"
                        : "opacity-0 -translate-y-4 invisible pointer-events-none"
                }`}
            >
                <div className="max-w-3xl mx-auto px-4 py-3">
                    <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                        <Search className="absolute left-2 w-5 h-5 text-black stroke-[1.75]" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for..."
                            className="w-full bg-transparent pl-10 pr-4 py-3 text-[#222] font-medium text-base placeholder-gray-400 focus:outline-none transition-all"
                        />
                    </form>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="lg:hidden border-t border-[#efefef] bg-white shadow-xl absolute left-0 w-full z-10">
                    <nav className="flex flex-col py-5 px-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                scroll={false}                    // ← Disabled default
                                onClick={(e) => {
                                    if (link.href.startsWith("#")) {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                        setIsOpen(false);
                                    } else {
                                        setIsOpen(false);
                                    }
                                }}
                                className={`text-[14px] tracking-[0.12em] font-medium py-3 transition-all ${
                                    link.label === "SALE" ? "text-red-500" : "text-[#222]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* ACCOUNT */}
                        <Link
                            href="/account"
                            className="flex items-center gap-3 pt-5 mt-4 border-t border-[#efefef] text-[#222]"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-5 h-5 stroke-[1.75]" />
                            <span className="text-[14px] tracking-[0.12em] font-medium">ACCOUNT</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}