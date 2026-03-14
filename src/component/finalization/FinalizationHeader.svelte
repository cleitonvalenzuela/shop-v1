<script>
    let { openBackPopup=()=>{} } = $props();
</script>

<header class="flex flex-col w-dvw fixed top-0 left-0 z-50">
    <div class="flex flex-wrap justify-between items-center h-[48px] bg-white border-b-[1px] border-[#eeeeee]">
        <button class="flex justify-center items-center w-[43px] h-[32px]" type="button" aria-label="Voltar" onclick={openBackPopup}>
            <svg class="h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
            </svg>
        </button>
        <div class="flex flex-col items-center justify-center" style={`width: calc(100% - 86px);`}>
            <span class="text-black text-[15px] font-bold leading-none mt-[2px]">Resumo do pedido</span>
            <div class="flex w-full relative overflow-hidden h-[15px] mt-[2px]">
                <ul class="flex flex-col w-full transition-all garanties-animation">
                    <li class="flex w-full h-[15px] shrink-0 justify-center items-center gap-[4px]">
                        <svg class="w-[9px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 35">
                            <path fill="#007C7A" d="M12.5.596c.75-.626 1.875-.947 3.02 0 3.36 2.777 5.905 3.654 10.605 4.603C27.25 5.427 28 6.291 28 7.416v9.722l-.012.406c-.237 4.34-4.154 12.799-12.141 16.552-1.51.709-2.422.74-3.925 0C3.952 30.38 0 21.23 0 17.062V7.416C0 6.29.75 5.437 2.25 5.124 6.6 4.215 9.132 3.407 12.5.596Zm1.512 2.634C10.339 6.187 7.35 7.116 3 8.031v9.031c0 1.361.73 4.151 2.537 7.131 1.71 2.822 4.183 5.47 7.345 7.035l.308.149.058.027c.266.131.429.19.522.216a.593.593 0 0 0 .08.018l.01.002h.008l.018-.003a.803.803 0 0 0 .104-.024c.114-.032.295-.098.581-.232 3.488-1.639 6.123-4.374 7.896-7.227C24.283 21.231 25 18.507 25 17.138V8.029c-4.487-.935-7.428-1.954-10.988-4.799Zm3.755 8.7c.241-.423.607-.424 1.147-.12l.966.664c.362.241.543.603.362.905l-5.856 9.24c-.544.844-1.45 1.206-2.597 0l-3.562-4.047c-.302-.362-.302-.724 0-.966l1.026-.966c.367-.335.724-.302 1.026 0l2.658 2.959 4.83-7.67Z"/>
                        </svg>
                        <span class="text-[#007C7A] text-[10.4px] font-medium leading-none mt-[2px] whitespace-nowrap">Seus dados estão seguros e conosco</span>
                    </li>
                    <li class="flex w-full h-[15px] shrink-0 justify-center items-center gap-[4px]">
                        <svg class="h-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30">
                            <path fill="#007C7A" d="M20.652 0a3 3 0 0 1 2.243 1.007l6.347 7.14A3 3 0 0 1 30 10.141V27a3 3 0 0 1-2.846 2.996L27 30H3a3 3 0 0 1-2.996-2.846L0 27V10.086a3 3 0 0 1 .536-1.712l.16-.208L6.6 1.079A3 3 0 0 1 8.739.005L8.905 0h11.747ZM3 27h24V12H3v15Zm10.635-11.308-2.02 1.975h6.923c1.154 0 3.462 1.128 3.462 3.385C22 23.026 20.846 25 19.115 25h-3.173c-1.153 0-1.153-2.257 0-2.257h2.885c1.154 0 1.154-2.82 0-2.82h-7.212l2.02 1.975-1.73 1.692L7 18.795 11.904 14l1.73 1.692ZM3.905 9H14V3H8.905l-5 6ZM16 9h9.986l-5.334-6H16v6Z"/>
                        </svg>                          
                        <span class="text-[#007C7A] text-[10.4px] font-medium leading-none mt-[2px] whitespace-nowrap">Cancelamento fácil</span>
                    </li>
                    <li class="flex w-full h-[15px] shrink-0 justify-center items-center gap-[4px]">
                        <svg class="h-[9px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 26">
                            <path fill="#007C7A" d="M30 0a4 4 0 0 1 4 4v18a4 4 0 0 1-3.794 3.995L30 26H4l-.206-.005a4 4 0 0 1-3.79-3.789L0 22V4a4 4 0 0 1 4-4h26ZM3 22a1 1 0 0 0 1 1h18.97L18 17.844l2.294-1.719 2.677 2.75L28.706 12 31 13.719 22.97 23H30a1 1 0 0 0 1-1V10H3v12ZM4 3a1 1 0 0 0-1 1v3h28V4a1 1 0 0 0-1-1H4Z"/>
                        </svg>
                        <span class="text-[#007C7A] text-[10.4px] font-medium leading-none mt-[2px] whitespace-nowrap">Finalização da compra segura garantida</span>
                    </li>
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