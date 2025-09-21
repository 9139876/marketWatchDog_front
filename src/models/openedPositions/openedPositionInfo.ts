import {Nullable} from "../../global/common/nullable";
import {PositionDirectionTypeEnum} from "./positionDirectionTypeEnum";

export interface OpenedPositionInfo {
    identifier: number;
    symbol: string;
    type: PositionDirectionTypeEnum;
    openedTime: string;
    tradePointSize: string;
    tradePointValue: string;
    volume: string;
    priceOpen: string;
    currentPrice: string;
    profit: string;
    margin: string;
    profitInPercents: string;
    profitInPercentsAbs: string;
    stopLoss: Nullable<string>;
    takeProfit: Nullable<string>;
    toStopLossDistance: Nullable<string>;
    ifStopLossFiredProfitInPercents: Nullable<string>;
    ifStopLossFiredProfitInPercentsAbs: Nullable<string>;
    toTakeProfitDistance: Nullable<string>;
}