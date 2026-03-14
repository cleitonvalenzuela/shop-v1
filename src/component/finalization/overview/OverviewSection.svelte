<script>
    import { formatPrice } from "$lib/formating";

    let { discounts, costs, total } = $props();

    let product_expand = $state(true);
    let shipping_expand = $state(true);

    const toggleProduct = () => {
        product_expand = !product_expand;
    }
    const toggleShipping = () => {
        shipping_expand = !shipping_expand;
    }
</script>

<div class="flex flex-col w-full px-[16px] py-[19px] bg-white">
    <span class="text-black text-[15px] font-semibold leading-none">Resumo do pedido</span>
    <button class="flex w-full justify-between items-center mt-[19px]" type="button" onclick={toggleProduct}>
        <div class="flex items-center gap-[4px]">
            <span class="text-black text-[14px] font-medium">Subtotal do produto</span>
            <svg class={`w-[9px] ${product_expand ? "rotate-0" : "rotate-180"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 17">
                <path fill="#000" d="M0 13 13 0l13 13-3.5 3.5L13 7l-9.5 9.5L0 13Z"/>
            </svg>
        </div>
        <span class="text-black text-[15px]">R$ {formatPrice(costs.product - discounts.product.total)}</span>
    </button>
    {#if product_expand}
        <div class="w-full mt-[16px] ps-[16px] gap-[18px]">
            <div class="flex justify-between items-center text-[12px] leading-none">
                <span class="text-black">Preço original</span>
                <span class="text-black">R$ {formatPrice(costs.product)}</span>
            </div>
            {#if discounts.product.offer > 0}
                <div class="flex justify-between items-center text-[12px] leading-none mt-[18px]">
                    <span class="text-black">Desconto no produto</span>
                    <span class="text-[#E10543]">- R$ {formatPrice(discounts.product.offer)}</span>
                </div>
            {/if}
            {#if discounts.product.coupons > 0}
                <div class="flex justify-between items-center text-[12px] leading-none mt-[18px]">
                    <span class="text-black">Cupons do TikTok Shop</span>
                    <span class="text-[#E10543]">- R$ {formatPrice(discounts.product.coupons)}</span>
                </div>
            {/if}
            {#if discounts.payment > 0}
                <div class="flex justify-between items-center text-[12px] leading-none mt-[18px]">
                    <span class="text-black">Desconto no pagamento</span>
                    <span class="text-[#E10543]">- R$ {formatPrice(discounts.payment)}</span>
                </div>
            {/if}
        </div>
    {/if}
    <button class="flex w-full justify-between items-center mt-[19px]" type="button" onclick={toggleShipping}>
        <div class="flex items-center gap-[4px]">
            <span class="text-black text-[14px] font-medium">Subtotal do envio</span>
            <svg class={`w-[9px] ${shipping_expand ? "rotate-0" : "rotate-180"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 17">
                <path fill="#000" d="M0 13 13 0l13 13-3.5 3.5L13 7l-9.5 9.5L0 13Z"/>
            </svg>
        </div>
        <span class="text-black text-[15px]">{(costs.shipping - discounts.shipping.total) > 0 ? `R$ ${formatPrice(costs.shipping - discounts.shipping.total)}` : "Grátis"}</span>
    </button>
    {#if shipping_expand}
        <div class="w-full mt-[16px] ps-[16px] gap-[18px]">
            <div class="flex justify-between items-center text-[12px] leading-none">
                <span class="text-black">Taxa de envio</span>
                <span class="text-black">{costs.shipping > 0 ? `R$ ${formatPrice(costs.shipping)}` : "Grátis"}</span>
            </div>
            {#if discounts.shipping.offer > 0}
                <div class="flex justify-between items-center text-[12px] leading-none mt-[18px]">
                    <span class="text-black">Desconto de envio</span>
                    <span class="text-[#E10543]">- R$ {formatPrice(discounts.shipping.offer)}</span>
                </div>
            {/if}
            {#if discounts.shipping.coupons > 0}
                <div class="flex justify-between items-center text-[12px] leading-none mt-[18px]">
                    <span class="text-black">Cupons do TikTok Shop</span>
                    <span class="text-[#E10543]">- R$ {formatPrice(discounts.shipping.coupons)}</span>
                </div>
            {/if}
        </div>
    {/if}
    <div class="w-full h-[1px] bg-[#ededed] mt-[18px]"></div>
    <div class="flex flex-col items-end w-full mt-[16px]">
        <div class="flex w-full justify-between items-center leading-none">
            <span class="text-black text-[16px] font-semibold">Total</span>
            <span class="text-black text-[15px] text-end font-semibold">R$ {formatPrice(total)}</span>
        </div>
        <span class="text-[#595959] text-[12px] leading-none mt-[8px]">Impostos inclusos</span>
    </div>
</div>