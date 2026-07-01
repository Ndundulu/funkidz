import Link from "next/link";
import Image from "next/image";
import { Home, BookOpen, Gift, Users, Hospital, TrendingUp, Phone, User, ArrowLeftRight } from "lucide-react";

interface MobileDrawerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onClose: () => void;
}

const menuData = {
    HOME: [
        { name: "Newborn", subtitle: "0 - 3 months", image: "/images/cribs/standardcrib/Standard-Cot.jpg", link: "/home/newborn" },
        { name: "Infant", subtitle: "4 - 11 months", image: "/images/cribs/standardcrib/infant-crib.jpeg", link: "/home/infant" },
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
        { name: "Sports", subtitle: "", image: "/images/projects/sport.jpg", link: "/club/sports" },
        { name: "Music", subtitle: "", image: "/images/projects/music.jpg", link: "/club/music" },
        { name: "Coding", subtitle: "", image: "/images/projects/code.jpg", link: "/club/coding" }
    ]
};

const flatMenu = [
    { label: "HOSPITALS", href: "/hospital", icon: Hospital },
    { label: "PARENTS", href: "/parent", icon: Users },
    { label: "SALE", href: "/sale", icon: TrendingUp, highlight: true },
    { label: "TRADE-IN", href: "/#trade-in", icon: ArrowLeftRight },
    { label: "CONTACT", href: "/contact", icon: Phone },
    { label: "MY ACCOUNT", href: "/account", icon: User },
];

export default function MobileDrawer({ isOpen, setIsOpen, onClose }: MobileDrawerProps) {
    if (!isOpen) return null;

    const resetAndClose = () => {
        setIsOpen(false);
        onClose();
    };

    const renderSection = (
        title: string,
        key: keyof typeof menuData,
        IconComponent: any,
        shopAllHref: string
    ) => {
        const items = menuData[key];

        return (
            <div className="mb-5">
                {/* Section Header with Heartbeat */}
                <div className="flex items-center gap-3 mb-4 px-1">
                    {IconComponent && (
                        <IconComponent className="w-5 h-5 text-neutral-600 animate-heartbeat" />
                    )}
                    <h3 className="font-serif text-xl font-normal text-neutral-800">{title}</h3>
                </div>

                {/* Horizontal Cards */}
                <div className="relative flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            onClick={resetAndClose}
                            className="block flex-shrink-0 w-36 snap-start"
                        >
                            <div className="relative aspect-[4/3] bg-neutral-50 mb-2 border border-neutral-100 rounded-lg overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="150px"
                                    className="object-cover"
                                />
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

                    {/* Simple Swipe Hint - Below the cards */}
                    {/* Moving Swipe Hint */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-1 flex items-center gap-1.5 text-sm tracking-widest font-medium text-neutral-500 pointer-events-none animate-swipeMove">
                        <span className="animate-arrowLeft">←</span>
                        <span>swipe</span>
                        <span className="animate-arrowRight">→</span>
                    </div>
                </div>

                {/* Shop All */}
                <Link
                    href={shopAllHref}
                    onClick={resetAndClose}
                    className="mt-3 inline-flex items-center text-xs font-semibold tracking-widest text-emerald-800 hover:text-emerald-950 border border-emerald-700/30 hover:border-emerald-700 px-4 py-1.5 rounded-md transition-all active:scale-[0.97]"
                >
                    SHOP ALL {title.toUpperCase()}
                </Link>

                <div className="h-px bg-neutral-300 mt-6" />
            </div>
        );
    };

    return (
        <div className="lg:hidden fixed inset-0 top-[81px] z-40 flex animate-fadeIn">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={resetAndClose} />

            <div className="relative w-[85%] max-w-[340px] bg-white h-full flex flex-col overflow-hidden shadow-2xl animate-slideInLeft">
                <div className="flex-1 overflow-y-auto p-5">
                    {renderSection("Home", "HOME", Home, "/shop/home")}
                    {renderSection("Education", "EDUCATION", BookOpen, "/shop/education")}
                    {renderSection("Clubs", "CLUB", Gift, "/shop/club")}

                    <div className="pt-3">
                        {flatMenu.map((item, index) => (
                            <div key={item.label}>
                                <Link
                                    href={item.href}
                                    onClick={resetAndClose}
                                    className={`w-full flex items-center gap-4 py-4 px-2 text-left text-base font-medium rounded-xl transition-colors active:bg-neutral-50 ${
                                        item.highlight ? "text-red-600 hover:bg-red-50" : "text-neutral-800 hover:bg-neutral-50"
                                    }`}
                                >
                                    {item.icon && <item.icon className="w-5 h-5 text-neutral-600" />}
                                    <span>{item.label}</span>
                                </Link>
                                {index !== flatMenu.length - 1 && <div className="h-px bg-neutral-200 mx-2" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

