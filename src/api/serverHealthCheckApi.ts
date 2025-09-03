import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";

const controller = '/bff/health-check';

export default class ServerHealthCheckApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    ping(): Promise<IApiResponseContainer<string>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'ping',
            method: HttpClientMethod.GET,
            request: {}
        });
    }
}