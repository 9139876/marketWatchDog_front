export function getStartOfDay(date: Date): Date {
    const result = new Date(date);
    result.setUTCHours(0, 0, 0, 0);

    return result;
}

export function getStartOfDayToday(): Date {
    return getStartOfDay(new Date());
}

export function getStartOfDayBeforeToday(before: number): Date {
    const result = getStartOfDayToday();
    result.setDate(result.getDate() - before);

    return new Date(result);
}