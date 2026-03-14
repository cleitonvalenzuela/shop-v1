<script>
    import { formatPrice } from "$lib/formating";
    import { calculateDiscount } from "$lib/price";

    let { costs, discounts, coupons, product, price, prices } = $props();

    let coupon = $derived.by(() => {
        const coupon = coupons?.find(item => item.category == "product" && item.is_applied);
        const amount = coupon ? coupon.type == "variable" ? price?.regular * coupon.discount : coupon.discount : 0;
        return { ...coupon, amount };
    });
</script>

<div class="flex justify-between items-center w-full pt-[16px]">
    <div class="flex items-start gap-[4px] ps-[16px]">
        <div class="flex px-[4px] h-[22px] justify-center items-center bg-[#FE2C55] rounded-[4px]">
            <span class="text-white font-semibold text-[14px] leading-none mt-[2px]">{calculateDiscount(price?.regular, price?.promotional - coupon?.amount)}</span>
        </div>
        <div class="flex items-baseline leading-none">
            {#if !prices?.find(item => item.is_selected)}
                <span class="text-[#DF0644] text-[12px] font-semibold ms-[3px]">A partir de</span>
            {/if}
            <span class="text-[#DF0644] text-[14px] font-semibold ms-[4px]">R$ <b class="text-[22px] font-semibold">{formatPrice(price?.promotional - coupon?.amount)}</b></span>
            {#if discounts.product.coupons > 0}
                <svg class="w-[15px] h-[12px] shrink-0 ms-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 34">
                    <path fill="#E10543" d="M38 0a6 6 0 0 1 6 6v6a5 5 0 0 0 0 10v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-6a5 5 0 0 0 0-10V6a6 6 0 0 1 6-6h32ZM7 4a3 3 0 0 0-3 3v2s5.5 1.5 5.5 8S4 25 4 25v2a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-2s-5.5-1.5-5.5-8S40 9.5 40 9.5V7a3 3 0 0 0-3-3H7Zm25.5 7.5L21 27l-8-8.5 3-3 4.5 5L29 9l3.5 2.5Z"/>
                </svg>
            {/if}
            <span class="text-[#666] text-[12px] font-medium opacity-70 line-through ms-[5px]">R$ {formatPrice(price?.regular)}</span>
        </div>
    </div>
</div>