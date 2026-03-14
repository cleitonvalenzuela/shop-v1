<script>
    import { onMount, untrack } from "svelte";
    import { formatNumber } from "$lib/formating";

    import ProductFooter from "$component/product/ProductFooter.svelte";
    import ReviewsHeader from "$component/reviews/ReviewsHeader.svelte";
    import ReviewsSkeleton from "$component/reviews/ReviewsSkeleton.svelte";
    import ReviewItem from "$component/reviews/ReviewItem.svelte";
    import ImagesViewer from "$component/image/ImagesViewer.svelte";
    import VariationsDrawer from "$component/variations/VariationsDrawer.svelte";

    let {
        session,
        costs,
        discounts,
        review,
        variations,
        variants,
        quantity,
        store,
        filter="all",
        product,
        shipping,
        coupons,
        price,
        prices,
        updateVariation=()=>{},
        updateQuantity=()=>{},
        updatePage=()=>{}
    } = $props();

    let ready = $state(false);
    let loading = $state(false);
    let container = $state(null);
    let viewer = $state(null);
    let drawer = $state(null);

    let page = $state(0);
    let limit = $state(20);
    let images = $state([]);
    let reviews = $state([]);

    let scroll = $state({ position: 0, locked: false });

    const loadReviews = async () => {
        const request = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: product?.id,
                page: page,
                limit: limit,
                filter: filter
            })
        });

        if(request.status === 200){
            const response = await request.json();

            reviews.push(...response.filter(item => review ? item.id != review.id : true));
            images.push(...reviews.flatMap(item => item.images));

            loading = false;
            ready = true;
        }
    }
    const handleScroll = () => {
        scroll.position = container.scrollTop;
    }
    const updateFilter = (value) => {
        if(filter == value){
            filter = "all";
        }
        else{
            filter = value;
        }

        reviews = [];
        loadReviews();
    }
    const likeReview = (id) => {
        const index = reviews.findIndex(item => item.id == id);
        reviews[index].is_liked = !reviews[index]?.is_liked;
    }
    const openViewer = (id) => {
        const index = images.findIndex(item => item.id == id);
        viewer.openViewer({ index, images, reviews, likeReview });
    }
    const gotoFinalization = (toast) => {
        if(variants.length == variations.length){
            updatePage("finalization");
            setTimeout(drawer.closeDrawer, 300);
        }
        else{
            variations.map(variation => {
                if(!variation.variants.find(variant => variant.is_selected)){
                    toast?.showMessage(`Selecione ${variation.name}`);
                }
            });
            drawer.openDrawer();
        }
    }

    $effect(() => {
        review = review;
        untrack(() => {
            if(!store && review){
                ready = false;
                filter = "all";
                reviews = [review];
                images = [];
                loadReviews();
            }
        });
    });

    $effect(() => {
        store = store;
        untrack(() => {
            if(!review && store){
                ready = false;
                reviews = [];
                images = [];
                loadReviews();
            }
        });
    });

    onMount(() => {
        if(!store && !review){
            ready = false;
            filter = "all";
            reviews = [];
            images = [];
            loadReviews();
        }
    });
</script>

