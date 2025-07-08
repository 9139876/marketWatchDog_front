import {makeAutoObservable} from "mobx";
import TestStore from "./componentStores/testStore";
import AppStateStore from "./componentStores/appStateStore";
import ApplicationLogStore from "./componentStores/applicationLogStore";
import MarketSignalSettingsStore from "./componentStores/marketSignalSettingsStore";

export default class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
        this.applicationLogStore = new ApplicationLogStore(this);
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
    }

    testStore: TestStore;
    appStateStore: AppStateStore;
    applicationLogStore: ApplicationLogStore;
    marketSignalSettingsStore: MarketSignalSettingsStore;

    clearAndRefresh = () => {
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
        // this.applicationLogStore = new ApplicationLogStore(this); - !!! логи стирать не нужно !!!
        this.marketSignalSettingsStore = new MarketSignalSettingsStore(this);
    }
}