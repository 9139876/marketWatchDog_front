import {TimeFrameEnum} from "../enums/timeFrameEnum";
import MarketSignalMessage from "./marketSignalMessage";

export default interface MarketSignalHistoryItem {
    time: Date;
    symbol: string;
    timeframe: TimeFrameEnum;
    message: MarketSignalMessage;
}