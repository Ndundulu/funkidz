"use client"; // <--- Add this exact line right here at the very top!

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/shop', label: 'Shop' },
        { href: '/trade-in', label: 'Trade-In' },
        { href: '/schools', label: 'Schools' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
            {/* Main Navigation Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative">

                {/* LEFT: Mobile Menu Button */}
                <div className="flex items-center w-1/4 justify-start">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-all text-gray-800"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>

                {/* CENTER: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/funkidz.png"
                            alt="Funkidz Logo"
                            width={130}
                            height={38}
                            className="h-9 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* RIGHT: Search and Custom Sketched Cart Icon */}
                <div className="flex items-center justify-end gap-2 sm:gap-4 w-1/4">
                    {/* Search Button */}
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-all text-gray-800 active:scale-95">
                        <Search className="w-6 h-6 stroke-[1.75]" />
                    </button>

                    {/* Custom Sketched Shopping Cart Button */}
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-all text-gray-800 active:scale-95 relative flex items-center justify-center">
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
                            <ellipse cx="60" cy="17" rx="4" ry="8" className="fill-none" strokeWidth="3" />
                        </svg>

                        <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            3
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <div className="border-t border-gray-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
                    <nav className="flex flex-col py-4 px-6 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-medium text-lg py-2.5 text-gray-700 hover:text-black hover:translate-x-1 transition-all block"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}