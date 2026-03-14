export const validateCPF = (value) => {
    if(!value) return;

    value = value.replace(/\D/g, '');

    if (value.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(value)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(value.charAt(i)) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;
    if (firstDigit !== parseInt(value.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(value.charAt(i)) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;

    return secondDigit === parseInt(value.charAt(10));
}

export const validateFullname = (value) => {
    if(!value) return;

    if(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/.test(value)){
        return true;
    }
    return false;
}

export const validatePhone = (value) => {
    if(!value) return;
    
    const digits = value.replace(/\D/g, '');
    if(digits.length == 11){
        return true;
    }
    return false;
}

export const validateEmail = (value) => {
    if(!value) return;

    if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
        return true;
    }
    return false;
}

export const validatePostal = (value) => {
    if(!value) return;

    if(/^[0-9]{8}$/.test(value)){
        return true;
    }
    return false;
}

export const validateDistrict = (value) => {
    if(!value) return;

    if(/([A-z]{1,})/.test(value) && value.length >= 2){
        return true;
    }
    return false;
}

export const validateStreet = (value) => {
    if(!value) return;

    if(/([A-z]{1,})/.test(value) && value.length >= 2){
        return true;
    }
    return false;
}

export const validateInteger = (value) => {
    if(value === null) return;
    return Number.isInteger(value);
}

export const validateUUID = (value) => {
    if(!value) return;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export const validateReviewFilter = (value) => {
    if(!value) return;
    const filters = ["all", "images", "five", "four", "three", "two", "one"];
    return filters.includes(value);
}

export const validateCardNumberBrand = (value) => {
    if(!value) return;

    const brands = ["mastercard", "visa", "elo", "amex"];
    if(brands.includes(value)) return true;
    return false;
}

export const validateCardNumberLength = (brand, value) => {
    if(!value) return;

    const digits = value.replace(/\D/g, '');
    if(brand == "amex"){
        if(digits.length >= 15){
            return true;
        }
    }
    else{
        if(digits.length >= 16){
            return true;
        }
    }
    
    return false;
}

export const validateCardNumberLuhn = (value) => {
    if(!value) return;

    const digits = value.replace(/\D/g, '');
    let sum = 0;
    let double = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i), 10);

        if(double) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        double = !double;
    }

    return (sum % 10) === 0;
}

export const validateCardExpirationMonth = (value) => {
    if (!value) return false;

    const digits = value.replace(/\D/g, '');
    if (digits.length !== 4) return false;
  
    const month = parseInt(digits.slice(0, 2), 10);
    if (Number.isNaN(month)) return false;
  
    return month >= 1 && month <= 12;
}

export const validateCardExpirationYear = (value) => {
    if (!value) return false;

    const digits = value.replace(/\D/g, '');
    if (digits.length !== 4) return false;

    const year2 = parseInt(digits.slice(2, 4), 10);
    if (Number.isNaN(year2)) return false;

    const now = new Date();
    const current_year = now.getFullYear();
    const century = Math.floor(current_year / 100) * 100;
    const full_year = century + year2;

    const max_year = current_year + 15;

    return full_year >= current_year && full_year <= max_year;
}

export const validateCardExpiration = (value) => {
    if (!value) return false;
  
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 4) return false;
  
    const month = parseInt(digits.slice(0, 2), 10);
    const year2 = parseInt(digits.slice(2, 4), 10);
  
    if (Number.isNaN(month) || Number.isNaN(year2)) return false;
    if (month < 1 || month > 12) return false;
  
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
  
    const century = Math.floor(currentYear / 100) * 100;
    const fullYear = century + year2;
  
    if (fullYear < currentYear) return false;
    if (fullYear === currentYear && month < currentMonth) return false;
  
    return true;
};

export const validateCardSecurity = (brand, value) => {
    if (!value) return false;

    const digits = value.replace(/\D/g, '');
    if(brand == "amex"){
        if(digits.length == 4){
            return true;
        }
    }
    else {
        if(digits.length == 3){
            return true;
        }
    }

    return false;
}

export const validateCardHolder = (value) => {
    if (!value) return false;
  
    const name = value.trim();
    const parts = name.split(/\s+/);
    if (parts.length < 2) return false;
  
    return true;
}