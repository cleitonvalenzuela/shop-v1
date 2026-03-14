<script>
    import { onMount } from "svelte";

    import PriceDrawer from "$component/product/prices/PriceDrawer.svelte";
    import FlashPrice from "$component/product/prices/FlashPrice.svelte";
    import NormalPrice from "$component/product/prices/NormalPrice.svelte";

    let { costs, discounts, coupons, product, price, prices, updateScroll=()=>{} } = $props();

    let drawer = $state(null);
</script>

<PriceDrawer bind:this={drawer} {costs} {discounts} {product} {price} {updateScroll}/>

<button type="button" onclick={() => drawer.openDrawer()}>
    {#if product?.flash_sale}
        <FlashPrice {costs} {discounts} {coupons} {product} {price} {prices}/>
    {:else}
        <NormalPrice {costs} {discounts} {coupons} {product} {price} {prices}/>
    {/if}
</button>