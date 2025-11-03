import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import MarketSignalHistoryApi from "../../api/marketSignalHistoryApi";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";

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

    getNewMarketSignals = async () => {
        const lastMarketEventDate = this.marketSignalsList.length === 0
            ? this.getStartOfDayToday()
            : this.marketSignalsList.sort((a, b) => b.time.getTime() - a.time.getTime())[0].time;

        const result = await this.marketSignalHistoryApi.getNewMarketSignals(this.rootStore.appStateStore.getDealerType(), lastMarketEventDate);

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
            .sort((a, b) => b.time.getTime() - a.time.getTime());
    }

    private getStartOfDayToday(): Date {
        const result = new Date();
        result.setUTCHours(0, 0, 0, 0);

        return result;
    };
}