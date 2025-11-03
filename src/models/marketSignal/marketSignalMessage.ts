import {MarketSignalTypeEnum} from "./marketSignalTypeEnum";
import {MarketSignalDirectionTypeEnum} from "./marketSignalDirectionTypeEnum";
import IStringDictionary from "../../utils/extensions/dictionary";

export default interface MarketSignalMessage {
    marketSignalType: MarketSignalTypeEnum;
    marketSignalDirectionType: MarketSignalDirectionTypeEnum;
    signal: string;
    lines: IStringDictionary<string>
}