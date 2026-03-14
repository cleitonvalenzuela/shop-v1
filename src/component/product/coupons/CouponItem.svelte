<script>
    import { formatPrice } from "$lib/formating";

    let { coupon } = $props();

    const getCouponTitle = (coupon) => {
        if(coupon.type == "variable" && !coupon.minimum && !coupon.limit){
            return `${Math.floor(coupon.discount * 100)} OFF`;
        }
        else if(coupon.limit){
            return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount, false)}`}, máximo de R$ ${formatPrice(coupon.limit, false)}`;
        }
        else if(coupon.minimum){
            return `Compre R$ ${formatPrice(coupon.minimum, false)} e ganhe ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount, false)}`} de desconto`;
        }
        else{
            return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount, false)}`}`;
        }
    }

    let title = $derived(getCouponTitle(coupon));
</script>

<li class="flex items-center gap-[5px] bg-[#FFE5EA] rounded-sm px-[6px] h-[20px]">
    <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 37 28">
        <path fill="#DF0644" d="M21 5h4V0h7c2 0 5 2.5 5 4.5V11h-2a3 3 0 1 0 0 6h2v6.5c0 2-2.5 4.5-5 4.5h-7v-5h-4v5H5c-2.5 0-5-2.5-5-4.5V17h2a3 3 0 1 0 0-6H0V4.5C0 2.5 3 0 5 0h16v5Zm0 14h4v-3h-4v3Zm0-7h4V9h-4v3Z"/>
    </svg>                          
    <span class="text-[#DF0644] text-[11.6px] leading-[11.4px] font-semibold whitespace-nowrap">{title}</span>                      
</li>