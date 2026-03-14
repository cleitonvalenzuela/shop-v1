<script>
    import VideoItem from "$component/product/videos/VideoItem.svelte";

    let { product={} } = $props();
</script>

<button type="button" class="flex flex-col py-[18px] bg-white">
    <div class="flex justify-between items-center px-[16px]">
        <span class="text-black text-[15px] font-semibold leading-none">Vídeos de criadores ({product?.videos?.length})</span>
    </div>
    <div class="flex w-full overflow-hidden items-center mt-[16px]">
        <div class="flex w-full items-center relative">
            <div class="flex overflow-x-auto relative no-selectable transparent-scroll">
                <ul class="flex items-center gap-[8px]">
                    <li class="flex w-[8px]"></li>
                    {#each product?.videos as video, index}
                        <VideoItem {video}/>
                    {/each}
                    <li class="flex w-[8px]"></li>
                </ul>
            </div>
        </div>
    </div>
</button>