<script>
    import ProtetionsDrawer from "$component/product/protetions/ProtetionsDrawer.svelte";

    let { updateScroll=()=>{} } = $props();

    let drawer = $state();
</script>

<ProtetionsDrawer bind:this={drawer} {updateScroll}/>

<button type="button" onclick={() => drawer.openDrawer()} class="flex w-full justify-between items-start gap-[5px] px-[16px] py-[12px] bg-white">
    <div class="flex items-start gap-[10px]">
        <svg class="w-[13px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 47">
            <path fill="#895109" d="M17 .794c1-.834 2.5-1.262 4.027 0 4.48 3.702 8.208 5.527 14.473 6.793C37 7.89 38 9.042 38 10.542v14.5c0 6-8.209 15.952-19 21-11.09-5.715-19-15-19-21v-14.5c0-1.5 1-2.637 3-3.055 5.799-1.211 9.51-2.946 14-6.693Zm.5 24.748-4.5-4-2.5 2.5 7.5 7 10-14-3-2-7.5 10.5Z"/>
        </svg>
        <div class="flex flex-col gap-[6px] mt-[3px]">
            <span class="flex w-full justify-start text-[#895109] text-[13px] font-semibold leading-none">Proteção do cliente</span>
            <ul class="flex flex-wrap gap-x-4 gap-y-[3px] mt-[4px]">
                <li class="flex items-center gap-[4px]">
                    <svg class="w-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>                          
                    <span class="text-black text-[12px] whitespace-nowrap">Devolução gratuita</span>
                </li>
                <li class="flex items-center gap-[4px]">
                    <svg class="w-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>
                    <span class="text-black text-[12px] whitespace-nowrap">Reembolso automático por danos</span>
                </li>
                <li class="flex items-center gap-[4px]">
                    <svg class="w-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>
                    <span class="text-black text-[12px] whitespace-nowrap">Pagamento seguro</span>
                </li>
                <li class="flex items-center gap-[4px]">
                    <svg class="w-[8px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>
                    <span class="text-black text-[12px] whitespace-nowrap">Cupom por atraso na coleta</span>
                </li>
            </ul>
        </div>
    </div>
    <svg class="h-[10px] shrink-0 mt-[3px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
        <path fill="#895109" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
    </svg>
</button>