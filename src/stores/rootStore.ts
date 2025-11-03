import {makeAutoObservable} from "mobx";
import AppStateStore from "./componentStores/appStateStore";
import MarketEventStore from "./componentStores/marketEventStore";
import MarketSignalSettingsStore from "./componentStores/marketSignalSettingsStore";
import EditMarketSignalSettingsModalStore from "./componentStores/modalStores/editMarketSignalSettingsModalStore";
import OpenedPositionsStore from "./componentStores/openedPositionsStore";
import ClosePositionModalStore from "./componentStores/modalStores/closePositionModalStore";
import AddTriggerModalStore from "./componentStores/modalStores/addTriggerModalStore";
import OpenPositionModalStore from "./componentStores/modalStores/openPositionModalStore";
import SharedStore from "./componentStores/sharedStore";
import FrontEndLogStore from "./componentStores/frontEndLogStore";
import MarketSignalHistoryStore from "./componentStores/marketSignalHistoryStore";

export default class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.appStateStore = new AppStateStore(this);
        this.eventStore = new MarketEventStore(this);
        this.frontEndLogStore = new FrontEndLogStore(this);
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
        this.marketSignalHistoryStore = new MarketSignalHistoryStore(this);
        this.openedPositionsStore = new OpenedPositionsStore(this);
        this.sharedStore = new SharedStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
        this.closePositionModalStore = new ClosePositionModalStore(this);
        this.openPositionModalStore = new OpenPositionModalStore(this);
        this.addTriggerModalStore = new AddTriggerModalStore(this);
    }

    appStateStore: AppStateStore;
    eventStore: MarketEventStore;
    frontEndLogStore: FrontEndLogStore;
    marketSignalSettingsStore: MarketSignalSettingsStore;
    marketSignalHistoryStore: MarketSignalHistoryStore;
    openedPositionsStore: OpenedPositionsStore;
    sharedStore: SharedStore;

    //Modals
    editMarketSignalSettingsModalStore: EditMarketSignalSettingsModalStore;
    openPositionModalStore: OpenPositionModalStore;
    closePositionModalStore: ClosePositionModalStore;
    addTriggerModalStore: AddTriggerModalStore;

    clearAndRefresh = () => {
        this.appStateStore = new AppStateStore(this);
        this.eventStore = new MarketEventStore(this);
        this.frontEndLogStore = new FrontEndLogStore(this);
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
        this.marketSignalHistoryStore = new MarketSignalHistoryStore(this);
        this.openedPositionsStore = new OpenedPositionsStore(this);
        this.sharedStore = new SharedStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
        this.closePositionModalStore = new ClosePositionModalStore(this);
        this.openPositionModalStore = new OpenPositionModalStore(this);
        this.addTriggerModalStore = new AddTriggerModalStore(this);
    }
}