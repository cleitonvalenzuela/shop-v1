<script>
    import { onMount } from "svelte";

    let { backPage=()=>{}, updateScroll=()=>{} } = $props();
    let open = $state(false);

    export const openPopup = () => {
        updateScroll({ locked: true });
        open = true;
    }
    export const closePopup = () => {
        open = false;
        updateScroll({ locked: false });
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full h-full bg-[#00000099] justify-center items-center ${open ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in-out z-20 no-selectable`}>
        <div class="flex flex-col w-[288px] bg-white rounded-[16px] relative">
            <button type="button" aria-label="Fechar" class="absolute top-[7px] right-[8px] p-2 z-50" onclick={closePopup}>
                <svg class="w-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                    <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
                </svg>
            </button>
            <div class="flex flex-col w-full p-[19px] px-[24px] gap-[14px]">
                <span class="w-full text-black text-[20px] text-center font-bold leading-[24px] mt-[6px]">Sair da edição</span>
                <p class="w-full text-[#595959] text-[15px] text-center leading-[19px]">Suas informações não serão salvas.</p>
            </div>
            <button class="flex items-center justify-center w-full h-[45px] border-t-[1px] border-[#eaeaea]" type="button" onclick={closePopup}>
                <span class="text-black text-[16px] font-semibold leading-none">Continuar editando</span>
            </button>
            <button class="flex items-center justify-center w-full h-[45px] border-t-[1px] border-[#eaeaea]" type="button" onclick={() => { closePopup(); backPage(); }}>
                <span class="text-[#595959] text-[16px] leading-none">Sair</span>
            </button>
        </div>
    </div>
</div>