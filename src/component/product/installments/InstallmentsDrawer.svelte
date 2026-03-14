<script>
    import { formatPrice } from "$lib/formating";

    let { total, product, price, installments, updateScroll=()=>{} } = $props();

    let container = $state(null);
    let is_open = $state(false);

    export const openDrawer = () => {
        updateScroll({ locked: true });
        container?.scrollTo({ top: 0, behavior: "instant" });
        is_open = true;
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
            <span class="text-black text-[17px] font-bold leading-none">Plano parcelado</span>
        </div>
        <div class="px-[16px] pb-[6px]">
            <span class="text-[#595959] text-[11px] leading-[11px]">Escolha um método de parcelamento na finalização da compra.</span>
        </div>
        <div bind:this={container} class="flex flex-col w-full transparent-scroll px-[16px] pb-[20px] scrollable overflow-y-scroll">
            <ul class="flex flex-col">
                {#each installments as installment, index}
                    {#if installment.number > 1}
                        {#if index > 1}
                            <span class="flex w-full h-[1px] bg-[#eeeeee]"></span> 
                        {/if}
                        {#if installment.number <= product?.free_installments}
                            <li class="flex flex-col gap-[4px] py-[15px]">
                                <span class="text-black text-[14px] leading-none">{installment?.number}x R$ {formatPrice(total / installment?.number)}</span>
                                <div class="flex items-center gap-[4px] text-[#595959] text-[11px] leading-none">Taxa de parcelamento mensal: <span class="bg-[#FFE5EA] px-[4px] py-[2px] rounded-[4px] text-[#E10544] text-[10px] font-medium leading-none">Sem juros</span> <span class="line-through text-[#858585] text-[12px]">R$ {formatPrice(installment?.fee)}</span></div>
                            </li>
                        {:else}
                            <li class="flex flex-col gap-[4px] py-[15px]">
                                <span class="text-black text-[14px] leading-none">{installment?.number}x R$ {formatPrice(installment?.amount)}</span>
                                <div class="flex items-center gap-[4px] text-[#595959] text-[11px] leading-none">Taxa de parcelamento mensal: <span class="line-through text-[#858585] text-[12px]">R$ {formatPrice(installment?.fee)}</span></div>
                            </li>
                        {/if}
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</div>