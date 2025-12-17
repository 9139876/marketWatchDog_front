import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import MarketSignalHistoryApi from "../../api/marketSignalHistoryApi";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";
import GetNewItemsRequest from "../../models/common/getNewItemsRequest";
import MarketSignalHistoryGroupItem from "../../models/marketSignal/marketSignalHistoryGroupItem";
import {getStartOfDayToday} from "../../utils/helpers/dateHelpers";

export default class MarketSignalHistoryStore {
    private rootStore: RootStore;
    private marketSignalHistoryApi: MarketSignalHistoryApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSignalHistoryApi = new MarketSignalHistoryApi(rootStore);
    }

    private marketSignalsList: MarketSignalHistoryItem[] = [];
    marketSignalsGroupsForShow: MarketSignalHistoryGroupItem[] = [];

    refreshMarketSignals = async () => {
        const request: GetNewItemsRequest = {
            dealerType: this.rootStore.appStateStore.getDealerType(),
            after: getStartOfDayToday(),
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
        const buffer: MarketSignalHistoryGroupItem[] = [];

        this.marketSignalsList
            .forEach(item => {
                let group = firstOrDefault(buffer, x => x.time === item.time);

                if(!group){
                    group = {time: item.time, signals: []};
                    buffer.push(group);
                }

                group!.signals.push(item);
            });

        this.marketSignalsGroupsForShow = buffer
            .sort((a, b) => b.time.getTime() - a.time.getTime());
    }
}