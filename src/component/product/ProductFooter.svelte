<script>
    import { formatPrice } from "$lib/formating";
    
    let { session, costs, discounts, product, coupons, shipping, price, gotoFinalization=()=>{} } = $props();

    let coupon = $derived.by(() => {
        const coupon = coupons?.find(item => item.category == "product" && item.is_applied);
        const amount = coupon ? coupon.type == "variable" ? price?.regular * coupon.discount : coupon.discount : 0;
        return { ...coupon, amount };
    });
</script>

<footer class={`flex fixed bottom-0 left-0 w-full py-[10px] ${session?.os?.name == "iOS" ? "pb-[44px]" : "pb-[9px]"} px-[10px] gap-[8px] bg-white border-t-[1px] border-[#eeeeee] z-40`}>
    <div class="flex justify-center items-center gap-[12px]">
        <button type="button" title="Loja" class="flex flex-col items-center p-[4px]">
            <div class="flex justify-center items-center size-[22px]">
                <svg class="w-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 51">
                    <path fill="#000" d="M39 0c2.5 0 4.906 1.653 6.5 4 4 5 8.5 10 8.5 13.5 0 7 0 10.5-6 15v11c0 4-4 7.5-7 7.5H13c-3 0-7-3.5-7-7.5v-11c-5-4-6-6.5-6-15 0-3 5-9.56 8-13.5 1.8-2.365 4-4 6-4h25Zm-3.5 29.5c-7.88 7.583-12.864 4.136-17 0-2.6 2.62-4.172 3.785-7.5 4.5v8c.185 2.86.901 4.29 3.5 4.5h25c2.694-.386 3.362-1.849 3.5-4.5v-8c-3.825-.225-5.403-1.32-7.5-4.5ZM5 23c0 1 5 11 11 1.5 1.5-1.5 3-2 5 0 3.706 4.5 7 6.5 12.5 0 1.27-1.5 3-2 4.5 0 3.5 8.5 11 2 11-1.5v-3H5v3Zm9-18c-4.113 3.939-5.54 6.122-7.5 10H48c-2.384-3.932-4.187-6.12-8-10H14Z"/>
                </svg>
            </div>
            <span class="text-black text-[10px]">Loja</span>
        </button>
        <button type="button" title="Chat" class="flex flex-col items-center p-[4px]">
            <div class="flex justify-center items-center size-[22px]">
                <svg class="w-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 55">
                    <path fill="#000" d="M28 0c17 0 28 12 28 23-.5 14.5-19.5 29.5-28 31.5V44C8 44 0 34 0 23 .5 10 13 0 28 0Zm0 5C18.5 5 5.5 13 5.5 23.5S14.5 40 33 39v7.5c10.036-7.193 18-16 18-24C51 13.5 39 5 28 5Z"/>
                </svg>
            </div>      
            <span class="text-black text-[10px]">Chat</span>
        </button>
        <button type="button" title="Adicionar ao carrinho" class="flex flex-col justify-center h-[44px] items-center px-[20px] bg-[#FFF0F3] rounded-[8px] hover:opacity-50  active:opacity-50">
            <svg class="w-[24px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 70 61">
                <path fill="#DF0644" d="M23.375 49.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm34 0a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11ZM9.375 0c3 0 5.5 2 6.5 5.5l7 28c1.396 3.303 4 5.5 6.5 5.5h23c2.5 0 4.79-3.257 5.5-6.5l5-19h6.5l-6 22c-2 6-5.5 9.5-10 9.5h-25c-5.5 0-9.29-4.556-10.5-9l-8.5-30h-7.5c-2.5 0-2.5-6 0-6h7.5Zm30.5 3.5c1.657 0 3 .343 3 2v8h8c1.657 0 2.125 1.343 2.125 3s-.468 3-2.125 3h-8v8c0 1.657-1.343 2-3 2s-3-.343-3-2v-8h-7c-1.657 0-2.375-1.343-2.375-3s.718-3 2.375-3h7v-8c0-1.657 1.343-2 3-2Z"/>
            </svg>
        </button>
    </div>
    <button type="button" title="Adicionar ao carrinho" class="flex flex-col justify-center w-full h-[44px] gap-[4px] items-center bg-[#FE2C55] rounded-[8px] hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden" onclick={() => gotoFinalization()}>
        <span class="text-white text-[16px] font-semibold leading-none">R$ {formatPrice(price?.promotional - coupon?.amount)}</span>
        <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-white text-[10px] font-medium leading-none">{product?.flash_sale ? "Compre pelo preço de Oferta relâmpago" : (costs.shipping - discounts.shipping.total) === 0 ? "Comprar agora | Frete grátis" : "Comprar agora"}</span>
    </button>
</footer>