"use client";

import React, { useState } from "react";

export default function TradeInPortal() {
    // State for inputs
    const [purchaserName, setPurchaserName] = useState<string>("");
    const [originalPrice, setOriginalPrice] = useState<string>("");
    const [newItemPrice, setNewItemPrice] = useState<string>("");
    const [oldItemName, setOldItemName] = useState<string>("");
    const [newItemName, setNewItemName] = useState<string>("");

    // Calculate figures based on user inputs
    const orig = parseFloat(originalPrice) || 0;
    const currentNewPrice = parseFloat(newItemPrice) || 0;

    const tradeInValue = orig * 0.30;
    const requiredUpfront = currentNewPrice * 0.70;

    // Total out-of-pocket calculation logic
    const netCostDifference = currentNewPrice - tradeInValue;
    const refundAmount = requiredUpfront > netCostDifference ? (requiredUpfront - netCostDifference) : 0;
    const finalExtraPaymentNeeded = netCostDifference > requiredUpfront ? (netCostDifference - requiredUpfront) : 0;

    return (
        <section className="w-full bg-[#F5F2EB] font-sans py-12 md:py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white border border-gray-100 p-6 md:p-12 shadow-sm">

                {/* Header */}
                <div className="text-center mb-10 border-b border-gray-100 pb-6">
                    <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
                        Interactive Estimation
                    </p>
                    <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">
                        Calculate Your Trade-In Value
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* Left Side: Interactive Input Form */}
                    <div className="space-y-5">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-gray-800 mb-2">
                            1. Enter Item Details
                        </h3>

                        {/* New Field: Purchaser's Name */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-light">
                                Original Purchaser's Name
                            </label>
                            <input
                                type="text"
                                placeholder="Name used during original purchase"
                                value={purchaserName}
                                onChange={(e) => setPurchaserName(e.target.value)}
                                className="w-full text-sm bg-[#F9F9F9] border border-gray-200 px-4 py-3 outline-none focus:border-gray-400 font-light transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-light">
                                Old Item Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Moss Crib"
                                value={oldItemName}
                                onChange={(e) => setOldItemName(e.target.value)}
                                className="w-full text-sm bg-[#F9F9F9] border border-gray-200 px-4 py-3 outline-none focus:border-gray-400 font-light transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-light">
                                Original Price Paid (KSH)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g., 10000"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                className="w-full text-sm bg-[#F9F9F9] border border-gray-200 px-4 py-3 outline-none focus:border-gray-400 font-light transition-colors"
                            />
                        </div>

                        <div className="pt-2 border-t border-gray-100 mt-4">
                            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-light">
                                Desired New Item Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Perch Twin Bunk Bed"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="w-full text-sm bg-[#F9F9F9] border border-gray-200 px-4 py-3 outline-none focus:border-gray-400 font-light transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-light">
                                Price of New Item (KSH)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g., 10000"
                                value={newItemPrice}
                                onChange={(e) => setNewItemPrice(e.target.value)}
                                className="w-full text-sm bg-[#F9F9F9] border border-gray-200 px-4 py-3 outline-none focus:border-gray-400 font-light transition-colors"
                            />
                        </div>
                    </div>

                    {/* Right Side: Dynamic Financial Breakdown Box */}
                    <div className="bg-[#FBFBFA] border border-gray-200/60 p-6 md:p-8">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-gray-800 mb-4">
                            2. Quotation Breakdown
                        </h3>

                        <div className="space-y-3 text-sm border-b border-gray-200 pb-4 font-light text-gray-600">
                            <div className="flex justify-between">
                                <span>Trade-in Value (30% of original):</span>
                                <span className="font-medium text-gray-900">KSH {tradeInValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>New Item Price:</span>
                                <span className="font-medium text-gray-900">KSH {currentNewPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 italic">
                                <span>Cost Difference:</span>
                                <span>KSH {netCostDifference.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                        </div>

                        {/* Upfront Rule Callout */}
                        <div className="bg-white border border-gray-100 p-4 my-4 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-800">70% Upfront Required:</span>
                                <span className="text-base font-semibold text-[#3B5323]">
                                    KSH {requiredUpfront.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-normal font-light">
                                All trade-in orders require a 70% upfront payment on the value of the new item before scheduling.
                            </p>
                        </div>

                        {/* Refund Context Alert Blocks */}
                        {currentNewPrice > 0 && orig > 0 && (
                            <div className="text-xs space-y-2 mt-4">
                                {refundAmount > 0 ? (
                                    <div className="p-3 bg-green-50/50 border border-green-100 text-green-800 rounded font-light leading-relaxed">
                                        <strong>Refund Notice:</strong> Because your 70% upfront deposit exceeds the remaining net balance, <strong>KSH {refundAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> will be fully refunded to you on the day of delivery or 2 days after collection.
                                    </div>
                                ) : (
                                    <div className="p-3 bg-amber-50/50 border border-amber-100 text-amber-800 rounded font-light leading-relaxed">
                                        <strong>Balance Notice:</strong> After your 70% deposit is paid, you will owe an additional final clearance balance of <strong>KSH {finalExtraPaymentNeeded.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> upon delivery.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Logistic Note Warning */}
                        <p className="text-[10px] text-gray-400 mt-6 pt-3 border-t border-gray-100 italic font-light text-center">
                            * Please note: A standard Delivery & Collection fee will be applied to the final invoice depending on your location.
                        </p>
                    </div>
                </div>

                {/* Final Informational Steps Footer */}
                <div className="mt-12 bg-[#FBFBFA] p-5 text-center border border-dashed border-gray-200">
                    <p className="text-xs text-gray-600 font-light max-w-xl mx-auto leading-relaxed">
                        Ready to swap? Click below to finalize your quote request. Our team will verify your setup photos and receipts to issue the formal delivery routing slip.
                    </p>
                    <button className="mt-4 bg-[#1A1A1A] text-white text-xs font-medium uppercase tracking-widest px-8 py-3.5 hover:bg-gray-800 transition-colors duration-300">
                        Submit Photos & Receipts
                    </button>
                </div>

            </div>
        </section>
    );
}