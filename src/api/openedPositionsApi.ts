import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {OpenedPositionInfo} from "../models/openedPositions/openedPositionInfo";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";

const controller = '/bff/opened-positions';

export default class OpenedPositionsApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getAll(dealerType: DealerTypeEnum): Promise<IApiResponseContainer<OpenedPositionInfo[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `get-all/${dealerType}`,
            method: HttpClientMethod.GET,
            request: {}
        });
    }
}