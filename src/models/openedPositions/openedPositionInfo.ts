import {Nullable} from "../../global/common/nullable";
import {PositionDirectionTypeEnum} from "./positionDirectionTypeEnum";

export interface OpenedPositionInfo {
    identifier: number;
    symbol: string;
    tradePointSize: number;
    tradePointSizeStr: string;
    tradePointValue: number;
    tradePointValueStr: string;
    openedTime: Date;
    positionDirectionType: PositionDirectionTypeEnum;
    volume: number;
    volumeStr: string;
    priceOpen: number;
    priceOpenStr: string;
    currentPrice: number;
    currentPriceStr: string;
    profit: number;
    profitStr: string;
    margin: number;
    marginStr: string;
    stopLoss: Nullable<number>;
    stopLossStr: Nullable<string>;
    takeProfit: Nullable<number>;
    takeProfitStr: Nullable<string>;
    profitInPercents: number;
    profitInPercentsStr: string;
    profitInPercentsAbs: number;
    profitInPercentsAbsStr: string;
    toStopLossDistance: Nullable<number>;
    toStopLossDistanceStr: Nullable<string>;
    ifStopLossFiredProfitInPercents: Nullable<number>;
    ifStopLossFiredProfitInPercentsStr: Nullable<string>;
    ifStopLossFiredProfitInPercentsAbs: Nullable<number>;
    ifStopLossFiredProfitInPercentsAbsStr: Nullable<string>;
    toTakeProfitDistance: Nullable<number>;
    toTakeProfitDistanceStr: Nullable<string>;
}