import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {MarketSignalSettingsItem} from "../../models/marketSignalSettings/marketSignalSettingsItem";
import MarketSignalSettingsApi from "../../api/marketSignalSettingsApi";

export default class MarketSignalSettingsStore {
    private rootStore: RootStore;
    private marketSignalSettingsApi: MarketSignalSettingsApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSignalSettingsApi = new MarketSignalSettingsApi(rootStore);
    }

    marketSignalSettingsItems: MarketSignalSettingsItem[] = [
        {
            key: '1',
            dealer: "Альфа",
            symbol: "EurUsd",
            donchianAndRsi: "M15, M30",
            divergence: "M30, H1",
            havingSignal: true
        },
        {
            key: '2',
            dealer: "Альфа",
            symbol: "GpbUsd",
            donchianAndRsi: "M5, M30",
            divergence: "M15, H1",
            havingSignal: true
        },
        {
            key: '3',
            dealer: "Финам",
            symbol: "Gold",
            donchianAndRsi: "",
            divergence: "M30, H1",
            havingSignal: true
        },
        {
            key: '4',
            dealer: "Финам",
            symbol: "Silver",
            donchianAndRsi: "M15, M30",
            divergence: "",
            havingSignal: true
        },
        {
            key: '5',
            dealer: "Финам",
            symbol: "Сбер",
            donchianAndRsi: "",
            divergence: "",
            havingSignal: false
        },
        {
            key: '6',
            dealer: "Финам",
            symbol: "Лукойл",
            donchianAndRsi: "",
            divergence: "",
            havingSignal: false
        },
    ];

    refreshMarketSignalSettingsItems = async () => {
        const result = await this.marketSignalSettingsApi.getAll();

        if (result.isSuccess) {
            this.marketSignalSettingsItems = result.payload ?? [];
        }
    }
}