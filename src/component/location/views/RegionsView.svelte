<script>
    import { removeAccent } from "$lib/formating";
    import { onMount } from "svelte";
    
    let { view, location, updateLocation=()=>{}, updateView=()=>{} } = $props();

    let loading = $state(true);
    let container = $state(null);
    let scroll_y = $state(0);
    let letter = $state("A");
    let childs = $state({});
    let regions = $state({});

    const onScroll = () => {
        const last_scroll = scroll_y;
        const new_scroll = container.scrollTop;

        scroll_y = new_scroll;
        
        Object.entries(childs).forEach(([key, value]) => {
            const child_rect = value.getBoundingClientRect();
            const container_rect = container.getBoundingClientRect();

            if (child_rect.top <= container_rect.top){
                letter = key;
            }
        });
    }
    const loadRegions = async () => {
        loading = true;

        const MIN_DELAY = 800;
        const start = Date.now();

        const request = await fetch("/api/regions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const elapsed = Date.now() - start;
        const remaining = MIN_DELAY - elapsed;

        if (remaining > 0) {
            await new Promise(r => setTimeout(r, remaining));
        }

        if (request.status === 200) {
            const response = await request.json();
            if (response.success) {
                const results = response.results;

                regions = {};

                results.forEach(item => {
                    const letter = removeAccent(item.name[0]).toUpperCase();
                    if (!regions[letter]) {
                        regions[letter] = [];
                    }
                    regions[letter].push(item);
                });
            }
        }

        loading = false;
    };

    onMount(async () => {
        await loadRegions();
    });
</script>

<div class="flex w-full h-full relative">
    {#if loading}
        <div class="flex justify-center items-center absolute -top-[32px] left-0 w-full h-full z-20 pointer-events-none">
            <div class="flex justify-center items-center bg-[#2e2e2ed9] size-[80px] rounded-[4px] relative">
                <div class="relative -left-[0.75rem] -top-[0.35rem] z-20">
                    <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
                    <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
                </div>
            </div>
        </div>
    {:else}
        {#if scroll_y > 0}
            <div class={`flex absolute top-0 w-full h-[40px] z-20 pt-[13px] bg-white`}>
                <span class="text-black text-center text-[15px] px-[16px] font-semibold leading-none">{letter}</span>
            </div>
        {/if}
        <div class="flex h-full flex-col justify-center absolute right-[16px] top-0 z-20">
            <div class="flex flex-col gap-[2px]">
                {#each Object.keys(regions) as key, index}
                    <a href={`#letter-${key}`} class={`flex justify-center items-center size-[15px] rounded-full ${key == letter ? "bg-[#FE2C55]" : "bg-transparent"}`}>
                        <span class={`text-[10px] font-semibold ${key == letter ? "text-white" : "text-[#707070]"}`}>{key}</span>
                    </a>
                {/each}
            </div>
        </div>
        <div class={`flex flex-col w-full relative overflow-y-auto overscroll-y-contain transparent-scroll no-selectable`} onscroll={onScroll} bind:this={container}>
            <div class="flex w-full relative">
                <div class="flex flex-col w-full">
                    {#each Object.keys(regions) as key, index}
                        {#if index > 0}
                            <div class="flex ps-4">
                                <span class="block w-full h-[1px] bg-[#efefef]"></span>
                            </div>
                        {/if}
                        <div id={`letter-${key}`} bind:this={childs[key]} class={`flex sticky top-0 bg-white w-full h-[40px] pt-[13px] ${index > 0 && "mt-[16px]"}`}>
                            <span class="text-black text-center text-[14px] px-[16px] font-semibold leading-none">{key}</span>
                        </div>
                        {#each regions[key] as item}
                            <div class="flex ps-[16px]">
                                <span class="block w-full h-[1px] bg-[#efefef]"></span>
                            </div>
                            <button onclick={() => { updateLocation({ ...location, region: item, city: null }); updateView("cities"); }} type="button" class="w-full bg-white a">
                                <span class={`flex items-center text-[14px] px-[16px] h-[45px] ${location?.region && location?.region?.name == item.name ? "text-[#FE2C55]" : "text-black"} leading-none`}>{item.name}</span>
                            </button>
                        {/each}
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>