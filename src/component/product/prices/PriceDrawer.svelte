<script>
    import { formatPrice } from "$lib/formating";
    import { createEvent } from "$lib/events.client";

    let { costs, discounts, product, price, coupon, updateScroll=()=>{} } = $props();

    let is_open = $state(false);

    export const openDrawer = () => {
        updateScroll({ locked: true });
        is_open = true;
        createEvent("drawer", { name: "price" });
    }
    export const closeDrawer = () => {
        is_open = false;
        updateScroll({ locked: false });
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!is_open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${is_open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${is_open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={closeDrawer}>
            <svg class="w-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[12px] px-[16px] py-[20px]">
            <span class="text-black text-[16px] font-bold leading-none">Detalhes do preço</span>
        </div>
        <span class="w-full h-[1px] bg-[#eeeeee]"></span>
        <div class="flex flex-col w-full transparent-scroll px-[16px] py-[20px]">
            <div class="flex justify-between items-center text-black text-[15px] font-bold mt-[2px]">
                <span>Preço original</span>
                <span>R$ {formatPrice(price?.regular)}</span>
            </div>
            {#if discounts.product.offer > 0}
                <div class="flex justify-between items-center text-[15px] mt-[18px]">
                    <span class="text-black">Promoção</span>
                    <span class="text-[#FE2C55]">-R$ {formatPrice(price?.regular - price?.promotional)}</span>
                </div>
            {/if}
            {#if discounts.product.coupons > 0}
                <div class="flex justify-between items-center text-[15px] mt-[18px]">
                    <span class="text-black">Cupom</span>
                    <span class="text-[#FE2C55]">-R$ {formatPrice(discounts.product.coupons)}</span>
                </div>
            {/if}
            <span class="w-full h-[1px] bg-[#eeeeee] mt-[20px]"></span>
            <div class="flex items-center justify-end leading-none font-bold gap-[6px] mt-[22px]">
                <span class="text-black text-[15px] mt-[2px]">Preço atual</span>
                <span class="text-[#FE2C55] text-[19px]">R$ {formatPrice(price?.promotional - discounts.product.coupons)}</span>
            </div>
            <span class="text-[#888] text-[12px] text-end leading-[18px] mt-[18px]">Impostos inclusos<br/>O preço final irá variar com base na disponibilidade de desconto</span>
        </div>
    </div>
</div>