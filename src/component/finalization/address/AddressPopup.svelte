<script>
    import { onMount } from "svelte";

    let { updatePage=()=>{}, updateScroll=()=>{} } = $props();
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
            <div class="flex flex-col w-full p-[19px] px-[24px] gap-[14px]">
                <span class="w-full text-black text-[20px] text-center font-bold leading-[24px] mt-[6px]">Adicionar endereço<br/>de entrega</span>
                <p class="w-full text-[#595959] text-[15px] text-center leading-[18px]">Sua conta não tem um endereço de envio. Adicione um para prosseguir com a finalização da compra.</p>
            </div>
            <div class="flex w-full border-t-[1px] border-[#eeeeee]">
                <button class="flex items-center justify-center w-full h-[45px]" type="button" onclick={closePopup}>
                    <span class="text-[#595959] text-[16px] leading-none">Mais tarde</span>
                </button>
                <button class="flex items-center justify-center w-full h-[45px] border-s-[1px] border-[#eeeeee]" type="button" onclick={() => { closePopup(); updatePage("add_address"); }}>
                    <span class="text-black text-[16px] font-semibold leading-none">Adicionar</span>
                </button>
            </div>
        </div>
    </div>
</div>