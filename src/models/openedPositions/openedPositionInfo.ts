import {Nullable} from "../../global/common/nullable";
import {PositionDirectionTypeEnum} from "./positionDirectionTypeEnum";

export interface OpenedPositionInfo {
    identifier: number;
    dealer: string;
    symbol: string;
    openedTime: Date;
    type: PositionDirectionTypeEnum;
    volume: number;
    priceOpen: number;
    currentPrice: number;
    profit: number;

    stopLoss: Nullable<number>;
    takeProfit: Nullable<number>;
    toStopLossDistance: Nullable<number>;
    toStopLossDistanceInPoints: Nullable<number>;
    toTakeProfitDistance: Nullable<number>;
    toTakeProfitDistanceInPoints: Nullable<number>;
}