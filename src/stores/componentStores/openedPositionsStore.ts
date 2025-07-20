import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import OpenedPositionsApi from "../../api/openedPositionsApi";


export default class OpenedPositionsStore {
    private rootStore: RootStore;
    private openedPositionsApi: OpenedPositionsApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.openedPositionsApi = new OpenedPositionsApi(rootStore);
    }

    openedPositions: OpenedPositionInfo[] = [];

    refreshOpenedPositions = async () => {
        const result = await this.openedPositionsApi.getAll();

        if (result.isSuccess) {
            this.openedPositions = result.payload ?? [];
            console.log('openedPositions', this.openedPositions);
        }
    }
}