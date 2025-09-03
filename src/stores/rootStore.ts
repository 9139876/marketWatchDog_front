import {makeAutoObservable} from "mobx";
import AppStateStore from "./componentStores/appStateStore";
import LogStore from "./componentStores/logStore";
import MarketSignalSettingsStore from "./componentStores/marketSignalSettingsStore";
import EditMarketSignalSettingsModalStore from "./componentStores/modalStores/editMarketSignalSettingsModalStore";
import OpenedPositionsStore from "./componentStores/openedPositionsStore";
import ClosePositionModalStore from "./componentStores/modalStores/closePositionModalStore";
import AddTriggerModalStore from "./componentStores/modalStores/addTriggerModalStore";
import OpenPositionModalStore from "./componentStores/modalStores/openPositionModalStore";
import SharedStore from "./componentStores/sharedStore";

export default class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.appStateStore = new AppStateStore(this);
        this.logStore = new LogStore(this);
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
        this.openedPositionsStore = new OpenedPositionsStore(this);
        this.sharedStore = new SharedStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
        this.closePositionModalStore = new ClosePositionModalStore(this);
        this.openPositionModalStore = new OpenPositionModalStore(this);
        this.addTriggerModalStore = new AddTriggerModalStore(this);
    }

    appStateStore: AppStateStore;
    logStore: LogStore;
    marketSignalSettingsStore: MarketSignalSettingsStore;
    openedPositionsStore: OpenedPositionsStore;
    sharedStore: SharedStore;

    //Modals
    editMarketSignalSettingsModalStore: EditMarketSignalSettingsModalStore;
    openPositionModalStore: OpenPositionModalStore;
    closePositionModalStore: ClosePositionModalStore;
    addTriggerModalStore: AddTriggerModalStore;

    clearAndRefresh = () => {
        // this.logStore = new LogStore(this); - !!! логи стирать не нужно !!!
        // this.appStateStore = new AppStateStore(this); !!! настройки сбрасывать не нужно !!!
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
        this.openedPositionsStore = new OpenedPositionsStore(this);
        this.sharedStore = new SharedStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
        this.closePositionModalStore = new ClosePositionModalStore(this);
        this.openPositionModalStore = new OpenPositionModalStore(this);
        this.addTriggerModalStore = new AddTriggerModalStore(this);
    }
}