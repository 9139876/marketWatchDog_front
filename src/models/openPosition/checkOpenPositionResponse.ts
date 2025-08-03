export interface CheckOpenPositionResponse {
    isValid: boolean;
    notValidReasons: string[] | null;

    currentPriceStr: string;
    lossValueIfStopLossFiredAbsStr: string;
    lossPercentIfStopLossFiredAbsStr: string;
    lossPercentIfStopLossFiredIsValid: boolean;
    marginStr: string;
    marginFreeStr: string;
    lossDivMarginFreePercentStr: string;
    lossDivMarginFreeIsValid: boolean;
}