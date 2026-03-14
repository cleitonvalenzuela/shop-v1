<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    
    let { variation, updateVariation=()=>{} } = $props();
</script>

<div class="flex flex-col px-[16px]">
    <span class="text-black text-[13px] font-semibold">{variation.name} ({variation.variants?.length})</span>
    <div class="flex flex-wrap gap-[8px] mt-[8px]">
        {#each variation.variants as variant}
            {#if variation.type == "text"}
                <button onclick={() => { updateVariation(variant); }} type="button" class={`flex justify-center items-center px-2 h-[31px] border-[1px] ${variant.is_selected ? "border-[#FE2C55] text-[#FE2C55]" : "border-[#e8e8e8] text-black"} rounded-[6px] overflow-hidden`}>
                    <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-[12px]">{variant?.name}</span>
                </button>
            {:else if variation.type == "image"}
                <button onclick={() => { updateVariation(variant); }} type="button" class={`flex w-[96px] flex-col justify-center items-center border-[1px] ${variant.is_selected ? "border-[#FE2C55] text-[#FE2C55]" : "border-[#e8e8e8] text-black"} rounded-[6px] overflow-hidden`}>
                    <div class="flex size-[96px] bg-contain bg-center bg-[#F6F6F6]" style={`background-image: url('${PUBLIC_UPLOAD_BASE}/${variant?.image?.source}')`}></div>
                    <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap w-full text-center text-[12px] py-[4px] px-[6px]">{variant?.name}</span>
                </button>
            {/if}
        {/each}
    </div>
</div>