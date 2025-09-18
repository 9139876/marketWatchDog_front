import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";
import SymbolInfoDto from "../models/marketSymbolsAndSignalSettings/symbolInfoDto";

const controller = '/bff/market-symbols';

export default class MarketSymbolsApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getSymbolsInfo(dealerType: DealerTypeEnum): Promise<IApiResponseContainer<SymbolInfoDto[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `get-symbols-info/${dealerType}`,
            method: HttpClientMethod.GET,
            request: {}
        });
    }
}