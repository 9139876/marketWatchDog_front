import {IApiResponseContainer, IApiResponseContainerEmpty} from "./dto/apiResponseContainer";
import {BACKEND_ORIGIN} from "../../appsettings";
import {IMap} from "../../global/common/iMap";
import {stringifyNonEmptyParams} from "./stringifyNonEmptyParams";
import Notification from "../notification/notification";

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

export function createHttpClientWithoutResult(options: IHttpClientOptions): Promise<IApiResponseContainerEmpty> {
    return createHttpClient(options, false);
}

export function createHttpClient(options: IHttpClientOptions, needResult = true): Promise<IApiResponseContainer<any>> {

    const func = async (): Promise<IApiResponseContainer<any>> => {

        const {request, method, controller, action} = options;

        let url = `${BACKEND_ORIGIN}${controller}/${action}`;

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
            const result = await parseResponse(apiResponse, url, needResult, apiResponse.ok);

            if (!result.isSuccess) {
                Notification.notifyError(result.errorMessage ?? 'Неизвестная ошибка');
            }

            return result;
        } catch (ex) {
            const errorMessage = `При вызове ${url} произошла ошибка ${ex}`;
            Notification.notifyError(errorMessage);
            return {isSuccess: false, errorMessage: ex?.toString(), payload: null};
        }
    };

    return func();
}

async function parseResponse(response: Response, url: string, needResult: boolean, isOk: boolean): Promise<IApiResponseContainer<any>> {
    const text = await response.text();

    return !!text
        ? JSON.parse(text) as Promise<IApiResponseContainer<any>>
        : needResult
            ? {isSuccess: false, errorMessage: `Пустой результат при вызове ${url}`, payload: null}
            : {isSuccess: true, errorMessage: null, payload: null};
}