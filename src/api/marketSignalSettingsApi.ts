import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {MarketSignalSettingsItemDto} from "../models/marketSignalSettings/MarketSignalSettingsItemDto";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";

const controller = '/bff/market-signal-settings';

export default class MarketSignalSettingsApi {

    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getAll(dealerType: DealerTypeEnum): Promise<IApiResponseContainer<MarketSignalSettingsItemDto[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `get-all/${dealerType}`,
            method: HttpClientMethod.GET,
            request: {}
        });
    }

    update(dealerType: DealerTypeEnum, item: MarketSignalSettingsItemDto): Promise<IApiResponseContainer<MarketSignalSettingsItemDto[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `update-symbol-market-signal/${dealerType}`,
            method: HttpClientMethod.POST,
            request: {
                body: item
            }
        });
    }
}