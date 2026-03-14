<script>
    import { formatPrice } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    import { calculateDiscount } from "$lib/price";

    let { product } = $props();

    let price = $derived(product?.prices?.reduce((a, b) => b.promotional < a.promotional ? b : a));
    let image = $derived(product?.images?.find(item => item.index == 0));
</script>

<li class="flex flex-col">
    <div class="flex size-[96px] rounded-lg bg-[#F6F6F6] bg-cover bg-center" style={image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image?.source}')`}></div>
    <div class="flex items-baseline gap-[3px] leading-none mt-[8px]">
        <span class="text-black text-[11px] font-semibold">R$</span>
        <span class="text-black text-[14px] font-semibold">{formatPrice(price?.promotional)}</span>
    </div>
    <div class="flex mt-[3px]">
        <div class="flex items-center justify-center rounded-sm px-[4px] h-[16px] bg-[#FEE5EA]">
            <span class="text-[#E10543] text-[10px] font-semibold leading-none">{calculateDiscount(price?.regular, price?.promotional)}</span>
        </div>
    </div>
</li>