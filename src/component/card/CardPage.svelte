<script>
    import { onMount, untrack } from "svelte";
    import { formatNumber } from "$lib/formating";
    import { getCardBrand, getCardFinal } from "$lib/card";

    import CardHeader from "$component/card/CardHeader.svelte";
    import NumberField from "$component/card/fields/NumberField.svelte";
    import ExpirationField from "$component/card/fields/ExpirationField.svelte";
    import SecurityField from "$component/card/fields/SecurityField.svelte";
    import HolderField from "$component/card/fields/HolderField.svelte";
    import SaveDefault from "$component/card/fields/SaveDefault.svelte";
    import DiscountsDrawer from "./DiscountsDrawer.svelte";

    let { product, cards, method, price, updateCards=()=>{}, updateMethod=()=>{}, backPage=()=>{}, updatePage=()=>{} } = $props();

    let ready = $state(false);
    let loading = $state(false);
    let container = $state(null);
    let drawer = $state(null);

    let interval = $state(null);
    let installment = $state(2);

    let scroll = $state({ position: 0, locked: false });

    let number = $state(null);
    let expiration = $state(null);
    let security = $state(null);
    let holder = $state(null);

    let brand = $derived(number ? getCardBrand(number?.value) : null);

    let valid = $derived(
        number?.validate() &&
        expiration?.validate() &&
        security?.validate() &&
        holder?.validate()
    );

    const handleScroll = () => {
        scroll.position = container.scrollTop;
    }
    const updateScroll = (params) => {
        if(params?.locked){
            scroll.locked = true;
        }
        else{
            scroll.locked = false;
        }

        if(params?.position !== null){
            container.scrollTo({ top: params?.position, behavior: params?.animated ? "smooth" : "instant" });
        }
    }
    const saveCard = () => {
        if(!valid) return;

        updateScroll({ locked: true });
        loading = true;

        setTimeout(() => {
            loading = false;
            updateScroll({ locked: false });

            if(!cards.find(item => item.number == number.value)){
                updatePage("installments", { card: {
                    brand: brand,
                    number: number.value,
                    expiration: expiration.value,
                    security: security.value,
                    holder: holder.value,
                    final: getCardFinal(number?.value),
                    is_selected: true,
                    is_disabled: false,
                    installments: null
                }});
            }
            else{
                backPage();
            }

            number?.clear();
            expiration?.clear();
            security?.clear();
            holder?.clear();
        }, 2000);
    }

    onMount(() => {
        ready = true;

        if(product?.free_installments > 0){
            clearInterval(interval);
            interval = setInterval(() => {
                installment = installment > (product?.free_installments-1) ? 2 : installment+1;
            }, 2900);

            return () => {
                clearInterval(interval);
            }
        }
    });
</script>

<DiscountsDrawer bind:this={drawer} {product} {updateScroll}/>

<div class={`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50 duration-300 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}>
    <div class="flex justify-center items-center bg-[#2e2e2ed9] size-[80px] rounded-[4px] relative">
        <div class="relative -left-[0.75rem] -top-[0.35rem] z-20">
            <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
            <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
        </div>
    </div>
</div>
<div class="w-full h-dvh bg-[#FFF] pt-[51px] relative">
    <CardHeader {backPage}/>
    {#if product?.free_installments > 0}
        <div class="flex w-full h-[42px] px-[16px] items-center justify-between bg-[#FFF0F3]">
            <div class="flex flex-col overflow-hidden w-full h-[42px] relative">
                {#each Array(product?.free_installments) as item, index}
                    {#if index > 0 && installment == (index+1)}
                        <div class="absolute top-[42px] left-0 flex items-center gap-[6px] animate-installments">
                            <svg class="h-[12.2px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 39">
                                <path fill="#FE2C55" d="M46 0a4 4 0 0 1 4 4v31a4 4 0 0 1-4 4H4l-.206-.005a4 4 0 0 1-3.79-3.789L0 35V4A4 4 0 0 1 3.794.005L4 0h42ZM4.6 34.4h40.8V15H4.6v19.4ZM38.5 26a2.5 2.5 0 0 1 0 5h-7a2.5 2.5 0 0 1 0-5h7ZM4.6 10h40.8V4.6H4.6V10Z"/>
                            </svg>
                            <span class="text-black text-[12.6px] leading-none whitespace-nowrap">Sem juros em {index+1} parcelas</span>
                        </div>
                    {/if}
                {/each}
            </div>
            <button type="button" class="flex items-center gap-[5px]" onclick={drawer?.openDrawer}>
                <span class="text-[#2B5DB9] text-[12.4px] leading-none whitespace-nowrap">Visualizar tudo ({product?.free_installments-1})</span>
                <svg class="w-[5px] h-[8px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 24">
                    <path fill="#000" d="m0 2 2-2 12.5 12L2 24l-2-2 10.5-10L0 2Z"/>
                </svg>              
            </button>
        </div>
    {/if}
    <main bind:this={container} onscroll={handleScroll} class={`flex flex-col pt-[20px] pb-[25px] no-selectable ${scroll.locked ? "overflow-y-hidden" : "overflow-y-scroll"} max-h-dvh transparent-scroll scrollable`}>
        <div class="flex flex-col gap-[26px] px-[18px]">
            <NumberField bind:this={number} next={expiration} {brand}/>
            <div class="flex items-start gap-[30px] justify-between">
                <ExpirationField bind:this={expiration} next={security}/>
                <SecurityField bind:this={security} next={holder} {brand}/>
            </div>
            <HolderField bind:this={holder}/>
            <SaveDefault enabled={true}/>
        </div>
    </main>
    <footer class="flex w-full fixed bottom-0 left-0 px-[16px] pt-[12px] pb-[48px] bg-white border-t-[1px] border-[#eeeeee]">
        <button class="flex justify-center items-center w-full h-[43px] rounded-[4px] bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] disabled:bg-[#F2F2F2] group" disabled={!valid} type="button" onclick={saveCard}>
            <span class="text-white group-disabled:text-[#9F9F9F] text-[15px] font-semibold leading-none">Continuar</span>
        </button>
    </footer>
</div>