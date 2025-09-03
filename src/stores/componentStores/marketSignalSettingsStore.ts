import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import {MarketSignalSettingsItem} from "../../models/marketSignalSettings/marketSignalSettingsItem";
import MarketSignalSettingsApi from "../../api/marketSignalSettingsApi";
import {Nullable} from "../../global/common/nullable";
import {MarketSignalSettingsItemDto} from "../../models/marketSignalSettings/MarketSignalSettingsItemDto";
import {SelectedEnumItem} from "../../global/selectedEnumItem";
import {TimeFrameEnum} from "../../models/enums/timeFrameEnum";

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
        const result = await this.marketSignalSettingsApi.getAll(this.rootStore.appStateStore.getDealerType());

        if (result.isSuccess) {
            this.updateMarketSignalSettingsItems(result.payload);
        }
    }

    setMarketSymbols = (symbols: string[]) => {
        this.marketSignalSettingsItems = symbols.map((symbol, index) => {
            return {
                symbol: symbol,
                donchianAndRsi: [],
                donchianAndRsiStr: 'Нет данных',
                divergence: [],
                divergenceStr: 'Нет данных',
                havingSignal: false,
                key: index
            };
        });
    }

    updateMarketSignalSettingsItems = (items: Nullable<MarketSignalSettingsItemDto[]>) => {
        items ??= [];

        const buffer: MarketSignalSettingsItem[] = [];

        for (let marketSignalSettingsItem of this.marketSignalSettingsItems) {
            const newData = items.filter(x => x.symbol === marketSignalSettingsItem.symbol);
            const item = newData.length > 0 ? newData[0] : null;

            const donchianAndRsi = item?.donchianAndRsi ?? this.getDefaultItems();
            const divergence = item?.divergence ?? this.getDefaultItems();

            buffer.push({
                symbol: marketSignalSettingsItem.symbol,
                donchianAndRsi: donchianAndRsi,
                donchianAndRsiStr: donchianAndRsi.filter(x => x.isSelected).map(x => x.value).join(', '),
                divergence: divergence,
                divergenceStr: divergence.filter(x => x.isSelected).map(x => x.value).join(', '),
                havingSignal: divergence.map(x => x.isSelected).concat(donchianAndRsi.map(x => x.isSelected)).some(x => x),
                key: marketSignalSettingsItem.key
            });
        }

        this.marketSignalSettingsItems = buffer;
    }

    private getDefaultItems = (): SelectedEnumItem<TimeFrameEnum>[] => {
        return [
            {value: TimeFrameEnum.M5, isSelected: false},
            {value: TimeFrameEnum.M15, isSelected: false},
            {value: TimeFrameEnum.M30, isSelected: false},
            {value: TimeFrameEnum.H1, isSelected: false}
        ];
    }
}