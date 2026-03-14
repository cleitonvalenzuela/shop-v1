<script>
    let { openBackPopup=()=>{}, updatePage=()=>{} } = $props();
</script>

<div class="w-full h-full fixed top-0 left-0">
    <header class="flex flex-col w-full z-40">
        <div class="flex flex-wrap justify-between items-center h-[48px] bg-white border-b-[1px] border-[#eeeeee]">
            <button class="flex justify-center items-center w-[43px] h-[32px]" type="button" aria-label="Voltar" onclick={openBackPopup}>
                <svg class="h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                    <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
                </svg>
            </button>
            <div class="flex flex-col items-center justify-center" style={`width: calc(100% - 86px);`}>
                <span class="text-black text-[15px] font-bold leading-none mt-[2px]">Resumo do pedido</span>
                <div class="flex w-full relative overflow-hidden h-[15px] mt-[2px]">
                    <ul class="flex flex-col w-full">
                        <li class="flex w-full h-[15px] shrink-0 justify-center items-center gap-[4px]">
                            <svg class="w-[9px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 35">
                                <path fill="#007C7A" d="M12.5.596c.75-.626 1.875-.947 3.02 0 3.36 2.777 5.905 3.654 10.605 4.603C27.25 5.427 28 6.291 28 7.416v9.722l-.012.406c-.237 4.34-4.154 12.799-12.141 16.552-1.51.709-2.422.74-3.925 0C3.952 30.38 0 21.23 0 17.062V7.416C0 6.29.75 5.437 2.25 5.124 6.6 4.215 9.132 3.407 12.5.596Zm1.512 2.634C10.339 6.187 7.35 7.116 3 8.031v9.031c0 1.361.73 4.151 2.537 7.131 1.71 2.822 4.183 5.47 7.345 7.035l.308.149.058.027c.266.131.429.19.522.216a.593.593 0 0 0 .08.018l.01.002h.008l.018-.003a.803.803 0 0 0 .104-.024c.114-.032.295-.098.581-.232 3.488-1.639 6.123-4.374 7.896-7.227C24.283 21.231 25 18.507 25 17.138V8.029c-4.487-.935-7.428-1.954-10.988-4.799Zm3.755 8.7c.241-.423.607-.424 1.147-.12l.966.664c.362.241.543.603.362.905l-5.856 9.24c-.544.844-1.45 1.206-2.597 0l-3.562-4.047c-.302-.362-.302-.724 0-.966l1.026-.966c.367-.335.724-.302 1.026 0l2.658 2.959 4.83-7.67Z"/>
                            </svg>
                            <span class="text-[#007C7A] text-[10.4px] font-medium leading-none mt-[2px] whitespace-nowrap">Seus dados estão seguros e conosco</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex w-[43px] items-center"></div>
        </div>
    </header>
    <main class="p-[16px]">
        <div class="w-[192px] h-[16px] rounded-[3px] bg-[#f8f8f8]"></div>
        <div class="w-[224px] h-[16px] rounded-[3px] bg-[#f8f8f8] mt-[12px]"></div>
        <span class="block w-full h-[1px] bg-[#eeeeee] mt-[16px]"></span>
        <div class="flex items-center gap-[10px] mt-[16px]">
            <div class="size-[22px] rounded-full bg-[#f8f8f8]"></div>
            <div class="w-[95px] h-[16px] rounded-[3px] bg-[#f8f8f8]"></div>
        </div>
        <div class="flex gap-[12px] mt-[16px]">
            <div class="size-[88px] shrink-0 rounded-[3px] bg-[#f8f8f8]"></div>
            <div class="w-full">
                <div class="w-full h-[16px] rounded-[3px] bg-[#f8f8f8]"></div>
                <div class="w-[112px] h-[16px] rounded-[3px] mt-[16px] bg-[#f8f8f8]"></div>
                <div class="w-[80px] h-[16px] rounded-[3px] mt-[24px] bg-[#f8f8f8]"></div>
            </div>
        </div>
        <div class="w-[96px] h-[16px] rounded-[3px] mt-[27px] bg-[#f8f8f8]"></div>
        <div class="w-full h-[16px] rounded-[3px] mt-[19px] bg-[#f8f8f8]"></div>
        <div class="w-full h-[16px] rounded-[3px] mt-[32px] bg-[#f8f8f8]"></div>
        <div class="w-full h-[16px] rounded-[3px] mt-[32px] bg-[#f8f8f8]"></div>
        <div class="w-full h-[16px] rounded-[3px] mt-[32px] bg-[#f8f8f8]"></div>
        <div class="w-[96px] h-[16px] rounded-[3px] mt-[32px] bg-[#f8f8f8]"></div>
        <div class="w-full h-[16px] rounded-[3px] mt-[19px] bg-[#f8f8f8]"></div>
    </main>
</div>