import RootStore from "../rootStore";
import {makeAutoObservable} from "mobx";
import MarketSignalSettingsApi from "../../api/marketSignalSettingsApi";
import {Nullable} from "../../global/common/nullable";
import {MarketSignalSettingsItemDto} from "../../models/marketSymbolsAndSignalSettings/marketSignalSettingsItemDto";
import SelectedEnumItem from "../../global/selectedEnumItem";
import {TimeFrameEnum} from "../../models/enums/timeFrameEnum";
import SymbolInfoWithMarketSignalSettingsModel from "../../models/marketSymbolsAndSignalSettings/symbolInfoWithMarketSignalSettingsModel";
import SymbolInfoDto from "../../models/marketSymbolsAndSignalSettings/symbolInfoDto";
import {firstOrDefault} from "../../utils/extensions/arrayExtensions";

export default class MarketSignalSettingsStore {
    private rootStore: RootStore;
    private marketSignalSettingsApi: MarketSignalSettingsApi;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.marketSignalSettingsApi = new MarketSignalSettingsApi(rootStore);
    }

    marketSignalSettingsItems: SymbolInfoWithMarketSignalSettingsModel[] = [];

    refreshMarketSignalSettingsItems = async () => {
        const result = await this.marketSignalSettingsApi.getAll(this.rootStore.appStateStore.getDealerType());

        if (result.isSuccess) {
            this.updateMarketSignalSettings(result.payload);
        }
    }

    trySetSymbolsInfo = async (symbols: SymbolInfoDto[]): Promise<boolean> => {
        const marketSignalsSettingsResponse = await this.marketSignalSettingsApi.getAll(this.rootStore.appStateStore.getDealerType());

        if (marketSignalsSettingsResponse.isSuccess) {
            this.marketSignalSettingsItems = this.map(symbols, marketSignalsSettingsResponse.payload);
            return true;
        }

        return false;
    }

    updateMarketSignalSettings = (marketSignalsSettings: Nullable<MarketSignalSettingsItemDto[]>) => {
        this.marketSignalSettingsItems = this.map(this.marketSignalSettingsItems, marketSignalsSettings);
    }

    private map = (symbols: SymbolInfoDto[], marketSignalsSettings: Nullable<MarketSignalSettingsItemDto[]>): SymbolInfoWithMarketSignalSettingsModel[] => {
        marketSignalsSettings ??= [];

        return symbols.map((item, index) => {
            const marketSignalsSettingsItem = firstOrDefault(marketSignalsSettings, x => x.symbol === item.symbol);

            const donchianAndRsi = marketSignalsSettingsItem?.donchianAndRsi ?? this.getDefaultItems();
            const divergence = marketSignalsSettingsItem?.divergence ?? this.getDefaultItems();

            return {
                symbol: item.symbol,
                spreadInPoints: item.spreadInPoints,
                tradeContractSize: item.tradeContractSize,
                tradePointSize: item.tradePointSize,
                tradePointValue: item.tradePointValue,
                minPositionSize: item.minPositionSize,
                minPositionSizeStep: item.minPositionSizeStep,
                marginByContract: item.marginByContract,
                averageDailyRangeInCurrency: item.averageDailyRangeInCurrency,
                marginByMinPositionSize: item.marginByMinPositionSize,
                spreadLossByContract: item.spreadLossByContract,
                spreadLossByMinPositionSize: item.spreadLossByMinPositionSize,
                dailyMovingProfitByContract: item.dailyMovingProfitByContract,
                dailyMovingProfitByMinPositionSize: item.dailyMovingProfitByMinPositionSize,
                spreadLossToMarginPercentRatio: item.spreadLossToMarginPercentRatio,
                dailyMovingProfitToMarginPercentRatio: item.dailyMovingProfitToMarginPercentRatio,
                dailyMovingProfitToSpreadLossRatio: item.dailyMovingProfitToSpreadLossRatio,

                donchianAndRsi: donchianAndRsi,
                donchianAndRsiStr: donchianAndRsi.filter(x => x.isSelected).map(x => x.value).join(', '),
                divergence: divergence,
                divergenceStr: divergence.filter(x => x.isSelected).map(x => x.value).join(', '),
                havingSignal: divergence.map(x => x.isSelected).concat(donchianAndRsi.map(x => x.isSelected)).some(x => x),
                key: (item as SymbolInfoWithMarketSignalSettingsModel)?.key ?? index
            };
        });
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