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
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/juniorbeds/toddler-bed.png" alt="Toddler Beds" fill sizes="150px" className="object-cover" />
                                        </div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Toddler Beds</p>
                                    </Link>
                                    <Link href="/beds/twin" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/juniorbeds/Junior-bed.jpg" alt="Twin Beds" fill sizes="150px" className="object-cover" />
                                        </div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Kids Beds</p>
                                    </Link>
                                    <Link href="/beds/bunk" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/deckers/Double-decker-with-Study-desk.jpg" alt="Bunk Beds" fill sizes="150px" className="object-cover" />
                                        </div>
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
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="/images/cribs/convertablecrib/convertable-crib.png" alt="ConvertableCribs" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Convertable Cribs</p>
                                    </Link>
                                    <Link href="/cribs?filter=standard" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden"><Image src="/images/cribs/standardcrib/Standard-Cribs.jpeg" alt="Standard Cribs" fill sizes="150px" className="object-cover" /></div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Standard Cribs</p>
                                    </Link>
                                </div>
                                <Link href="/cribs" onClick={resetAndClose} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">Shop All Cribs</Link>
                            </>
                        )}

                        {/* DRESSERS SUB-DRAWER */}
                        {activeGuide === "DRESSERS" && (
                            <>
                                <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">Organizers</h3>
                                <div className="flex gap-4 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">

                                    {/* Shelves */}
                                    <Link href="/storage-dressers?filter=shelf" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/storage-dressers/floating-shelf.jpg" alt="Shelves" fill sizes="150px" className="object-cover" />
                                        </div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Shelves</p>
                                    </Link>

                                    {/* Change Units */}
                                    <Link href="/storage-dressers?filter=change" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-3 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/storage-dressers/Changeunit-Storage-with-basin.jpeg" alt="Change Units" fill sizes="150px" className="object-cover" />
                                        </div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Change Units</p>
                                    </Link>

                                    {/* Chest of Drawers */}
                                    <Link href="/storage-dressers?filter=chest" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/storage-dressers/chest.png" alt="Chest of Drawers" fill sizes="150px" className="object-cover" />
                                        </div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Chest of Drawers</p>
                                    </Link>

                                    {/* Toy Storage */}
                                    <Link href="/storage-dressers?filter=toy" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/storage-dressers/toy-chest.png" alt="Toy Storage" fill sizes="150px" className="object-cover" />
                                        </div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Toy Boxes</p>
                                    </Link>

                                    {/* Wardrobes */}
                                    <Link href="/storage-dressers?filter=wardrobe" onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src="/images/storage-dressers/wardrobe.png" alt="Wardrobes" fill sizes="150px" className="object-cover" />
                                        </div>
                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">Wardrobe</p>
                                    </Link>

                                </div>

                                {/* Shop All link typo safely corrected here */}
                                <Link href="/storage-dressers" onClick={resetAndClose} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">
                                    Shop All Storage
                                </Link>
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