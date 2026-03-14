<script>
    import { formatNumber } from "$lib/formating";

    let { product, store, updatePage=()=>{} } = $props();
</script>

<header class="flex flex-col fixed top-0 left-0 w-full z-40">
    <div class="flex w-full justify-between items-center pt-[2px] bg-white">
        <div class="flex justify-start w-[176px]">
            <button class="flex justify-center items-center px-[16px] h-[48px]" type="button" aria-label="Voltar" onclick={() => updatePage("product")}>
                <svg class="h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                    <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
                </svg>
            </button>
        </div>
        <div class="flex justify-center items-center w-full h-full">
            <h1 class="text-black text-[15px] font-bold leading-none">{store ? `Outras avaliações (${formatNumber(store?.piblic_reviews).pt})` : `Avaliações (${formatNumber(product?.total_reviews).pt})`}</h1>
        </div>
        <div class="flex justify-end w-[176px]">
            <button type="button" class="flex justify-center items-center p-[20px] pe-[8px] h-[48px]" title="Compartilhar">
                <svg class="w-[23px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 63">
                    <path fill="#000" fill-rule="evenodd" d="M29.054 2.317c0-3 3.5-3 6-.5l30 26.5c2.367 2.488 2.32 3.794 0 6l-30.5 26.5c-2.5 2.5-5.5 1-5.5-2.5v-14c-12.5 0-18 3.5-24 8-2.054 1.54-4.86 0-5-2.5-1-18 12-30.5 29-32v-15.5ZM34.499 19.5c-.054 2.684-1.054 3.416-3.5 3.5C15 25 7.5 33 5.5 45.5 9.5 42 18.5 39 31 39c2-.171 3.5 1 3.5 3.5v11l26-22.5-26-22v10.5Z" clip-rule="evenodd"/>
                </svg>
            </button>
            <button type="button" title="Carrinho" class="flex items-center justify-center px-[16px] ps-[8px] h-[48px]">
                <svg class="w-[23px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 64">
                    <path fill="#000" d="M23.566 51a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm31 0a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm-45-51c2.934 0 4.934 1.5 5.5 4.5l1.5 7.5h45.5c4.934 0 7.434 2.5 6.5 6l-6.5 24.5c-.566 2.5-2.566 5.5-7 5.5h-30c-4.066 0-7.066-2-8-6l-8.5-36h-6.5c-2.5 0-3-6 0-6h7.5Zm13 38.5c.749 2.45 1.467 3.426 4 3.5h26.5c2.689-.2 3.302-1.238 4-3.5l5-20.5h-44l4.5 20.5Z"/>
                </svg>
            </button>
        </div>
    </div>
</header>