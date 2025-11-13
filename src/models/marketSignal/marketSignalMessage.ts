import {MarketSignalTypeEnum} from "./marketSignalTypeEnum";
import {MarketSignalDirectionTypeEnum} from "./marketSignalDirectionTypeEnum";

export default interface MarketSignalMessage {
    signalType: MarketSignalTypeEnum;
    marketSignalDirectionType: MarketSignalDirectionTypeEnum;
    signal: string;
    lines: string[]
}