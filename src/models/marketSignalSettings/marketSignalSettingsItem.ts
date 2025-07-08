import React from "react";

export interface MarketSignalSettingsItem {
    key: React.Key;
    dealer: string;
    symbol: string;
    donchianAndRsi: string;
    divergence: string;
    havingSignal: boolean;
}