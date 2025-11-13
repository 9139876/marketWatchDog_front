import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {MarketEventItem} from "../../models/marketEvents/marketEventItem";
import {MarketEventType} from "../../models/marketEvents/marketEventType";
import SelectedEnumItem from "../../global/selectedEnumItem";
import MarketEventsApi from "../../api/marketEventsApi";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";
import GetNewItemsRequest from "../../models/common/getNewItemsRequest";

export default class MarketEventStore {
    private rootStore: RootStore;
    private marketEventsApi: MarketEventsApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketEventsApi = new MarketEventsApi(rootStore);
    }

    private eventsList: MarketEventItem[] = [];

    selectedEventTypes: SelectedEnumItem<MarketEventType>[] = [
        {value: MarketEventType.ChangeStopLoss, isSelected: true},
        {value: MarketEventType.UpdatePosition, isSelected: true},
        {value: MarketEventType.PositionWatchDogError, isSelected: true}
    ];

    eventsListForShow: MarketEventItem[] = [];

    refreshMarketEvents = async () => {
        const request: GetNewItemsRequest = {
            dealerType: this.rootStore.appStateStore.getDealerType(),
            after: this.getStartOfDayToday(),
            lastId: firstOrDefault(this.eventsList.sort((a, b) => b.id - a.id))?.id ?? -1
        };

        const result = await this.marketEventsApi.getNewMarketEvents(request);

        if (result.isSuccess) {
            const newMarketEvents = result.payload ?? [];

            if (newMarketEvents.length > 0) {
                this.eventsList.push(...newMarketEvents);
                this.updateEventsListForShow();
            }
        }
    }

    changeSelectedEventTypes(selectedEvents: MarketEventType[]) {
        this.selectedEventTypes.forEach(x => x.isSelected = selectedEvents.includes(x.value));
        this.updateEventsListForShow();
    }

    private updateEventsListForShow(): void {
        const selectedEventTypesInternal = this.selectedEventTypes
            .filter(x => x.isSelected)
            .map(x => x.value);

        this.eventsListForShow = this.eventsList
            .filter(x => selectedEventTypesInternal.includes(x.eventType))
            .sort((a, b) => b.time.getTime() - a.time.getTime());
    }

    private getStartOfDayToday(): Date {
        const result = new Date();
        result.setUTCHours(0, 0, 0, 0);

        return result;
    };
}