import {Nullable} from "../../global/common/nullable";

export function firstOrDefault<T>(array: Nullable<Array<T>>, predicate: (arg: T) => boolean = _ => true): Nullable<T> {
    if (!array) {
        return null;
    }

    const filteringValues = array.filter(predicate);
    return filteringValues.length > 0 ? filteringValues[0] : null;
}

export function lastOrDefault<T>(array: Nullable<Array<T>>, predicate: (arg: T) => boolean = _ => true): Nullable<T> {
    if (!array) {
        return null;
    }

    const filteringValues = array.filter(predicate);
    return filteringValues.length > 0 ? filteringValues[filteringValues.length - 1] : null;
}