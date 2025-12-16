import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import GetNewItemsRequest from "../models/common/getNewItemsRequest";
import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import ClosedPositionModel from "../models/dealsHistory/closedPositionModel";

const controller = '/bff/deals-history';

export default class DealsHistoryApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getDealsHistoryAfter(request: GetNewItemsRequest): Promise<IApiResponseContainer<ClosedPositionModel[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'get-deals-history-after',
            method: HttpClientMethod.POST,
            request: {
                body: request
            }
        });
    }
}