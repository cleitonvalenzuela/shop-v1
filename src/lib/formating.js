export const formatPrice = (value, decimals=true) => {
    if(value === null || value === undefined) return;

    // Se for um número inteiro (sem casas decimais diferentes de zero)
    if (decimals == false && Number.isInteger(value)) {
        return new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 0, // sem casas decimais
            maximumFractionDigits: 0,
        }).format(value);
    }
  
    // Caso tenha centavos
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export const formatNumber = (value) => {
    if(value === null || value === undefined) return {};
    
    value = Math.floor(value);
    if(value >= 1000000){
        return {
            pt: (value / 1000000).toFixed(1).replace('.', ',') + " milhões",
            en: (value / 1000000).toFixed(1) + "m"
        };
    }
    else if(value >= 1000){
        return {
            pt: (value / 1000).toFixed(1).replace('.', ',') + " mil",
            en: (value / 1000).toFixed(1) + "k"
        };
    }

    return {
        pt: value.toString(),
        en: value.toString(),
    }
}

export const formatDate = (value, pattern) => {
    if(value === null || value === undefined) return;
    
    const date = new Date(value);
    const pad_2 = (n) => String(n).padStart(2, "0");
    
    const months = [
        "jan","fev","mar","abr","mai","jun",
        "jul","ago","set","out","nov","dez"
    ];
    
    const tokens = {
        YYYY: date.getFullYear(),
        MMM: months[date.getMonth()],
        MM: pad_2(date.getMonth() + 1),
        DD: pad_2(date.getDate()),
        HH: pad_2(date.getHours()),
        mm: pad_2(date.getMinutes()),
        ss: pad_2(date.getSeconds())
    };
    
    return pattern.replace(
        /YYYY|MMM|MM|DD|HH|mm|ss/g,
        (match) => tokens[match]
    );
}

export const maskWords = (value) => {
    if(value === null || value === undefined) return;

    return value.replace(/\p{L}+/gu, word => {
        if (word.length <= 2) return word;
        return word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
    });
};

export const maskPhone = (value) => {
    if(value === null || value === undefined) return;

    return value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
}

export const firstAndLastName = (value) => {
    if(value === null || value === undefined) return;

    const parts = value.split(/\s+/);
    return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1]}` : parts[0];
}

export const formatFullname = (value) => {
    if(value === null || value === undefined) return;

    const words = value.split(/\s+/).map(p => p.toLocaleLowerCase("pt-BR"));
    return words.map((word, index) => {
        if(index === 0 || index === words.length - 1){
            return word[0] ? word[0].toLocaleUpperCase("pt-BR") + word.slice(1) : "";
        }
        if(word.length <= 2){
            return word;
        }

        return word[0] ? word[0].toLocaleUpperCase("pt-BR") + word.slice(1) : "";
    }).join(" ");
}

export const formatTimer = (value) => {
    if(value === null || value === undefined) return;

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    const pad = num => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const removeAccent = (value) =>  {
    if(value === null || value === undefined) return;

    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const formatCPF = (value) => {
    if(value === null || value === undefined) return;

    value = value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    return value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

export const formatPhone = (value) => {
    if(value === null || value === undefined) return;
    return value.replace(/\D/g, '');
}

export const maskCardNumber = (brand, value) => {
    if(value === null || value === undefined) return;

    const digits = value.replace(/\D/g, '');
  
    if(brand === "amex"){
        return digits.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (m, g1, g2, g3) => 
            [g1, g2, g3].filter(Boolean).join(' ')
        );
    }
    else{
        return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
}

export const maskCardExpiration = (value) => {
    if(value === null || value === undefined) return;

    const digits = value.replace(/\D/g, '');

    let month = digits.slice(0, 2);
    let year = digits.slice(2, 4);

    if (digits.length >= 3) {
        return `${month}/${year}`;
    }
    else{
        return month;
    }
}

export const maskCardSecurity = (value) => {
    if(value === null || value === undefined) return;
    
    const digits = value.replace(/\D/g, '');
    return digits;
}