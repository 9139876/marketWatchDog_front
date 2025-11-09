import {makeAutoObservable} from "mobx";
import AppStateStore from "./componentStores/appStateStore";
import MarketEventStore from "./componentStores/marketEventStore";
import MarketSignalSettingsStore from "./componentStores/marketSignalSettingsStore";
import EditMarketSignalSettingsModalStore from "./componentStores/modalStores/editMarketSignalSettingsModalStore";
import OpenedPositionsStore from "./componentStores/openedPositionsStore";
import ClosePositionModalStore from "./componentStores/modalStores/closePositionModalStore";
import AddWatchDogModalStore from "./componentStores/modalStores/addWatchDogModalStore";
import OpenPositionModalStore from "./componentStores/modalStores/openPositionModalStore";
import SharedStore from "./componentStores/sharedStore";
import FrontEndLogStore from "./componentStores/frontEndLogStore";
import MarketSignalHistoryStore from "./componentStores/marketSignalHistoryStore";
import EditWatchDogModalStore from "./componentStores/modalStores/editWatchDogModalStore";
import DeleteWatchDogModalStore from "./componentStores/modalStores/deleteWatchDogModalStore";

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
        this.addWatchDogModalStore = new AddWatchDogModalStore(this);
        this.editWatchDogModalStore = new EditWatchDogModalStore(this);
        this.deleteWatchDogModalStore = new DeleteWatchDogModalStore(this);
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
    addWatchDogModalStore: AddWatchDogModalStore;
    editWatchDogModalStore: EditWatchDogModalStore;
    deleteWatchDogModalStore: DeleteWatchDogModalStore;

    clearAndRefresh = () => {
        // this.appStateStore = new AppStateStore(this); -- Не нужно!
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
        this.addWatchDogModalStore = new AddWatchDogModalStore(this);
        this.editWatchDogModalStore = new EditWatchDogModalStore(this);
        this.deleteWatchDogModalStore = new DeleteWatchDogModalStore(this);
    }
}