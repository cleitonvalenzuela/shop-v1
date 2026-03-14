<script>
    import { onMount } from "svelte";
    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import PaymentSection from "$component/finalization/payment/PaymentSection.svelte";
    import OverviewSection from "$component/finalization/overview/OverviewSection.svelte";
    import DiscountSection from "$component/finalization/discounts/DiscountSection.svelte";
    import DeliverySection from "$component/finalization/address/DeliverySection.svelte";
    import ItemSection from "$component/finalization/item/ItemSection.svelte";
    import AddCustomerSection from "$component/finalization/customer/CustomerSection.svelte";
    import AddressSection from "$component/finalization/address/AddressSection.svelte";
    import FinalizationSkeleton from "$component/finalization/FinalizationSkeleton.svelte";
    import BackPopup from "$component/finalization/BackPopup.svelte";
    import MethodsDrawer from "$component/payment/MethodsDrawer.svelte";
    import AddressPopup from "$component/finalization/address/AddressPopup.svelte";
    import CustomerDrawer from "$component/finalization/customer/CustomerDrawer.svelte";
    import FinalizationHeader from "$component/finalization/FinalizationHeader.svelte";
    import ProductFooter from "$component/product/ProductFooter.svelte";
    import FinalizationFooter from "$component/finalization/FinalizationFooter.svelte";
    import SectionSpacer from "$component/finalization/SectionSpacer.svelte";
    import ToastNotification from "$component/ToastNotification.svelte";

    let {
        session,
        product,
        shipping,
        customer,
        keyboard,
        variations,
        discounts,
        variants,
        quantity,
        address,
        coupons,
        costs,
        price,
        total,
        cards,
        method,
        installments,
        backPage=()=>{},
        updatePage=()=>{},
        updateCustomer=()=>{},
        updateQuantity=()=>{},
        updateMethod=()=>{},
        createOrder=()=>{}
    } = $props();

    let ready = $state(false);
    let loading = $state(false);
    let container = $state(null);
    let toast = $state(null);
    let scroll = $state({ position: 0, locked: false });

    let customer_drawer = $state(null);
    let method_drawer = $state(null);
    let back_popup = $state(null);
    let address_popup = $state(null);

    let ready_timeout = $state(null);
    let loading_timeout = $state(null);
    let local_quantity = $state(quantity);

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
    const submitOrder = () => {
        if(!address?.is_filled){
            address_popup.openPopup();
            return;
        }
        else if(!customer?.is_filled){
            customer_drawer.openDrawer();
            return;
        }
        else if(!method){
            method_drawer.openDrawer();
            return;
        }

        createOrder();
        updatePage("payment");
    }
    const localUpdateQuantity = (value) => {
        if(value < 1){
            toast.showMessage("Selecione pelo menos 1 item");
        }
        else if(value > 10){
            toast.showMessage("Selecione no máximo 10 itens");
        }
        else{
            updateScroll({ locked: true });
            local_quantity = Math.max(1, Math.min(10, value));
            loading = true;

            clearTimeout(loading_timeout);
            loading_timeout = setTimeout(() => {
                quantity = local_quantity;
                loading = false;
                updateQuantity(value);
                updateScroll({ locked: false });
            }, 2000);
        }
    }
    const handleReady = () => {
        ready = true;

        if(!address?.is_filled){
            setTimeout(() => {
                address_popup.openPopup();
            }, 300);
        }
    }

    onMount(() => {
        ready_timeout = setTimeout(handleReady, 1500);

        return () => {
            clearTimeout(ready_timeout);
            clearTimeout(loading_timeout);
        }
    });
</script>

{#if ready}
    <div class={`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50 duration-300 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}>
        <div class="flex flex-col justify-center items-center w-[122px] pt-[32px] pb-[15px] rounded-[4px] bg-[#2e2e2ed9]">
            <div class="relative size-[16px] me-[8px] z-20">
                <span class="absolute size-[12px] rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
                <span class="absolute size-[12px] rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
            </div>
            <span class="w-full text-white text-center text-[13px] font-semibold mt-[18px]">Carregando...</span>
        </div>
    </div>
    <ToastNotification bind:this={toast} top={56}/>
    <BackPopup bind:this={back_popup} {discounts} {updatePage} {updateScroll}/>
    <AddressPopup bind:this={address_popup} {updatePage} {updateScroll}/>
    <CustomerDrawer bind:this={customer_drawer} {session} {keyboard} {customer} {updateCustomer} {updateScroll}/>
    <MethodsDrawer bind:this={method_drawer} {session} {total} {installments} {product} {method} {cards} {price} {updateMethod} {updatePage} {updateScroll}/>
    <div class="flex flex-col relative">
        <FinalizationHeader openBackPopup={back_popup?.openPopup}/>
        <main bind:this={container} onscroll={handleScroll} class={`flex flex-col w-full bg-[#F5F5F5] pt-[48px] ${session?.os?.name == "iOS" ? "pb-[176px]" : "pb-[144px]"} overscroll-y-contain no-selectable ${scroll.locked ? "overflow-y-hidden" : "overflow-y-scroll"} max-h-dvh transparent-scroll scrollable`}>
            <AddressSection {scroll} {customer} {address} {updatePage}/>
            <span class="flex shrink-0 w-full h-[1px] bg-[#eeeeee]"></span>
            <AddCustomerSection {customer} {keyboard} {updateCustomer} openCustomerDrawer={customer_drawer?.openDrawer}/>
            <SectionSpacer/>
            <ItemSection {costs} {discounts} {product} {price} {variations} {variants} quantity={local_quantity} updateQuantity={localUpdateQuantity}/>
            <DeliverySection {shipping} {costs} {discounts}/>
            <SectionSpacer/>
            <DiscountSection {costs} {discounts}/>
            <SectionSpacer/>
            <OverviewSection {costs} {discounts} {total}/>
            <SectionSpacer/>
            <PaymentSection {total} {installments} {product} {method} {updateMethod} {cards} {price} {updatePage} openMethodDrawer={method_drawer?.openDrawer}/>
            <div class="flex w-full p-[16px]">
                <span class="text-[#444444] text-[12.6px] leading-[15px]">Ao fazer um pedido, você concorda com <b class="text-black font-semibold">Termos de uso e venda do TikTok Shop</b> e reconhece que leu e concordou com a <b class="text-black font-semibold">Política de privacidade do Tiktok</b>.</span>
            </div>
        </main>
        <FinalizationFooter {session} {total} {discounts} {submitOrder}/>
    </div>
{:else}
    <FinalizationSkeleton openBackPopup={back_popup?.openPopup}/>
{/if}
