'use client';

import { useState } from 'react';
import Link from 'next/link'; // Use this if you're using Next.js
import { Menu, X, ShoppingCart, User } from 'lucide-react';

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
        <header className="w-full border-b bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    Funkidz
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-medium text-gray-700 hover:text-black transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Icons */}
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <User className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                        <ShoppingCart className="w-5 h-5" />
                        {/* Cart count badge */}
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t bg-white">
                    <nav className="flex flex-col py-4 px-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-medium text-lg py-2 text-gray-700 hover:text-black transition-colors"
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