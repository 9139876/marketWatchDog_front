import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {OpenedPositionInfo} from "../../models/openedPositions/openedPositionInfo";
import MarketSymbolsApi from "../../api/marketSymbolsApi";
import SymbolInfoDto from "../../models/marketSymbolsAndSignalSettings/symbolInfoDto";

export default class SharedStore {
    private rootStore: RootStore;
    private marketSymbolsApi: MarketSymbolsApi;
    private marketSymbols: SymbolInfoDto[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSymbolsApi = new MarketSymbolsApi(rootStore);
    }

    openedPositions: OpenedPositionInfo[] = [];

    getMarketSymbols = () => {
        return this.marketSymbols;
    }

    tryRefreshSymbolsInfo = async (): Promise<boolean> => {
        const result = await this.marketSymbolsApi.getSymbolsInfo(this.rootStore.appStateStore.getDealerType());

        if (result.isSuccess) {
            this.marketSymbols = result.payload ?? [];
            return true;
        }

        return false;
    }
}