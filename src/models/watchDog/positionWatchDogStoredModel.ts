import {DealerTypeEnum} from "../enums/dealerTypeEnum";

export default interface PositionWatchDogStoredModel {
    dealerType: DealerTypeEnum;
    type: string;
    typeDescription: string;
    serialized: string;
    positionIdentifier: number;
}