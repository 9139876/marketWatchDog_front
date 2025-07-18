import {makeAutoObservable} from "mobx";
import TestStore from "./componentStores/testStore";
import AppStateStore from "./componentStores/appStateStore";
import ApplicationLogStore from "./componentStores/applicationLogStore";
import MarketSignalSettingsStore from "./componentStores/marketSignalSettingsStore";
import ApplicationSettingsStore from "./componentStores/applicationSettingsStore";
import EditMarketSignalSettingsModalStore from "./componentStores/modalStores/editMarketSignalSettingsModalStore";

export default class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
        this.applicationLogStore = new ApplicationLogStore(this);
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
        this.applicationSettingsStore = new ApplicationSettingsStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
    }

    testStore: TestStore;
    appStateStore: AppStateStore;
    applicationLogStore: ApplicationLogStore;
    marketSignalSettingsStore: MarketSignalSettingsStore;
    applicationSettingsStore: ApplicationSettingsStore;

    //Modals
    editMarketSignalSettingsModalStore: EditMarketSignalSettingsModalStore;

    clearAndRefresh = () => {
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
        // this.applicationLogStore = new ApplicationLogStore(this); - !!! логи стирать не нужно !!!
        // this.appSettingsStore = new AppSettingsStore(this); !!! настройки сбрасывать не нужно !!!
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);

        //Modals
        this.editMarketSignalSettingsModalStore = new EditMarketSignalSettingsModalStore(this);
    }
}