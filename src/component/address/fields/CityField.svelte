<script>
    let { address, openLocationDrawer=()=>{} } = $props();

    let value = $derived(address?.city);

    export const validate = () => {
        if(value){
            return true;
        }
        return false;
    }
    export { value };
</script>

<button type="button" class="flex flex-col w-full" onclick={() => openLocationDrawer("cities")}>
    <div class="flex justify-between items-center w-full h-[48px]">
        {#if address?.city}
            <span class="text-black text-[14px]">{address?.city?.name}</span>
        {:else}
            <span class="text-[#A8A8A8] text-[14px]">Cidade</span>
        {/if}
        <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 22">
            <path fill="#707070" d="M0 3.5 3.5 0 18 14.5 32.5 0 36 3.5l-18 18-18-18Z"/>
        </svg>
    </div>
    <div class="flex w-full relative">
        <span class="w-full h-[1px] bg-[#f1f1f1]"></span>
    </div>
</button>