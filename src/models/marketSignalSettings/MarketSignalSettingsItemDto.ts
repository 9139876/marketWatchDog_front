import {SelectedEnumItem} from "../../global/selectedEnumItem";
import {TimeFrameEnum} from "../enums/timeFrameEnum";

export interface MarketSignalSettingsItemDto {
    symbol: string;
    donchianAndRsi: SelectedEnumItem<TimeFrameEnum>[];
    divergence: SelectedEnumItem<TimeFrameEnum>[];
}