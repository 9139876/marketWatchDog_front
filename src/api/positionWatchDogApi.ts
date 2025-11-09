import {HttpClientFactory, HttpClientMethod} from "../utils/httpClient/httpClient";
import RootStore from "../stores/rootStore";
import {DealerTypeEnum} from "../models/enums/dealerTypeEnum";
import {IApiResponseContainer, IApiResponseContainerEmpty} from "../utils/httpClient/dto/apiResponseContainer";
import PositionWatchDogStoredModel from "../models/watchDog/positionWatchDogStoredModel";
import {PositionWatchDogTypeEnum} from "../models/watchDog/positionWatchDogTypeEnum";

const controller = '/bff/position-watch-dog';

export default class PositionWatchDogApi {
    private httpClientFactory: HttpClientFactory;

    constructor(rootStore: RootStore) {
        this.httpClientFactory = new HttpClientFactory(rootStore);
    }

    getPositionWatchDogParamsExamples(dealerType: DealerTypeEnum, positionIdentifier: number): Promise<IApiResponseContainer<PositionWatchDogStoredModel[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `get-position-watch-dog-params-examples/${dealerType}`,
            method: HttpClientMethod.GET,
            request: {
                query: {
                    positionIdentifier: positionIdentifier
                }
            }
        });
    }

    addPositionWatchDog(positionWatchDog: PositionWatchDogStoredModel): Promise<IApiResponseContainer<PositionWatchDogStoredModel[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: 'add-position-watch-dog',
            method: HttpClientMethod.POST,
            request: {
                body: positionWatchDog
            }
        });
    }

    deletePositionWatchDog(dealerType: DealerTypeEnum, positionIdentifier: number, watchDogType: PositionWatchDogTypeEnum): Promise<IApiResponseContainer<PositionWatchDogStoredModel[]>> {
        return this.httpClientFactory.createClientAndCall({
            controller,
            action: `deactivate-position-watch-dog/${dealerType}`,
            method: HttpClientMethod.PUT,
            request: {
                query: {
                    positionIdentifier: positionIdentifier,
                    type: watchDogType
                }
            }
        });
    }

    updatePositionWatchDog(positionWatchDog: PositionWatchDogStoredModel): Promise<IApiResponseContainerEmpty> {
        return this.httpClientFactory.createClientAndCallWithoutResult({
            controller,
            action: 'update-position-watch-dog',
            method: HttpClientMethod.PUT,
            request: {
                body: positionWatchDog
            }
        });
    }
}