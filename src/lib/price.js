export const calculateDiscount = (regular, promotional) => {
    const discount = Math.floor((promotional / regular) * 100);
    return discount < 9 ? `-${discount}%` : `-${discount}%`;
}