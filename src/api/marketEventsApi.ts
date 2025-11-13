import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {MarketEventItem} from "../models/marketEvents/marketEventItem";
import GetNewItemsRequest from "../models/common/getNewItemsRequest";

const controller = '/bff/market-events';
export default class MarketEventsApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getNewMarketEvents(request: GetNewItemsRequest): Promise<IApiResponseContainer<MarketEventItem[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'get-new-market-events',
            method: HttpClientMethod.POST,
            request: {
                body: request
            }
        });
    }
}