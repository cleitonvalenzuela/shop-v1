<script>
    import { onMount } from "svelte";

    import CouponItem from "$component/product/coupons/CouponItem.svelte";

    let { coupons } = $props();

    let container = $state(null);
    let carrosel = $state(null);
    let show_start_arrow = $state(false);
    let show_end_arrow = $state(false);

    const updateScroll = (e) => {
        const currentPosition = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const carroselWidth = carrosel.offsetWidth;

        if(currentPosition > 0){
            show_start_arrow = true;
        }
        else{
            show_start_arrow = false;
        }

        if(currentPosition < (carroselWidth - containerWidth)){
            show_end_arrow = true;
        }
        else{
            show_end_arrow = false;
        }
    }

    onMount(() => {
        updateScroll();
    });
</script>

<div class="flex w-full justify-between items-center gap-[5px] mt-[6px] px-[16px]">
    <div class="flex w-full items-center relative">
        {#if show_start_arrow}
            <div class="flex justify-center items-center absolute left-0 top-0 h-[32px] z-20">
                <div class="w-[16px] h-[22px] bg-linear-to-l from-transparent to-white"></div>
            </div>
        {/if}
        <div class="flex overflow-x-auto relative no-selectable transparent-scroll h-[32px]" bind:this={container} onscroll={updateScroll}>
            <button type="button" class="mt-0">
                <ul class="flex items-center gap-[4px]" bind:this={carrosel}>
                    {#each coupons as coupon, index}
                        {#if coupon.category == "product" && coupon.is_applied == false}
                            <CouponItem {coupon}/>
                        {/if}
                    {/each}
                    <li class="w-[16px]"></li>
                </ul>
            </button>
        </div>
        <div class="flex justify-center items-center h-[32px] absolute right-0 z-20">
            <div class="w-[16px] h-[22px] bg-linear-to-r from-transparent to-white"></div>
            <div class="flex justify-end items-center bg-white w-[12px] h-[22px]">
                <svg class="h-[9px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                    <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                </svg>
            </div>
        </div>
    </div>
</div>