import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";

export default class ApplicationSettingsStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    backendOrigin: string = 'http://localhost:6100';

    getBackendOrigin = () => {
        // return this.backendOrigin;
        return 'http://localhost:6100';
    }
}