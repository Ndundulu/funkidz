import Link from "next/link";
import Image from "next/image";
import { GuideKey } from "./Navbar";

interface MegaMenuProps {
    activeGuide: GuideKey;
    onClose: () => void;
}

export default function MegaMenu({ activeGuide, onClose }: MegaMenuProps) {
    if (!activeGuide) return null;

    const shopLinks = {
        HOME_FURNITURE: "/shop/home",
        EDUCATION: "/shop/education",
        CLUB: "/shop/club",
    };

    return (
        <>
            <div className="hidden lg:block fixed inset-0 bg-black/25 top-[81px] z-40 transition-opacity animate-fadeIn" onClick={onClose} />

            <div className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#efefef] shadow-xl z-50 animate-slideDown">

                <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">


                    {/* HOME FURNITURE MENU */}
                    {activeGuide === "HOME_FURNITURE" && (
                        <>

                            <div className="flex flex-col space-y-3.5 pt-2">

                                <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">
                                    Home Furniture
                                </h3>

                                <Link href="/home/newborn" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Newborn (0 - 3 months)
                                </Link>

                                <Link href="/home/infant" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Infant (4 - 11 months)
                                </Link>

                                <Link href="/home/toddler" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Toddler (1 - 3 years)
                                </Link>

                                <Link href="/home/tween" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Tween (4 - 12 years)
                                </Link>

                                <Link href="/home/teen" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Teen (13 - 19 years)
                                </Link>

                                <Link
                                    href={shopLinks[activeGuide]}
                                    onClick={onClose}
                                    className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity"
                                >
                                    Shop All {activeGuide.replace("_", " ")}
                                </Link>

                            </div>


                            <Link href="/home/newborn" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/cribs/standardcrib/Standard-Cot.jpg" alt="Newborn" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    Newborn
                                </span>

                            </Link>


                            <Link href="/home/infant" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/cribs/standardcrib/infant-crib.jpeg" alt="Infant" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    Infant
                                </span>

                            </Link>


                            <Link href="/home/toddler" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/juniorbeds/toddler-bed.png" alt="Toddler" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    Toddler
                                </span>

                            </Link>

                        </>
                    )}
                    {/* EDUCATION MENU */}
                    {activeGuide === "EDUCATION" && (
                        <>
                            <div className="flex flex-col space-y-3.5 pt-2">

                                <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">
                                    Education
                                </h3>

                                <Link href="/education/ecde" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    ECDE
                                </Link>

                                <Link href="/education/primary" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Primary School
                                </Link>

                                <Link href="/education/highschool" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    High School
                                </Link>

                                <Link
                                    href={shopLinks[activeGuide]}
                                    onClick={onClose}
                                    className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity"
                                >
                                    Shop All {activeGuide}
                                </Link>

                            </div>


                            <Link href="/education/ecde" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/projects/School-Chair.png" alt="ECDE" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    ECDE
                                </span>

                            </Link>


                            <Link href="/education/primary" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/projects/school30.png" alt="Primary School" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    Primary School
                                </span>

                            </Link>


                            <Link href="/education/highschool" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/projects/school2.jpg" alt="High School" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    High School
                                </span>

                            </Link>


                        </>
                    )}


                    {/* CLUB MENU */}
                    {activeGuide === "CLUB" && (
                        <>

                            <div className="flex flex-col space-y-3.5 pt-2">

                                <h3 className="font-serif text-base text-neutral-800 border-b border-neutral-100 pb-2">
                                    Club
                                </h3>

                                <Link href="/club/environment" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Environment
                                </Link>

                                <Link href="/club/science" onClick={onClose} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors">
                                    Science
                                </Link>

                                <Link
                                    href={shopLinks[activeGuide]}
                                    onClick={onClose}
                                    className="text-xs tracking-widest text-black font-bold uppercase pt-4 border-b border-black w-max pb-0.5 hover:opacity-70 transition-opacity"
                                >
                                    Shop All {activeGuide}
                                </Link>

                            </div>


                            <Link href="/club/environment" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/categories/environment.jpg" alt="Environment" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    Environment
                                </span>

                            </Link>


                            <Link href="/club/science" onClick={onClose} className="group text-center block">

                                <div className="relative aspect-[4/3] bg-neutral-50 mb-2 overflow-hidden border border-neutral-100">
                                    <Image src="/images/categories/science.jpg" alt="Science" fill sizes="25vw" className="object-cover group-hover:scale-102 transition-transform duration-300" />
                                </div>

                                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium group-hover:text-black">
                                    Science
                                </span>

                            </Link>


                        </>
                    )}

                </div>

            </div>

        </>
    );
}