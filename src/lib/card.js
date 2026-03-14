export const getCardBrand = (value) => {
    if(!value) return;

    const digits = value.replace(/\D/g, '');

    if (/^4/.test(digits)) return "visa";
    if (/^(5[1-5])/.test(digits) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(digits)) return "mastercard";
    if (/^3[47]/.test(digits)) return "amex";
    if (/^(4011|4312|4389|4514|4576|5041|5067|5090|6277|6362|6504|6505|6509|6516|6550)/.test(digits)) return "elo";
    
    return null;
}

export const getCardFinal = (value) => {
    if(!value) return;

    const digits = String(value).replace(/\D/g, '');
    if (digits.length < 4) return digits;

    return digits.slice(-4);
}

export const getCardInstallments = (brand, amount, max_installments = 12, min_amount = 4.99) => {
    const rates = {
        mastercard: 0.0315,
        visa: 0.0299,
        elo: 0.0319,
        amex: 0.0349,
        default: 0.0299
    };
  
    const allowed_brands = ["mastercard", "visa", "elo", "amex"];
    if (!brand || !allowed_brands.includes(brand)) return [];
    if (typeof amount !== "number" || amount <= 0) return [];
  
    const to_cents = (value) => Math.round(value * 100);
    const from_cents = (cents) => cents / 100;
    const round_2 = (value) => Math.round(value * 100) / 100;
  
    const monthly_rate = rates[brand] ?? rates.default ?? 0;

    const principal_cents = to_cents(amount);
    const min_installment_cents = to_cents(min_amount);
    
    const max_installments_by_min = Math.max(1, Math.floor(principal_cents / min_installment_cents));
    const effective_max_installments = Math.min(max_installments, max_installments_by_min);
  
    const installments_list = [{ number: 1, amount: amount, total: amount, fee: 0.0 }];
  
    for (let installments = 2; installments <= effective_max_installments; installments++) {
        let installment_cents;
        let total_cents;
    
        if (monthly_rate === 0) {
            total_cents = principal_cents;
            installment_cents = Math.floor(total_cents / installments);
        }
        else {
            const factor_value = Math.pow(1 + monthly_rate, installments);
            const pmt_value = amount * (monthly_rate * factor_value) / (factor_value - 1);
    
            installment_cents = to_cents(pmt_value);
            total_cents = installment_cents * installments;
        }
    
        const installment_value = round_2(from_cents(installment_cents));
        const total_value = round_2(from_cents(total_cents));
    
        const monthly_fee_value = round_2((total_value - amount) / installments);
    
        installments_list.push({
            number: installments,
            amount: installment_value,
            total: total_value,
            fee: monthly_fee_value
        });
    }
  
    return installments_list;
}