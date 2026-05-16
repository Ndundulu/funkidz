"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface Slide {
    id: number;
    title: string;
    tagline: string;
    buttonText: string;
    link: string;
    imageLeft: string;
    imageRight: string;
}

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const slides: Slide[] = [
        {
            id: 1,
            title: "The Moss Collection",
            tagline: "MODERN & SUSTAINABLE ECO-DESIGN",
            buttonText: "SHOP NOW",
            link: "/shop/moss",
            imageLeft: "/backgroundcv.jpg",
            imageRight: "/backgroundcv.jpg",
        },
        {
            id: 2,
            title: "Furniture to Grow With",
            tagline: "MADE-TO-ORDER PREMIUM CRAFTSMANSHIP",
            buttonText: "EXPLORE SERIES",
            link: "/shop",
            imageLeft: "/backgroundcv.jpg",
            imageRight: "/backgroundcv.jpg",
        },
        {
            id: 3,
            title: "Designed for Classrooms",
            tagline: "SUSTAINABLE ARCHITECTURE FOR SCHOOLS",
            buttonText: "LEARN MORE",
            link: "/schools",
            imageLeft: "/backgroundcv.jpg",
            imageRight: "/backgroundcv.jpg",
        }
    ];

    const SLIDE_DURATION = 6000; // 6 seconds

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            handleSlideChange((currentSlide + 1) % slides.length);
        }, SLIDE_DURATION);

        return () => resetTimeout();
    }, [currentSlide]);

    const handleSlideChange = (nextIndex: number) => {
        if (nextIndex === currentSlide) return;
        setIsTransitioning(true);

        // Wait for slide downward exit animation before switching data content
        setTimeout(() => {
            setCurrentSlide(nextIndex);
            setIsTransitioning(false);
        }, 800); // Slower, elegant transition window
    };

    return (
        <section className="relative w-full h-[75vh] min-h-[500px] max-h-[750px] bg-white overflow-hidden pb-12">
            {/* Custom SVG Radial Keyframe Animation */}
            <style jsx global>{`
                @keyframes dash {
                    from { stroke-dashoffset: 56.54; }
                    to { stroke-dashoffset: 0; }
                }
                .animate-svg-loading {
                    stroke-dasharray: 56.54;
                    animation: dash ${SLIDE_DURATION}ms linear forwards;
                }
            `}</style>

            {/* Slide Frame Track Container */}
            <div className="relative w-full h-full overflow-hidden px-4 sm:px-8 md:px-12">
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative rounded-sm overflow-hidden">

                    {/* LEFT SIDE: Image + Text Card Overlay */}
                    <div className="relative w-full h-full overflow-hidden bg-gray-50">
                        <Image
                            src={slides[currentSlide].imageLeft}
                            alt={`${slides[currentSlide].title} left view`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center transition-transform duration-1000 ease-out"
                            priority
                        />

                        {/* Elegant Text Card Container with deliberate up/down motion bounds */}
                        <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 sm:px-12 z-10">
                            <div className={`bg-white/95 backdrop-blur-sm px-8 py-10 sm:px-12 sm:py-14 text-center max-w-sm shadow-md border border-gray-100/20 transform transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) ${
                                isTransitioning
                                    ? 'translate-y-[100%] opacity-0'
                                    : 'translate-y-0 opacity-100'
                            }`}>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-medium mb-3">
                                    {slides[currentSlide].tagline}
                                </p>
                                <h1 className="text-xl sm:text-3xl font-serif text-gray-900 tracking-tight leading-tight mb-6">
                                    {slides[currentSlide].title}
                                </h1 >
                                <a
                                    href={slides[currentSlide].link}
                                    className="inline-block font-semibold tracking-[0.15em] text-[11px] text-gray-900 border-b border-black pb-1 hover:text-gray-500 hover:border-gray-400 transition-colors"
                                >
                                    {slides[currentSlide].buttonText}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Standalone Secondary Image Split Frame */}
                    <div className="relative w-full h-full hidden md:block bg-gray-100 border-l border-white/20">
                        <Image
                            src={slides[currentSlide].imageRight}
                            alt={`${slides[currentSlide].title} right view`}
                            fill
                            sizes="50vw"
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </div>

            {/* FIXED CENTER ARROW: Pulled outside content bands for exact geometric centering */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 translate-y-1/2">
                <button
                    onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform text-gray-600 hover:text-black border border-gray-200/80"
                    aria-label="Scroll down"
                >
                    <ChevronDown className="w-5 h-5 stroke-[1.5]" />
                </button>
            </div>

            {/* RADIAL LOADER DOTS CORNER NAVIGATION */}
            <div className="absolute bottom-4 right-6 sm:right-14 z-30 flex items-center gap-4 bg-white/60 backdrop-blur-sm sm:bg-transparent px-3 py-2 rounded-full">
                {slides.map((_, index) => {
                    const isActive = index === currentSlide;
                    return (
                        <button
                            key={index}
                            onClick={() => handleSlideChange(index)}
                            className="relative w-[22px] h-[22px] flex items-center justify-center focus:outline-none group"
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            {/* Static Background circle tray */}
                            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                isActive ? 'bg-white' : 'bg-gray-400/70 group-hover:bg-gray-600'
                            }`} />

                            {/* Animated circular track overlay */}
                            {isActive && (
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="9"
                                        className="animate-svg-loading"
                                        stroke="white"
                                        strokeWidth="2"
                                        fill="transparent"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}