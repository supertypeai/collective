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

export const moveDateTimeByMins = (date, hourString, sessionTimezone) => {
    const generateDate = (date, hourString) => {
        const dateObj = new Date(date);
        // hourString = "19"
        dateObj.setHours(hourString, 0, 0, 0);
        return dateObj;
    }

    const moveDateByMins = (date, minutes) => {
        // get current timezone offset
        const currentDate = new Date();
        const tzOffsetMinutes = currentDate.getTimezoneOffset();
        // calculate difference between current timezone offset & the mentor's timezone offset
        const diffMinutes = tzOffsetMinutes - minutes;
        const dateObj = new Date(date);
        // take date and + / - by diffMinutes
        dateObj.setMinutes(dateObj.getMinutes() + diffMinutes);
        return dateObj;
    }

    date = generateDate(date, hourString);
    // console.log("date", date)
    const shiftedDate = moveDateByMins(date, sessionTimezone);
    // console.log("shiftedDate", shiftedDate)
    return shiftedDate
}

export const getNearestDate = (day) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

    let daysUntilTargetDay = (day + 7 - currentDate.getDay()) % 7;

    if (daysUntilTargetDay === 0) {
        daysUntilTargetDay = 7; // Target day is today, get next week's occurrence
    }

    currentDate.setDate(currentDate.getDate() + daysUntilTargetDay);
    return currentDate;
}