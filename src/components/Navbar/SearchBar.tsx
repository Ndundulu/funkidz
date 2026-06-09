import { Search } from "lucide-react";
import { RefObject } from "react";

interface SearchBarProps {
    isSearchOpen: boolean;
    inputRef: RefObject<HTMLInputElement | null>;
}

export default function SearchBar({ isSearchOpen, inputRef }: SearchBarProps) {
    return (
        <div className={`w-full bg-white border-t border-b border-[#efefef] absolute left-0 transition-all duration-300 ease-in-out origin-top z-10 ${
            isSearchOpen ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}>
            <div className="max-w-3xl mx-auto px-4 py-3">
                <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                    <Search className="absolute left-2 w-5 h-5 text-black stroke-[1.75]" />
                    <input ref={inputRef} type="text" placeholder="Search for..." className="w-full bg-transparent pl-10 pr-4 py-3 text-[#222] font-medium text-base placeholder-gray-400 focus:outline-none transition-all" />
                </form>
            </div>
        </div>
    );
}