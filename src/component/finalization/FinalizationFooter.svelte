<script>
    import { formatPrice, formatTimer } from "$lib/formating";
    import { onMount } from "svelte";

    let { session, total, discounts, submitOrder=()=>{} } = $props();

    let interval = $state();
    let timer = $state(7200);

    const updateInterval = () => {
        timer = Math.max(0, timer-1);
    }

    onMount(() => {
        clearInterval(interval);
        setInterval(updateInterval, 1000);

        return () => {
            clearInterval(interval);
        }
    });
</script>

<footer class="flex flex-col w-full fixed bottom-0 left-0 z-50">
    <div class="flex items-center gap-[8px] w-full px-[16px] h-[38px] bg-[#FFF2F5]">
        <svg class="w-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 46">
            <path fill="#FE2C55" d="M23 0c12.703 0 23 10.297 23 23S35.703 46 23 46 0 35.703 0 23 10.297 0 23 0Zm0 5C13.059 5 5 13.059 5 23s8.059 18 18 18 18-8.059 18-18S32.941 5 23 5Zm14 19c0 7.732-6.268 14-14 14S9 31.732 9 24h28Zm-21.483 5A8.99 8.99 0 0 0 23 33a8.99 8.99 0 0 0 7.483-4H15.517ZM15 14a6 6 0 0 1 6 6h-4a2 2 0 1 0-4 0H9a6 6 0 0 1 6-6Zm16 0a6 6 0 0 1 6 6h-4a2 2 0 1 0-4 0h-4a6 6 0 0 1 6-6Z"/>
        </svg>          
        <span class="text-[#FE2C55] text-[12px] font-medium">Você está economizando R$ {formatPrice(discounts.product.total + discounts.shipping.total + discounts.payment)} nesse pedido.</span>
    </div>
    <div class={`w-full ${session?.os?.name == "iOS" ? "pb-[34px]" : "pb-0"} border-t-[1px] border-[#eeeeee] bg-white`}>
        <div class="flex flex-col gap-[6px] p-[16px] pt-[11px]">
            <div class="flex justify-between items-center">
                <span class="text-black text-[16px] font-semibold leading-none">Total (1 item)</span>
                <span class="text-[#FE2C55] text-[16px] font-semibold">R$ {formatPrice(total)}</span>
            </div>
            <button class="flex flex-col justify-center items-center w-full h-[48px] bg-[#FE2C55] rounded-lg hover:bg-[#E81D44] active:bg-[#E81D44]" type="button" onclick={submitOrder}>
                <span class="text-white text-[16px] font-medium leading-none">Fazer pedido</span>
                <span class="text-white text-[11px] font-medium leading-none mt-[5px]">A oferta expira em {formatTimer(timer)}</span>
            </button>
        </div>
    </div>
</footer>