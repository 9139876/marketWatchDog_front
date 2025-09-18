import SymbolInfoDto from "./symbolInfoDto";
import React from "react";
import SelectedEnumItem from "../../global/selectedEnumItem";
import {TimeFrameEnum} from "../enums/timeFrameEnum";

export default interface SymbolInfoWithMarketSignalSettingsModel extends SymbolInfoDto {

    key: React.Key | null;
    symbol: string;
    donchianAndRsi: SelectedEnumItem<TimeFrameEnum>[];
    donchianAndRsiStr: string;
    divergence: SelectedEnumItem<TimeFrameEnum>[];
    divergenceStr: string;
    havingSignal: boolean;

}