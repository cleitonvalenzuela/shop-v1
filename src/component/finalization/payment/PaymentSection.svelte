<script>
    import PixMethod from "$component/payment/PixMethod.svelte";
    import AddNewCreditCard from "$component/payment/AddNewCreditCard.svelte";
    import CreditCardMethod from "$component/payment/CreditCardMethod.svelte";
    import ApplePayMethod from "$component/payment/ApplePayMethod.svelte";
    import BoletoMethod from "$component/payment/BoletoMethod.svelte";

    let { total, product, installments, method, cards, price, page, updateMethod=()=>{}, updatePage=()=>{}, openMethodDrawer=()=>{} } = $props();
</script>

<div class="flex flex-col w-full px-[16px] py-[19px] bg-white">
    <span class="text-black text-[15px] font-semibold leading-none">Forma de pagamento</span>
    <div class="flex flex-col mt-[20px] gap-[21px]">
        {#if product?.card_method != "hidden"}
            <AddNewCreditCard {product} {installments} {price} {method} {updateMethod} {updatePage}/>
            {#if cards && product?.card_method}
                {#each cards as card}
                    <CreditCardMethod {total} {product} {card} {method} {price} {updateMethod} {updatePage} {page}/>
                {/each}
            {/if}
        {/if}
        {#if product?.pix_method != "hidden"}
            <PixMethod {product} {method} {price} {updateMethod}/>
        {/if}
        {#if product?.boleto_method != "hidden"}
            <BoletoMethod {product} {method} {updateMethod}/>
        {/if}
        {#if product?.apple_method != "hidden"}
            <ApplePayMethod {product} {method} {updateMethod}/>
        {/if}
    </div>
    <div class="w-full h-[1px] bg-[#ededed] mt-[18px]"></div>
    <button type="button" class="flex items-center justify-between mt-[16px]" onclick={openMethodDrawer}>
        <span class="text-black text-[13px] font-semibold">Ver todos</span>
        <svg class="h-[12px] me-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 35">
            <path fill="#858585" d="m0 3 3-3 17.5 17.5L3 35l-3-3 14-14.5L0 3Z"/>
        </svg>
    </button>
</div>