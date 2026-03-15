<script>
    import { formatDate, formatPrice, formatTimer } from "$lib/formating";
    import { addHoursToDate, getSecondsBetweenDates } from "$lib/datetime";
    import { copyText } from "$lib/clipboard";
    import { getRandomNumber } from "$lib/random";
    import { onMount, untrack } from "svelte";

    import PaymentSkeleton from "$component/payment/PaymentSkeleton.svelte";
    import ToastNotification from "$component/ToastNotification.svelte";
    import SuccessDrawer from "$component/order/SuccessDrawer.svelte";

    let { product, payment, order, updatePage=()=>{} } = $props();

    let container = $state(null);
    let toast = $state(null);
    let drawer = $state(null);
    let timer = $state(0);
    let interval = $state(null);
    let scroll = $state({ position: 0, locked: false });

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
    const updateTimer = () => {
        if(order?.status == "approved"){
            clearInterval(interval);
            drawer.openDrawer();
        }
        else if(payment){
            let now = new Date();
            let expiration = new Date(payment?.expiration);
            if(now <= expiration){
                timer = getSecondsBetweenDates(now, expiration);
            }
            else{
                clearInterval(interval);
            }
        }
    }
    const copyPaymentCode = async () => {
        if(await copyText(payment?.pix)){
            toast.showMessage("O código foi copiado", "checked_circle");
        }
        else{
            toast.showMessage("Falha ao copiar o código");
        }
    }

    onMount(async () => {
        updateTimer();
        interval = setInterval(updateTimer, 1000);

        return () => {
            clearInterval(interval);
        }
    });

    $effect(() => {
        if(order.status == "approved"){
            untrack(() => drawer.openDrawer());
        }
    });
</script>

