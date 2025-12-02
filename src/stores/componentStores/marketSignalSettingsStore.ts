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
                bid: item.bid,
                bidStr: item.bidStr,
                ask: item.ask,
                askStr: item.askStr,
                spreadInPoints: item.spreadInPoints,
                tradeContractSize: item.tradeContractSize,
                tradeContractSizeStr: item.tradeContractSizeStr,
                tradePointSize: item.tradePointSize,
                tradePointSizeStr: item.tradePointSizeStr,
                tradePointValue: item.tradePointValue,
                tradePointValueStr: item.tradePointValueStr,
                minPositionSize: item.minPositionSize,
                minPositionSizeStr: item.minPositionSizeStr,
                minPositionSizeStep: item.minPositionSizeStep,
                minPositionSizeStepStr: item.minPositionSizeStepStr,
                marginByContract: item.marginByContract,
                marginByContractStr: item.marginByContractStr,
                averageDailyRangeInCurrency: item.averageDailyRangeInCurrency,
                averageDailyRangeInCurrencyStr: item.averageDailyRangeInCurrencyStr,
                marginByMinPositionSize: item.marginByMinPositionSize,
                marginByMinPositionSizeStr: item.marginByMinPositionSizeStr,
                spreadLossByContract: item.spreadLossByContract,
                spreadLossByContractStr: item.spreadLossByContractStr,
                spreadLossByMinPositionSize: item.spreadLossByMinPositionSize,
                spreadLossByMinPositionSizeStr: item.spreadLossByMinPositionSizeStr,
                dailyMovingProfitByContract: item.dailyMovingProfitByContract,
                dailyMovingProfitByContractStr: item.dailyMovingProfitByContractStr,
                dailyMovingProfitByMinPositionSize: item.dailyMovingProfitByMinPositionSize,
                dailyMovingProfitByMinPositionSizeStr: item.dailyMovingProfitByMinPositionSizeStr,
                spreadLossToMarginPercentRatio: item.spreadLossToMarginPercentRatio,
                spreadLossToMarginPercentRatioStr: item.spreadLossToMarginPercentRatioStr,
                dailyMovingProfitToMarginPercentRatio: item.dailyMovingProfitToMarginPercentRatio,
                dailyMovingProfitToMarginPercentRatioStr: item.dailyMovingProfitToMarginPercentRatioStr,
                dailyMovingProfitToSpreadLossRatio: item.dailyMovingProfitToSpreadLossRatio,
                dailyMovingProfitToSpreadLossRatioStr: item.dailyMovingProfitToSpreadLossRatioStr,

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