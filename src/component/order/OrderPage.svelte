<script>
    import { firstAndLastName, formatDate, formatPrice, formatTimer, maskPhone } from "$lib/formating";
    import { addHoursToDate, getSecondsBetweenDates } from "$lib/datetime";
    import { copyText } from "$lib/clipboard";
    import { onMount, untrack } from "svelte";

    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import ToastNotification from "$component/ToastNotification.svelte";
    import OrderPopup from "$component/order/OrderPopup.svelte";
    import CancelDrawer from "$component/order/CancelDrawer.svelte";
    import MethodsDrawer from "$component/payment/MethodsDrawer.svelte";
    import SuccessDrawer from "$component/order/SuccessDrawer.svelte";
    import ShippingTrack from "./ShippingTrack.svelte";

    let { session, product, costs, discounts, address, installments, cards, customer, total, method, variants, price, order, payment, quantity, updateOrder=()=>{}, updatePayment=()=>{}, updateMethod=()=>{}, updatePage=()=>{} } = $props();

    let container = $state(null);
    let waiting = $state(false);
    let toast = $state(null);
    let popup = $state(null);
    let confirmed = $state(false);
    let scroll = $state({ position: 0, locked: false });

    let cancel_drawer = $state(null);
    let method_drawer = $state(null);
    let success_drawer = $state(null);

    let image = $derived(price?.image || product?.images?.find(item => item.index == 0));

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
    const copyOrderNumber = async () => {
        if(await copyText(order?.number)){
            toast.showMessage("Copiado", "checked_circle");
        }
    }
    const updateConfirmation = (value) => {
        confirmed = value;
    }

    onMount(() => {
        if(order?.status != "approved"){
            setTimeout(popup.openPopup, 300);
            waiting = true;
        }
    });

    $effect(() => {
        if(waiting && order?.status == "approved"){
            untrack(() => success_drawer.openDrawer());
        }
    });
</script>

