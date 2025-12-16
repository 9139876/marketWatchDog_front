export function getStartOfDayToday(): Date {
    const result = new Date();
    result.setUTCHours(0, 0, 0, 0);

    return result;
}