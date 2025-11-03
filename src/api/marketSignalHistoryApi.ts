import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import MarketSignalHistoryItem from "../models/marketSignal/marketSignalHistoryItem";

const controller = '/bff/market-signal-history';
export default class MarketSignalHistoryApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getNewMarketSignals(dealerType: DealerTypeEnum, after: Date): Promise<IApiResponseContainer<MarketSignalHistoryItem[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `get-new-market-signals/${dealerType}`,
            method: HttpClientMethod.GET,
            request: {
                query: {
                    after: after.toISOString()
                }
            }
        });
    }
}