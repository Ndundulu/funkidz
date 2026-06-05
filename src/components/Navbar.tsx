"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Track which interactive sub-guide panel overlay is open ("CRIBS" | "BEDS" | "DRESSERS" | null)
    const [activeGuide, setActiveGuide] = useState<"CRIBS" | "BEDS" | "DRESSERS" | null>(null);

    const searchInputRef = useRef<HTMLInputElement>(null);

    const navLinks = [
        { href: "/shop", label: "SHOP ALL" },
        { href: "#", label: "BEDS", isGuideTrigger: true, guideKey: "BEDS" as const },
        { href: "#", label: "CRIBS", isGuideTrigger: true, guideKey: "CRIBS" as const },
        { href: "#", label: "DRESSERS & STORAGE", isGuideTrigger: true, guideKey: "DRESSERS" as const },
        { href: "/sale", label: "SALE" },
        { href: "/#trade-in", label: "TRADE-IN" },
        { href: "/contact", label: "CONTACT" },
    ];

    // Helper to toggle or close guides
    const toggleGuide = (key: "CRIBS" | "BEDS" | "DRESSERS") => {
        setActiveGuide(activeGuide === key ? null : key);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const closeAllGuides = () => setActiveGuide(null);

    // Custom smooth scroll function with offset
    const scrollToSection = (href: string) => {
        if (href.includes("#")) {
            const id = href.split("#")[1];
            const element = document.getElementById(id);

            if (element) {
                const navbarHeight = 85;
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

    // Close overlays if user pushes Escape key
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

            {/* NAVBAR CONTAINER */}
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
                    {navLinks.map((link) => {
                        if (link.isGuideTrigger && link.guideKey) {
                            const isCurrentOpen = activeGuide === link.guideKey;
                            return (
                                <button
                                    key={link.label}
                                    onClick={() => toggleGuide(link.guideKey!)}
                                    className={`relative text-[11px] tracking-[0.14em] xl:tracking-[0.18em] font-medium whitespace-nowrap uppercase pb-1 border-b transition-all duration-300 ${
                                        isCurrentOpen
                                            ? "border-black text-black"
                                            : "border-transparent text-[#222] hover:text-black"
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
                                    if (link.href.includes("#")) {
                                        setTimeout(() => scrollToSection(link.href), 80);
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
                        );
                    })}
                </nav>

                {/* RIGHT SIDE ICONS */}
                <div className="flex items-center gap-1 flex-shrink-0 z-10">
                    {/* SEARCH BUTTON */}
                    <button
                        onClick={() => {
                            setIsSearchOpen(!isSearchOpen);
                            if (isOpen) setIsOpen(false);
                            closeAllGuides();
                        }}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            isSearchOpen ? "bg-gray-100 text-black" : "hover:bg-gray-50 text-[#222]"
                        }`}
                    >
                        {isSearchOpen ? <X className="w-5 h-5 stroke-[1.75]" /> : <Search className="w-5 h-5 stroke-[1.75]" />}
                    </button>

                    <Link href="/account" onClick={closeAllGuides} className="hidden lg:flex p-2 hover:bg-gray-50 rounded-full transition-all text-[#222]">
                        <User className="w-5 h-5 stroke-[1.75]" />
                    </Link>

                    <button className="p-2 hover:bg-gray-50 rounded-full transition-all text-[#222] relative flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                        <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">3</span>
                    </button>
                </div>
            </div>

            {/* --- TRUE DESKTOP GUIDE MODAL OVERLAY --- */}
            {activeGuide && (
                <>
                    <div className="hidden lg:block fixed inset-0 bg-black/25 top-[81px] z-40 transition-opacity animate-fadeIn" onClick={closeAllGuides} />

                    <div className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#efefef] shadow-xl z-50 animate-slideDown">
                        <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">

                            {/* --- BEDS MEGA MENU --- */}
                            {activeGuide === "BEDS" && (
                                <>
                                    <div className="flex flex-col space-y-3.5 pt-2">
                                        <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">Beds</h3>
                                        <Link href="/beds?filter=toddler" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Toddler Beds</Link>
                                        <Link href="/beds?filter=twin" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Twin Beds</Link>
                                        <Link href="/beds?filter=bunk" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Bunk & Loft Beds</Link>
                                        <Link href="/beds" onClick={closeAllGuides} className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity">Shop All →</Link>
                                    </div>
                                    <Link href="/beds?filter=toddler" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" alt="Beds Directory" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Toddler Beds</span>
                                    </Link>
                                    <Link href="/beds?filter=twin" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80" alt="Twin Beds" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Twin Beds</span>
                                    </Link>
                                    <Link href="/beds?filter=bunk" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" alt="Bunk Beds" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Bunk Beds</span>
                                    </Link>
                                </>
                            )}

                            {/* --- CRIBS MEGA MENU --- */}
                            {activeGuide === "CRIBS" && (
                                <>
                                    <div className="flex flex-col space-y-3.5 pt-2">
                                        <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">Cribs</h3>
                                        <Link href="/cribs?filter=convertible" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Convertible Cribs</Link>
                                        <Link href="/cribs?filter=conversion-kits" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Conversion Kits</Link>
                                        <Link href="/cribs?filter=mattresses" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Mattresses Pads & Changers</Link>
                                        <Link href="/cribs" onClick={closeAllGuides} className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity">Shop All →</Link>
                                    </div>
                                    <Link href="/cribs?filter=standard" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80" alt="Cribs Directory" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Cribs</span>
                                    </Link>
                                    <Link href="/cribs?filter=conversion-kits" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80" alt="Conversion Kit Directory" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Conversion Kits</span>
                                    </Link>
                                    <Link href="/cribs?filter=mattresses" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80" alt="Mattress Directory" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Crib Mattresses</span>
                                    </Link>
                                </>
                            )}

                            {/* --- DRESSERS MEGA MENU --- */}
                            {activeGuide === "DRESSERS" && (
                                <>
                                    <div className="flex flex-col space-y-3.5 pt-2">
                                        <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">Dressers & Storage</h3>
                                        <Link href="/dressers-storage?filter=dressers" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">3 & 6 Drawer Dressers</Link>
                                        <Link href="/dressers-storage?filter=bookcases" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Bookcases & Shelves</Link>
                                        <Link href="/dressers-storage?filter=toy-boxes" onClick={closeAllGuides} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Toy Storage</Link>
                                        <Link href="/dressers-storage" onClick={closeAllGuides} className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity">Shop All →</Link>
                                    </div>
                                    <Link href="/dressers-storage?filter=dressers" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80" alt="Dressers" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Dressers</span>
                                    </Link>
                                    <Link href="/dressers-storage?filter=bookcases" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" alt="Bookcases" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Bookcases</span>
                                    </Link>
                                    <Link href="/dressers-storage?filter=toy-boxes" onClick={closeAllGuides} className="group text-center block">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                            <Image src="https://images.unsplash.com/photo-1532588213355-52317771dce6?auto=format&fit=crop&w=400&q=80" alt="Toy Boxes" fill className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Toy Boxes</span>
                                    </Link>
                                </>
                            )}

                        </div>
                    </div>
                </>
            )}

            {/* SEARCH BAR PANEL */}
            <div className={`w-full bg-white border-t border-b border-[#efefef] absolute left-0 transition-all duration-300 ease-in-out origin-top z-10 ${isSearchOpen ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-4 invisible pointer-events-none"}`}>
                <div className="max-w-3xl mx-auto px-4 py-3">
                    <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                        <Search className="absolute left-2 w-5 h-5 text-black stroke-[1.75]" />
                        <input ref={searchInputRef} type="text" placeholder="Search for..." className="w-full bg-transparent pl-10 pr-4 py-3 text-[#222] font-medium text-base placeholder-gray-400 focus:outline-none transition-all" />
                    </form>
                </div>
            </div>

            {/* NATIVE STANDARD MOBILE SLIDEOUT DRAWER MENU */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 top-[81px] z-40 flex animate-fadeIn">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setIsOpen(false)} />

                    <div className="relative w-[85%] max-w-[320px] bg-white h-full p-6 flex flex-col overflow-y-auto z-10 shadow-2xl animate-slideInLeft">
                        {activeGuide ? (
                            <div className="flex flex-col h-full animate-fadeIn">
                                <button onClick={closeAllGuides} className="flex items-center gap-1.5 text-neutral-400 text-xs uppercase tracking-wider font-medium mb-6 pt-2">
                                    <ChevronLeft className="w-4 h-4 stroke-[2]" />
                                    <span>Back to Menu</span>
                                </button>

                                {/* MOBILE SUB-MENUS */}
                                {activeGuide === "BEDS" && (
                                    <>
                                        <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">Beds</h3>
                                        <div className="flex gap-6 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                            <Link href="/beds?filter=toddler" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" alt="Toddler Beds" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Toddler Beds</p>
                                            </Link>
                                            <Link href="/beds?filter=twin" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80" alt="Twin Beds" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Twin Beds</p>
                                            </Link>
                                            <Link href="/beds?filter=bunk" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" alt="Bunk Beds" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Bunk Beds</p>
                                            </Link>
                                        </div>
                                        <Link href="/beds" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">Shop All Beds</Link>
                                    </>
                                )}

                                {activeGuide === "CRIBS" && (
                                    <>
                                        <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">Cribs</h3>
                                        <div className="flex gap-6 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                            <Link href="/cribs?filter=standard" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80" alt="Cribs" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Cribs</p>
                                            </Link>
                                            <Link href="/cribs?filter=conversion-kits" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80" alt="Conversion Kits" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Conversion Kits</p>
                                            </Link>
                                            <Link href="/cribs?filter=mattresses" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80" alt="Mattresses" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Crib Mattresses</p>
                                            </Link>
                                        </div>
                                        <Link href="/cribs" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">Shop All Cribs</Link>
                                    </>
                                )}

                                {activeGuide === "DRESSERS" && (
                                    <>
                                        <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">Dressers</h3>
                                        <div className="flex gap-6 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                            <Link href="/dressers-storage?filter=dressers" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80" alt="Dressers" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Dressers</p>
                                            </Link>
                                            <Link href="/dressers-storage?filter=bookcases" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" alt="Bookcases" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Bookcases</p>
                                            </Link>
                                            <Link href="/dressers-storage?filter=toy-boxes" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="block flex-shrink-0 w-40 snap-start">
                                                <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1532588213355-52317771dce6?auto=format&fit=crop&w=400&q=80" alt="Toy Boxes" fill className="object-cover" /></div>
                                                <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Toy Boxes</p>
                                            </Link>
                                        </div>
                                        <Link href="/dressers-storage" onClick={() => { setIsOpen(false); closeAllGuides(); }} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">Shop All Storage</Link>
                                    </>
                                )}
                            </div>
                        ) : (
                            <nav className="flex flex-col space-y-1.5 h-full pt-4">
                                {navLinks.map((link) => {
                                    if (link.isGuideTrigger && link.guideKey) {
                                        return (
                                            <button
                                                key={link.label}
                                                onClick={() => setActiveGuide(link.guideKey!)}
                                                className="text-[14px] text-left tracking-[0.12em] font-medium py-3 text-[#222] flex items-center justify-between border-b border-neutral-50"
                                            >
                                                <span>{link.label}</span>
                                                <span className="text-neutral-300 text-xs">→</span>
                                            </button>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            scroll={false}
                                            onClick={() => {
                                                if (link.href.includes("#")) {
                                                    setTimeout(() => scrollToSection(link.href), 80);
                                                }
                                                setIsOpen(false);
                                            }}
                                            className={`text-[14px] tracking-[0.12em] font-medium py-3 border-b border-neutral-50 ${link.label === "SALE" ? "text-red-500" : "text-[#222]"}`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}

                                <Link href="/account" className="flex items-center gap-3 pt-6 mt-auto text-[#222]" onClick={() => setIsOpen(false)}>
                                    <User className="w-5 h-5 stroke-[1.75]" />
                                    <span className="text-[13px] tracking-[0.12em] font-medium">ACCOUNT</span>
                                </Link>
                            </nav>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}