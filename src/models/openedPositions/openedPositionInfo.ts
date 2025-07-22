import {Nullable} from "../../global/common/nullable";
import {PositionDirectionTypeEnum} from "./positionDirectionTypeEnum";

export interface OpenedPositionInfo {
    identifier: number;
    dealer: string;
    symbol: string;
    type: PositionDirectionTypeEnum;
    openedTime: Date;
    priceOpen: number;
    volume: number;
    currentPrice: number;
    profit: number;

    stopLoss: Nullable<number>;
    toStopLossDistance: Nullable<number>;
    toStopLossDistanceInPoints: Nullable<number>;
    ifStopLossFiredProfitInPercents: Nullable<number>;

    takeProfit: Nullable<number>;
    toTakeProfitDistance: Nullable<number>;
    toTakeProfitDistanceInPoints: Nullable<number>;
}