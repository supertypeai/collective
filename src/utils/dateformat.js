export const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const extractDayFromDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('default', { weekday: 'short' });
}

export const shortDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('default', { month: 'short', day: 'numeric' });
}

export const sortByMonthName = (monthNames, isReverse = false) => {
    const referenceMonthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const directionFactor = isReverse ? -1 : 1;
    const comparator = (a, b) => {
        if (!a && !b) return 0;
        if (!a && b) return -1 * directionFactor;
        if (a && !b) return 1 * directionFactor;

        const comparableA = a.toLowerCase().substring(0, 3);
        const comparableB = b.toLowerCase().substring(0, 3);
        const comparisonResult = referenceMonthNames.indexOf(comparableA) - referenceMonthNames.indexOf(comparableB);
        return comparisonResult * directionFactor;
    };
    const safeCopyMonthNames = [...monthNames];
    safeCopyMonthNames.sort(comparator);
    return safeCopyMonthNames;
}
