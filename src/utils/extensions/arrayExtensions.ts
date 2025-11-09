// Not delete!!!

// interface Array<T> {
//     firstOrDefault(predicate: (T) => boolean): T;
// }
//
// Array.prototype.firstOrDefault = function (predicate: (T) => boolean) {
//     const filteringValues = this.filter(predicate);
//     return filteringValues.length > 0 ? filteringValues[0] : null;
// };

// Not delete!!!

import {Nullable} from "../../global/common/nullable";

export function firstOrDefault<T>(array: Array<T>, predicate: (arg: T) => boolean): Nullable<T> {
    if (!array) {
        return null;
    }

    const filteringValues = array.filter(predicate);
    return filteringValues.length > 0 ? filteringValues[0] : null;
}