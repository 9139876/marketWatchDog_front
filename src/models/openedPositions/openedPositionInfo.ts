import {Nullable} from "../../global/common/nullable";
import {PositionDirectionTypeEnum} from "./positionDirectionTypeEnum";

export interface OpenedPositionInfo {
    identifier: number;
    dealer: string;
    symbol: string;
    type: PositionDirectionTypeEnum;
    openedTime: Date;
    openedTimeStr: string;
    priceOpen: number;
    volume: number;
    currentPrice: number;
    profit: number;
    profitInPercents: number;
    lever: number;
    isLeverCorrect: boolean;

    stopLoss: Nullable<number>;
    toStopLossDistance: Nullable<number>;
    ifStopLossFiredProfitInPercents: Nullable<number>;

    takeProfit: Nullable<number>;
    toTakeProfitDistance: Nullable<number>;

    //calc Str
    priceOpenStr: string;
    currentPriceStr: string;
    profitStr: string;
    stopLossStr: string;
    toStopLossDistanceStr: string;
    ifStopLossFiredProfitInPercentsAbsStr: string;
    profitInPercentsAbsStr: string;
}