import {DealerTypeEnum} from "../enums/dealerTypeEnum";
import {PositionWatchDogTypeEnum} from "./positionWatchDogTypeEnum";

export default interface PositionWatchDogStoredModel {
    dealerType: DealerTypeEnum;
    type: PositionWatchDogTypeEnum;
    serialized: string;
    positionIdentifier: number;
}