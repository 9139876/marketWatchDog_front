import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import MarketSignalHistoryItem from "../models/marketSignal/marketSignalHistoryItem";
import GetNewItemsRequest from "../models/common/getNewItemsRequest";

const controller = '/bff/market-signal-history';
export default class MarketSignalHistoryApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getNewMarketSignals(request: GetNewItemsRequest): Promise<IApiResponseContainer<MarketSignalHistoryItem[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'get-new-market-signals',
            method: HttpClientMethod.POST,
            request: {
                body: request
            }
        });
    }
}