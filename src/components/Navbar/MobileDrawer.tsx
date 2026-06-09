import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { GuideKey } from "./Navbar";

interface MobileDrawerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    activeGuide: GuideKey;
    setActiveGuide: (key: GuideKey) => void;
    onClose: () => void;
}

export default function MobileDrawer({ isOpen, setIsOpen, activeGuide, setActiveGuide, onClose }: MobileDrawerProps) {
    if (!isOpen) return null;

    const resetAndClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <div className="lg:hidden fixed inset-0 top-[81px] z-40 flex animate-fadeIn">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setIsOpen(false)} />

            <div className="relative w-[85%] max-w-[320px] bg-white h-full p-6 flex flex-col overflow-y-auto z-10 shadow-2xl animate-slideInLeft">
                {activeGuide ? (
                    <div className="flex flex-col h-full animate-fadeIn">
                        <button onClick={() => setActiveGuide(null)} className="flex items-center gap-1.5 text-neutral-400 text-xs uppercase tracking-wider font-medium mb-6 pt-2">
                            <ChevronLeft className="w-4 h-4 stroke-[2]" />
                            <span>Back to Menu</span>
                        </button>

                        {/* BEDS SUB-DRAWER */}
                        {activeGuide === "BEDS" && (
                            <>
                                <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">Beds</h3>
                                <div className="flex gap-4 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                    <Link href="/beds/toddler" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="/images/juniorbeds/toddler bed.png" alt="Toddler Beds" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Toddler Beds</p>
                                    </Link>
                                    <Link href="/beds/twin" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="/images/juniorbeds/junior bed.jpg" alt="Twin Beds" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Kids Beds</p>
                                    </Link>
                                    <Link href="/beds/bunk" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="/images/deckers/Double decker with Study desk.jpg" alt="Bunk Beds" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Bunk Beds</p>
                                    </Link>
                                </div>
                                <Link href="/beds" onClick={resetAndClose} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">Shop All Beds</Link>
                            </>
                        )}

                        {/* CRIBS SUB-DRAWER */}
                        {activeGuide === "CRIBS" && (
                            <>
                                <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">Cribs</h3>
                                <div className="flex gap-4 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                    <Link href="/cribs?filter=convertible" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80" alt="Cribs" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Convertible Cribs</p>
                                    </Link>
                                    <Link href="/cribs?filter=conversion-kits" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80" alt="Conversion Kits" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Conversion Kits</p>
                                    </Link>
                                    <Link href="/cribs?filter=mattresses" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80" alt="Mattresses" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Crib Mattresses</p>
                                    </Link>
                                </div>
                                <Link href="/cribs" onClick={resetAndClose} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">Shop All Cribs</Link>
                            </>
                        )}

                        {/* DRESSERS SUB-DRAWER */}
                        {activeGuide === "DRESSERS" && (
                            <>
                                <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">Dressers</h3>
                                <div className="flex gap-4 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                    <Link href="/dressers-storage?filter=dressers" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80" alt="Dressers" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Dressers</p>
                                    </Link>
                                    <Link href="/dressers-storage?filter=bookcases" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" alt="Bookcases" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Bookcases</p>
                                    </Link>
                                    <Link href="/dressers-storage?filter=toy-boxes" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="https://images.unsplash.com/photo-1532588213355-52317771dce6?auto=format&fit=crop&w=400&q=80" alt="Toy Boxes" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Toy Boxes</p>
                                    </Link>
                                </div>
                                <Link href="/dressers-storage" onClick={resetAndClose} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">Shop All Storage</Link>
                            </>
                        )}
                    </div>
                ) : (
                    /* MAIN LEVEL TOP MENU */
                    <nav className="flex flex-col space-y-4 pt-4 text-[#222]">
                        <Link href="/shop" onClick={resetAndClose} className="text-sm font-medium tracking-wide">SHOP ALL</Link>
                        <button onClick={() => setActiveGuide("BEDS")} className="text-left text-sm font-medium tracking-wide uppercase">BEDS</button>
                        <button onClick={() => setActiveGuide("CRIBS")} className="text-left text-sm font-medium tracking-wide uppercase">CRIBS</button>
                        <button onClick={() => setActiveGuide("DRESSERS")} className="text-left text-sm font-medium tracking-wide uppercase">DRESSERS & STORAGE</button>
                        <Link href="/sale" onClick={resetAndClose} className="text-sm font-medium tracking-wide text-red-500">SALE</Link>
                        <Link href="/#trade-in" onClick={resetAndClose} className="text-sm font-medium tracking-wide">TRADE-IN</Link>
                        <Link href="/contact" onClick={resetAndClose} className="text-sm font-medium tracking-wide">CONTACT</Link>
                        <Link href="/account" onClick={resetAndClose} className="text-sm font-medium tracking-wide pt-4 border-t border-[#efefef]">MY ACCOUNT</Link>
                    </nav>
                )}
            </div>
        </div>
    );
}