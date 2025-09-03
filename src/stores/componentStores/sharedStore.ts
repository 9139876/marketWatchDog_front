import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import MarketSymbolsApi from "../../api/marketSymbolsApi";

export default class SharedStore {
    private rootStore: RootStore;
    private marketSymbolsApi: MarketSymbolsApi;
    private marketSymbols: string[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSymbolsApi = new MarketSymbolsApi(rootStore);
    }

    openedPositions: OpenedPositionInfo[] = [];

    getMarketSymbols = () => {
        return this.marketSymbols;
    }

    refreshMarketSymbols = async () => {
        const result = await this.marketSymbolsApi.getMarketSymbols(this.rootStore.appStateStore.getDealerType());

        if (result.isSuccess) {
            this.marketSymbols = result.payload ?? [];
        }
    }
}