import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import MarketSignalHistoryApi from "../../api/marketSignalHistoryApi";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";
import GetNewItemsRequest from "../../models/common/getNewItemsRequest";

export default class MarketSignalHistoryStore {
    private rootStore: RootStore;
    private marketSignalHistoryApi: MarketSignalHistoryApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSignalHistoryApi = new MarketSignalHistoryApi(rootStore);
    }

    private marketSignalsList: MarketSignalHistoryItem[] = [];
    marketSignalsListForShow: MarketSignalHistoryItem[] = [];

    refreshMarketSignals = async () => {
        const request: GetNewItemsRequest = {
            dealerType: this.rootStore.appStateStore.getDealerType(),
            after: this.getStartOfDayToday(),
            lastId: firstOrDefault(this.marketSignalsList.sort((a, b) => b.id - a.id))?.id ?? -1
        };

        const result = await this.marketSignalHistoryApi.getNewMarketSignals(request);

        if (result.isSuccess) {
            const newMarketSignals = result.payload ?? [];

            if (newMarketSignals.length > 0) {
                this.marketSignalsList.push(...newMarketSignals);
                this.updateEventsListForShow();
            }
        }
    }

    private updateEventsListForShow(): void {
        this.marketSignalsListForShow = this.marketSignalsList
            .sort((a, b) => b.id - a.id);
    }

    private getStartOfDayToday(): Date {
        const result = new Date();
        result.setUTCHours(0, 0, 0, 0);

        return result;
    };
}