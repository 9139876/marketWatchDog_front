import {IApiResponseContainer} from "../utils/httpClient/dto/apiResponseContainer";
import {createHttpClient, HttpClientMethod} from "../utils/httpClient/httpClient";


const controller = '/TestController';

export interface GetNumberValueRequest {
    value: number
}

export interface GetNumberValueResponse {
    value: number
}

export default class TestApi {
    static getNumberValue(request: GetNumberValueRequest): Promise<IApiResponseContainer<GetNumberValueResponse>> {
        return createHttpClient({
            controller,
            action: 'getNumberValue',
            method: HttpClientMethod.POST,
            request: {body: request}
        });
    }
}