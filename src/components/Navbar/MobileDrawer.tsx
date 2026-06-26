import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Home, BookOpen, Users, Hospital, Gift, TrendingUp, Phone, User, ArrowLeftRight} from "lucide-react";
import { useState } from "react";

interface MobileDrawerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onClose: () => void;
}

type GuideKey = "HOME" | "EDUCATION" | "CLUB" | null;

const menuData = {
    HOME: [
        { name: "Newborn", subtitle: "0 - 3 months", image: "/images/cribs/standardcrib/Standard-Cot.jpg", link: "/home/newborn" },
        { name: "Infant", subtitle: "4 - 11 months", image: "/images/cribs/standardcrib/Infant-crib.jpeg", link: "/home/infant" },
        { name: "Toddler", subtitle: "1 - 3 years", image: "/images/juniorbeds/toddler-bed.png", link: "/home/toddler" },
        { name: "Tween", subtitle: "4 - 12 years", image: "/images/juniorbeds/Flower-bed-Junior-bed.jpg", link: "/home/tween" },
        { name: "Teen", subtitle: "13 - 19 years", image: "/images/juniorbeds/Junior-bed.jpg", link: "/home/teen" }
    ],
    EDUCATION: [
        { name: "ECDE", subtitle: "", image: "/images/projects/School-Chair.png", link: "/education/ecde" },
        { name: "Primary School", subtitle: "", image: "/images/projects/school30.png", link: "/education/primary" },
        { name: "High School", subtitle: "", image: "/images/projects/school2.jpg", link: "/education/highschool" }
    ],
    CLUB: [
        { name: "Environment", subtitle: "", image: "/images/categories/environment.jpg", link: "/club/environment" },
        { name: "Science", subtitle: "", image: "/images/categories/science.jpg", link: "/club/science" }
    ]
};

const mainMenu = [
    { label: "SHOP ALL", href: "/shop", icon: null },
    { label: "HOME", action: "HOME" as GuideKey, icon: Home },
    { label: "EDUCATION", action: "EDUCATION" as GuideKey, icon: BookOpen },
    { label: "HOSPITAL", href: "/hospital", icon: Hospital },
    { label: "PARENT", href: "/parent", icon: Users },
    { label: "CLUB", action: "CLUB" as GuideKey, icon: Gift },
    { label: "SALE", href: "/sale", icon: TrendingUp, highlight: true },
    { label: "TRADE-IN", href: "/#trade-in", icon: ArrowLeftRight },
    { label: "CONTACT", href: "/contact", icon: Phone },
    { label: "MY ACCOUNT", href: "/account", icon: User },
];

export default function MobileDrawer({ isOpen, setIsOpen, onClose }: MobileDrawerProps) {
    const [activeGuide, setActiveGuide] = useState<GuideKey>(null);

    if (!isOpen) return null;

    const resetAndClose = () => {
        setIsOpen(false);
        setActiveGuide(null);
        onClose();
    };

    const cards = activeGuide ? menuData[activeGuide] : [];

    return (
        <div className="lg:hidden fixed inset-0 top-[81px] z-40 flex animate-fadeIn">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-[85%] max-w-[340px] bg-white h-full flex flex-col overflow-hidden shadow-2xl animate-slideInLeft">
                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeGuide ? (
                        <div className="flex flex-col h-full animate-fadeIn">

                            <button onClick={() => setActiveGuide(null)} className="flex items-center gap-1.5 text-neutral-400 text-xs uppercase tracking-wider font-medium mb-6 pt-2">
                                <ChevronLeft className="w-4 h-4 stroke-[2]" />
                                <span>Back to Menu</span>
                            </button>

                            <h3 className="font-serif text-2xl font-normal text-neutral-800 mb-6">
                                {activeGuide}
                            </h3>
                            <div className="flex gap-4 mb-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                {cards.map((item) => (
                                    <Link key={item.name} href={item.link} onClick={resetAndClose} className="block flex-shrink-0 w-36 snap-start">
                                        <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill sizes="150px" className="object-cover" />
                                        </div>

                                        <p className="text-[10px] text-center tracking-widest text-neutral-500 font-semibold uppercase">
                                            {item.name}
                                        </p>

                                        {item.subtitle && (
                                            <p className="text-[10px] text-center text-neutral-400">
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>

                            <Link href={activeGuide === "HOME" ? "/shop/home" : activeGuide === "EDUCATION" ? "/shop/education" : "/shop/club"}
                                onClick={resetAndClose} className="w-full bg-[#222] text-white py-3.5 text-center text-xs uppercase tracking-widest font-semibold block rounded-sm shadow-xs">
                                Shop All {activeGuide}
                            </Link>

                        </div>
                    ) : (
                        <nav className="flex flex-col">
                            {mainMenu.map((item, index) => (
                                <div key={item.label}>
                                    {item.action ? (
                                        <button
                                            onClick={() => setActiveGuide(item.action)}
                                            className="w-full flex items-center gap-4 py-4 px-2 text-left text-base font-medium text-neutral-800 hover:bg-neutral-50 rounded-xl transition-colors active:bg-neutral-100"
                                        >
                                            {item.icon && <item.icon className="w-5 h-5 text-neutral-500" />}
                                            <span>{item.label}</span>
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            onClick={resetAndClose}
                                            className={`w-full flex items-center gap-4 py-4 px-2 text-left text-base font-medium rounded-xl transition-colors active:bg-neutral-100 ${
                                                item.highlight
                                                    ? "text-red-600 hover:bg-red-50"
                                                    : "text-neutral-800 hover:bg-neutral-50"
                                            }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5 text-neutral-500" />}
                                            <span>{item.label}</span>
                                        </Link>
                                    )}

                                    {/* Divider */}
                                    {index !== mainMenu.length - 1 && (
                                        <div className="h-px bg-neutral-100 mx-2" />
                                    )}
                                </div>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}