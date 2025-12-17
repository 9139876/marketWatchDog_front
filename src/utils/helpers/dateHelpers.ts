export function getStartOfDayToday(): Date {
    const result = new Date();
    result.setUTCHours(0, 0, 0, 0);

    return result;
}

export function getStartOfDayBeforeToday(before: number): Date {
    const result = getStartOfDayToday();
    result.setDate(result.getDate() - before);

    return new Date(result);
}