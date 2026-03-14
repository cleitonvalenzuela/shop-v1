<script>
    import { onMount } from "svelte";
    import { formatNumber } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import ProductItem from "$component/product/store/ProductItem.svelte";

    let { product={} } = $props();

    let ready = $state(false);
    let products = $state([]);

    const loadStoreProducts = async () => {
        const request = await fetch("/api/store/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: product?.store?.id })
        });

        if(request.status === 200){
            products = await request.json();
        }
    }

    onMount(loadStoreProducts);
</script>

<div class="flex flex-col py-[16px] bg-white">
    <div class="flex justify-between items-center px-[16px]">
        <div class="flex items-center gap-[12px]">
            <div class="size-[56px] bg-center bg-cover rounded-full" style={product?.store?.image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${product?.store?.image?.source}');`}></div>
            <div class="flex flex-col">
                <span class="text-black text-[14px] font-semibold">{product?.store?.title}</span>
                <span class="text-[#666] text-[13px] leading-none mt-[3px]">{formatNumber(product?.store?.total_sales).en} vendido(s)</span>
            </div>
        </div>
        <button type="button" class="flex items-center gap-[4px] px-[19px] h-[29px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
            <span class="text-black text-[14px] font-semibold">Visitar</span>
        </button>
    </div>
    <span class="flexw-full h-[1px] bg-[#eeeeee] mx-[16px] mt-[13px]"></span>
    <div class="flex justify-between items-center px-[16px] mt-[14px]">
        <span class="text-[#444] text-[13px] font-semibold leading-none">Mais desta loja</span>
        <div class="flex items-center gap-[6px]">
            <svg class="h-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
    <div class="w-full mt-[13px]">
        <div class="flex w-full items-center relative">
            <div class="flex overflow-x-auto relative no-selectable transparent-scroll">
                {#if products}
                    <ul class="flex items-center gap-[8px]">
                        <div class="flex w-[8px]"></div>
                        {#each products as product}
                            <ProductItem {product}/>
                        {/each}
                        <div class="flex w-[13px]"></div>
                    </ul>
                {:else}
                    <ul class="flex gap-[8px]">
                        <div class="flex w-[8px]"></div>
                        {#each Array(6) as item}
                            <li class="flex flex-col gap-[8px]">
                                <div class="size-[96px] rounded-lg skeleton"></div>
                                <div class="w-[48px] h-[18px] rounded-[4px] skeleton"></div>
                            </li>
                        {/each}
                        <div class="flex w-[13px]"></div>
                    </ul>
                {/if}
            </div>
        </div>
    </div>
</div>