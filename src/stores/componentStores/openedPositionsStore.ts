import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import OpenedPositionsApi from "../../api/openedPositionsApi";
import OpenedPositionInfoWithWatchDogs from "../../models/openedPositions/openedPositionInfoWithWatchDogs";
import PositionWatchDogStoredModel from "../../models/watchDog/positionWatchDogStoredModel";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";

export default class OpenedPositionsStore {
    private rootStore: RootStore;
    private openedPositionsApi: OpenedPositionsApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.openedPositionsApi = new OpenedPositionsApi(rootStore);
    }

    openedPositions: OpenedPositionInfoWithWatchDogs[] = [];

    refreshOpenedPositions = async () => {
        const result = await this.openedPositionsApi.getAll(this.rootStore.appStateStore.getDealerType());

        if (result.isSuccess) {
            this.openedPositions = result.payload ?? [];
            console.log('openedPositions', this.openedPositions);
        }
    }

    updatePositionWatchDogs = (positionIdentifier: number, watchDogs: PositionWatchDogStoredModel[]): void => {
        const position = firstOrDefault(this.openedPositions, op => op.openedPositionInfo.identifier === positionIdentifier);

        if (!!position) {
            position.watchDogs = watchDogs;
        }
    }
}