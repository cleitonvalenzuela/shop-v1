<script>
    import DocumentField from "$component/finalization/customer/fields/DocumentField.svelte";
    import { validateCPF } from "$lib/validation";
    import { onMount } from "svelte";
    import { createEvent } from "$lib/events.client";

    let { session, customer, keyboard=false, updateCustomer=()=>{}, updateScroll=()=>{}} = $props();

    let loading = $state(false);
    let container = $state(null);
    let open = $state(false);
    let error = $state(null);
    let submit = $state(null);
    let value = $state("");

    export const openDrawer = () => {
        updateScroll({ locked: true });
        value = "";
        error = null;
        open = true;
        createEvent("drawer", { name: "customer" });
    }
    export const closeDrawer = () => {
        open = false;
        updateScroll({ locked: false, position: 0 });
    }
    const submitForm = async (e) => {
        e.preventDefault();

        error = null;
        if(!validateCPF(value)){
            error = "CPF inválido. Verifique e tente novamente.";
            createEvent("customer", { status: "failed", value: value });
            return;
        }
        
        closeDrawer();
        document.activeElement?.blur();
        updateScroll({ locked: true });
        loading = true;

        const request = await fetch("/api/customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: customer?.id,
                fullname: customer?.fullname,
                phone: customer?.phone,
                email: customer?.email,
                document: value.replace(/\D/g, ""),
                is_filled: true
            })
        });

        const response = await request.json();
        updateCustomer(response);
        updateScroll({ locked: false });
        loading = false;
        createEvent("customer", { status: "saved", value: customer?.fullname });
    }

    onMount(() => {
        submit.addEventListener("touchstart", submitForm, { passive: false });
        return () => {
            submit.removeEventListener("touchstart", submitForm);
        }
    });
</script>

<div class={`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50 duration-200 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}>
    <div class="flex flex-col justify-center items-center w-[122px] pt-[32px] pb-[15px] rounded-[4px] bg-[#2e2e2ed9]">
        <div class="relative size-[16px] me-[8px] z-20">
            <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
            <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
        </div>
        <span class="w-full text-white text-center text-[13px] font-semibold mt-[18px]">Carregando...</span>
    </div>
</div>
<div bind:this={container} class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-50" : "opacity-0"} z-10 transition-opacity will-change-transform duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} z-20 rounded-t-xl transition-transform ${keyboard || session?.os?.name != "iOS" ? "pb-[3px] duration-0" : "pb-[35px] duration-200"} overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-[9px] right-[8px] p-2 z-50" onclick={closeDrawer}>
            <svg class="w-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[12px] px-4 py-[18px]">
            <span class="text-black text-[17px] font-bold leading-none">Adicionar CPF</span>
        </div>
        <div class="flex flex-col w-full transparent-scroll px-[16px]">
            <span class="text-[#595959] text-[13px] text-start leading-[14px]">O CPF será usado para emitir faturas</span>
            <DocumentField bind:value={value} {error}/>
        </div>
        <div class="w-full p-[16px]">
            <button bind:this={submit} class="flex justify-center items-center w-full h-[48px] rounded-lg bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] disabled:opacity-50" type="button" disabled={!value}>
                <span class="text-white text-[15px] font-semibold leading-none">Confirmar</span>
            </button>
        </div>
    </div>
</div>