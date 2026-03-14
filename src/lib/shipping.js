export const getShippingRange = (value) => {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() + value);

    const toDate = new Date(fromDate);
    toDate.setDate(toDate.getDate() + 3);

    const sameMonth = fromDate.getMonth() === toDate.getMonth();

    const format = d =>
        `${d.getDate()} de ${d
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace(".", "")
        .toLowerCase()}`;

    return { from: sameMonth ? String(fromDate.getDate()) : format(fromDate), to: format(toDate) };
}