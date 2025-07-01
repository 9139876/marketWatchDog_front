import { Nullable } from "../../../global/common/nullable";

export interface IApiResponseContainerEmpty{
    isSuccess: boolean;
    errorMessage: Nullable<string>;
}

export interface IApiResponseContainer<TPayload> extends IApiResponseContainerEmpty{
    payload: Nullable<TPayload>
}