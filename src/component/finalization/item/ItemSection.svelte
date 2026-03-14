<script>
    import { formatNumber } from "$lib/formating";

    import ItemDetails from "$component/finalization/item/ItemDetails.svelte";

    let { costs, discounts, product, variations, variants, price, quantity, updateQuantity=()=>{} } = $props();
</script>

<div class="w-full p-[16px] bg-white">
    <div class="flex justify-between items-center">
        <span class="text-black text-[15px] font-semibold">{product?.store?.title}</span>
        <div class="flex items-center gap-[7px]">
            <span class="text-[#858585] text-[12px] font-medium">Adicionar nota</span>
            <svg class="h-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 35">
                <path fill="#858585" d="m0 3 3-3 17.5 17.5L3 35l-3-3 14-14.5L0 3Z"/>
            </svg>
        </div>
    </div>
    <div class="flex items-center w-full mt-[18px] gap-[5px]">
        <svg class="w-[11px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
            <path fill="#B67A06" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
        </svg>
        <span class="text-[#B67A06] text-[12px] font-semibold leading-none mt-[2px]">Melhor escolha! {formatNumber(product?.total_sales).en} vendido(s) e com nota {product?.rating}/5.0</span>
    </div>
    <div class="flex w-full mt-[12px]">
        <ItemDetails {costs} {discounts} {product} {variations} {variants} {price} {quantity} {updateQuantity}/>
    </div>
</div>