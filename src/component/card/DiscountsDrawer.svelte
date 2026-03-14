<script>
    import { formatPrice } from "$lib/formating";

    let { product, updateScroll=()=>{} } = $props();

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
        <button type="button" aria-label="Fechar" class="absolute top-[11px] right-[12px] p-[8px] z-50" onclick={closeDrawer}>
            <svg class="w-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[12px] px-[16px] pt-[18px] pb-[16px]">
            <span class="text-black text-[17px] font-bold leading-none">Descontos do pagamento</span>
        </div>
        <span class="w-full h-[1px] bg-[#eeeeee]"></span>
        <div bind:this={container} class="flex flex-col w-full transparent-scroll px-[16px] py-[14px] scrollable overflow-y-scroll">
            <span class="text-[#707070] text-[14px] leading-[18px]">Confira as melhores ofertas disponíveis para cada método de pagamento.</span>
            <h2 class="text-black text-[15px] font-bold leading-none mt-[18px]">Promoções</h2>
            <ul class="flex flex-col mt-[17px] gap-[12px]">
                {#each Array(product?.free_installments) as installment, index}
                    {#if index > 0}
                        <li class="flex flex-col gap-[6px] border-[1px] border-[#f1f1f1] p-[12px] pb-[11px] rounded-[8px]">
                            <div class="flex items-center gap-[10px]">
                                <div class="flex items-center justify-center w-[28px] h-[20px] shrink-0 bg-[#F1F1F1] rounded-[2px]">
                                    <svg class="h-[14px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 60 46">
                                        <path fill="#1B1C1F" d="M60 40a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V18h60v22ZM46 23a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-1.5 4a1.5 1.5 0 0 1 1.5 1.5V31h3.5a1.5 1.5 0 0 1 0 3h-5a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 1.5-1.5ZM54 0a6 6 0 0 1 6 6v6H0V6a6 6 0 0 1 6-6h48Z"/>
                                    </svg>                              
                                </div>
                                <span class="text-black text-[15px] font-bold leading-none">Sem juros em {index+1} parcelas</span>
                            </div>
                            <span class="text-black text-[13.6px] leading-[18px]">Aproveite um plano de parcelamento em {index+1} vezes sem juros neste pedido</span>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</div>