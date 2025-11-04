import {MarketSignalTypeEnum} from "./marketSignalTypeEnum";
import {MarketSignalDirectionTypeEnum} from "./marketSignalDirectionTypeEnum";

export default interface MarketSignalMessage {
    marketSignalType: MarketSignalTypeEnum;
    marketSignalDirectionType: MarketSignalDirectionTypeEnum;
    signal: string;
    lines: string[]
}