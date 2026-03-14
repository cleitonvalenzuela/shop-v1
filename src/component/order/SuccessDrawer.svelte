<script>
    import { formatPrice } from "$lib/formating";

    import SuggestionsSection from "$component/suggestions/SuggestionsSection.svelte";

    let { product, order, updateScroll=()=>{}, updatePage=()=>{} } = $props();

    let container = $state(null);
    let is_open = $state(false);

    export const openDrawer = () => {
        updateScroll({ locked: true });
        container?.scrollTo({ top: 0, behavior: "instant" });
        is_open = true;
    }
    export const closeDrawer = () => {
        is_open = false;
        updateScroll({ locked: false });
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!is_open && "pointer-events-none"}`}>
    <div class={`absolute top-0 left-0 w-full h-full bg-black ${is_open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></div>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${is_open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <div bind:this={container} class="flex flex-col w-full transparent-scroll scrollable overflow-y-scroll">
            <div class="flex flex-col w-full items-center px-[16px] pt-[25px] pb-[15px] bg-white">
                <svg class="size-[46px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 72 72">
                    <path fill="#0BE09B" fill-rule="evenodd" d="M36 0c19.882 0 36 16.118 36 36S55.882 72 36 72 0 55.882 0 36 16.118 0 36 0Zm14.345 20.537a1 1 0 0 0-1.381.309L33.719 44.867a1 1 0 0 1-1.599.12l-8.453-9.72a1 1 0 0 0-1.423-.086l-3.502 3.151a1 1 0 0 0-.076 1.411L30.5 53c1 1 4 2 5.5 0l18.455-28.654a1 1 0 0 0-.304-1.386l-3.806-2.423Z" clip-rule="evenodd"/>
                </svg>
                <h3 class="text-[#161823] text-[22px] font-bold leading-[24px] mt-[15px]">Obrigado pelo seu pedido!</h3>
                <span class="text-[#50525A] text-[15px] text-center leading-[20px] mt-[10px]">Você receberá atualizações na caixa de entrada de notificações.</span>
                <button class="flex justify-center gap-[6px] items-center w-full h-[42px] rounded-md bg-[#F2F2F2] hover:bg-[#DBDBDB] active:bg-[#DBDBDB] disabled:hover:bg-[#F2F2F2] disabled:active:bg-[#F2F2F2] mt-[18px]" type="button" onclick={() => updatePage("order")}>                   
                    <span class="text-black text-[14px] font-medium">Ver pedido</span>
                </button>
            </div>
            <div class="flex flex-col w-full h-full bg-[#F5F5F5]">
                <SuggestionsSection {product}/>
            </div>
        </div>
    </div>
</div>