import { IMap } from "../../global/common/iMap";
import { querySerializer } from "./querySerializer";


export function stringifyNonEmptyParams(searchParams: IMap<any>): string {
    const paramsKeys = Object.keys(searchParams);
    const nonEmptyParams = paramsKeys
        .filter((paramKey) => notEmpty(searchParams[paramKey]))
        .reduce(
            (result, paramKey) => ({
                ...result,
                [paramKey]: searchParams[paramKey],
            }),
            {},
        );

    return stringifySearchParams(nonEmptyParams);
}

function stringifySearchParams(searchParams: {}): string {
    const searchString: string = querySerializer.stringify(searchParams);

    return `?${searchString}`;
}

function notEmpty<TValue>(value: TValue | null | undefined | string): value is TValue {
    return value !== null && value !== undefined && !(typeof value === 'string' && value.match(/^\s*$/));
}
