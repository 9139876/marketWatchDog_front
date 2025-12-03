import {Nullable} from "../../global/common/nullable";

export interface CheckOpenPositionResponse {
    isValid: boolean;
    notValidReasons: Nullable<string[]>;

    currentPrice: number;
    currentPriceStr: string;
    lossValueIfStopLossFiredAbs: number;
    lossValueIfStopLossFiredAbsStr: string;
    lossPercentIfStopLossFiredAbs: number;
    lossPercentIfStopLossFiredAbsStr: string;
    lossPercentIfStopLossFiredIsValid: boolean;
    margin: number;
    marginStr: string;
    marginFree: number;
    marginFreeStr: string;
    lossDivMarginFreePercent: number;
    lossDivMarginFreePercentStr: string;
    lossDivMarginFreeIsValid: boolean;
}