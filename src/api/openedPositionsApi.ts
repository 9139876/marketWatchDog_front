import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {OpenedPositionInfo} from "../models/openedPositions/openedPositionInfo";

const controller = '/bff/opened-positions';

export default class OpenedPositionsApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getAll(): Promise<IApiResponseContainer<OpenedPositionInfo[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'get-all',
            method: HttpClientMethod.GET,

            request: {}
        });
    }
}