<OrderPopup bind:this={popup} {confirmed} {updateConfirmation}/>
<ToastNotification bind:this={toast} top={30}/>
<CancelDrawer bind:this={cancel_drawer} {session} {order} {updateOrder} {updatePayment} {updateScroll}/>
<SuccessDrawer bind:this={success_drawer} {product} {order} {updateScroll} {updatePage}/>
<MethodsDrawer bind:this={method_drawer} {session} {total} {product} {method} {cards} {installments} {price} {updateMethod} {updateScroll} {updatePage}/>
<div class="flex relative w-full">
    <div class="flex w-full h-[50dvh] absolute top-0 left-0 z-10 bg-[linear-gradient(120deg,#FFF2F2_0%,#F0F9FB_100%)]"></div>
    <div class="flex flex-col w-full relative z-20">
        <button class="flex justify-center items-center w-[40px] h-[32px] ps-[4px] absolute top-[8px] left-0 z-30" type="button" aria-label="Voltar" onclick={() => { order?.status == "pending" ? updatePage("payment") : updatePage("product"); }}>
            <svg class="h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
            </svg>
        </button>
        <header class={`flex w-full h-[48px] ps-[40px] justify-between items-center z-20 fixed top-0 bg-white border-b-[1px] border-[#eeeeee] ${scroll.position > 10 ? "opacity-100" : "opacity-0"} duration-300 transition-opacity`}>
            <div class="flex flex-col w-full items-center justify-center gap-[6px]">
                <span class="text-black text-[17px] font-bold leading-none">
                    {#if order?.status == "pending"}
                        {#if confirmed == false}
                            Aguardando pagamento
                        {:else}
                            Processando pagamento
                        {/if}
                    {:else if order?.status == "canceled"}
                        Cancelamento bem-sucedido
                    {:else if order?.status == "approved"}
                        Aguardando transportadora
                    {/if}
                </span>
            </div>
            <div class="flex w-[56px] items-center"></div>
        </header>
        <main bind:this={container} onscroll={handleScroll} class={`flex flex-col w-full scrollable transparent-scroll ${scroll.locked ? "overflow-y-hidden" : "overflow-y-scroll"} z-10`} style={order?.status != "approved" ? session?.os?.name == "iOS" ? "height: calc(100dvh - 106px);" : "height: calc(100dvh - 70px);" : "height: 100dvh;"}>
            <div class="flex flex-col w-full h-[48px] gap-[3px] justify-between items-center z-20">
                <div class="flex flex-col w-full ps-[40px] pt-[15px] pb-[12px] gap-[7px]">
                    <span class="flex text-black text-[20px] font-bold leading-none">
                        {#if order?.status == "pending"}
                            {#if confirmed == false}
                                Aguardando pagamento
                            {:else}
                                Processando pagamento
                            {/if}
                        {:else if order?.status == "canceled"}
                            Cancelamento bem-sucedido
                        {:else if order?.status == "approved"}
                            Aguardando transportadora
                        {/if}
                    </span>
                    <span class="flex text-[#504F57] text-[13px] leading-[16px]">
                        {#if order?.status == "canceled"}
                            {#if order?.reason == "not_need"}
                                Você cancelou o pedido porque ele nao é mais necessário.
                            {:else if order?.reason == "fear_scam"}
                                Você cancelou o pedido por medo de ser golpe.
                            {:else if order?.reason == "order_mistake"}
                                Você cancelou o pedido porque ele foi criado por engano.
                            {:else if order?.reason == "wrong_address"}
                                Você cancelou o pedido porque o endereço está incorreto.
                            {:else if order?.reason == "expensive_price"}
                                Você cancelou o pedido pelo alto preço do produto.
                            {:else if order?.reason == "change_method"}
                                Você cancelou o pedido para mudar o método de pagamento.
                            {:else if order?.reason == "different_discount"}
                                Você cancelou o pedido pelo desconto inesperado.
                            {:else if order?.reason == "expensive_shipping"}
                                Você cancelou o pedido pela alta taxa no envio.
                            {/if}
                        {:else if order?.status == "approved"}
                            Chega em<b class="text-[#007B7B] font-semibold px-[3px]">{order?.deadline?.from}</b> a <b class="text-[#007B7B] font-semibold px-[3px]">{order?.deadline?.to}</b>
                        {:else}
                            Reservado por 22h
                        {/if}
                    </span>
                </div>
                <div class="flex flex-col w-full relative">
                    {#if order?.status == "approved"}
                        <div class="flex w-full justify-center px-[5px] pt-[14px] pb-[16px] bg-white">
                            <ShippingTrack {order}/>
                        </div>
                        <span class="flex w-full h-[1px] bg-[#f4f4f4]"></span>
                    {:else if confirmed == false}
                        <div class="w-full px-[16px] pt-[14px] pb-[12px] bg-white">
                            <span class="text-[#161823] text-[15px] leading-none">Total <b class="font-semibold">R$ {formatPrice(order?.total)}</b></span>
                            <div class="flex items-center gap-[6px] mt-[8px]">
                                <div class="flex justify-center items-center w-[24px] h-[16px] shrink-0 rounded-[2px] bg-[#F1F1F1]">
                                    <svg class="h-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 297 297">
                                        <path fill="#32BCAD" d="M144.4 169.745c3.124-3.124 8.571-3.133 11.697 0l44.511 44.513c8.234 8.229 19.185 12.763 30.827 12.763h5.36l-56.534 56.535c-17.607 17.606-46.154 17.606-63.759 0l-56.374-56.373H68.9c11.642 0 22.595-4.534 30.829-12.763l44.671-44.675ZM47.504 82.201c.718.271 1.48.463 2.295.463h19.1c8.03 0 15.891 3.256 21.566 8.936l44.679 44.677c4.164 4.161 9.632 6.244 15.105 6.244a21.313 21.313 0 0 0 15.108-6.249l44.508-44.51c5.675-5.677 13.538-8.936 21.569-8.936h15.531c.86 0 1.677-.188 2.428-.49l34.165 34.165c17.604 17.606 17.603 46.15 0 63.757l-34.165 34.164a6.464 6.464 0 0 0-2.428-.489h-15.531c-8.031 0-15.894-3.258-21.569-8.936l-44.508-44.507c-8.066-8.074-22.143-8.071-30.217-.004L90.465 205.16c-5.675 5.678-13.535 8.935-21.566 8.935H49.8c-.814 0-1.575.192-2.295.462l-34.3-34.297c-17.607-17.607-17.607-46.153 0-63.759l34.299-34.3Zm68.995-68.996c17.605-17.607 46.151-17.607 63.759 0l56.533 56.534h-5.36c-11.643 0-22.594 4.533-30.827 12.763l-44.512 44.515c-3.226 3.234-8.476 3.222-11.694.004L99.725 82.34C91.49 74.11 80.54 69.577 68.898 69.577h-8.771l56.372-56.372Z"/>
                                    </svg>
                                </div>
                                <span class="text-[#161823] text-[13px] font-medium">PIX</span>
                            </div>
                            {#if order?.status != "canceled"}
                                <button class="text-[#0075DB] text-[13px] leading-none mt-[12px]" type="button" onclick={method_drawer?.openDrawer}>Alterar o método de pagamento</button>
                            {/if}
                        </div>
                        <span class="flex w-full h-[1px] bg-[#f4f4f4]"></span>
                    {/if}
                    <div class="flex flex-col w-full px-[16px] pt-[16px] pb-[16px] bg-white">
                        <div class="flex items-center gap-[6px]">
                            <svg class="h-[14px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path fill="#AFAFAF" fill-rule="evenodd" d="M8.003 0a7.998 7.998 0 0 1 7.998 7.998c0 4.613-7.939 11.107-7.998 11.155 0 0-8.213-6.735-7.999-11.155a7.999 7.999 0 0 1 8-7.998ZM8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clip-rule="evenodd"/>
                            </svg>
                            <span class="text-[#474747] text-[14px] leading-[15px]"><b class="text-black text-[15px] font-semibold">{firstAndLastName(customer.fullname)}</b>, (+55){maskPhone(customer.phone)}</span>
                        </div>
                        <span class="text-[#707070] text-[13px] leading-[15px] mt-[4px]">{customer.email}</span>
                        <span class="text-[#707070] text-[13px] leading-[15px] mt-[4px]">{address.street}, {address.number}, {address.district}, {address.city?.name}, {address.region?.name}, {address.postal}</span>
                        {#if order?.status == "pending"}
                            <div class="flex w-full justify-start mt-[12px]">
                                <button class="text-[#0075DB] text-[13px] leading-none" type="button" onclick={() => updatePage("add_address")}>Mudar endereço</button>
                            </div>
                        {/if}
                    </div>
                    <span class="flex w-full h-[8px] bg-[#f8f8f8]"></span>
                    <div class="flex flex-col w-full px-[16px] pt-[12px] pt-[15px] pb-[14px] bg-white">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-[5px]">
                                <span class="text-[#161823] text-[15px] font-semibold leading-[16px]">{product?.store?.title}</span>
                                <svg class="h-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 15">
                                    <path fill="#AFB0B4" d="M0 1.5 1.5 0 9 7.5 1.5 15 0 13.5l6-6-6-6Z"/>
                                </svg>                                  
                            </div>
                        </div>
                        <div class="flex justify-between items-start mt-[16px] gap-[12px]">
                            <div class="flex size-[80px] shrink-0 rounded-[3px] bg-[#F8F8F8] bg-contain bg-center" style={`background-image: url('${PUBLIC_UPLOAD_BASE}/${image?.source}')`}></div>
                            <div class="flex flex-col w-full relative" style="max-width: calc(100% - 92px);">
                                <div class="flex gap-[4px] relative overflow-hidden">
                                    <span class="text-ellipsis overflow-hidden whitespace-nowrap text-black text-[14px] leading-none">{product?.title}</span>
                                </div>
                                <span class="text-[#595959] text-[13px] mt-[3px]">{Object.values(variants).map(variant => variant.name).join(", ")}</span>
                                <div class="flex">
                                    <div class="flex items-center h-[16px] gap-[3px] px-[3px] mt-[4px] bg-[#F8ECE1] rounded-[3px] border-[1px] border-[#f0f0f0]">
                                        <svg class="h-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 35 34">
                                            <path fill="#FFC859" d="M7.981 2.589A17.002 17.002 0 0 1 33.973 17.96C33.8 21.008 31.5 25.5 35 26v2.5h-5.5c-1.735 0-2.771-1.771-2.771-1.771a13.758 13.758 0 1 0-5.232 3.274l1.06 3.063A17 17 0 0 1 7.98 2.59ZM17 5c6.627 0 12 5.373 12 12s-5.373 12-12 12S5 23.627 5 17 10.373 5 17 5Zm-1.5 13.5-3-2-1.5 2 4.5 3.5 7.5-7.5-2-1.5-5.5 5.5Z"/>
                                        </svg>
                                        <span class="text-[#895109] text-[10.2px] font-semibold">Devolução gratuita</span>  
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mt-[12px]">
                                    <span class="text-[#595959] text-[14px] leading-none">x{quantity}</span>
                                    <span class="text-black text-[14.6px] leading-none">R$ {formatPrice(costs.product - discounts.product.total)}</span>
                                </div>
                            </div>
                        </div>
                        {#if order?.status == "approved"}
                            <button class="flex justify-center gap-[6px] items-center w-full h-[44px] rounded-md bg-[#F2F2F2] hover:bg-[#DBDBDB] active:bg-[#DBDBDB] disabled:hover:bg-[#F2F2F2] disabled:active:bg-[#F2F2F2] mt-[18px]" type="button" onclick={cancel_drawer?.openDrawer}>                   
                                <span class="text-black text-[15px] font-semibold">Devolver os itens</span>
                            </button>
                        {/if}
                    </div>
                    <span class="flex w-full h-[8px] bg-[#f8f8f8]"></span>
                    <div class="flex items-center w-full pt-[10px] pb-[12px] px-[16px] gap-[8px] bg-[linear-gradient(120deg,#E2F7F9_0%,#F6F3F4_40.3%,#F8E9EC_100%)]">
                        <svg class="w-[13.3px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 22">
                            <path fill="#000" d="M10.21 0c1.078 0 2.193.346 3.056 1.085.883.757 1.443 1.88 1.443 3.29V5h1.248l.28.013a3.001 3.001 0 0 1 2.698 2.619l1.358 11A3 3 0 0 1 17.316 22H3l-.165-.005a3 3 0 0 1-2.833-3.107l.01-.164 1.02-11A3.001 3.001 0 0 1 4.018 5h1.69v-.625c0-1.41.56-2.533 1.444-3.29C8.015.345 9.13 0 10.209 0ZM4.018 7a1 1 0 0 0-.995.908l-1.02 11A1 1 0 0 0 3 20h14.316a1 1 0 0 0 .992-1.123l-1.358-11a1 1 0 0 0-.899-.873L15.957 7H14.71v.875a1 1 0 1 1-2 0V7h-5v.875a1 1 0 0 1-2 0V7H4.02Zm4.672 4.077L7.479 12.14h4.5c.692 0 2.23.597 2.23 2.886 0 1.5-1.192 2.767-2.23 2.767h-1.904c-.692 0-.692-1.689 0-1.69h1.517c1.193 0 1.163-2.332 0-2.332H7.479l1.212 1.255-1.04 1.077-2.942-3.05L7.652 10l1.039 1.077ZM10.209 2c-.671 0-1.306.217-1.756.603-.428.367-.744.931-.744 1.772V5h5v-.625c0-.84-.315-1.404-.744-1.771C11.515 2.218 10.881 2 10.21 2Z"/>
                        </svg>
                        <span class="text-[#202020] text-[12px] leading-[14px]"><b class="text-[#FE2C55] font-semibold">Devoluções gratuitas</b> para sua conveniência</span>                                                   
                    </div>
                    <span class="flex w-full h-[8px] bg-[#f8f8f8]"></span>
                    <div class="flex flex-col w-full bg-white">
                        <!--
                        <button type="button" class="flex justify-between px-[16px] pt-[20px] pb-[15px]">
                            <div class="flex flex-col">
                                <div class="flex items-center justify-start gap-[6px]">
                                    <svg class="h-[16px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 24">
                                        <path fill="#89898C" d="M13.144.014C19.748.287 25 4.749 25 10.213l-.005.356C24.771 18.023 17.545 22.745 12.5 24v-3.574c-6.796 0-12.325-4.431-12.496-9.95L0 10.214C0 4.573 5.596 0 12.5 0l.644.014ZM12.5 2.2c-6.125 0-10.3 3.982-10.3 8.013 0 4.03 4.175 8.013 10.3 8.013h2.2v2.655c1.533-.713 3.113-1.716 4.467-2.986 2.17-2.035 3.633-4.618 3.633-7.682 0-4.03-4.175-8.013-10.3-8.013Zm3.686 9.486a1.15 1.15 0 0 1 1.628 1.627c-1.455 1.455-3.48 2.325-5.459 2.399-1.999.074-4.046-.675-5.312-2.574a1.15 1.15 0 0 1 1.914-1.276c.734 1.1 1.937 1.602 3.313 1.551 1.396-.052 2.871-.681 3.916-1.726Z"/>
                                    </svg>
                                    <span class="text-[#161823] text-[15px] font-semibold leading-none">Entre em contato com o vendedor</span>
                                </div>
                                <div class="flex w-full items-center justify-start mt-[7px]">
                                    <span class="text-[#8A8B90] text-[12px] leading-none">Problemas com o produto e atrasos no envio.</span>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <svg class="h-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 19">
                                    <path fill="#8A8B91" d="M0 1.5 1.5 0l9 9.5-9 9L0 17l7.5-7.5-7.5-8Z"/>
                                </svg>
                            </div>
                        </button>
                        -->
                        <button type="button" class="flex justify-between px-[16px] pt-[15px] pb-[20px]">
                            <div class="flex flex-col">
                                <div class="flex items-center justify-start gap-[6px]">
                                    <svg class="h-[18px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path fill="#89898C" d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Zm0 1.986C6.47 1.986 1.986 6.47 1.986 12c0 5.53 4.484 10.014 10.014 10.014 5.53 0 10.014-4.483 10.014-10.014C22.014 6.47 17.53 1.986 12 1.986Zm.136 14.54c.383 0 .716.138.996.413.284.276.427.609.427.997 0 .262-.068.502-.202.717a1.477 1.477 0 0 1-.516.517 1.359 1.359 0 0 1-.705.187c-.388 0-.722-.137-1.002-.413a1.363 1.363 0 0 1-.421-1.008c0-.388.14-.72.42-.997.28-.275.615-.414 1.003-.414Zm.304-10.733c.823 0 1.547.145 2.172.434.63.288 1.119.7 1.468 1.234.354.53.53 1.16.53 1.889 0 .49-.08.93-.239 1.318a3.204 3.204 0 0 1-.666 1.034 4.873 4.873 0 0 1-1.028.809 4.39 4.39 0 0 0-.86.673 2.23 2.23 0 0 0-.492.82c-.103.31-.157.694-.16 1.151v.168H11.01v-.168c.004-.78.077-1.4.22-1.862.146-.461.353-.832.62-1.112a4.77 4.77 0 0 1 .976-.783c.263-.163.498-.342.705-.536a2.34 2.34 0 0 0 .498-.66c.12-.245.18-.519.18-.82 0-.34-.079-.636-.238-.886a1.624 1.624 0 0 0-.647-.582 1.93 1.93 0 0 0-.898-.207c-.306 0-.597.067-.873.2-.272.13-.498.328-.679.595-.177.263-.276.597-.298 1.002H8.275c.022-.819.221-1.504.596-2.056a3.53 3.53 0 0 1 1.5-1.241 5.067 5.067 0 0 1 2.069-.414Z"/>
                                    </svg>                                      
                                    <span class="text-[#161823] text-[15px] font-semibold leading-none">Entrar em contato com o Tiktok</span>
                                </div>
                                <div class="flex w-full items-center justify-start mt-[7px]">
                                    <span class="text-[#8A8B90] text-[12px] leading-none">Problemas de conta, pagamento, disputas e pós-envio.</span>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <svg class="h-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 19">
                                    <path fill="#8A8B91" d="M0 1.5 1.5 0l9 9.5-9 9L0 17l7.5-7.5-7.5-8Z"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <span class="flex w-full h-[8px] bg-[#f8f8f8]"></span>
                    <div class="flex flex-col w-full px-[16px] pt-[12px] pt-[15px] pb-[18px] bg-white">
                        <div class="flex">
                            <h2 class="text-[#161823] text-[14.4px] font-semibold">Detalhes do pedido</h2>
                        </div>
                        <div class="flex justify-between items-center mt-[16px]">
                            <span class="text-[#50525A] text-[14.2px] leading-[16px]">Número do pedido</span>
                            <button type="button" class="flex items-center gap-[5px]" onclick={copyOrderNumber}>
                                <span class="text-[#50525A] text-[14.2px] leading-[16px]">{order?.number}</span>
                                <svg class="w-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                                    <path fill="#8A8B90" d="M2.8 18.5A2.8 2.8 0 0 1 0 15.7V7.3a2.8 2.8 0 0 1 2.8-2.8H5V2.8A2.8 2.8 0 0 1 7.8 0h8.4A2.8 2.8 0 0 1 19 2.8v8.4a2.8 2.8 0 0 1-2.8 2.8H14v1.7a2.8 2.8 0 0 1-2.8 2.8H2.8ZM16.6 12a.4.4 0 0 0 .4-.4V2.4a.4.4 0 0 0-.4-.4H7.4a.4.4 0 0 0-.4.4v9.2a.4.4 0 0 0 .4.4h9.2Zm-8.8 2A2.8 2.8 0 0 1 5 11.2V6.5H2.4a.4.4 0 0 0-.4.4v9.2a.4.4 0 0 0 .4.4h9.2a.4.4 0 0 0 .4-.4V14H7.8Z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-center mt-[15px]">
                            <span class="text-[#50525A] text-[14.2px] leading-[16px]">Data do pedido</span>
                            <span class="text-[#50525A] text-[14.2px] leading-[16px]">{formatDate(order?.created_at, "DD de MMM de YYYY, HH:mm")}</span>
                        </div>
                        <div class="flex justify-between items-center mt-[15px]">
                            <span class="text-[#50525A] text-[14.2px] leading-[16px]">Método de pagamento</span>
                            <div class="flex items-center gap-[5px]">
                                {#if payment?.method == "pix"}
                                    <div class="flex justify-center items-center w-[32px] h-[20px] shrink-0 rounded-[2px] bg-[#F1F1F1]">
                                        <svg class="h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 297 297">
                                            <path fill="#32BCAD" d="M144.4 169.745c3.124-3.124 8.571-3.133 11.697 0l44.511 44.513c8.234 8.229 19.185 12.763 30.827 12.763h5.36l-56.534 56.535c-17.607 17.606-46.154 17.606-63.759 0l-56.374-56.373H68.9c11.642 0 22.595-4.534 30.829-12.763l44.671-44.675ZM47.504 82.201c.718.271 1.48.463 2.295.463h19.1c8.03 0 15.891 3.256 21.566 8.936l44.679 44.677c4.164 4.161 9.632 6.244 15.105 6.244a21.313 21.313 0 0 0 15.108-6.249l44.508-44.51c5.675-5.677 13.538-8.936 21.569-8.936h15.531c.86 0 1.677-.188 2.428-.49l34.165 34.165c17.604 17.606 17.603 46.15 0 63.757l-34.165 34.164a6.464 6.464 0 0 0-2.428-.489h-15.531c-8.031 0-15.894-3.258-21.569-8.936l-44.508-44.507c-8.066-8.074-22.143-8.071-30.217-.004L90.465 205.16c-5.675 5.678-13.535 8.935-21.566 8.935H49.8c-.814 0-1.575.192-2.295.462l-34.3-34.297c-17.607-17.607-17.607-46.153 0-63.759l34.299-34.3Zm68.995-68.996c17.605-17.607 46.151-17.607 63.759 0l56.533 56.534h-5.36c-11.643 0-22.594 4.533-30.827 12.763l-44.512 44.515c-3.226 3.234-8.476 3.222-11.694.004L99.725 82.34C91.49 74.11 80.54 69.577 68.898 69.577h-8.771l56.372-56.372Z"/>
                                        </svg>
                                    </div>
                                    <span class="text-[#50525A] text-[14.2px] leading-none">PIX</span>
                                {/if}
                            </div>
                        </div>
                        {#if order?.status == "canceled"}
                            <div class="flex justify-between items-center mt-[15px]">
                                <span class="text-[#50525A] text-[14.2px] leading-[16px]">Data de cancelamento</span>
                                <span class="text-[#50525A] text-[14.2px] leading-[16px]">{formatDate(order?.canceled_at, "DD de MMM de YYYY, HH:mm")}</span>
                            </div>
                        {/if}
                    </div>
                    <span class="flex w-full h-[8px] bg-[#f8f8f8]"></span>
                    <div class={`flex flex-col w-full px-[16px] pt-[12px] pt-[15px] ${session?.os?.name == "iOS" ? "pb-[40px]" : "pb-[20px]"} bg-white`}>
                        <div class="flex">
                            <h2 class="text-[#161823] text-[14.4px] font-semibold">Resumo do pedido</h2>
                        </div>
                        <div class="flex justify-between items-center mt-[16px]">
                            <span class="text-[#171823] text-[14.8px] leading-[16px]">Subtotal</span>
                            <span class="text-[#50525A] text-[14.8px] leading-[16px]">R$ {formatPrice(costs.product - discounts.product.total)}</span>
                        </div>
                        <div class="flex justify-between items-center mt-[18px]">
                            <span class="text-[#171823] text-[14.8px] leading-[16px]">Envio</span>
                            <span class="text-[#50525A] text-[14.8px] leading-[16px]">R$ {formatPrice(costs.shipping - discounts.shipping.total)}</span>
                        </div>
                        <div class="flex justify-between items-center mt-[18px]">
                            <span class="text-[#171823] text-[14.8px] font-semibold leading-[16px]">Total</span>
                            <span class="text-[#161823] text-[14.8px] font-semibold leading-[16px]">R$ {formatPrice(order?.total)}</span>
                        </div>
                        <div class="flex items-center justify-end mt-[4px]">
                            <span class="text-[#858585] text-[13px] leading-[16px]">Impostos inclusos</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        {#if order?.status != "approved"}
            <footer class={`flex justify-center items-center w-full fixed bottom-0 left-0 gap-[8px] px-[16px] pt-[12px] ${session?.os?.name == "iOS" ? "pb-[48px]" : "pb-[12px]"} bg-white z-30`}>
                {#if order?.status == "canceled"}
                    <button class="flex justify-center gap-[6px] items-center w-full h-[46px] rounded-md bg-[#F2F2F2] hover:bg-[#DBDBDB] active:bg-[#DBDBDB] disabled:hover:bg-[#F2F2F2] disabled:active:bg-[#F2F2F2]" type="button" onclick={() => updatePage("product")}>                   
                        <span class="text-black text-[16px] font-medium">Comprar agora</span>
                    </button>
                {:else}
                    <button class="flex justify-center gap-[6px] items-center w-full h-[46px] rounded-md bg-[#F2F2F2] hover:bg-[#DBDBDB] active:bg-[#DBDBDB] disabled:hover:bg-[#F2F2F2] disabled:active:bg-[#F2F2F2]" type="button" onclick={cancel_drawer?.openDrawer}>                   
                        <span class="text-black text-[16px] font-medium">Cancelar pedido</span>
                    </button>
                    <button class="flex justify-center gap-[6px] items-center w-full h-[46px] rounded-md bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] disabled:hover:bg-[#F2F2F2] disabled:active:bg-[#F2F2F2]" type="button" onclick={() => updatePage("payment")}>
                        <span class="text-white text-[16px] font-medium">Visualizar código</span>
                    </button>
                {/if}
            </footer>
        {/if}
    </div>
</div>