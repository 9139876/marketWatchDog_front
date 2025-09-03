import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";

const controller = '/bff/market-symbols';

export default class MarketSymbolsApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getMarketSymbols(dealerType: DealerTypeEnum): Promise<IApiResponseContainer<string[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'get-market-symbols',
            method: HttpClientMethod.GET,
            request: {query: {dealerTypeStr: dealerType}}
        });
    }
}