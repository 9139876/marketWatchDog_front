import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import {MarketSignalSettingsItem} from "../models/marketSignalSettings/marketSignalSettingsItem";
import ApplicationLogStore from "../stores/componentStores/applicationLogStore";

const controller = '/bff/market-signal-settings';

export default class MarketSignalSettingsApi {

    private httpClientFactory: HttpClientFactory;

    constructor(applicationLogStore: ApplicationLogStore) {
        this.httpClientFactory = new HttpClientFactory(applicationLogStore);
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