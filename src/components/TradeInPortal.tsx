"use client";
import React, { useEffect } from "react";
import { useTradeIn } from "@/context/TradeInContext";

export default function TradeInPortal() {
    const { openTradeIn } = useTradeIn();

    useEffect(() => {
        openTradeIn();
    }, [openTradeIn]);

    return null; // We don't need to render anything here anymore
}