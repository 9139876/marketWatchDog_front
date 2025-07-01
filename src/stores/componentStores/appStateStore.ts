import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";

export default class AppStateStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    connectedToServer: boolean = true;

    setConnectedToServerValue = (value: boolean) => {
        this.connectedToServer = value;
    }
}