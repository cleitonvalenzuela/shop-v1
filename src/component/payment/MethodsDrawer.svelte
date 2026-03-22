<script>
    import PixMethod from "$component/payment/PixMethod.svelte";
    import CreditCardMethod from "$component/payment/CreditCardMethod.svelte";
    import ApplePayMethod from "$component/payment/ApplePayMethod.svelte";
    import BoletoMethod from "$component/payment/BoletoMethod.svelte";
    import AddNewCreditCard from "$component/payment/AddNewCreditCard.svelte";
    import { createEvent } from "$lib/events.client";

    let { session, total, product, method, cards, installments, price, updateMethod=()=>{}, updatePage=()=>{}, updateScroll=()=>{} } = $props();
    let open = $state(false);

    export const openDrawer = () => {
        updateScroll({ locked: true });
        open = true;
        createEvent("drawer", { name: "methods" });
    }
    export const closeDrawer = () => {
        open = false;
        updateScroll({ locked: false });
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-[12px] overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-[9px] right-[8px] p-2 z-50" onclick={closeDrawer}>
            <svg class="w-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[12px] px-4 py-[16px]">
            <span class="text-black text-[16px] font-bold leading-none">Forma de pagamento</span>
        </div>
        <span class="w-full h-[1px] bg-[#eeeeee]"></span>
        <div class="flex flex-col w-full transparent-scroll px-[16px] py-[18px] gap-[21px]">
            {#if product?.card_method != "hidden"}
                <AddNewCreditCard {product} {installments} {price} {method} {updateMethod} {updatePage} {closeDrawer}/>
                {#if cards && product?.card_method}
                    {#each cards as card}
                        <CreditCardMethod {total} {product} {card} {method} {price} {updateMethod} {updatePage} {closeDrawer}/>
                    {/each}
                {/if}
            {/if}
            {#if product?.pix_method != "hidden"}
                <PixMethod {product} {method} {price} {updateMethod}/>
            {/if}
            {#if product?.boleto_method != "hidden"}
                <BoletoMethod {product} {method} {updateMethod}/>
            {/if}
            {#if product?.apple_method != "hidden"}
                <ApplePayMethod {product} {method} {updateMethod}/>
            {/if}
        </div>
        <div class={`w-full fixed bottom-0 left-0 p-[16px] ${session?.os?.name == "iOS" ? "pb-[48px]" : "pb-[18px]"}`}>
            <button class="flex justify-center items-center w-full h-[43px] rounded-full bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] disabled:bg-[#F2F2F2] group" type="button" disabled={method==null} onclick={closeDrawer}>
                <span class="text-white group-disabled:text-[#9F9F9F] text-[15px] font-semibold leading-none">Continuar</span>
            </button>
        </div>
    </div>
</div>