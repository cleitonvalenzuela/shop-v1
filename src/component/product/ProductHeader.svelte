<script>
    let { tab="overview", product, scroll={}, updateTab=()=>{} } = $props();
</script>

<header class="flex flex-col fixed top-0 left-0 w-full z-40">
    <div class="flex items-center h-[48px] bg-white">
        <div class="flex justify-start">
            <button type="button" class="flex justify-center items-center p-[16px] h-[48px]" title="Fechar">
                <svg class="w-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 47 46">
                    <path fill="#000" d="M46.077 4.053 27.091 22.89l18.986 18.84-4.022 4.052-19.017-18.87-19.017 18.87L0 41.73l18.984-18.84L0 4.054 4.021 0l19.017 18.87L42.055 0l4.022 4.053Z"/>
                </svg>
            </button>
        </div>
        <div class="flex w-full justify-center items-center">
            <button type="button" class="flex w-full h-[32px] items-center bg-[#F1F1F2] rounded-lg ps-[9px] gap-[5px] relative">
                <svg class="w-[17px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 54">
                    <path fill="#000" fill-rule="evenodd" d="M23 0c12.703 0 23 10.297 23 23a22.91 22.91 0 0 1-5.553 14.985L52 50l-3.5 3.5-11.93-11.93A22.893 22.893 0 0 1 23 46C10.297 46 0 35.703 0 23S10.297 0 23 0Zm0 5.34C13.247 5.34 5.34 13.248 5.34 23S13.248 40.66 23 40.66 40.66 32.752 40.66 23 32.752 5.34 23 5.34Z" clip-rule="evenodd"/>
                </svg>
                <span class="text-[#7E7E7E] text-[14px] text-medium leading-none">{product.search}</span>
            </button>
        </div>
        <div class="flex justify-end">
            <button type="button" class="flex justify-center items-center ps-[16px] pe-[8px] h-[48px]" title="Compartilhar">
                <svg class="w-[22px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 63">
                    <path fill="#000" fill-rule="evenodd" d="M29.054 2.317c0-3 3.5-3 6-.5l30 26.5c2.367 2.488 2.32 3.794 0 6l-30.5 26.5c-2.5 2.5-5.5 1-5.5-2.5v-14c-12.5 0-18 3.5-24 8-2.054 1.54-4.86 0-5-2.5-1-18 12-30.5 29-32v-15.5ZM34.499 19.5c-.054 2.684-1.054 3.416-3.5 3.5C15 25 7.5 33 5.5 45.5 9.5 42 18.5 39 31 39c2-.171 3.5 1 3.5 3.5v11l26-22.5-26-22v10.5Z" clip-rule="evenodd"/>
                </svg>
            </button>
            <button type="button" class="flex justify-center items-center p-[8px] h-[48px]" title="Carrinho">
                <svg class="w-[23px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 64">
                    <path fill="#000" d="M23.566 51a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm31 0a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm-45-51c2.934 0 4.934 1.5 5.5 4.5l1.5 7.5h45.5c4.934 0 7.434 2.5 6.5 6l-6.5 24.5c-.566 2.5-2.566 5.5-7 5.5h-30c-4.066 0-7.066-2-8-6l-8.5-36h-6.5c-2.5 0-3-6 0-6h7.5Zm13 38.5c.749 2.45 1.467 3.426 4 3.5h26.5c2.689-.2 3.302-1.238 4-3.5l5-20.5h-44l4.5 20.5Z"/>
                </svg>
            </button>
            <button type="button" class="flex justify-center items-center ps-[8px] pe-[16px] h-[48px]" title="Opções">
                <svg class="w-[19px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 12">
                    <path fill="#000" d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0Zm22 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm22 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"/>
                </svg>                                          
            </button>
        </div>
    </div>
    <div class="flex flex-col w-full bg-white" style={`opacity: ${scroll.position >= 75 ? "100" : (scroll.position / 75) * 100}%`}>
        <div class="flex overflow-x-auto relative no-selectable transparent-scroll -mb-[0.5px] z-20">
            <div class="flex items-center">
                <div class="flex w-[14px]"></div>
                <button type="button" class={`flex justify-between items-center gap-[6px] py-[8px] px-[10px] border-b-[2.6px] ${tab == "overview" ? "border-black" : "border-transparent"} relative`} onclick={() => updateTab("overview")}>
                    <span class={`text-[15px] ${tab == "overview" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Visão geral</span>
                </button>
                <button type="button" class={`flex justify-between items-center gap-[6px] py-[8px] px-[10px] border-b-[2.6px] ${tab == "reviews" ? "border-black" : "border-transparent"} relative`} onclick={() => updateTab("reviews")}>
                    <span class={`text-[15px] ${tab == "reviews" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Avaliações</span>
                </button>
                <button type="button" class={`flex justify-between items-center gap-[6px] py-[8px] px-[10px] border-b-[2.6px] ${tab == "description" ? "border-black" : "border-transparent"} relative`} onclick={() => updateTab("description")}>
                    <span class={`text-[15px] ${tab == "description" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Descrição</span>
                </button>
                <button type="button" class={`flex justify-between items-center gap-[6px] py-[8px] px-[10px] border-b-[2.6px] ${tab == "suggestions" ? "border-black" : "border-transparent"} relative`} onclick={() => updateTab("suggestions")}>
                    <span class={`text-[15px] ${tab == "suggestions" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Recomendações</span>
                </button>
                <div class="flex w-[14px]"></div>
            </div>
        </div>
        <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#e3e3e3] z-10"></span>
    </div>
</header>