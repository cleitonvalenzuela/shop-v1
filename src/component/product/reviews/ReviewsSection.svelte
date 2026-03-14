<script>
    import { formatNumber } from "$lib/formating";

    import ReviewRating from "$component/product/reviews/ReviewRating.svelte";
    import ReviewItem from "$component/product/reviews/ReviewItem.svelte";
    import { onMount } from "svelte";

    let { product={}, scroll={}, updateSection=()=>{}, updatePage=()=>{} } = $props();

    let component = $state(null);
    let reviews = $state([]);

    const loadReviews = async () => {
        const request = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: product?.id
            })
        });

        if(request.status == 200){
            const response = await request.json();
            reviews = response.filter(item => item?.is_preview);
        }
    }

    onMount(() => {
        loadReviews();
    });

    $effect(() => {
        const { top } = component?.getBoundingClientRect();
        updateSection("reviews", top+scroll.position-86);
    });
</script>

<div class="flex flex-col py-[18px] bg-white" bind:this={component}>
    <div class="flex justify-between items-center px-[16px]">
        <span class="text-black text-[15px] font-semibold leading-none">Avaliações dos clientes ({formatNumber(product?.total_reviews).pt})</span>
        <button type="button" class="flex items-center gap-[6px]" onclick={() => updatePage("reviews")}>
            <span class="text-[12.4px] text-[#696969] font-semibold leading-none whitespace-nowrap">Ver mais</span>
            <svg class="h-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </button>
    </div>
    <div class="flex items-center mt-[13px] px-[16px] gap-[6px]">
        <div class="flex items-center gap-[5px] mt-[2px]">
            <span class="text-[15px] text-black font-medium">{product?.rating}</span>
            <span class="text-[13px] text-[#777]">/5</span>
        </div>
        <ReviewRating rating={product?.rating} size={15} gap={4}/>
    </div>
    <div class="w-full mt-[14px]">
        <div class="flex flex-col w-full gap-[16px] px-[16px]">
            {#each reviews as review}
                <ReviewItem {review} {updatePage}/>
            {/each}
        </div>
    </div>
    <span class="flexw-full h-[1px] bg-[#eeeeee] mx-[16px] mt-[18px]"></span>
    <div class="flex justify-between items-center px-[16px] mt-[16px]">
        <span class="text-black text-[15px] font-semibold leading-none">Avaliações da loja ({formatNumber(product?.store?.total_reviews).pt})</span>
        <div class="flex items-center gap-[6px]">
            <svg class="h-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
    <div class="flex mt-[16px] gap-[8px] overflow-x-scroll transparent-scroll">
        <span class="flex w-[8px] shrink-0"></span>
        <button type="button" class="flex items-center gap-[4px] px-[8px] h-[29px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updatePage("reviews", {store: product?.store, filter: "images"})}>
            <svg class="h-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 29">
                <path fill="#000" d="M17 0c6 0 8 4 8 4a9 9 0 0 1 9 9v7a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9v-7a9 9 0 0 1 9-9s2-4 8-4Zm0 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>
            </svg>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">Inclui imagens ou vídeos ({formatNumber(product?.store?.total_reviews * 0.2857).pt})</span>                  
        </button>
        <button type="button" class="flex items-center gap-[4px] px-[8px] h-[29px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updatePage("reviews", {store: product?.store, filter: "five"})}>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">5</span>
            <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">({formatNumber(product?.store?.total_reviews * 0.2381).pt})</span>
        </button>
        <button type="button" class="flex items-center gap-[4px] px-[8px] h-[29px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updatePage("reviews", {store: product?.store, filter: "four"})}>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">4</span>
            <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">({formatNumber(product?.store?.total_reviews * 0.1905).pt})</span>
        </button>
        <button type="button" class="flex items-center gap-[4px] px-[8px] h-[29px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updatePage("reviews", {store: product?.store, filter: "three"})}>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">3</span>
            <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">({formatNumber(product?.store?.piblic_reviews * 0.1429).pt})</span>
        </button>
        <button type="button" class="flex items-center gap-[4px] px-[8px] h-[29px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updatePage("reviews", {store: product?.store, filter: "two"})}>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">2</span>
            <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">({formatNumber(product?.store?.total_reviews * 0.0952).pt})</span>
        </button>
        <button type="button" class="flex items-center gap-[4px] px-[8px] h-[29px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updatePage("reviews", {store: product?.store, filter: "one"})}>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">1</span>
            <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
            <span class="text-black text-[12px] leading-none whitespace-nowrap">({formatNumber(product?.store?.piblic_reviews * 0.0476).pt})</span>
        </button>
        <span class="flex w-[8px] shrink-0"></span>
    </div>
</div>