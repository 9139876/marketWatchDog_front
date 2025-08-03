import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {CheckOpenPositionResponse} from "../models/openPosition/checkOpenPositionResponse";
import {CheckOpenPositionRequest} from "../models/openPosition/checkOpenPositionRequest";

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
}