<script>
    import { onMount } from "svelte";

    import TagItem from "$component/product/tags/TagItem.svelte";
    import { formatNumber } from "$lib/formating";

    let { product } = $props();

    let container = $state(null);
    let carrosel = $state(null);
    let start_arrow = $state(false);
    let end_arrow = $state(false);

    let tags = $derived.by(() => {
        const tags = [];
        if(product?.in_cart) tags.push(`Nos carrinhos de ${formatNumber(product?.in_cart).en} pessoas`);
        if(product?.store?.repurchases) tags.push(`${formatNumber(product?.store?.repurchases).en} recompras na loja`);
        if(product?.recently_viewed) tags.push("Visualizado recentemente");
        return tags;
    });

    const updateScroll = (e) => {
        const scroll_x = container.scrollLeft;
        const container_width = container.offsetWidth;
        const carrosel_width = carrosel.offsetWidth;

        if(scroll_x > 0){
            start_arrow = true;
        }
        else{
            start_arrow = false;
        }

        if(scroll_x < (carrosel_width - container_width)){
            end_arrow = true;
        }
        else{
            end_arrow = false;
        }
    }

    onMount(() => {
        updateScroll();
    });
</script>

<div class={`flex flex-col w-full gap-[8px] px-[16px] ${tags.length == 0 && "mt-[5px]"}`}>
    {#if tags.length > 0}
        <div class="flex items-center gap-[5px] w-full relative">
            {#if start_arrow}
                <div class="flex justify-center items-center absolute left-0 top-0 h-[32px] z-20">
                    <div class="w-[16px] h-[22px] bg-linear-to-l from-transparent to-white"></div>
                </div>
            {/if}
            <div class="flex overflow-x-auto relative no-selectable transparent-scroll h-[32px]" bind:this={container} onscroll={updateScroll}>
                <button type="button" class="mt-0">
                    <ul class="flex items-center gap-[4px]" bind:this={carrosel}>
                        {#each tags as tag, index}
                            <TagItem {tag}/>
                        {/each}
                    </ul>
                </button>
            </div>
            {#if end_arrow}
                <div class="flex justify-center items-center h-[32px] absolute right-0 z-20">
                    <div class="w-[16px] h-[22px] bg-linear-to-r from-transparent to-white"></div>
                </div>
            {/if}
        </div>
    {/if}
    <span class="flex w-full h-[1px] bg-[#eeeeee]"></span>
</div>