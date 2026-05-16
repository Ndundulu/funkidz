"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/shop', label: 'Shop' },
        { href: '/trade-in', label: 'Trade-In' },
        { href: '/schools', label: 'Schools' },
        { href: '/contact', label: 'Contact' },
    ];

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative bg-white">

                {/* LEFT: Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/funkidz.png"
                            alt="Funkidz Logo"
                            width={140}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* CENTER: Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center justify-center gap-x-8 text-base font-semibold text-gray-800">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-black transition-colors py-1"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* RIGHT: Icons */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Search Button */}
                    <button
                        onClick={() => {
                            setIsSearchOpen(!isSearchOpen);
                            if (isOpen) setIsOpen(false);
                        }}
                        className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                            isSearchOpen ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                    >
                        {isSearchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
                    </button>

                    {/* Account Icon - Desktop only */}
                    <Link
                        href="/account"
                        className="hidden lg:flex p-2.5 hover:bg-gray-50 rounded-xl transition-all text-gray-800"
                    >
                        <User className="w-6 h-6" />
                    </Link>

                    {/* Cart Icon */}
                    <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-all text-gray-800 active:scale-95 relative flex items-center justify-center">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-8 h-8 fill-none stroke-current"
                            strokeWidth="3.5"
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
                            <ellipse cx="60" cy="17" rx="4" ry="8" strokeWidth="3" />
                        </svg>
                        <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            3
                        </span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            if (isSearchOpen) setIsSearchOpen(false);
                        }}
                        className="lg:hidden p-2.5 hover:bg-gray-50 rounded-xl transition-all text-gray-800"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* EXPANDABLE SEARCH BAR */}
            <div
                className={`w-full bg-white border-t border-b border-gray-200 absolute left-0 transition-all duration-300 z-10 ${
                    isSearchOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
                }`}
            >
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <form onSubmit={(e) => e.preventDefault()} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for products..."
                            className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3.5 rounded-2xl text-base focus:outline-none focus:border-black"
                        />
                    </form>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="lg:hidden border-t bg-white shadow-xl absolute left-0 w-full z-10">
                    <nav className="flex flex-col py-6 px-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-semibold text-lg py-3 text-gray-800 hover:text-black transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Account inside Mobile Menu */}
                        <Link
                            href="/account"
                            className="flex items-center gap-3 pt-6 mt-4 border-t border-gray-200 text-gray-800 hover:text-black"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-6 h-6" />
                            <span className="font-semibold text-lg">My Account</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}