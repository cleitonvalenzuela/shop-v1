<script>
    import { formatNumber } from "$lib/formating";

    let { backPage=()=>{} } = $props();
</script>

<header class="flex flex-col fixed top-0 left-0 w-full z-40">
    <div class="flex w-full justify-between items-center pt-[2px] bg-white border-b-[1px] border-[#eeeeee]">
        <div class="flex justify-start w-[176px]">
            <button class="flex justify-center items-center px-[16px] h-[48px]" type="button" aria-label="Voltar" onclick={backPage}>
                <svg class="h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                    <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
                </svg>
            </button>
        </div>
        <div class="flex justify-center items-center w-full h-full">
            <h1 class="text-black text-[16px] font-bold leading-none">Selecione o plano de parcelas</h1>
        </div>
        <div class="flex justify-end w-[176px]"></div>
    </div>
</header>