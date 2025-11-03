import {IApiResponseContainer, IApiResponseContainerEmpty} from "./dto/apiResponseContainer";
import {IMap} from "../../global/common/iMap";
import {stringifyNonEmptyParams} from "./stringifyNonEmptyParams";
import RootStore from "../../stores/rootStore";

export enum HttpClientMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}

export interface IHttpClientRequest {
    query?: IMap<any>;
    body?: IMap<any>;
}

export interface IHttpClientOptions {
    controller: string;
    action: string;
    method: HttpClientMethod;
    request: IHttpClientRequest;
}

export class HttpClientFactory {
    private readonly rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    createClientAndCallWithoutResult = (options: IHttpClientOptions): Promise<IApiResponseContainerEmpty> => {
        return this.createClientAndCall(options, false);
    }

    createClientAndCall = (options: IHttpClientOptions, needResult = true): Promise<IApiResponseContainer<any>> => {

        const func = async (): Promise<IApiResponseContainer<any>> => {

            const {request, method, controller, action} = options;

            let url = `${this.rootStore.appStateStore.getBackendOrigin()}${controller}/${action}`;

            if (request.query) {
                url = `${url}${stringifyNonEmptyParams(request.query)}`;
            }

            let httpClientOptions: RequestInit = {
                method: options.method.toString(),
                cache: 'no-store',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                },
            };

            if ((method === HttpClientMethod.POST || method === HttpClientMethod.PUT) && request.body) {
                httpClientOptions = {
                    ...httpClientOptions,
                    body: JSON.stringify(request.body),
                    headers: {
                        ...httpClientOptions.headers,
                        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                };
            }

            try {
                let apiResponse = await fetch(url, httpClientOptions);
                const result = await this.parseResponse(apiResponse, url, needResult);

                if (!result.isSuccess) {
                    this.rootStore.frontEndLogStore.addEvent(result.errorMessage ?? 'Неизвестная ошибка');
                }

                return result;
            } catch (ex) {
                const errorMessage = `При вызове ${url} произошла ошибка ${ex}`;
                this.rootStore.frontEndLogStore.addEvent(errorMessage);
                return {isSuccess: false, errorMessage: ex?.toString(), payload: null};
            }
        };

        return func();
    }

    private parseResponse = async (response: Response, url: string, needResult: boolean): Promise<IApiResponseContainer<any>> => {
        const text = await response.text();

        return !!text
            ? JSON.parse(text, HttpClientFactory.ReviveDateTime) as Promise<IApiResponseContainer<any>>
            : needResult
                ? {isSuccess: false, errorMessage: `Пустой результат при вызове ${url}`, payload: null}
                : {isSuccess: true, errorMessage: null, payload: null};
    }

    private static ReviveDateTime(key: any, value: any): any {
        if (typeof value === 'string' && (key.toLowerCase().includes('time') || key.toLowerCase().includes('date'))) {
            const date = new Date(value)

            if (!!date.getDate()) {
                return date;
            }
        }

        return value;
    }
}
