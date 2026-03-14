<script>
    import { onMount } from "svelte";

    let { confirmed, updateConfirmation=()=>{}, updatePage=()=>{}, updateScroll=()=>{} } = $props();

    let is_open = $state(false);

    export const openPopup = () => {
        updateScroll({ locked: true });
        is_open = true;
    }
    export const closePopup = () => {
        is_open = false;
        updateScroll({ locked: false });
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!is_open && "pointer-events-none"}`}>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full h-full bg-[#00000099] justify-center items-center ${is_open ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in-out z-20 no-selectable`}>
        <div class="flex flex-col w-[275px] bg-white rounded-[16px] relative">
            <div class="flex flex-col w-full p-[19px] pb-[12px] px-[24px] gap-[14px]">
                <span class="w-full text-black text-[20px] text-center font-bold leading-[24px] mt-[6px]">Confirmar pagamento</span>
                <p class="w-full text-[#595959] text-[15px] text-center leading-[19px]">Você realizou o pagamento?</p>
            </div>
            <div class="flex items-center">
                <button class="flex items-center justify-center w-full h-[50px]" type="button" onclick={() => { updateConfirmation(false); closePopup(); }}>
                    <span class="text-[#595959] text-[16px] leading-none">Não</span>
                </button>
                <button class="flex items-center justify-center w-full h-[50px]" type="button" onclick={() => { updateConfirmation(true), closePopup(); }}>
                    <span class="text-black text-[16px] font-semibold leading-none">Sim</span>
                </button>
            </div>
        </div>
    </div>
</div>