<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    let { product, prices, variants, variations, openVariationsDrawer=()=>{} } = $props();
</script>

<button onclick={openVariationsDrawer} type="button" aria-label="Variações" class="flex w-full flex-col px-[16px]">
    <div class="flex w-full justify-between items-center gap-[5px] py-[14px]">
        <div class="flex w-full items-center overflow-hidden gap-[10px]">
            <svg class="w-[14px] shrink-0 mt-[2px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 39">
                <path fill="#202020" d="M15 21a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V24a3 3 0 0 1 3-3h12Zm21 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3V24a3 3 0 0 1 3-3h12ZM4 35h10V25H4v10Zm21 0h10V25H25v10ZM15 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h12Zm21 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h12ZM4 14h10V4H4v10Zm21 0h10V4H25v10Z"/>
            </svg>
            <div class="flex w-full items-center gap-[2px]">
                <div class="flex max-w-[40%] pe-[12px] overflow-hidden relative">
                    <ul class="flex items-center gap-[5px]">
                        {#if variations?.find(variation => variation.type == "image")}
                            {#each variations?.find(variation => variation.type == "image")?.variants as variant}
                                <li class="size-[32px] rounded-[4px] overflow-hidden bg-cover bg-center" style={variant.image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${variant.image?.source}')`}></li>   
                            {/each}
                        {:else}
                            {#each variations?.find(variation => variation.index == 0)?.variants as variant}
                                <li class="flex justify-center items-center px-[8px] bg-[#f5f5f5] h-[24px] rounded-[4px] text-black text-[12px] leading-none whitespace-nowrap overflow-hidden">{variant.name}</li>   
                            {/each}
                        {/if}
                    </ul>
                    <span class="flex absolute right-0 top-0 w-[16px] h-full bg-gradient-to-r from-transparent to-white"></span>
                </div>
                {#if Object.values(variants)?.length === 0}
                    <span class="text-[#858585] text-[12px] whitespace-nowrap">{prices?.length} opções disponíveis</span>
                {:else}
                    <span class="text-[#858585] text-[12px] truncate block max-w-[195px]">Selecionado: {Object.values(variants)?.map(variant => variant.name).join(", ")}</span>
                {/if}
            </div>
        </div>
        <div class="flex items-center h-full">
            <svg class="h-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
    <span class="flex w-full h-[1px] bg-[#eeeeee]"></span>
</button>