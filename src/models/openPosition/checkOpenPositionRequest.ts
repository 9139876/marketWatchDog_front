import {PositionDirectionTypeEnum} from "../openedPositions/positionDirectionTypeEnum";

export interface CheckOpenPositionRequest {
    symbol: string;
    positionType: PositionDirectionTypeEnum;
    inLotsSize: number;
    stopLossValue: number;
}