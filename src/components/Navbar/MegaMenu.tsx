import Link from "next/link";
import Image from "next/image";
import { GuideKey } from "./Navbar";

interface MegaMenuProps {
    activeGuide: GuideKey;
    onClose: () => void;
}

export default function MegaMenu({ activeGuide, onClose }: MegaMenuProps) {
    if (!activeGuide) return null;

    return (
        <>
            <div className="hidden lg:block fixed inset-0 bg-black/25 top-[81px] z-40 transition-opacity animate-fadeIn" onClick={onClose} />
            <div className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#efefef] shadow-xl z-50 animate-slideDown">
                <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">

                    {/* BEDS MENU */}
                    {activeGuide === "BEDS" && (
                        <>
                            <div className="flex flex-col space-y-3.5 pt-2">
                                <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">Beds</h3>
                                <Link href="/beds/toddler" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Toddler Beds</Link>
                                <Link href="/beds/twin" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Kids and Teen Beds</Link>
                                <Link href="/beds/bunk" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Bunk & Loft Beds</Link>
                                <Link href="/beds" onClick={onClose} className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity">Shop All Beds →</Link>
                            </div>
                            <Link href="/beds/toddler" onClick={onClose} className="group text-center block">
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/juniorbeds/toddler-bed.png" alt="Toddler Beds" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Toddler Beds</span>
                            </Link>
                            <Link href="/beds/twin" onClick={onClose} className="group text-center block">
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/juniorbeds/Flower-bed-Junior-bed.jpg" alt="Twin Beds" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Kids and Teen Beds</span>
                            </Link>
                            <Link href="/beds/bunk" onClick={onClose} className="group text-center block">
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/deckers/Double-decker-with-Study-desk.jpg" alt="Bunk Beds" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Bunk Beds</span>
                            </Link>
                        </>
                    )}

                    {/* CRIBS MENU */}
                    {activeGuide === "CRIBS" && (
                        <>
                            <div className="flex flex-col space-y-3.5 pt-2">
                                <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">Cribs</h3>

                                <Link
                                    href="/cribs?filter=convertible"
                                    onClick={onClose}
                                    className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors"
                                >
                                    Convertible Cribs
                                </Link>

                                <Link
                                    href="/cribs?filter=standard"
                                    onClick={onClose}
                                    className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors"
                                >
                                    Standard Cribs
                                </Link>

                                <Link
                                    href="/cribs"
                                    onClick={onClose}
                                    className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity"
                                >
                                    Shop All →
                                </Link>
                            </div>

                            {/* Image Cards */}
                            <Link
                                href="/cribs?filter=standard"
                                onClick={onClose}
                                className="group text-center block"
                            >
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image
                                        src="/images/cribs/standardcrib/Standard-Cribs.jpeg"
                                        alt="Standard Cribs"
                                        fill
                                        sizes="25vw"
                                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    Standard Cribs
                                </span>
                            </Link>

                            <Link
                                href="/cribs?filter=convertible"
                                onClick={onClose}
                                className="group text-center block"
                            >
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image
                                        src="/images/cribs/convertablecrib/convertable-crib.png"
                                        alt="Convertible Cribs"
                                        fill
                                        sizes="25vw"
                                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                      Convertible Cribs
                                </span>
                            </Link>
                        </>
                    )}

                    {/* DRESSERS MENU */}
                    {activeGuide === "DRESSERS" && (
                        <>
                            <div className="flex flex-col space-y-3.5 pt-2">
                                <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">Dressers & Storage</h3>
                                <Link href="/storage-dressers?filter=shelf" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Shelves</Link>
                                <Link href="/storage-dressers?filter=change" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Change Unit</Link>
                                <Link href="/storage-dressers?filter=chest" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Chest of Drawers</Link>
                                <Link href="/storage-dressers?filter=toy" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Toy Storage</Link>
                                <Link href="/storage-dressers?filter=wardrobe" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">Wardrobe</Link>
                                <Link href="/storage-dressers" onClick={onClose} className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity">Shop All →</Link>
                            </div>

                            {/* Updated image paths below to use the same standardized query parameters */}
                            <Link href="/storage-dressers?filter=shelf" onClick={onClose} className="group text-center block">
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/storage-dressers/floating-shelf.jpg" alt="Dressers" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Shelves</span>
                            </Link>
                            <Link href="/storage-dressers?filter=change" onClick={onClose} className="group text-center block">
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/storage-dressers/Changeunit-Storage-with-basin.jpeg" alt="Bookcases" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Change Unit</span>
                            </Link>
                            <Link href="/storage-dressers?filter=toy" onClick={onClose} className="group text-center block">
                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/storage-dressers/toy-chest.png" alt="Toy Boxes" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>
                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">Storage</span>
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}