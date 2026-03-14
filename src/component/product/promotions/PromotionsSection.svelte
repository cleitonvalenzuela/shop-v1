<script>
    import PromotionItem from "$component/product/promotions/PromotionItem.svelte";
    import PromotionsDrawer from "$component/product/promotions/PromotionsDrawer.svelte";
    import ToastNotification from "$component/ToastNotification.svelte";

    let { coupons, updateScroll=()=>{}, applyCoupon=()=>{}, redeemCoupon=()=>{} } = $props();

    let drawer = $state(null);
    let avaliable = $derived(coupons.filter(item => item.is_applied == false));
</script>

<PromotionsDrawer bind:this={drawer} {coupons} {updateScroll} {applyCoupon} {redeemCoupon} />

{#if avaliable.length > 0}
    <button type="button" class="flex w-full flex-col py-[18px] bg-white" onclick={() => drawer.openDrawer()}>
        <div class="flex w-full justify-between items-center px-[16px]">
            <span class="text-black text-[15px] font-semibold leading-none">Ofertas</span>
            <svg class="h-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
        <div class="flex w-full overflow-hidden items-center mt-[13px]">
            <div class="flex w-full items-center relative">
                <div class="flex overflow-x-auto relative no-selectable transparent-scroll">
                    <ul class="flex items-center gap-[8px]">
                        <li class="flex w-[8px]"></li>
                        {#each avaliable as coupon, index}
                            <PromotionItem version="compact" {coupon} {applyCoupon} {redeemCoupon}/>
                        {/each}
                        <li class="flex w-[8px]"></li>
                    </ul>
                </div>
            </div>
        </div>
    </button>
{/if}