import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {CheckOpenPositionResponse} from "../models/openPosition/checkOpenPositionResponse";
import {CheckOpenPositionRequest} from "../models/openPosition/checkOpenPositionRequest";
import ModifyPositionResponse from "../models/openPosition/modifyPositionResponse";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";

const controller = '/bff/open-position';

export default class OpenPositionApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    checkOpenPosition(request: CheckOpenPositionRequest): Promise<IApiResponseContainer<CheckOpenPositionResponse>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'check-open-position',
            method: HttpClientMethod.POST,
            request: {body: request}
        });
    }

    openPosition(request: CheckOpenPositionRequest): Promise<IApiResponseContainer<ModifyPositionResponse>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'open-position',
            method: HttpClientMethod.POST,
            request: {body: request}
        });
    }

    closePosition(dealerType: DealerTypeEnum, symbol: string): Promise<IApiResponseContainer<ModifyPositionResponse>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `close-position/${dealerType}`,
            method: HttpClientMethod.POST,
            request: {
                query: {
                    symbol: symbol
                }
            }
        });
    }
}