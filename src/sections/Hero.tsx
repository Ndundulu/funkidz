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
            imageLeft: "/backcover5.jpg",
            imageRight: "/Storageunit.jpg",
        },
        {
            id: 2,
            title: "Furniture to Grow With",
            tagline: "MADE-TO-ORDER PREMIUM CRAFTSMANSHIP",
            buttonText: "EXPLORE SERIES",
            link: "/shop",
            imageLeft: "/images/roomsetup/babyroom.jpg",
            imageRight: "/images/deckers/Double-decker-with-trundle.jpg",
        },
        {
            id: 3,
            title: "Designed for Classrooms",
            tagline: "SUSTAINABLE ARCHITECTURE FOR SCHOOLS",
            buttonText: "LEARN MORE",
            link: "/schools",
            imageLeft: "/school2.jpg",
            imageRight: "/school31.png",
        }
    ];

    const SLIDE_DURATION = 6000;

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

        setTimeout(() => {
            setCurrentSlide(nextIndex);
            setIsTransitioning(false);
        }, 800);
    };

    return (
        /* FIXED: Removed pb-12 here so there is no extra white gap at the bottom */
        <section className="relative w-full h-[75vh] min-h-[500px] max-h-[750px] bg-white overflow-visible">
            {/* Progress Circle Animation */}
            <style jsx global>{`
                @keyframes progress-fill {
                    from {
                        stroke-dashoffset: 44;
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                .animate-progress {
                    animation: progress-fill ${SLIDE_DURATION}ms linear forwards;
                }
            `}</style>

            <div className="relative w-full h-full overflow-hidden">
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">

                    {/* LEFT SIDE */}
                    <div className="relative w-full h-full overflow-hidden bg-gray-50">
                        <Image
                            src={slides[currentSlide].imageLeft}
                            alt={`${slides[currentSlide].title} left view`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            /* RESTORED: object-cover back to how you like it */
                            className="object-cover object-center transition-transform duration-1000 ease-out"
                            priority
                        />

                        {/* Text Overlay Box */}
                        <div className="absolute inset-0 flex items-start justify-center md:justify-start pt-10 px-6 sm:px-12 z-10">
                            <div className={`bg-white/95 backdrop-blur-sm px-8 py-10 sm:px-12 sm:py-14 text-center max-w-sm shadow-md border border-gray-100/20 transform transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) ${
                                isTransitioning ? 'translate-y-[100%] opacity-0' : 'translate-y-0 opacity-100'
                            }`}>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-medium mb-3">
                                    {slides[currentSlide].tagline}
                                </p>
                                <h1 className="text-xl sm:text-3xl font-serif text-gray-900 tracking-tight leading-tight mb-6">
                                    {slides[currentSlide].title}
                                </h1>
                                <a
                                    href={slides[currentSlide].link}
                                    className="inline-block font-semibold tracking-[0.15em] text-[11px] text-gray-900 border-b border-black pb-1 hover:text-gray-500 hover:border-gray-400 transition-colors"
                                >
                                    {slides[currentSlide].buttonText}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative w-full h-full hidden md:block bg-gray-100 border-l border-white/20">
                        <Image
                            src={slides[currentSlide].imageRight}
                            alt={`${slides[currentSlide].title} right view`}
                            fill
                            sizes="50vw"
                            /* RESTORED: object-cover back to how you like it */
                            className="object-cover object-center"
                        />
                    </div>
                </div>

                {/* LOADER DOTS */}
                <div className="absolute bottom-6 right-8 sm:right-12 z-30 flex items-center gap-4 select-none">
                    {slides.map((_, index) => {
                        const isActive = index === currentSlide;
                        return (
                            <button
                                key={index}
                                onClick={() => handleSlideChange(index)}
                                className="relative w-4 h-4 flex items-center justify-center focus:outline-none group transition-transform active:scale-95"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                {isActive ? (
                                    <div className="relative w-4 h-4 flex items-center justify-center">
                                        <div className="absolute w-2 h-2 rounded-full bg-gray-400" />
                                        <svg className="absolute w-4 h-4 -rotate-90 z-10" viewBox="0 0 16 16">
                                            <circle
                                                cx="8"
                                                cy="8"
                                                r="7"
                                                stroke="#ffffff"
                                                strokeWidth="2"
                                                fill="transparent"
                                                strokeLinecap="round"
                                                strokeDasharray="44"
                                                strokeDashoffset="44"
                                                className="animate-progress"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-400 transition-all duration-300 group-hover:bg-white" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Scroll Arrow Button */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 translate-y-1/2">
                <button
                    onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform text-gray-600 hover:text-black border border-gray-200/80"
                    aria-label="Scroll down"
                >
                    <ChevronDown className="w-5 h-5 stroke-[1.5]" />
                </button>
            </div>
        </section>
    );
}