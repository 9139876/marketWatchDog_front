import {makeAutoObservable} from "mobx";
import TestStore from "./componentStores/testStore";
import AppStateStore from "./componentStores/appStateStore";
import ApplicationLogStore from "./componentStores/applicationLogStore";
import MarketSignalSettingsStore from "./componentStores/marketSignalSettingsStore";
import ApplicationSettingsStore from "./componentStores/applicationSettingsStore";
import EditMarketSignalSettingsModalStore from "./componentStores/modalStores/editMarketSignalSettingsModalStore";
import OpenedPositionsStore from "./componentStores/openedPositionsStore";
import ClosePositionModalStore from "./componentStores/modalStores/closePositionModalStore";
import AddTriggerModalStore from "./componentStores/modalStores/addTriggerModalStore";

export default class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
        this.applicationLogStore = new ApplicationLogStore(this);
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
        this.applicationSettingsStore = new ApplicationSettingsStore(this);
        this.openedPositionsStore = new OpenedPositionsStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
        this.closePositionModalStore = new ClosePositionModalStore(this);
        this.addTriggerModalStore = new AddTriggerModalStore(this);
    }

    testStore: TestStore;
    appStateStore: AppStateStore;
    applicationLogStore: ApplicationLogStore;
    marketSignalSettingsStore: MarketSignalSettingsStore;
    applicationSettingsStore: ApplicationSettingsStore;
    openedPositionsStore: OpenedPositionsStore;

    //Modals
    editMarketSignalSettingsModalStore: EditMarketSignalSettingsModalStore;
    closePositionModalStore: ClosePositionModalStore;
    addTriggerModalStore:AddTriggerModalStore;

    clearAndRefresh = () => {
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
        // this.applicationLogStore = new ApplicationLogStore(this); - !!! логи стирать не нужно !!!
        // this.appSettingsStore = new AppSettingsStore(this); !!! настройки сбрасывать не нужно !!!
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
        this.openedPositionsStore = new OpenedPositionsStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
        this.closePositionModalStore = new ClosePositionModalStore(this);
        this.addTriggerModalStore = new AddTriggerModalStore(this);
    }
}