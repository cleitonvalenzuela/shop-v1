<script>
    import { addHoursToDate } from "$lib/datetime";
    import { formatNumber, formatPrice, formatTimer } from "$lib/formating";
    import { onMount } from "svelte";

    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    import { getRandomTimeEndDay } from "$lib/random";
    
    let { suggestion } = $props();

    let timer = $state(null);
    let interval;

    const updateTimer = () => {
        timer = Math.max(0, timer-1);
    }

    onMount(() => {
        if(suggestion?.flash_sale){
            timer = getRandomTimeEndDay();
            interval = setInterval(updateTimer, 1000);

            return () => {
                clearInterval(interval);
            }
        }
    });
</script>

<div class="bg-white break-inside-avoid rounded-lg overflow-hidden shadow-recommendations relative"  style="width: calc(50% - 5px);">
    <div class="w-full pb-[100%] relative">
        <div class="absolute top-0 left-0 w-full h-full bg-[#eaeaea] bg-cover bg-center" style={suggestion?.image?.source && `background-image: url('/suggestions/${suggestion?.image?.source}')`}></div>
    </div>
    <div class="flex flex-col w-full px-[8px] pt-[12px] pb-[11px] overflow-hidden">
        <span class="inline-block max-w-full text-ellipsis text-black text-[14px] overflow-hidden whitespace-nowrap leading-none">{suggestion?.title}</span>
        <div class="flex items-baseline gap-[4px] mt-[8px]">
            <span class="text-[#FD2C55] text-[14px] font-semibold leading-none">R$<b class="text-[18px] font-semibold ps-[3px]">{formatPrice(suggestion?.price?.promotional)}</b></span>
            <span class="text-[#858585] text-[12px] line-through">R$ {formatPrice(suggestion?.price?.regular)}</span>
        </div>
        {#if suggestion?.flash_sale}
            <div class="flex mt-[4px]">
                <div class="flex items-center">
                    <div class={`flex items-center ${timer ? "rounded-s-[3px]" : "rounded-[3px]"} ps-[3px] pe-[3px] h-[16px] gap-[2px] bg-[#FE5C21]`}>
                        <svg class="h-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 45">
                            <path fill="#fff" d="M8.525 0h19.649c2.519 0 2.595 1.554 1.557 3.625l-5.114 10.876h7.267c2 0 3.038 2.072 1.038 4.144l-22.84 25.377c-2.153 2.071-4.748.518-4.153-1.554l4.672-17.609H2.295C.22 24.86-.376 23.823.22 21.752L5.41 3.107C6.02 1.288 6.373 0 8.526 0Z"/>
                        </svg>
                        <span class="text-white text-[11px] font-semibold leading-none whitespace-nowrap">Oferta Relâmpago</span>
                    </div>
                    <div class="flex items-center rounded-e-sm ps-[3px] pe-[3px] h-[16px] gap-[2px] bg-[#FEF2EE]">
                        <div class="flex text-[#FE5C21] text-[10.8px] font-bold leading-none whitespace-nowrap gap-[1px] tabular-nums">{formatTimer(timer)}</div>
                    </div>
                </div>
            </div>
        {:else if suggestion?.free_shipping}
            <div class="flex mt-[4px]">
                <div class="flex items-center">
                    <div class={`flex items-center rounded-[3px] ps-[3px] pe-[3px] h-[16px] gap-[2px] bg-[#E0F6F6]`}>                               
                        <span class="text-[#027B7B] text-[10.8px] font-semibold leading-none whitespace-nowrap">Frete grátis</span>
                    </div>
                </div>
            </div>
        {:else if suggestion?.coupon }
            <div class="flex mt-[4px]">
                <div class={`flex items-center rounded-[3px] ps-[4px] pe-[3px] h-[16px] gap-[3px] bg-[#FFE5EA]`}>
                    <svg class="h-[10px] w-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 37 28">
                        <path fill="#E10544" d="M21 5h4V0h7c2 0 5 2.5 5 4.5V11h-2a3 3 0 1 0 0 6h2v6.5c0 2-2.5 4.5-5 4.5h-7v-5h-4v5H5c-2.5 0-5-2.5-5-4.5V17h2a3 3 0 1 0 0-6H0V4.5C0 2.5 3 0 5 0h16v5Zm0 14h4v-3h-4v3Zm0-7h4V9h-4v3Z"/>
                    </svg>
                    <span class="text-[#E10544] text-[11px] font-semibold leading-none whitespace-nowrap">{suggestion?.coupon}</span>
                </div>
            </div>
        {/if}
        <div class="flex items-center gap-[6px] mt-[10px]">
            <div class="flex items-center gap-[3px]">
                <svg class="w-[11px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                </svg>
                <span class="text-[#444] text-[12px] leading-none">{suggestion?.rating}</span>
            </div>
            <svg class="w-[2px] h-[9px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4 27">
                <path fill="#D9D9D9" d="M0 2a2 2 0 0 1 4 0v23a2 2 0 1 1-4 0V2Z"/>
            </svg>
            <span class="text-[#444] text-[12px] leading-none">{formatNumber(suggestion?.total_sales).en} vendidos</span>                    
        </div>
    </div>
</div>