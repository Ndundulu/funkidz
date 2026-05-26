"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from "react";

type Item = {
    name: string;
    price: string;
};

type TradeInContextType = {
    isOpen: boolean;
    isMinimized: boolean;
    purchaserName: string;
    oldItems: Item[];
    newItems: Item[];
    openTradeIn: () => void;
    minimizeTradeIn: () => void;
    expandTradeIn: () => void;
    closeTradeIn: () => void;
    setPurchaserName: (name: string) => void;
    updateOldItem: (index: number, field: keyof Item, value: string) => void;
    updateNewItem: (index: number, field: keyof Item, value: string) => void;
    addOldItem: () => void;
    addNewItem: () => void;
};

const TradeInContext = createContext<TradeInContextType | undefined>(undefined);

export function TradeInProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const [purchaserName, setPurchaserName] = useState("");
    const [oldItems, setOldItems] = useState<Item[]>([{ name: "", price: "" }]);
    const [newItems, setNewItems] = useState<Item[]>([{ name: "", price: "" }]);

    const openTradeIn = useCallback(() => { setIsOpen(true); setIsMinimized(false); }, []);
    const minimizeTradeIn = useCallback(() => setIsMinimized(true), []);
    const expandTradeIn = useCallback(() => setIsMinimized(false), []);
    const closeTradeIn = useCallback(() => { setIsOpen(false); setIsMinimized(false); }, []);

    const updateOldItem = useCallback((index: number, field: keyof Item, value: string) => {
        const updated = [...oldItems];
        updated[index][field] = value;
        setOldItems(updated);
    }, [oldItems]);

    const updateNewItem = useCallback((index: number, field: keyof Item, value: string) => {
        const updated = [...newItems];
        updated[index][field] = value;
        setNewItems(updated);
    }, [newItems]);

    const addOldItem = useCallback(() => setOldItems(prev => [...prev, { name: "", price: "" }]), []);
    const addNewItem = useCallback(() => setNewItems(prev => [...prev, { name: "", price: "" }]), []);

    const totalOriginal = useMemo(() => oldItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0), [oldItems]);
    const totalNew = useMemo(() => newItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0), [newItems]);

    const tradeInValue = totalOriginal * 0.3;
    const requiredUpfront = totalNew * 0.7;
    const netCostDifference = totalNew - tradeInValue;
    const refundAmount = requiredUpfront > netCostDifference ? requiredUpfront - netCostDifference : 0;
    const finalExtraPaymentNeeded = netCostDifference > requiredUpfront ? netCostDifference - requiredUpfront : 0;

    const inputStyle = "w-full text-sm text-gray-900 placeholder:text-gray-400 bg-white border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-[#3B5323] focus:ring-2 focus:ring-[#3B5323]/20 transition-all";

    return (
        <TradeInContext.Provider value={{
            isOpen, isMinimized, purchaserName, oldItems, newItems,
            openTradeIn, minimizeTradeIn, expandTradeIn, closeTradeIn,
            setPurchaserName, updateOldItem, updateNewItem, addOldItem, addNewItem,
        }}>
            {children}

            {isOpen && (
                <div className={`fixed z-[100] transition-all duration-300 ${isMinimized ? 'bottom-6 right-6' : 'inset-0 bg-black/70 flex items-center justify-center p-4'}`}>
                    <div className={`bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden ${isMinimized ? 'w-80' : 'w-full max-w-5xl max-h-[92vh]'}`}>

                        {/* Header */}
                        <div className="bg-[#3B5323] text-white px-5 py-3 flex items-center justify-between flex-shrink-0">
                            <h3 className="font-medium">Trade-In Calculator</h3>
                            <div className="flex items-center gap-3">
                                {isMinimized ? (
                                    <button onClick={expandTradeIn} className="hover:bg-white/20 px-2 py-1 rounded">↑</button>
                                ) : (
                                    <button onClick={minimizeTradeIn} className="hover:bg-white/20 px-2 py-1 rounded">↓</button>
                                )}
                                <button onClick={closeTradeIn} className="hover:bg-white/20 px-2 py-1 rounded">✕</button>
                            </div>
                        </div>

                        {/* FULL VIEW */}
                        {!isMinimized ? (
                            <div className="overflow-auto flex-1 p-6 md:p-12 bg-[#F5F2EB]">
                                <div className="max-w-5xl mx-auto bg-white border border-gray-100 p-6 md:p-12 rounded-2xl shadow-sm">
                                    <div className="text-center mb-10 border-b border-gray-100 pb-6">
                                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Interactive Estimation</p>
                                        <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mt-2">Calculate Your Trade-In Value</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        {/* LEFT SIDE */}
                                        <div className="space-y-8">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-800 mb-2">Original Purchaser Name</label>
                                                <input type="text" value={purchaserName} onChange={(e) => setPurchaserName(e.target.value)} placeholder="Name used during purchase" className={inputStyle} />
                                            </div>

                                            {/* Old Items */}
                                            <div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Trade-in Items</h3>
                                                    <button
                                                        onClick={addOldItem}
                                                        className="text-xs px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 font-medium"
                                                    >
                                                        + Add Item
                                                    </button>
                                                </div>
                                                {oldItems.map((item, i) => (
                                                    <div key={i} className="grid grid-cols-2 gap-3 mb-4">
                                                        <input placeholder="e.g. Moss Crib" value={item.name} onChange={(e) => updateOldItem(i, "name", e.target.value)} className={inputStyle} />
                                                        <input type="number" placeholder="Price paid (KSH)" value={item.price} onChange={(e) => updateOldItem(i, "price", e.target.value)} className={inputStyle} />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* New Items */}
                                            <div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">New Items</h3>
                                                    <button
                                                        onClick={addNewItem}
                                                        className="text-xs px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 font-medium"
                                                    >
                                                        + Add Item
                                                    </button>
                                                </div>
                                                {newItems.map((item, i) => (
                                                    <div key={i} className="grid grid-cols-2 gap-3 mb-4">
                                                        <input placeholder="e.g. Junior Bed" value={item.name} onChange={(e) => updateNewItem(i, "name", e.target.value)} className={inputStyle} />
                                                        <input type="number" placeholder="Price (KSH)" value={item.price} onChange={(e) => updateNewItem(i, "price", e.target.value)} className={inputStyle} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* RIGHT SIDE - QUOTATION */}
                                        <div className="bg-[#FBFBFA] border border-gray-200 p-6 md:p-8 rounded-2xl">
                                            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-6">Quotation Breakdown</h3>

                                            <div className="space-y-4 text-sm border-b border-gray-200 pb-6">
                                                <div className="flex justify-between text-gray-800">
                                                    <span>Total Original Value</span>
                                                    <span className="font-medium">KSH {totalOriginal.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-800">
                                                    <span>Trade-in Credit (30%)</span>
                                                    <span className="font-medium text-emerald-700">KSH {tradeInValue.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-800">
                                                    <span>New Items Total</span>
                                                    <span className="font-medium">KSH {totalNew.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="bg-white border mt-6 p-5 rounded-xl">
                                                <div className="flex justify-between items-center text-gray-900">
                                                    <span className="font-medium">70% Upfront Required</span>
                                                    <span className="font-bold text-[#3B5323] text-lg">KSH {requiredUpfront.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            {totalNew > 0 && totalOriginal > 0 && (
                                                <div className="mt-6">
                                                    {refundAmount > 0 ? (
                                                        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 font-medium">
                                                            Refund: KSH {refundAmount.toLocaleString()}
                                                        </div>
                                                    ) : (
                                                        <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 font-medium">
                                                            Balance Due: KSH {finalExtraPaymentNeeded.toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <p className="text-xs text-gray-600 mt-8">Delivery & collection fees are added separately depending on location.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* MINI VIEW */
                            <div className="p-5 text-sm">
                                <div className="space-y-1 text-gray-700">
                                    <div className="flex justify-between"><span>Old Items</span><span>{oldItems.length}</span></div>
                                    <div className="flex justify-between"><span>New Items</span><span>{newItems.length}</span></div>
                                    <div className="pt-3 border-t font-medium text-[#3B5323]">
                                        Est. Credit: KSH {tradeInValue.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </TradeInContext.Provider>
    );
}

export const useTradeIn = () => {
    const context = useContext(TradeInContext);
    if (!context) throw new Error("useTradeIn must be used within TradeInProvider");
    return context;
};