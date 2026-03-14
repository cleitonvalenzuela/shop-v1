<script>
    import { formatPrice } from "$lib/formating";

    let { costs, discounts } = $props();
</script>
<div class="flex shrink-0 justify-between items-center w-full h-[51px] px-[16px] bg-white">
    <div class="flex items-center gap-[5px]">
        <svg class="w-[17px] h-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 34">
            <path fill="#E10543" d="M38 0a6 6 0 0 1 6 6v6a5 5 0 0 0 0 10v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-6a5 5 0 0 0 0-10V6a6 6 0 0 1 6-6h32ZM7 4a3 3 0 0 0-3 3v2s5.5 1.5 5.5 8S4 25 4 25v2a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-2s-5.5-1.5-5.5-8S40 9.5 40 9.5V7a3 3 0 0 0-3-3H7Zm25.5 7.5L21 27l-8-8.5 3-3 4.5 5L29 9l3.5 2.5Z"/>
        </svg>
        <span class="text-black text-[15px] font-medium leading-none">Desconto do Tiktok Shop</span>
    </div>
    <div class="flex items-center gap-[8px]">
        <div class="flex items-center gap-[4px]">
            {#if discounts.product.coupons > 0}
                <div class="flex justify-center items-center ps-[8px] pe-[7px] h-[27px] relative bg-[#FFF0F3] rounded-[4px]">
                    <svg class="absolute top-[10px] -left-[1px] h-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 18">
                        <path fill="#fff" d="M0 18A9 9 0 1 0 0 0v18Z"/>
                    </svg>
                    <svg class="absolute top-[10px] -right-[1px] h-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 18">
                        <path fill="#fff" d="M9 0a9 9 0 1 0 0 18V0Z"/>
                    </svg>
                    <span class="text-[#FE2C55] text-[11px] font-semibold whitespace-nowrap">R$ {formatPrice(discounts.product.coupons)}</span>          
                </div>
            {/if}
            {#if (costs.shipping - discounts.shipping.total) == 0}
                <div class="flex justify-center items-center ps-[8px] pe-[7px] h-[27px] relative bg-[#E2F9FC] rounded-[4px]">
                    <svg class="absolute top-[10px] -left-[1px] h-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 18">
                        <path fill="#fff" d="M0 18A9 9 0 1 0 0 0v18Z"/>
                    </svg>
                    <svg class="absolute top-[10px] -right-[1px] h-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 18">
                        <path fill="#fff" d="M9 0a9 9 0 1 0 0 18V0Z"/>
                    </svg>
                    <span class="text-[#20D5EC] text-[11px] font-semibold whitespace-nowrap">Frete grátis</span>
                </div>
            {:else if discounts.shipping.coupons > 0}
                <div class="flex justify-center items-center ps-[8px] pe-[7px] h-[27px] relative bg-[#E2F9FC] rounded-[4px]">
                    <svg class="absolute top-[10px] -left-[1px] h-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 18">
                        <path fill="#fff" d="M0 18A9 9 0 1 0 0 0v18Z"/>
                    </svg>
                    <svg class="absolute top-[10px] -right-[1px] h-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 18">
                        <path fill="#fff" d="M9 0a9 9 0 1 0 0 18V0Z"/>
                    </svg>
                    <span class="text-[#20D5EC] text-[11px] font-semibold whitespace-nowrap">R$ {formatPrice(discounts.shipping.coupons)}</span>
                </div>
            {/if}
        </div>
        <svg class="h-[12px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 35">
            <path fill="#858585" d="m0 3 3-3 17.5 17.5L3 35l-3-3 14-14.5L0 3Z"/>
        </svg>                  
    </div>
</div>