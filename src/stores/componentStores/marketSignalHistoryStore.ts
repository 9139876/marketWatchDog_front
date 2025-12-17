import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import MarketSignalHistoryApi from "../../api/marketSignalHistoryApi";
import MarketSignalHistoryItem from "../../models/marketSignal/marketSignalHistoryItem";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";
import GetNewItemsRequest from "../../models/common/getNewItemsRequest";
import GroupItem from "../../models/marketSignal/groupItem";
import {getStartOfDayToday} from "../../utils/helpers/dateHelpers";
import {formatShortDateTimeRusStr} from "../../utils/helpers/stringHelper";

export default class MarketSignalHistoryStore {
    private rootStore: RootStore;
    private marketSignalHistoryApi: MarketSignalHistoryApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSignalHistoryApi = new MarketSignalHistoryApi(rootStore);
    }

    private marketSignalsList: MarketSignalHistoryItem[] = [];
    marketSignalsGroupsForShow: GroupItem<MarketSignalHistoryItem>[] = [];

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
        const buffer: GroupItem<MarketSignalHistoryItem>[] = [];

        this.marketSignalsList
            .forEach(item => {
                const dateKey = formatShortDateTimeRusStr(item.time)
                let group = firstOrDefault(buffer, x => x.key === dateKey);

                if(!group){
                    group = {key: dateKey, items: []};
                    buffer.push(group);
                }

                group!.items.push(item);
            });

        this.marketSignalsGroupsForShow = buffer
            .sort((a, b) => b.items[0].time.getTime() - a.items[0].time.getTime());
    }
}