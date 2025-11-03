import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";
import {MarketEventItem} from "../models/marketEvents/marketEventItem";

const controller = '/bff/market-events';
export default class MarketEventsApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getNewMarketEvents(dealerType: DealerTypeEnum, after: Date): Promise<IApiResponseContainer<MarketEventItem[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `get-new-market-events/${dealerType}`,
            method: HttpClientMethod.GET,
            request: {
                query: {
                    after: after.toISOString()
                }
            }
        });
    }
}