{#if ready}
    <ImagesViewer bind:this={viewer} {session}/>
    <VariationsDrawer bind:this={drawer} {session} {costs} {discounts} {product} {coupons} {shipping} {variants} {variations} {quantity} {price} {prices} {updateVariation} {updateQuantity} {gotoFinalization} {updatePage}/>
    <div class="w-full h-dvh bg-[#FFF] relative">
        <ReviewsHeader {product} {store} {updatePage}/>
        <main bind:this={container} onscroll={handleScroll} class={`flex flex-col pt-[50px] ${session?.os?.name == "iOS" ? "pb-[100px]" : "pb-[64px]"} no-selectable ${scroll.locked ? "overflow-y-hidden" : "overflow-y-scroll"} max-h-dvh transparent-scroll scrollable`}>
            <div class="flex w-full shrink-0 pb-[6px] bg-white pe-[8px] gap-[6px] sticky top-0 left-0 z-20">
                <div class="flex w-full items-center relative" style="max-width: calc(100% - 38px);">
                    <div class="flex pt-[2px] w-full overflow-scroll transparent-scroll relative">
                        <span class="w-[16px] shrink-0"></span>
                        <div class="flex items-center gap-[8px]">
                            <button type="button" class="flex items-center gap-[4px] px-[8px] h-[28px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updateFilter("images")}>
                                <svg class="h-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 29">
                                    <path fill="#000" d="M17 0c6 0 8 4 8 4a9 9 0 0 1 9 9v7a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9v-7a9 9 0 0 1 9-9s2-4 8-4Zm0 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>
                                </svg>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "images" ? "text-[#FD2C55]" : "text-black"}`}>Inclui imagens ou vídeos ({store ? formatNumber(store?.total_reviews * 0.2857).pt : formatNumber(product?.total_reviews * 0.2857).pt})</span>                  
                            </button>
                            <button type="button" class="flex items-center gap-[4px] px-[8px] h-[28px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updateFilter("five")}>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "five" ? "text-[#FD2C55]" : "text-black"}`}>5</span>
                                <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                                </svg>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "five" ? "text-[#FD2C55]" : "text-black"}`}>({store ? formatNumber(store?.total_reviews * 0.2381).pt : formatNumber(product?.total_reviews * 0.2381).pt})</span>
                            </button>
                            <button type="button" class="flex items-center gap-[4px] px-[8px] h-[28px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updateFilter("four")}>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "four" ? "text-[#FD2C55]" : "text-black"}`}>4</span>
                                <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                                </svg>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "four" ? "text-[#FD2C55]" : "text-black"}`}>({store ? formatNumber(store?.total_reviews * 0.1905).pt : formatNumber(product?.total_reviews * 0.1905).pt})</span>
                            </button>
                            <button type="button" class="flex items-center gap-[4px] px-[8px] h-[28px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updateFilter("three")}>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "three" ? "text-[#FD2C55]" : "text-black"}`}>3</span>
                                <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                                </svg>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "three" ? "text-[#FD2C55]" : "text-black"}`}>({store ? formatNumber(store?.total_reviews * 0.1429).pt : formatNumber(product?.total_reviews * 0.1429).pt})</span>
                            </button>
                            <button type="button" class="flex items-center gap-[4px] px-[8px] h-[28px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updateFilter("two")}>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "two" ? "text-[#FD2C55]" : "text-black"}`}>2</span>
                                <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                                </svg>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "two" ? "text-[#FD2C55]" : "text-black"}`}>({store ? formatNumber(store?.total_reviews * 0.0952).pt : formatNumber(product?.total_reviews * 0.0952).pt})</span>
                            </button>
                            <button type="button" class="flex items-center gap-[4px] px-[8px] h-[28px] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm" onclick={() => updateFilter("one")}>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "one" ? "text-[#FD2C55]" : "text-black"}`}>1</span>
                                <svg class="w-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                                </svg>
                                <span class={`text-[12px] leading-none whitespace-nowrap ${filter == "one" ? "text-[#FD2C55]" : "text-black"}`}>({store ? formatNumber(store?.total_reviews * 0.0476).pt : formatNumber(product?.total_reviews * 0.0476).pt})</span>
                            </button>
                        </div>
                    </div>
                    <span class="flex w-[32px] h-[32px] shrink-0 absolute right-0 top-0 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></span>
                </div>
                <button type="button" class="flex justify-center items-center size-[32px] shrink-0" aria-label="Curtir">
                    <svg class="w-[17px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 45">
                        <path fill="#000" d="M40 0c1.657 0 2.5 1 2.5 2v33l6-5.5L52 33l-9 9c-3 3-4 2.5-6.5 0L28 33l4-3.5 5.5 5.5V2c0-1 .843-2 2.5-2ZM21.5 33a2.5 2.5 0 0 1 0 5h-19a2.5 2.5 0 0 1 0-5h19Zm7-14a2.5 2.5 0 0 1 0 5h-26a2.5 2.5 0 0 1 0-5h26Zm0-14a2.5 2.5 0 0 1 0 5h-26a2.5 2.5 0 0 1 0-5h26Z"/>
                    </svg>
                </button>
            </div>
            <div class="flex items-center w-full h-[48px] shrink-0 px-[16px] gap-[14px] bg-gradient-to-b from-[#FEEBEF] to-white">
                <span class="w-full h-[1px] bg-[#ffe4ea]"></span>
                <div class="flex items-center gap-[5px]">
                    <span class="text-[#FD2C55] text-[11.32px] font-medium whitespace-nowrap leading-none">Veja o que os outros clientes estão dizendo</span>
                    <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
                        <path fill="#858081" d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0Zm0 2.914C8.773 2.914 2.914 8.773 2.914 16S8.773 29.086 16 29.086 29.086 23.227 29.086 16 23.227 2.914 16 2.914ZM16 14c1.105 0 1.5.895 1.5 2v7c0 1.105-.395 2-1.5 2s-1.5-.895-1.5-2v-7c0-1.105.395-2 1.5-2Zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
                    </svg>                      
                </div>
                <span class="w-full h-[1px] bg-[#ffe4ea]"></span>
            </div>
            <div class="flex flex-col w-full px-[16px]">
                {#each reviews as review, index}
                    <ReviewItem {review} {likeReview} {openViewer}/>
                    {#if index < reviews.length-1}
                        <span class="w-full h-[1px] bg-[#eeeeee]"></span>
                    {/if}
                {/each}
                {#if loading}
                    <span class="w-full h-[1px] bg-[#eeeeee]"></span>
                    <div class="flex justify-center w-full py-[25px] relative">
                        <div class="relative -left-[0.75rem] -top-[0.35rem] z-20">
                            <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
                            <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
                        </div>
                    </div>
                {/if}
            </div>
        </main>
        <ProductFooter {session} {costs} {discounts} {product} {coupons} {shipping} {price} {gotoFinalization} {updatePage}/>
    </div>
{:else}
    <ReviewsSkeleton {session} {costs} {discounts} {product} {coupons} {shipping} {store} {price} {updatePage}/>
{/if}