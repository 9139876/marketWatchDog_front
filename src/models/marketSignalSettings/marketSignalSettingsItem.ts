import React from "react";
import {SelectedEnumItem} from "../../global/selectedEnumItem";
import {TimeFrameEnum} from "./timeFrameEnum";

export interface MarketSignalSettingsItem {
    key: React.Key | null;
    dealer: string;
    symbol: string;
    donchianAndRsi: SelectedEnumItem<TimeFrameEnum>[];
    donchianAndRsiStr: string;
    divergence: SelectedEnumItem<TimeFrameEnum>[];
    divergenceStr: string;
    havingSignal: boolean;
}