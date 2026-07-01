'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
    productId: string;
    productName: string;
    price?: number;
    onAddToCart?: (productId: string) => Promise<void> | void;
    className?: string;
    variant?: 'primary' | 'secondary';
}

export default function AddToCartButton({
                                            productId,
                                            productName,
                                            price,
                                            onAddToCart,
                                            className = '',
                                            variant = 'primary',
                                        }: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);

        try {
            if (onAddToCart) {
                await onAddToCart(productId);
            } else {
                // Fallback: simple local simulation
                console.log(`Added ${productName} to cart`);
                // You can later integrate with your cart context / Supabase
            }

            setAdded(true);

            // Reset after 2 seconds
            setTimeout(() => {
                setAdded(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const baseStyles = "flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 active:scale-[0.98]";

    const variants = {
        primary: "bg-black text-white hover:bg-zinc-800",
        secondary: "border border-black hover:bg-black hover:text-white",
    };

    return (
        <motion.button
            onClick={handleAddToCart}
            disabled={isAdding}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <AnimatePresence mode="wait">
                {added ? (
                    <>
                        <Check className="w-5 h-5" />
                        <span>Added!</span>
                    </>
                ) : isAdding ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Adding...</span>
                    </>
                ) : (
                    <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                        {price && <span className="opacity-75">• ${price}</span>}
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    );
}