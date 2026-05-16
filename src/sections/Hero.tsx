"use client";

import { useState, useEffect } from 'react';
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

    const slides: Slide[] = [
        {
            id: 1,
            title: "The Moss Collection",
            tagline: "MODERN & SUSTAINABLE ECO-DESIGN",
            buttonText: "SHOP NOW",
            link: "/shop/moss",
            imageLeft: "/backgroundcv.jpg", // Replace with your image paths
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

    const SLIDE_DURATION = 6000; // 6 seconds per slide

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative w-full h-[85vh] min-h-[550px] bg-white overflow-visible border-b border-gray-100">
            {/* Custom Animation Styles Injection */}
            <style jsx global>{`
                @keyframes blink-in {
                    0% { opacity: 0; }
                    10%, 90% { opacity: 1; }
                    100% { opacity: 0; }
                }
                @keyframes text-up-down {
                    0% { transform: translateY(20px); opacity: 0; }
                    8% { transform: translateY(0); opacity: 1; }
                    92% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(20px); opacity: 0; }
                }
                @keyframes loader-progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-blink-frame {
                    animation: blink-in ${SLIDE_DURATION}ms ease-in-out infinite;
                }
                .animate-text-frame {
                    animation: text-up-down ${SLIDE_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }
                .animate-loader {
                    animation: loader-progress ${SLIDE_DURATION}ms linear infinite;
                }
            `}</style>

            {/* Slide Frame Track Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {slides.map((slide, index) => {
                    if (index !== currentSlide) return null;

                    return (
                        <div key={slide.id} className="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-2 animate-blink-frame">

                            {/* LEFT SIDE: Image + Text Card Overlay */}
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src={slide.imageLeft}
                                    alt={`${slide.title} left view`}
                                    fill
                                    sizes="(max-w-768px) 100vw, 50vw"
                                    className="object-cover object-center"
                                    priority
                                />

                                {/* Exact Hero.jpeg Floating Card Layout */}
                                <div className="absolute inset-0 flex items-start pt-[12vh] sm:pt-[15vh] px-6 sm:px-12 z-10">
                                    <div className="bg-white/95 backdrop-blur-sm px-10 py-12 sm:px-14 sm:py-14 text-center max-w-md shadow-sm border border-gray-100/30 animate-text-frame">
                                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold mb-4">
                                            {slide.tagline}
                                        </p>
                                        <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 tracking-tight leading-tight mb-8">
                                            {slide.title}
                                        </h1>
                                        <a
                                            href={slide.link}
                                            className="inline-block font-medium tracking-[0.15em] text-xs text-gray-900 border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-400 transition-colors"
                                        >
                                            {slide.buttonText}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE: Standalone Image (Visible only on medium/large viewports) */}
                            <div className="relative w-full h-full hidden md:block border-l border-white/10">
                                <Image
                                    src={slide.imageRight}
                                    alt={`${slide.title} right view`}
                                    fill
                                    sizes="50vw"
                                    className="object-cover object-center"
                                />
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* INTERACTIVE ACTIONS CONTAINER */}
            {/* Max-w matches your navbar limits precisely */}
            <div className="absolute bottom-0 left-0 right-0 z-30 max-w-7xl mx-auto px-6 sm:px-12 flex items-end justify-between pointer-events-none h-20">

                {/* Spacer block to perfectly frame left alignment bounds */}
                <div className="w-12 hidden sm:block"></div>

                {/* CENTRAL BOTTOM CUE: Positioned EXACTLY halfway overlapping the frame edge */}
                <div className="relative flex justify-center items-center h-full w-full sm:w-auto">
                    <button
                        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                        className="pointer-events-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform text-gray-800 hover:text-black border border-gray-200/60 translate-y-1/2"
                        aria-label="Scroll down"
                    >
                        <ChevronDown className="w-6 h-6 stroke-[1.5]" />
                    </button>
                </div>

                {/* RIGHT ELEMENT: Gray Tracking Bars + White Loading Line Animation Timer */}
                <div className="pointer-events-auto flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-2.5 rounded-full sm:bg-transparent sm:p-0 mb-4 sm:mb-6">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className="group relative h-1 w-8 sm:w-12 bg-gray-300 rounded-full cursor-pointer overflow-hidden transition-all"
                            role="button"
                            aria-label={`Show slide ${index + 1}`}
                        >
                            {/* Inner loading track indicator */}
                            <div
                                className={`absolute inset-y-0 left-0 bg-white sm:bg-gray-900 rounded-full transition-all ${
                                    index === currentSlide ? 'animate-loader w-full' : 'w-0'
                                }`}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}