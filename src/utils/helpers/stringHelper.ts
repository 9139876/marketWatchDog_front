export function formatDateTimeStr(dateStr: any): string {
    const date = new Date(dateStr);
    return [date.getFullYear(), (addFirstZeroIfNeed(date.getMonth() + 1)), addFirstZeroIfNeed(date.getDate())].join('-') + ' ' + [addFirstZeroIfNeed(date.getHours()), addFirstZeroIfNeed(date.getMinutes()), addFirstZeroIfNeed(date.getSeconds())].join(':');
}

export function formatDateTimeRusStr(dateStr: any): string {
    const date = new Date(dateStr);
    return [addFirstZeroIfNeed(date.getDate()), addFirstZeroIfNeed(date.getMonth() + 1), date.getFullYear()].join('.') + ' '
        + [addFirstZeroIfNeed(date.getHours()), addFirstZeroIfNeed(date.getMinutes()), addFirstZeroIfNeed(date.getSeconds())].join(':');
}

export function formatDateRusStr(dateStr: any): string {
    const date = new Date(dateStr);
    return [addFirstZeroIfNeed(date.getDate()), addFirstZeroIfNeed(date.getMonth() + 1), date.getFullYear()].join('.');
}

export function formatDateStr(dateStr: any): string {
    const date = new Date(dateStr);
    return [date.getFullYear(), addFirstZeroIfNeed(date.getMonth() + 1), addFirstZeroIfNeed(date.getDate())].join('.');
}

export function formatDate(date: Date): string {
    return [date.getFullYear(), addFirstZeroIfNeed(date.getMonth() + 1), addFirstZeroIfNeed(date.getDate())].join('.');
}

export function parseDate(str: string | Date ): Date {
    if (str !== undefined && str !== null) {
        return new Date(str);
    }
    return new Date(1990,0,1);
}

function addFirstZeroIfNeed(number: number): string {
    const res = number.toString();
    return res.length > 1 ? res : `0${res}`;
}