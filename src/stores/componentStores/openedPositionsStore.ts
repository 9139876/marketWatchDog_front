import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import OpenedPositionsApi from "../../api/openedPositionsApi";
import OpenedPositionInfoWithWatchDogs from "../../models/openedPositions/openedPositionInfoWithWatchDogs";
import PositionWatchDogStoredModel from "../../models/watchDog/positionWatchDogStoredModel";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";
import PositionWatchDogApi from "../../api/positionWatchDogApi";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import {PositionWatchDogTypeEnum} from "../../models/watchDog/positionWatchDogTypeEnum";
import IActionResult from "../../models/common/actionResult";

export default class OpenedPositionsStore {
    private rootStore: RootStore;
    private openedPositionsApi: OpenedPositionsApi;
    private positionWatchDogApi: PositionWatchDogApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.openedPositionsApi = new OpenedPositionsApi(rootStore);
        this.positionWatchDogApi = new PositionWatchDogApi(rootStore);
    }

    openedPositions: OpenedPositionInfoWithWatchDogs[] = [];

    refreshOpenedPositions = async () => {
        const result = await this.openedPositionsApi.getAll(this.rootStore.appStateStore.getDealerType());

        if (result.isSuccess) {
            this.openedPositions = result.payload ?? [];
        }
    }

    updatePositionWatchDogs = (positionIdentifier: number, watchDogs: PositionWatchDogStoredModel[]): void => {
        const position = firstOrDefault(this.openedPositions, op => op.openedPositionInfo.identifier === positionIdentifier);

        if (!!position) {
            position.watchDogs = watchDogs;
        }
    }

    deleteWatchDog = async (position: OpenedPositionInfo, watchDogType: PositionWatchDogTypeEnum): Promise<IActionResult> => {

        const result = await this.positionWatchDogApi.deletePositionWatchDog(this.rootStore.appStateStore.getDealerType(), position.identifier, watchDogType);

        if (result.isSuccess) {
            this.updatePositionWatchDogs(position.identifier, result.payload ?? []);
            return {isSuccess: true, message: `${watchDogType} успешно удален`}
        } else {
            return {isSuccess: false, message: `Ошибка при удалении ${watchDogType} - ${result.errorMessage}`}
        }
    }
}