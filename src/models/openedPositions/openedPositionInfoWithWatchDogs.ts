import {OpenedPositionInfo} from "./openedPositionInfo";
import PositionWatchDogStoredModel from "../watchDog/positionWatchDogStoredModel";

export default interface OpenedPositionInfoWithWatchDogs {
    openedPositionInfo: OpenedPositionInfo;
    watchDogs: PositionWatchDogStoredModel[];
}