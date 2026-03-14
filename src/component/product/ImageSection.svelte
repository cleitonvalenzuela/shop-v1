
<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    let { product, openViewer=()=>{} } = $props();

    let container = $state(null);
    let index = $state(0);

    const handleScroll = () => {
        const scroll = container.scrollLeft;
        const width = window.innerWidth;

        index = Math.floor(scroll / width);
        if(scroll >= ((index * width) + (width / 2))) index += 1;
        if(index < 0) index = 0;
    }
</script>

<div class="w-full shrink-0 overflow-hidden bg-[#F8F8F8] relative">
    <div class="flex items-center justify-center absolute right-[16px] bottom-[16px] bg-[#0000007d] rounded-full w-[34px] h-[20px] z-20">
        <span class="text-white text-[10.6px] z-20 leading-none">{index+1}/{product?.images?.length}</span>
    </div>
    <div bind:this={container} onscroll={handleScroll} class="flex overflow-x-auto h-full snap-x snap-mandatory scroll-smooth transparent-scroll">
        {#each product?.images as image}
            <button class="flex snap-start snap-always flex-none w-screen pb-[100vw] h-full relative" type="button" aria-label="Product" onclick={() => openViewer(index)}>
                <div class="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                    <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat" style={image.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image.source}')`}></div>
                </div>
            </button>
        {/each}
    </div>
</div>