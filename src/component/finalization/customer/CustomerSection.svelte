<script>
    import { formatCPF } from "$lib/formating";

    let { customer, keyboard=false, openCustomerDrawer=()=>{} } = $props();
</script>

<div class="flex items-center w-full min-h-[54px] bg-white overflow-hidden px-[16px] py-[13px] pb-[16px] relative">
    <button class="flex justify-between w-full items-center" type="button" onclick={openCustomerDrawer}>
        <div class="flex items-start gap-[6px]">
            <svg class="w-[12px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 40">
                <path fill="#000" d="M17 23a17.002 17.002 0 0 1 17 17h-3.984a13.015 13.015 0 1 0-26.032 0H0a17.001 17.001 0 0 1 17-17Zm0-23c5.523 0 10 4.477 10 10s-4.477 10-10 10S7 15.523 7 10 11.477 0 17 0Zm0 3.96a6.04 6.04 0 1 0 0 12.08 6.04 6.04 0 0 0 0-12.08Z"/>
            </svg>
            <span class="text-black text-[14px] leading-[16px]"><b class="font-medium">CPF</b>{customer?.document && `: ${formatCPF(customer?.document)}`}</span>
        </div>
        {#if customer?.document}
            <svg class="h-[12px] shrink-0 me-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        {:else}
            <div class="flex items-center gap-[5px]">
                <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
                    <path fill="#FE2C55" d="M20 16h16v4H20v16h-4V20H0v-4h16V0h4v16Z"/>
                </svg>
                <span class="text-[#FE2C55] text-[14px] font-medium">Adicionar CPF</span>
            </div>
        {/if}
    </button>
    <div class="absolute bottom-0 left-0 w-[106vw] -translate-x-[3vw] h-[2px] bg-white bg-contain bg-repeat-x" style={`background-image: url('/images/pattern-1.png')`}></div>
</div>