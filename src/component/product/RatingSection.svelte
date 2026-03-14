<script>
    import { formatNumber } from "$lib/formating";

    let { product } = $props();
</script>

<div class="flex items-center gap-[5px] mt-[8px] pb-[7px] px-[16px]">
    <svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
        <path fill="#ffc628" d="M18.8 3c1.5-4 4.5-4 6 0l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3l-10-6.5s-6.493 4.567-9.5 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1 4-10.5Z"/>
    </svg>
    <span class="text-black text-[12px] leading-none">{product?.rating}</span>
    <span class="text-[#2B5DB9] text-[12px] leading-none">({formatNumber(product?.total_reviews).pt})</span>
    <svg class="w-[1.4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 3 24">
        <path fill="#E0E0E0" d="M0 0h3v24H0z"/>
    </svg>              
    <div class="flex items-center gap-[3px]">
        <span class="text-black text-[12px] leading-none">{formatNumber(product?.total_sales).en}</span>
        <span class="text-[#595959] text-[12px] leading-none">vendidos</span>
    </div>
</div>