<script>
    let { order } = $props();

    let level = $derived(order?.status == "approved" ? 33.33 : 0);
</script>

<div class="flex justify-center w-full items-center relative">
    <div class="flex w-full justify-between relative" style="max-width: calc(100% - 30px);">
        <div class="absolute top-[10px] left-0 h-[6px] w-full z-10 px-[33px]">
            <div class="flex w-full h-[6px] bg-[#F0F0F0] rounded-full relative z-10">
                <span class="flex w-full h-full bg-[#D0F3F3]" style={`max-width: ${level}%;`}></span>
            </div>
        </div>
        <div class="flex flex-col items-center w-[66px]">
            <div class="flex items-center justify-center size-[25px] relative z-30">
                {#if level == 0}
                    <div class="flex justify-center items-center w-full h-full bg-[#13C2C2] rounded-full">
                        <svg class="h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 23">
                            <path fill="#fff" fill-rule="evenodd" d="M8.92.45a3 3 0 0 1 3.16 0l7.5 4.642A3 3 0 0 1 21 7.642v7.588a3 3 0 0 1-1.512 2.605l-7.5 4.286a3 3 0 0 1-2.976 0l-7.5-4.286A3 3 0 0 1 0 15.23V7.643a3 3 0 0 1 1.42-2.551L8.92.449ZM2 15.971l7.5 4v-7.5L2 6.972v9Zm9.5-3.5v7.5l7.5-4v-9l-7.5 5.5ZM4 5.972l6.5 4.5 6.5-4.5-6.5-4-6.5 4Z" clip-rule="evenodd"/>
                        </svg>                          
                    </div>
                {:else}
                    <div class="size-[10px] bg-[#D0F3F3] border-[2px] border-white rounded-full relative z-20"></div>
                {/if}
            </div>
            <span class={`${level == 0 ? "text-[#13C2C2] font-semibold" : "text-[#5AD4D4] text-medium"} text-[11.2px] text-center leading-[14px] mt-[4px]`}>Pedido realizado</span>
        </div>
        <div class="flex flex-col items-center w-[66px]">
            <div class="flex items-center justify-center size-[25px] rounded-full relative z-30">
                {#if level == 33.33}
                    <div class="flex justify-center items-center w-full h-full bg-[#13C2C2] rounded-full">
                        <svg class="h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 23">
                            <path fill="#fff" fill-rule="evenodd" d="M8.92.45a3 3 0 0 1 3.16 0l7.5 4.642A3 3 0 0 1 21 7.642v7.588a3 3 0 0 1-1.512 2.605l-7.5 4.286a3 3 0 0 1-2.976 0l-7.5-4.286A3 3 0 0 1 0 15.23V7.643a3 3 0 0 1 1.42-2.551L8.92.449ZM2 15.971l7.5 4v-7.5L2 6.972v9Zm9.5-3.5v7.5l7.5-4v-9l-7.5 5.5ZM4 5.972l6.5 4.5 6.5-4.5-6.5-4-6.5 4Z" clip-rule="evenodd"/>
                        </svg>                          
                    </div>
                {:else}
                    <div class={`size-[10px] ${level >= 33.3 ? "bg-[#D0F3F3]" : "bg-[#A5A5A5]"} border-[2px] border-white rounded-full relative z-20`}></div>
                {/if}
            </div>
            <span class={`${level == 33.33 ? "text-[#13C2C2] font-semibold" : "text-[#ADADAD] font-medium"} text-[11.2px] text-center leading-[14px] mt-[4px]`}>Aguardando a transportadora</span>
        </div>
        <div class="flex flex-col items-center w-[66px]">
            <div class="flex items-center justify-center size-[25px] rounded-full relative z-30">
                {#if level == 66.66}
                    <div class="flex justify-center items-center w-full h-full bg-[#13C2C2] rounded-full">
                        <svg class="h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 23">
                            <path fill="#fff" fill-rule="evenodd" d="M8.92.45a3 3 0 0 1 3.16 0l7.5 4.642A3 3 0 0 1 21 7.642v7.588a3 3 0 0 1-1.512 2.605l-7.5 4.286a3 3 0 0 1-2.976 0l-7.5-4.286A3 3 0 0 1 0 15.23V7.643a3 3 0 0 1 1.42-2.551L8.92.449ZM2 15.971l7.5 4v-7.5L2 6.972v9Zm9.5-3.5v7.5l7.5-4v-9l-7.5 5.5ZM4 5.972l6.5 4.5 6.5-4.5-6.5-4-6.5 4Z" clip-rule="evenodd"/>
                        </svg>                          
                    </div>
                {:else}
                    <div class={`size-[10px] ${level >= 66.66 ? "bg-[#D0F3F3]" : "bg-[#A5A5A5]"} border-[2px] border-white rounded-full relative z-20`}></div>
                {/if}
            </div>
            <span class={`${level == 66.66 ? "text-[#13C2C2] font-semibold" : level >= 66.66 ? "text-[#5AD4D4] font-medium" : "text-[#ADADAD] font-medium"} text-[11.2px] text-center leading-[14px] mt-[4px]`}>Em transito</span>
        </div>
        <div class="flex flex-col items-center w-[66px]">
            <div class="flex items-center justify-center size-[25px] rounded-full relative z-30">
                {#if level == 99.99}
                    <div class="flex justify-center items-center w-full h-full bg-[#13C2C2] rounded-full">
                        <svg class="h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 23">
                            <path fill="#fff" fill-rule="evenodd" d="M8.92.45a3 3 0 0 1 3.16 0l7.5 4.642A3 3 0 0 1 21 7.642v7.588a3 3 0 0 1-1.512 2.605l-7.5 4.286a3 3 0 0 1-2.976 0l-7.5-4.286A3 3 0 0 1 0 15.23V7.643a3 3 0 0 1 1.42-2.551L8.92.449ZM2 15.971l7.5 4v-7.5L2 6.972v9Zm9.5-3.5v7.5l7.5-4v-9l-7.5 5.5ZM4 5.972l6.5 4.5 6.5-4.5-6.5-4-6.5 4Z" clip-rule="evenodd"/>
                        </svg>                          
                    </div>
                {:else}
                    <div class={`size-[10px] ${level >= 99.99 ? "bg-[#D0F3F3]" : "bg-[#A5A5A5]"} border-[2px] border-white rounded-full relative z-20`}></div>
                {/if}
            </div>
            <span class={`${level == 99.99 ? "text-[#13C2C2] font-semibold" : "text-[#ADADAD] font-medium"} text-[11.2px] text-center leading-[14px] mt-[4px]`}>Pedido entregue</span>
        </div>
    </div>
</div>