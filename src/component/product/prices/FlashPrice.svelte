<script>
    import { formatTimer, formatPrice } from "$lib/formating";
    import { calculateDiscount } from "$lib/price";
    import { onMount } from "svelte";

    let { costs, discounts, coupons, product, price, prices } = $props();

    const secondsUntilEndOfDay = () => {
        const now = new Date();

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const diffMs = endOfDay - now;
        return Math.floor(diffMs / 1000);
    }

    let timer = $state(null);
    let interval = $state(null);

    let coupon = $derived.by(() => {
        const coupon = coupons?.find(item => item.category == "product" && item.is_applied);
        const amount = coupon ? coupon.type == "variable" ? price?.regular * coupon.discount : coupon.discount : 0;
        return { ...coupon, amount };
    });

    const updateTimer = () => {
        timer = Math.max(0, timer-1);
    }

    onMount(async () => {
        if(product?.flash_sale){
            timer = secondsUntilEndOfDay();
            interval = setInterval(updateTimer, 1000);

            return () => {
                clearInterval(interval);
            }
        }
    });
</script>

<div class="flex justify-between items-center w-full h-16 bg-linear-to-r from-[#FF2C56] to-[#FF731B] from-40%">
    <div class="flex flex-col justify-center items-start gap-[2px] mt-[4px] ps-[16px] whitespace-nowrap">
        <div class="flex items-start gap-[4px]">
            <div class="flex px-[4px] h-[22px] justify-center items-center bg-white rounded-[4px]">
                <span class="text-[#DF0644] font-semibold text-[14px] leading-none mt-[2px]">{calculateDiscount(price?.regular, price?.promotional - coupon?.amount)}</span>
            </div>
            <div class="flex items-baseline leading-none">
                {#if !prices?.find(item => item.is_selected)}
                    <span class="text-white text-[12px] font-semibold ms-[3px]">A partir de</span>
                {/if}
                <span class="text-white text-[16px] font-semibold ms-[4px]">R$ <b class="text-[22px] font-semibold">{formatPrice(price?.promotional - coupon?.amount)}</b></span>
                {#if discounts.product.coupons > 0}
                    <svg class="h-[12px] ms-[3px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 34">
                        <path fill="#FFF" d="M38 0a6 6 0 0 1 6 6v6a5 5 0 0 0 0 10v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-6a5 5 0 0 0 0-10V6a6 6 0 0 1 6-6h32ZM7 4a3 3 0 0 0-3 3v2s5.5 1.5 5.5 8S4 25 4 25v2a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-2s-5.5-1.5-5.5-8S40 9.5 40 9.5V7a3 3 0 0 0-3-3H7Zm25.5 7.5L21 27l-8-8.5 3-3 4.5 5L29 9l3.5 2.5Z"/>
                    </svg>
                {/if}
            </div>
        </div>
        <span class="text-white text-[12px] font-medium opacity-70 line-through mt-[6px]">R$ {formatPrice(price?.regular)}</span>
    </div>
    <div class="flex w-full justify-end relative">
        <svg class="h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 513 190">
            <path fill="url(#a)" fill-opacity=".1" d="M28.142 0H513v190H43.142L58.5 128.5H19.642c-16.756 1.099-22.917-7.725-18-25L28.142 0Z"/>
            <defs>
                <linearGradient id="a" x1="24" x2="535" y1="26" y2="190" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#fff"/>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
                </linearGradient>
            </defs>
        </svg>          
        <div class="flex flex-col items-end w-full absolute top-0 right-0 pe-[12px]">
            <div class="flex items-center gap-[3px] mt-[10px]">
                <svg class="min-w-3 max-w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 45">
                    <path fill="#fff" d="M8.525 0h19.649c2.519 0 2.595 1.554 1.557 3.625l-5.114 10.876h7.267c2 0 3.038 2.072 1.038 4.144l-22.84 25.377c-2.153 2.071-4.748.518-4.153-1.554l4.672-17.609H2.295C.22 24.86-.376 23.823.22 21.752L5.41 3.107C6.02 1.288 6.373 0 8.526 0Z"/>
                </svg>
                <span class="text-white text-[12px] font-semibold">Oferta Relâmpago</span>
            </div>
            <span class="text-white text-[12px] font-medium mt-[8px] tabular-nums">Termina em {formatTimer(timer)}</span>
        </div>
    </div>
</div>