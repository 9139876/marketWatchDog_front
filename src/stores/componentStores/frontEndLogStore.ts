import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {Nullable} from "../../global/common/nullable";
import FrontEndLogItem from "../../models/frontEndLog/frontEndLogItem";

export default class FrontEndLogStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    logItems: FrontEndLogItem[] = [];

    addEvent(text: string, date: Nullable<Date> = null) {
        date ??= new Date();
        this.logItems.unshift({time: date, description: text});
    }
}