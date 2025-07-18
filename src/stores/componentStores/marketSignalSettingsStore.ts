import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {MarketSignalSettingsItem} from "../../models/marketSignalSettings/marketSignalSettingsItem";
import MarketSignalSettingsApi from "../../api/marketSignalSettingsApi";
import {Nullable} from "../../global/common/nullable";

export default class MarketSignalSettingsStore {
    private rootStore: RootStore;
    private marketSignalSettingsApi: MarketSignalSettingsApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSignalSettingsApi = new MarketSignalSettingsApi(rootStore);
    }

    marketSignalSettingsItems: MarketSignalSettingsItem[] = [];

    refreshMarketSignalSettingsItems = async () => {
        const result = await this.marketSignalSettingsApi.getAll();

        if (result.isSuccess) {
            this.setMarketSignalSettingsItems(result.payload);
        }
    }

    setMarketSignalSettingsItems = (items: Nullable<MarketSignalSettingsItem[]>) => {
        this.marketSignalSettingsItems = items ?? [];

        this.marketSignalSettingsItems.forEach(si => si.havingSignal = si.divergence.map(x => x.isSelected).concat(si.donchianAndRsi.map(x => x.isSelected)).some(x => x));
        this.marketSignalSettingsItems.forEach(si => si.divergenceStr = si.divergence.filter(x => x.isSelected).map(x => x.value).join(', '));
        this.marketSignalSettingsItems.forEach(si => si.donchianAndRsiStr = si.donchianAndRsi.filter(x => x.isSelected).map(x => x.value).join(', '));
    }
}