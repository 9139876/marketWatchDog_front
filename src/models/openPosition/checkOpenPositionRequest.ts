import {PositionDirectionTypeEnum} from "../openedPositions/positionDirectionTypeEnum";
import {DealerTypeEnum} from "../enums/dealerTypeEnum";

export interface CheckOpenPositionRequest {
    dealerType: DealerTypeEnum;
    symbol: string;
    positionType: PositionDirectionTypeEnum;
    inLotsSize: number;
    stopLossValue: number;
}