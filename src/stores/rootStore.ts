import {makeAutoObservable} from "mobx";
import TestStore from "./componentStores/testStore";
import AppStateStore from "./componentStores/appStateStore";

export default class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
    }

    testStore: TestStore;
    appStateStore: AppStateStore;

    clearAndRefresh = () => {
        this.testStore = new TestStore(this);
        this.appStateStore = new AppStateStore(this);
    }
}