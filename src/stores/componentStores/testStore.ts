import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import TestApi from "../../api/testApi";

export default class TestStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    tesValue: number = 0;

    updateTestValue = async () => {
        const result = await TestApi.getNumberValue({value: this.tesValue});
        if (result.isSuccess) {
            this.tesValue = result.payload?.value ?? this.tesValue;
        }
    }
}