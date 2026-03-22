<script>
    import { formatPrice } from "$lib/formating";
    import { getShippingRange } from "$lib/shipping";

    import ShippingDrawer from "$component/product/shipping/ShippingDrawer.svelte";
    import LocationDrawer from "$component/location/LocationDrawer.svelte";

    let { costs, discounts, shipping, address, coupons, updateAddress=()=>{}, updateScroll=()=>{} } = $props();

    let shipping_drawer = $state(null);
    let location_drawer = $state(null);

    let deadline = $derived(getShippingRange(shipping?.deadline));
    let coupon = $derived(coupons?.find(item => item.category == "shipping" && item.is_applied));

    const localUpdateAddress = (value) => {
        address = value;
        if(address?.region && address?.city){
            updateAddress(address);
        }
        else{
            updateAddress({ ...address, region: null, city: null });
        }
    }
</script>

<ShippingDrawer bind:this={shipping_drawer} {costs} {discounts} {coupons} {address} {shipping} openLocationDrawer={location_drawer?.openDrawer} {updateScroll}/>
<LocationDrawer bind:this={location_drawer} {address} updateAddress={localUpdateAddress} onCloseDrawer={shipping_drawer?.openDrawer} {updateScroll}/>

<button onclick={() => shipping_drawer.openDrawer("shipping")} type="button" class="flex w-full flex-col px-[16px]">
    <div class="flex w-full justify-between items-center gap-[5px] py-[15px]">
        <div class="flex items-start gap-[8px]">
            <svg class="w-[16px] shrink-0 mt-[2px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 38">
                <path fill="#202020" d="M7 27.393A7.002 7.002 0 0 1 19.709 29h7.582a7.002 7.002 0 0 1 13.418 0H44v-7c0-4.5-4-11-5.5-11H34v7.5c0 2-4 2-4 0V6c0-1.5-.5-1.937-2-2H3.5c0-2.5 1-4 3.5-4h22c3 0 5 2 5 4.5V7h6c2.5 0 8 7.5 8 14v8c0 2.5-.5 4-3 4h-4.291a7.002 7.002 0 0 1-13.418 0h-7.582a7.002 7.002 0 0 1-13.42-.009C4.396 32.857 3 30.93 3 29v-5h4v3.393ZM13 28a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm21 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-21-8H3v-4h10v4Zm5-8H0V8h18v4Z"/>
            </svg>
            <div class="flex flex-col">
                <div class="flex items-center gap-[5px]">
                    {#if (costs.shipping - discounts.shipping.total) === 0}
                        <div class="flex items-center bg-[#E0F6F6] py-[3px] ps-[4px] pe-[3px] rounded-sm">
                            <span class="text-[#059091] text-[11.4px] font-medium leading-none">Frete grátis</span>
                        </div>
                    {/if}
                    <div class="flex items-center gap-[2px] text-black text-[13px] leading-none">
                        <span>Receba até {deadline?.from}</span>
                        <span class="w-[4px] h-[1px] bg-black"></span>
                        <span>{deadline?.to}</span>
                    </div>
                </div>
                <div class="flex items-center text-[#595959] text-[13px] gap-[5px] mt-[5px] leading-none">
                    <span>Taxa de envio:</span>
                    {#if (costs.shipping - discounts.shipping.total) > 0}
                        <span class="line-through">R$ {formatPrice(costs.shipping)}</span>
                        <span class="text-black">R$ {formatPrice(costs.shipping - discounts.shipping.total)}</span>
                    {:else}
                        <span class="line-through">R$ {formatPrice(costs.shipping)}</span>
                    {/if}
                </div>
                {#if coupon}
                    {#if coupon?.minimum}
                        <span class="text-[#059091] text-[12.2px] mt-[4px] text-start leading-[16px]">Desconto de R$ {formatPrice(coupon.type == "variable" ? (costs.shipping * coupon.discount) : coupon?.discount, false)} no frete em pedidos acima de R$ {formatPrice(coupon?.minimum, false)}</span>
                    {:else}
                        <span class="text-[#059091] text-[12.2px] mt-[4px] text-start leading-[16px]">Desconto de R$ {formatPrice(coupon.type == "variable" ? (costs.shipping * coupon.discount) : coupon?.discount, false)} no frete</span>
                    {/if}
                {/if}
            </div>
        </div>
        <div class="flex items-center h-full">
            <svg class="h-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
    <span class="flex w-full h-[1px] bg-[#eeeeee]"></span>
</button>