{#if order && payment}
    <ToastNotification bind:this={toast} top={30}/>
    <SuccessDrawer bind:this={drawer} {product} {order} {updatePage}/>
    <div class="flex relative w-full">
        <div class="flex w-full h-[300px] absolute top-0 left-0 z-10 bg-[linear-gradient(120deg,#DBFEFD_0%,#FFFFFF_28.3%,#FFFFFF_45.7%,#FEDBEC_100%)]"></div>
        <div class="flex flex-col w-full relative z-10">
            <header class="flex w-full h-[48px] pt-[2px] justify-between items-center z-20 fixed top-0">
                <button class="flex justify-center items-center w-[56px] h-[32px]" type="button" aria-label="Voltar" onclick={() => updatePage("order")}>
                    <svg class="h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                        <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
                    </svg>
                </button>
                <div class="flex flex-col w-full items-center justify-center gap-[6px]">
                    <span class="text-black text-[17px] font-bold leading-none">Código do pagamento</span>
                </div>
                <div class="flex w-[56px] items-center"></div>
            </header>
            <main bind:this={container} onscroll={handleScroll} class="flex flex-col w-full scrollable pt-[48px] px-[16px]">
                <div class="flex justify-between items-center mt-[13px]">
                    {#if payment?.status == "approved"}
                        <span class="text-black text-[22px] font-bold leading-[30px]">Pagamento aprovado <br/>R$ {formatPrice(payment?.amount)}</span>
                    {:else}
                        <span class="text-black text-[22px] font-bold leading-[30px]">Aguardando o pagamento <br/>R$ {formatPrice(payment?.amount)}</span>
                    {/if}
                    <svg class="w-[48px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 132 132">
                        <path fill="#FF9500" d="M66 0c36.451 0 66 29.55 66 66 0 36.451-29.549 66-66 66-36.45 0-66-29.549-66-66C0 29.55 29.55 0 66 0Zm-3 30a3 3 0 0 0-3 3v34c0 .664.218 1.276.584 1.773.22.408.532.776.936 1.067l28.452 20.44c1.386.996 3.295.713 4.261-.633l3.501-4.873c.967-1.345.626-3.243-.76-4.239L72 62.592V33a3 3 0 0 0-3-3h-6Z"/>
                    </svg>
                </div>
                <div class="flex items-center gap-[6px] mt-[16px]">
                    <span class="text-[#7b7e7e] text-[14px]">Vence em</span>
                    <div class="flex items-center gap-[2px] bg-[#FE4C3A] rounded-[4px] px-[5px] h-[19px]">
                        <svg class="w-[11px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
                            <path fill="#fff" d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0Zm-.726 7.272a.728.728 0 0 0-.727.727v8.243c0 .16.053.305.14.425a.77.77 0 0 0 .227.264l6.897 4.955a.738.738 0 0 0 1.033-.154l.848-1.18a.74.74 0 0 0-.183-1.029l-6.053-4.348V8a.728.728 0 0 0-.727-.728h-1.455Z"/>
                        </svg>                      
                        <span class="text-white text-[12px] font-medium">{formatTimer(timer)}</span>
                    </div>
                </div>
                <div class="flex items-center gap-[6px] mt-[6px]">
                    <span class="text-[#7b7e7e] text-[14px]">Prazo</span>
                    <span class="text-black text-[14px] font-medium">{formatDate(payment?.expiration, "HH:mm, DD de MMM YYYY")}</span>
                </div>
                <div class="w-full bg-white rounded-lg mt-[21px] px-[16px] py-[24px]" style="box-shadow: 0 0 16px 0 rgba(0,0,0,0.1);">
                    <div class="flex items-center gap-[12px]">
                        <div class="flex justify-center items-center w-[32px] h-[20px] shrink-0 rounded-[2px] bg-[#F1F1F1]">
                            <svg class="h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 297 297">
                                <path fill="#32BCAD" d="M144.4 169.745c3.124-3.124 8.571-3.133 11.697 0l44.511 44.513c8.234 8.229 19.185 12.763 30.827 12.763h5.36l-56.534 56.535c-17.607 17.606-46.154 17.606-63.759 0l-56.374-56.373H68.9c11.642 0 22.595-4.534 30.829-12.763l44.671-44.675ZM47.504 82.201c.718.271 1.48.463 2.295.463h19.1c8.03 0 15.891 3.256 21.566 8.936l44.679 44.677c4.164 4.161 9.632 6.244 15.105 6.244a21.313 21.313 0 0 0 15.108-6.249l44.508-44.51c5.675-5.677 13.538-8.936 21.569-8.936h15.531c.86 0 1.677-.188 2.428-.49l34.165 34.165c17.604 17.606 17.603 46.15 0 63.757l-34.165 34.164a6.464 6.464 0 0 0-2.428-.489h-15.531c-8.031 0-15.894-3.258-21.569-8.936l-44.508-44.507c-8.066-8.074-22.143-8.071-30.217-.004L90.465 205.16c-5.675 5.678-13.535 8.935-21.566 8.935H49.8c-.814 0-1.575.192-2.295.462l-34.3-34.297c-17.607-17.607-17.607-46.153 0-63.759l34.299-34.3Zm68.995-68.996c17.605-17.607 46.151-17.607 63.759 0l56.533 56.534h-5.36c-11.643 0-22.594 4.533-30.827 12.763l-44.512 44.515c-3.226 3.234-8.476 3.222-11.694.004L99.725 82.34C91.49 74.11 80.54 69.577 68.898 69.577h-8.771l56.372-56.372Z"/>
                            </svg>
                        </div>
                        <span class="text-black text-[16px] font-medium">PIX</span>
                    </div>
                    <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-black text-[22px] font-semibold mt-[26px]">{payment?.pix}</span>
                    <button class="flex justify-center gap-[6px] items-center w-full h-[40px] bg-[#FE2C55] rounded-md hover:bg-[#E81D44] active:bg-[#E81D44] mt-[21px]" type="button" onclick={copyPaymentCode}>
                        <svg class="w-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50">
                            <path fill="#fff" d="M43 0a7 7 0 0 1 7 7v21a7 7 0 0 1-7 7h-8v8a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V22a7 7 0 0 1 7-7h8V7a7 7 0 0 1 7-7h21ZM6 20a1 1 0 0 0-1 1v23a1 1 0 0 0 1 1h23a1 1 0 0 0 1-1V21a1 1 0 0 0-1-1H6Zm22-5a7 7 0 0 1 7 7v8h9a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H21a1 1 0 0 0-1 1v9h8Z"/>
                        </svg>                      
                        <span class="text-white text-[16px] font-medium">Copiar</span>
                    </button>
                </div>
                <div class="flex flex-wrap items-center mt-[24px] text-black text-[11px] gap-[4px] leading-[13px]">
                    <span>Para acessar esta página no app, abra</span>
                    <b class="font-bold">Loja</b>
                    <svg class="w-[5px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 18">
                        <path fill="#000" d="m0 0 15 7v3.5l-15 7v-3L12 9v-.5L0 3V0Z"/>
                    </svg>
                    <b class="font-bold">Pedidos</b>
                    <svg class="w-[5px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 18">
                        <path fill="#000" d="m0 0 15 7v3.5l-15 7v-3L12 9v-.5L0 3V0Z"/>
                    </svg>
                    <b class="font-bold">Sem pagamento</b>
                    <svg class="w-[5px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 18">
                        <path fill="#000" d="m0 0 15 7v3.5l-15 7v-3L12 9v-.5L0 3V0Z"/>
                    </svg>
                    <b class="font-bold">Visualizar o código</b>    
                </div>
                <div class="flex flex-col mt-[40px] gap-[13px] text-black">
                    <h2 class="text-[19px] font-bold">Como fazer pagamentos com PIX?</h2>
                    <p class="text-[13px] leading-[16px]">Copie o código de pagamento acima, selecione Pix no seu app de internet ou de banco e cole o código.</p>
                </div>
            </main>
            <footer class="flex justify-center items-center w-full fixed bottom-0 left-0 p-[16px] pb-[48px]">
                <button class="flex justify-center gap-[6px] items-center w-full h-[46px] bg-[#F2F2F2] rounded-md hover:bg-[#DBDBDB] active:bg-[#DBDBDB] disabled:hover:bg-[#F2F2F2] disabled:active:bg-[#F2F2F2] mt-[1.3rem]" type="button" onclick={() => updatePage("order")}>                   
                    <span class="text-black text-[16px] font-medium">Ver pedido</span>
                </button>
            </footer>
        </div>
    </div>
{:else}
    <PaymentSkeleton/>
{/if}