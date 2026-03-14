<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    import { formatTimer, formatPrice } from "$lib/formating";
    import { onMount } from "svelte";

    import QuantityField from "$component/variations/QuantityField.svelte";
    import VariationItem from "$component/variations/VariationItem.svelte";
    import CouponItem from "$component/product/coupons/CouponItem.svelte";
    import ToastNotification from "$component/ToastNotification.svelte";

    let { session, costs, discounts, coupons, product, shipping, variations, price, prices, quantity, updateVariation=()=>{}, updateQuantity=()=>{}, gotoFinalization=()=>{}, updatePage=()=>{} } = $props();

    let container = $state(null);
    let toast = $state(null);
    let open = $state(false);
    let interval = $state(null);

    let timer_flash = $state(null);
    let timer_shipping = $state(1200);

    let image = $derived(price?.image || product?.images?.find(item => item?.index == 0));
    let coupon = $derived.by(() => {
        const coupon = coupons?.find(item => item.category == "product" && item.is_applied);
        const amount = coupon ? coupon.type == "variable" ? price?.regular * coupon.discount : coupon.discount : 0;
        return { ...coupon, amount };
    });

    const secondsUntilEndOfDay = () => {
        const now = new Date();

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const diffMs = endOfDay - now;
        return Math.floor(diffMs / 1000);
    }

    const updateTimer = () => {
        if(timer_flash){
            timer_flash = Math.max(0, timer_flash-1);
        }
        if(timer_shipping){
            timer_shipping = Math.max(0, timer_shipping-1);
        }
    }
    const localUpdateQuantity = (value) => {
        if(value < 1){
            toast.showMessage("Selecione pelo menos 1 item");
        }
        else if(value > 10){
            toast.showMessage("Selecione no máximo 10 itens");
        }
        updateQuantity(value);
    }
    const calculateDiscount = (regular, promotional) => {
        const discount = Math.floor((promotional / regular) * 100);
        return discount < 9 ? `-0${discount}%` : `-${discount}%`;
    }

    onMount(async () => {
        if(product?.flash_sale){
            timer_flash = secondsUntilEndOfDay();
        }

        interval = setInterval(updateTimer, 1000);
        return () => {
            clearInterval(interval);
        }
    });

    export const openDrawer = () => {
        document.body.classList.add("no-scroll");
        open = true;
    }
    export const closeDrawer = () => {
        container.scrollTo({ top: 0, behavior: "instant" });
        open = false;
        document.body.classList.remove("no-scroll");
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[70%] transition-transform duration-300 ease-in-out z-20 rounded-t-[12px] overflow-hidden bg-white no-selectable`}>
        <ToastNotification bind:this={toast} top={150}/>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={closeDrawer}>
            <svg class="size-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex w-full gap-[12px] p-[16px]">
            <div class="flex size-[96px] shrink-0 rounded-[8px] bg-[#F6F6F6] bg-contain bg-center" style={`background-image: url('${PUBLIC_UPLOAD_BASE}/${image?.source}')`}></div>
            <div class="flex flex-col w-full justify-between relative overflow-hidden">
                <div class="flex flex-col">
                    <div class="flex items-center gap-[8px]">
                        <div class="flex w-[44px] h-[22px] justify-center items-center bg-[#FE2C55] rounded-[4px]">
                            <span class="text-white font-semibold text-[14px] leading-none">{calculateDiscount(price?.regular, price?.promotional - coupon?.amount)}</span>
                        </div>
                        <div class="flex items-baseline text-[#E10543] text-[16px] font-semibold leading-none">
                            {#if !prices?.find(item => item.is_selected)}
                                <span class="text-[12px] font-semibold me-[4px]">A partir de</span>
                            {/if}
                            <span>R$ <b class="text-[22px] font-semibold">{formatPrice(price?.promotional - coupon?.amount)}</b></span>
                            {#if discounts.product.coupons > 0}
                                <svg class="h-[12px] w-[14px] shrink-0 ms-[5px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 34">
                                    <path fill="#E10543" d="M38 0a6 6 0 0 1 6 6v6a5 5 0 0 0 0 10v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-6a5 5 0 0 0 0-10V6a6 6 0 0 1 6-6h32ZM7 4a3 3 0 0 0-3 3v2s5.5 1.5 5.5 8S4 25 4 25v2a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-2s-5.5-1.5-5.5-8S40 9.5 40 9.5V7a3 3 0 0 0-3-3H7Zm25.5 7.5L21 27l-8-8.5 3-3 4.5 5L29 9l3.5 2.5Z"/>
                                </svg>
                            {/if}
                        </div>
                    </div>
                    <div>
                        <span class="text-black text-[12px] font-medium opacity-50 line-through">R$ {formatPrice(price?.regular)}</span>
                    </div>
                    {#if coupon}
                        <ul class="flex items-center mt-[0.2rem]">
                            <CouponItem {coupon}/>
                        </ul>
                    {/if}
                </div>
                <span class="inline-block max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-[#707070] text-[12px]">
                    {variations?.flatMap(variation => variation.variants).filter(variant => variant.is_selected).map(variant => variant.name).join(", ")}
                </span>
            </div>
        </div>
        {#if product?.flash_sale && timer_flash > 0}
            <div class="flex w-full px-[16px]">
                <div class="flex items-center justify-between w-full h-[28px] ps-[8px] bg-gradient-to-r from-[#FEF2F5] to-[#FFF] rounded-[6px]">
                    <div class="flex items-center gap-[5px]">
                        <svg class="w-[11px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 45">
                            <path fill="#E40442" d="M8.525 0h19.649c2.519 0 2.595 1.554 1.557 3.625l-5.114 10.876h7.267c2 0 3.038 2.072 1.038 4.144l-22.84 25.377c-2.153 2.071-4.748.518-4.153-1.554l4.672-17.609H2.295C.22 24.86-.376 23.823.22 21.752L5.41 3.107C6.02 1.288 6.373 0 8.526 0Z"/>
                        </svg>
                        <span class="text-[#E40442] text-[12.4px] font-semibold leading-none">Oferta Relâmpago</span>                         
                    </div>
                    <span class="text-[#E40442] text-[12px] leading-none">Termina em <b class="font-medium tabular-nums">{formatTimer(timer_flash)}</b></span>
                </div>
            </div>
        {:else if (costs.shipping - discounts.shipping.total) == 0}
            <div class="flex w-full px-[16px]">
                <div class="flex items-center justify-between w-full h-[28px] px-[8px] bg-[#EFFBFB] rounded-[6px]">
                    <div class="flex items-center gap-[5px]">
                        <svg class="size-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 31">
                            <path fill="#13C2C2" d="M20.583 0c2.375 0 3.959 1.583 3.959 3.563v1.979h4.75c1.98 0 6.333 5.937 6.333 11.083v6.333c0 1.98-.396 3.167-2.375 3.167h-3.398a5.542 5.542 0 0 1-10.622 0h-6.003a5.542 5.542 0 0 1-10.623-.007C1.104 26.012 0 24.485 0 22.958V19c.088-.97.175-2.037.259-3.167h7.658v-3.167H.47c.062-1.04.119-2.102.166-3.166h11.239V6.333H.745c.028-1.085.047-2.149.047-3.166C.792 1.187 1.583 0 3.562 0h17.021ZM7.917 22.167a2.375 2.375 0 1 0 0 4.75 2.375 2.375 0 0 0 0-4.75Zm16.625 0a2.375 2.375 0 1 0 0 4.75 2.375 2.375 0 0 0 0-4.75Zm0-12.667v5.542h6.728c0-2.77-2.374-5.542-4.353-5.542h-2.375Z"/>
                        </svg>
                        {#if (costs.shipping - discounts.shipping.total) == 0}
                            <div class="text-black text-[12.4px] leading-none">A oferta de <span class="text-[#027B7B]">frete grátis</span> está expirando</div>
                        {:else}
                            <div class="text-black text-[12.4px] leading-none">O desconto de <span class="text-[#027B7B]">R$ 20</span> no frete está expirando</div>
                        {/if}
                    </div>
                    <span class="text-[#027B7B] text-[12px] font-semibold tabular-nums leading-none">{formatTimer(timer_shipping)}</span>
                </div>
            </div>
        {:else}
            <div class="flex w-full px-[16px]">
                <span class="w-full h-[1px] bg-[#eeeeee]"></span>
            </div>
        {/if}
        <div class={`overflow-y-auto overscroll-y-contain transparent-scroll pt-[12px] ${session?.os?.name == "iOS" ? "pb-[116px]" : "pb-[84px]"}`} bind:this={container}>
            {#each variations as variation, index}
                {#if index > 0}
                    <span class="flex w-full h-[12px]"></span>
                {/if}
                <VariationItem {variation} {updateVariation}/>
            {/each}
            <div class="flex justify-between items-center px-[16px] mt-[30px]">
                <span class="text-black text-[13px] font-semibold">Quantidade</span>
                <QuantityField {quantity} updateQuantity={localUpdateQuantity}/>
            </div>
        </div>
        <div class={`flex absolute bottom-0 left-0 w-full px-[12px] pt-[11px] ${session?.os?.name == "iOS" ? "pb-[44px]" : "pb-[12px]"} gap-[12px] bg-white border-t-[1px] border-[#eeeeee]`}>
            <button class="flex justify-center items-center px-[12px] bg-[#F2F2F2] active:bg-[#e4e4e4] h-11 rounded-lg" type="button" onclick={closeDrawer}>
                <span class="text-black text-[16px] font-semibold whitespace-nowrap">Adicionar ao carrinho</span>
            </button>
            <button type="button" title="Adicionar ao carrinho" class="flex flex-col justify-center w-full h-[44px] gap-[4px] px-[8px] items-center bg-[#FE2C55] rounded-[8px] hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden" onclick={() => gotoFinalization(toast)}>
                <span class="text-white text-[16px] font-semibold leading-none">R$ {formatPrice(price?.promotional - coupon?.amount)}</span>
                <span class=" inline-block max-w-full text-ellipsis whitespace-nowrap overflow-hidden text-white text-[10px] font-medium leading-none">{product?.flash_sale ? "Compre pelo preço de Oferta relâmpago" : (costs.shipping - discounts.shipping.total) === 0 ? "Comprar agora | Frete grátis" : "Comprar agora"}</span>
            </button>
        </div>
    </div>
</div>