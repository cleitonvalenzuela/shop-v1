export const getMonthName = (index) => {
    const months = [null,"jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
    return months[index];
}

export const getSecondsBetweenDates = (d1, d2) => {
    return (new Date(d2) - new Date(d1)) / 1000;
}

export const addHoursToDate = (date, hours) => {
    const new_date = new Date(date);
    new_date.setHours(new_date.getHours() + hours);
    return new_date;
}