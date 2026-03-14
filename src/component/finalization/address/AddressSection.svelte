<script>
    import { firstAndLastName, maskPhone } from "$lib/formating";

    let { scroll, customer, address, updatePage=()=>{} } = $props();

    let height = $state(0);
</script>

{#if address?.is_filled && scroll.position >= height}
    <div class="inline w-full absolute top-[48px] left-0 z-20 px-[16px] pb-[4px] pt-[6px] bg-white shadow-md text-[#707070] text-[10px] leading-[18px]">
        <svg class="inline-flex h-[11px] me-[2px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 46">
            <path fill="#707070" d="M19.01 0c10.493 0 19 8.507 19 19 0 10.984-18.944 26.454-19 26.5 0 0-19.51-16-19-26.5 0-10.493 8.506-19 19-19Zm0 4.15C10.808 4.15 4.16 10.8 4.16 19s14.85 21 14.85 21c.048-.042 14.85-12.812 14.85-21 0-8.201-6.649-14.85-14.85-14.85ZM19 10a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 4.028a4.972 4.972 0 1 0 0 9.945 4.972 4.972 0 0 0 0-9.945Z"/>
        </svg>
        {firstAndLastName(customer?.fullname)}, (+55){maskPhone(customer?.phone)}, {address?.street}, {address?.number}, {address?.district}, {address?.city?.name}, {address?.region?.name}, {address?.postal}
    </div>
{/if}
<div class="flex shrink-0 items-center w-full min-h-[54px] bg-white px-[16px] py-[16px]" bind:offsetHeight={height}>
    <button class="flex justify-between w-full items-start gap-[16px]" type="button" onclick={() => updatePage("add_address")}>
        <div class="flex items-start gap-[6px] mt-[3px]">
            <svg class="w-[13px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 46">
                <path fill="#000" d="M19.01 0c10.493 0 19 8.507 19 19 0 10.984-18.944 26.454-19 26.5 0 0-19.51-16-19-26.5 0-10.493 8.506-19 19-19Zm0 4.15C10.808 4.15 4.16 10.8 4.16 19s14.85 21 14.85 21c.048-.042 14.85-12.812 14.85-21 0-8.201-6.649-14.85-14.85-14.85ZM19 10a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 4.028a4.972 4.972 0 1 0 0 9.945 4.972 4.972 0 0 0 0-9.945Z"/>
            </svg>
            {#if address?.is_filled}
                <div class="flex w-full flex-col text-black text-start gap-[8px]">
                    <b class="text-[14px] font-semibold leading-[18px]">{firstAndLastName(customer?.fullname)}, (+55){maskPhone(customer?.phone)}</b>
                    <span class="text-[14px] leading-[18px]">{address?.street}, {address?.number}, {address?.district}, {address?.city?.name}, {address?.region?.name}, {address?.postal}</span>
                </div>
            {:else}
                <span class="text-black text-[14px] font-medium leading-[16px]">Endereço de envio</span>
            {/if}
        </div>
        {#if address?.is_filled}
            <svg class="h-[12px] shrink-0 me-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        {:else}
            <div class="flex items-center gap-[5px]">
                <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
                    <path fill="#FE2C55" d="M20 16h16v4H20v16h-4V20H0v-4h16V0h4v16Z"/>
                </svg>
                <span class="text-[#FE2C55] text-[14px] font-medium mt-[2px]">Adicionar endereço</span>
            </div>
        {/if}
    </button>
</div>