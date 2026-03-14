<script>
    import { formatPrice } from "$lib/formating";

    import InstallmentsDrawer from "$component/product/installments/InstallmentsDrawer.svelte";

    let { total, product, price, installments, updateScroll=()=>{} } = $props();

    let drawer = $state(null);
</script>

<InstallmentsDrawer bind:this={drawer} {total} {product} {price} {installments} {updateScroll}/>

<button type="button" class="flex items-center gap-[6px] mt-[12px] px-[16px]" onclick={() => drawer?.openDrawer()}>
    <svg class="w-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 39">
        <path fill="#202020" d="M35 19c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10Zm6-19c3 0 3 2.5 3 4.5v13.825c-1.112-.872-1.978-1.646-4-2.325v-3H4v17h17c.18 2.197.423 2.947 1 4H3.5C1 34 0 32.5 0 30V3.5C0 1.5 1 0 3 0h38Zm-4.5 24c0-2-3.5-2-3.5 0v6l5 2.5c2 1 4-1.5 1.5-3l-3-1.5v-4ZM4 9h36V4H4v5Z"/>
    </svg>
    {#if product?.free_installments > 0}
        <span class="text-black text-[12px] leading-none">{installments?.at(product?.free_installments-1)?.number}x R$ {formatPrice(installments?.at(product?.free_installments-1)?.amount)}</span>
        <span class="text-[#F2204C] text-[12px] font-medium">Sem juros</span>
    {:else}
        <span class="text-black text-[12px] leading-none">{installments?.at(-1)?.number}x R$ {formatPrice(installments?.at(-1)?.amount)}</span>
    {/if}
    <svg class="w-[5.2px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
        <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
    </svg>
</button>