"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    productName: string;
    hasDiscount: boolean;
    discountPercent: number;
}

export default function ProductGallery({
                                           images,
                                           productName,
                                           hasDiscount,
                                           discountPercent,
                                       }: ProductGalleryProps) {

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const activeImage = images[activeImageIndex];


    return (
        <div
            className="
                flex
                flex-col
                md:grid
                md:grid-cols-[90px_1fr]
                gap-4
                md:gap-6
            "
        >


            {/* MAIN IMAGE */}
            <div
                className="
                    relative
                    aspect-[4/5]
                    bg-[#F9F9F9]
                    overflow-hidden
                    order-1
                    md:order-2
                "
            >

                <Image
                    key={activeImage}
                    src={activeImage}
                    alt={`${productName} main image`}
                    fill
                    priority
                    className="
                        object-cover
                        object-center
                        transition-opacity
                        duration-300
                    "
                    sizes="
                        (max-width:768px) 100vw,
                        50vw
                    "
                />


                {hasDiscount && (

                    <div
                        className="
                            absolute
                            top-4
                            left-4
                            bg-[#d93838]
                            text-white
                            text-[10px]
                            font-bold
                            tracking-widest
                            px-2.5
                            py-1
                            uppercase
                        "
                    >
                        Save {discountPercent}%
                    </div>

                )}

            </div>



            {/* THUMBNAILS */}

            <div
                className="
                    order-2
                    md:order-1

                    flex
                    md:flex-col

                    gap-3

                    overflow-x-auto
                    md:overflow-y-auto

                    md:max-h-[650px]

                    scrollbar-thin
                "
            >

                {images.map((img, index) => (

                    <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`
                            relative
                            w-20
                            h-20
                            shrink-0
                            overflow-hidden
                            bg-[#F9F9F9]
                            border
                            transition-all
                            duration-200

                            ${
                            activeImageIndex === index
                                ? "border-black opacity-100"
                                : "border-neutral-200 opacity-60 hover:opacity-100"
                        }
                        `}
                    >

                        <Image
                            src={img}
                            alt={`${productName} thumbnail ${index + 1}`}
                            fill
                            className="
                                object-cover
                                object-center
                            "
                            sizes="80px"
                        />

                    </button>

                ))}

            </div>


        </div>
    );
}