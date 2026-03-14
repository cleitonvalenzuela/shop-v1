<script>
    import { onMount } from "svelte";

    import SuggestionsItem from "$component/suggestions/SuggestionsItem.svelte";
    import { visible } from "$action/visible";
    import { getRandomSuggestions } from "$lib/random";

    let { product, scroll, updateSection=()=>{} } = $props();

    let component = $state(null);
    let suggestions = $state([]);

    const loadSuggestions = async () => {
        if(suggestions.length > 0) return;

        await new Promise(resolve => setTimeout(resolve, 2000));
        suggestions = getRandomSuggestions();
    }

    $effect(() => {
        const { top } = component?.getBoundingClientRect();
        updateSection("suggestions", top+scroll?.position-86);
    });
</script>

<div class="flex flex-col py-[16px] mt-[6px]" use:visible={loadSuggestions} bind:this={component}>
    {#if suggestions?.length > 0}
        <div class="flex justify-between items-center px-[16px]">
            <span class="text-black text-[15px] font-semibold leading-none">Você também pode gostar</span>
        </div>
        <div class="w-full px-[16px] mt-[20px]">
            <div class="flex flex-wrap justify-center w-full relative gap-[9px]">
                {#each suggestions as suggestion}
                    <SuggestionsItem {suggestion}/>
                {/each}
            </div>
        </div>
    {:else}
        <div class="flex justify-between items-center px-[16px]">
            <span class="w-[192px] h-[16px] rounded-sm bg-[#fcfcfc]"></span>
        </div>
        <div class="w-full px-[16px] mt-[20px]">
            <div class="flex flex-wrap w-full relative gap-[9px]">
                {#each Array(6) as item}
                    <div class="rounded-lg overflow-hidden bg-white shadow-recommendations relative"  style="width: calc(50vw - 30px);">
                        <div class="w-full pb-[100%] relative">
                            <div class="absolute top-0 left-0 w-full h-full bg-[#F8F8F8]"></div>
                        </div>
                        <div class="flex flex-col w-full bg-white gap-[6px] px-[8px] pt-[12px] pb-[11px] overflow-hidden">
                            <span class="w-full h-[16px] rounded-sm skeleton"></span>
                            <span class="w-full h-[16px] rounded-sm skeleton"></span>
                            <span class="w-[40%] h-[16px] rounded-sm skeleton"></span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>