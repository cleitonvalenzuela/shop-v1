<script>
    import { formatPrice } from "$lib/formating";
    import { getShippingRange } from "$lib/shipping";
    
    let { shipping, costs, discounts } = $props();

    let deadline = $derived(getShippingRange(shipping?.deadline));
</script>

<div class="flex flex-col w-full px-[16px] py-[16px] bg-[#F0FBFB]">
    <div class="flex w-full justify-between items-center text-[13px]">
        <b class="text-black font-semibold leading-none">Receba até {deadline?.from}<span class="px-[2px]">-</span>{deadline?.to}</b>
        {#if (costs.shipping - discounts.shipping.total) > 0}
            <b class="text-black font-semibold leading-none">R$ {formatPrice(costs.shipping - discounts.shipping.total, true)} <span class="line-through font-medium text-[#7D8383]">R$ {formatPrice(costs.shipping, true)}</span></b>
        {:else}
            <b class="text-[#009EB2] text-[12px] font-semibold leading-none"><span class="line-through font-medium text-[#7D8383]">R$ {formatPrice(costs.shipping, true)}</span> Grátis</b>
        {/if}
    </div>
    <span class="text-black text-[13px] leading-none mt-[12px]">{shipping?.name}</span>
</div>