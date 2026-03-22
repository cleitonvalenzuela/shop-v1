<script>
    import { formatPrice } from "$lib/formating";
    import { createEvent } from "$lib/events.client";

    import PromotionItem from "$component/product/promotions/PromotionItem.svelte";

    let { coupons, updateScroll=()=>{}, applyCoupon=()=>{}, redeemCoupon=()=>{} } = $props();

    let open = $state(false);

    let product_coupons = $derived(coupons?.filter(item => item.category == "product" && !item.is_applied));
    let shipping_coupons = $derived(coupons?.filter(item => item.category == "shipping" && !item.is_applied));

    export const openDrawer = () => {
        updateScroll({ locked: true });
        open = true;
        createEvent("drawer", { name: "promotions" });
    }
    export const closeDrawer = () => {
        open = false;
        updateScroll({ locked: false });
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-[5px] right-[8px] p-2 z-50" onclick={closeDrawer}>
            <svg class="w-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[12px] px-[16px] py-[11px]">
            <span class="text-black text-[16px] font-bold leading-none">Ofertas</span>
        </div>
        <span class="w-full h-[1px] bg-[#eeeeee]"></span>
        <div class="flex flex-col w-full overflow-y-auto overscroll-y-contain transparent-scroll pb-[16px]">
            <span class="flex w-full bg-[#F8F8F8] px-[14px] pt-[12px] pb-[14px] text-[#353535] text-[15px] leading-[19px]">Resgate esses cupons e eles serão aplicados automaticamente na finalização da compra. Você pode aplicar 1 cupom e/ou promoção do TikTok Shop e 1 cupom e/ou promoção de cada vendedor. Aplicam-se termos individuais.</span>
            <div class="flex flex-col px-[16px] mt-[19px]">
                <span class="text-black text-[14px] font-bold leading-none">Cupons de envio</span>
            </div>
            <ul class="flex flex-col gap-[11px] px-[16px] mt-[18px]">
                {#each shipping_coupons as coupon}
                    <PromotionItem version="full" {coupon} {applyCoupon} {redeemCoupon}/>
                {/each}
            </ul>
            <div class="flex flex-col px-[16px] mt-[18px]">
                <span class="text-black text-[14px] font-bold leading-none">Cupons de desconto</span>
            </div>
            <ul class="flex flex-col gap-[11px] px-[16px] mt-[11px]">
                {#each product_coupons as coupon}
                    <PromotionItem version="full" {coupon} {applyCoupon} {redeemCoupon}/>
                {/each}
            </ul>
            <span class="w-full shrink-0 h-[32px]"></span>
        </div>
    </div>
</div>