<script>
    import { formatPrice } from "$lib/formating";

    let { session, order, updateScroll=()=>{}, updateOrder=()=>{}, updatePayment=()=>{} } = $props();

    let container = $state(null);
    let is_open = $state(false);
    let loading = $state(false);
    let cancellation = $state(null);

    let reasons = [
        {name: "not_need", label: "Não é mais necessário"},
        {name: "fear_scam", label: "Tenho medo de ser golpe"},
        {name: "order_mistake", label: "Comprado por engano"},
        {name: "wrong_address", label: "Endereço de envio incorreto"},
        {name: "expensive_price", label: "Preço muito alto"},
        {name: "change_method", label: "Preciso alterar o método de pagamento"},
        {name: "different_discount", label: "Desconto diferente do esperado"},
        {name: "expensive_shipping", label: "Alta taxa de envio"}
    ];

    const cancelSubmit = async () => {
        if(!cancellation) return;

        closeDrawer();
        updateScroll({ locked: true });
        loading = true;

        const request = await fetch("/api/order/cancel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_id: order.id,
                reason: cancellation.name
            })
        });

        if(request.status == 200){
            let response = await request.json();
            updateOrder(response.order);
            updatePayment(response.payment);
        }

        updateScroll({ locked: false });
        loading = false;
    }

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

<div class={`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50 duration-300 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}>
    <div class="flex justify-center items-center bg-[#2e2e2ed9] size-[80px] rounded-[4px] relative">
        <div class="relative -left-[0.75rem] -top-[0.35rem] z-20">
            <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
            <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
        </div>
    </div>
</div>
<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!is_open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${is_open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${is_open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-[11px] right-[12px] p-[8px] z-50" onclick={closeDrawer}>
            <svg class="w-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[12px] px-[16px] pt-[18px] pb-[16px]">
            <span class="text-black text-[16px] font-bold leading-none">Conte por que cancelou</span>
        </div>
        <span class="w-full h-[1px] bg-[#eeeeee]"></span>
        <div bind:this={container} class="flex flex-col w-full transparent-scroll px-[16px] scrollable overflow-y-scroll" style={`${session?.os?.name == "iOS" ? "max-height: calc(100% - 150px" : "max-height: calc(100% - 116px"}`}>
            <div class="flex flex-col w-full">
                {#each reasons as reason, index}
                    {#if index > 0}
                        <span class="w-full h-[1px] bg-[#F6F6F6]"></span>
                    {/if}
                    <button class="flex items-center justify-between w-full h-[56px]" type="button" onclick={() => { cancellation = reason; }}>
                        <span class="text-black text-[15px] font-medium leading-none">{reason.label}</span>
                        <div class="flex size-[23px] justify-center items-center">
                            <div class={`flex justify-center items-center size-[23px] rounded-full ${cancellation?.name === reason.name ? "border-[2px] border-[#FE2C55] after:contents-[''] after:size-[15px] after:bg-[#FE2C55] after:rounded-full" : "border-[1.7px] border-[#e3e3e3]"}`}></div>
                        </div>
                    </button>
                {/each}
            </div>
        </div>
        <div class={`flex w-full fixed bottom-0 left-0 px-[16px] pt-[12px] ${session?.os?.name == "iOS" ? "pb-[48px]" : "pb-[12px]"} bg-white`}>
            <button class="flex justify-center items-center w-full h-[43px] rounded-md bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] disabled:bg-[#F2F2F2] group" disabled={!cancellation} type="button" onclick={cancelSubmit}>
                <span class="text-white group-disabled:text-[#9F9F9F] text-[15px] font-semibold leading-none">Enviar</span>
            </button>
        </div>
    </div>
</div>