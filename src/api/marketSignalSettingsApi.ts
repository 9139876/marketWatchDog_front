import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import {MarketSignalSettingsItem} from "../models/marketSignalSettings/marketSignalSettingsItem";
import RootStore from "../stores/rootStore";

const controller = '/bff/market-signal-settings';

export default class MarketSignalSettingsApi {

    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getAll(): Promise<IApiResponseContainer<MarketSignalSettingsItem[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'get-all',
            method: HttpClientMethod.GET,
            request: {}
        });
    }
}