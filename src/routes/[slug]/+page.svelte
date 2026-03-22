<script>
    import { onMount, untrack } from 'svelte';
    import { addHoursToDate } from '$lib/datetime';
    import { getCardInstallments } from '$lib/card.js';
    import { compareArray } from '$lib/array.js';
    import { createEvent } from '$lib/events.client.js';

    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import PageTransition from "$component/PageTransition.svelte";
    import FinalizationPage from "$component/finalization/FinalizationPage.svelte";
    import AddressPage from "$component/address/AddressPage.svelte";
    import ProductPage from '$component/product/ProductPage.svelte';
    import ProductSkeleton from '$component/product/ProductSkeleton.svelte';
    import PaymentPage from '$component/payment/PaymentPage.svelte';
    import ReviewsPage from '$component/reviews/ReviewsPage.svelte';
    import CardPage from '$component/card/CardPage.svelte';
    import InstallmentsPage from '$component/installments/InstallmentsPage.svelte';
    import OrderPage from '$component/order/OrderPage.svelte';
    import ToastNotification from '$component/ToastNotification.svelte';
    import WhitePage from '$component/WhitePage.svelte';

    let { data } = $props();

    let toast = $state(null);

    let product = $state(data.product);
    let customer = $state(data.customer);
    let address = $state(data.address);

    let session = $derived(data.session);
    let variations = $derived(product?.variations);
    let prices = $derived(product?.prices);
    let shipping = $derived(product?.shipping);

    let quantity = $state(1);
    let saved = $state(false);
    let ready = $state(false);
    let method = $state(null);
    let interval = $state(null);

    let last_performance = $state(null);
    let current_frames = $state(0);

    let price = $derived(prices?.find(item => item.is_selected) || prices?.reduce((a, b) => a.promotional < b.promotional ? a : b));

    let coupons = $derived(product?.coupons);
    $effect(() => {
        let product_coupon;
        let shipping_coupon;

        coupons?.map((item, index) => {
            if(item.category == "product"){
                const is_applied = item.is_redeemed && (item.minimum ? price?.promotional >= item.minimum : true);
                const amount = item.type == "variable" ? price?.promotional * item.discount : item.discount;
                if(is_applied && product_coupon){
                    const prevent = product_coupon.type == "variable" ? price?.promotional * product_coupon.discount : product_coupon.discount;
                    if(amount > prevent){
                        product_coupon = item;
                    }
                }
                else if(is_applied){
                    product_coupon = item;
                }
            }
            if(item.category == "shipping"){
                const is_applied = item.is_redeemed && (item.minimum ? shipping?.price?.regular >= item.minimum : true);
                const amount = item.type == "variable" ? shipping?.price?.regular * item.discount : item.discount;
                if(is_applied && shipping_coupon){
                    const prevent = shipping_coupon.type == "variable" ? shipping?.price?.regular * shipping_coupon.discount : shipping_coupon.discount;
                    if(amount > prevent){
                        shipping_coupon = item;
                    }
                }
                else if(is_applied){
                    shipping_coupon = item;
                }
            }
        });

        coupons?.map((item, index) => {
            if(product_coupon && item.id == product_coupon.id){
                coupons.at(index).is_applied = true;
            }
            else if(shipping_coupon && item.id == shipping_coupon.id){
                coupons.at(index).is_applied = true;
            }
            else{
                coupons.at(index).is_applied = false;
            }
        });
    });

    let installments = $derived(price?.promotional ? getCardInstallments("mastercard", price?.promotional) : null);
    let variants = $derived(variations?.flatMap(variation => variation.variants)?.filter(variant => variant.is_selected));

    let costs = $derived({product: price?.regular * quantity, shipping: shipping?.price?.regular});
    let discounts = $derived.by(() => {
        let discounts = {
            product: { total: 0, offer: 0, coupons: 0 },
            shipping: { total: 0, offer: 0, coupons: 0 },
            payment: 0
        };

        if(price?.regular != price?.promotional && price?.promotional > 0){
            const amount = (price?.regular - price?.promotional) * quantity;
            discounts.product.offer = amount;
            discounts.product.total += amount;
        }
        if(shipping?.price?.regular != shipping?.price?.promotional && shipping?.price?.promotional > 0){
            const amount = shipping?.price?.regular - shipping?.price?.promotional;
            discounts.shipping.offer = amount;
            discounts.shipping.total += amount;
        }

        coupons?.map(item => {
            if(item.is_applied){
                if(item.category == "product"){
                    const amount = item.type == "variable" ? item.discount * price.promotional : item.discount;
                    discounts.product.coupons += amount;
                    discounts.product.total += amount;
                }
                else if(item.category == "shipping"){
                    const amount = item.type == "variable" ? item.discount * shipping?.price?.regular : item.discount;
                    discounts.shipping.coupons += amount;
                    discounts.shipping.total += amount;
                }
            }
        });

        if(method == "pix" && product?.pix_discount > 0){
            if(product?.pix_discount < 1){
                discounts.payment = product?.pix_discount * (costs.product + costs.shipping - discounts.product.total - discounts.shipping.total);
            }
            else{
                discounts.payment = product?.pix_discount;
            }
        }

        if((costs.shipping - discounts.shipping.total) < 0){
            discounts.shipping.coupons -= (costs.shipping - discounts.shipping.total) * -1;
            discounts.shipping.total = discounts.shipping.offer + discounts.shipping.coupons;
        }
        if((costs.product - discounts.product.total) < 0){
            discounts.product.coupons -= (costs.product - discounts.product.total) * -1;
            discounts.product.total = discounts.product.offer + discounts.product.coupons;
        }

        return discounts;
    });

    let total = $derived(costs.product + costs.shipping - discounts.product.total - discounts.shipping.total - discounts.payment);

    let payment = $state(null);
    let order = $state(null);
    let cards = $state([]);

    const updateAddress = (value) => {
        address = value;
    }
    const updateQuantity = (value) => {
        quantity = Math.max(1, Math.min(10, value));
        createEvent("quantity", { value: quantity });
    }
    const updateCustomer = (value) => {
        customer = value;
    }
    const updateOrder = (value) => {
        order = value;
    }
    const updatePayment = (value) => {
        payment = value;
    }
    const updateMethod = (value, card) => {
        method = value;

        if(card){
            cards.map((item, index) => {
                if(item.number == card.number){
                    cards[index].is_selected = true;
                }
                else{
                    cards[index].is_selected = false;
                }
            });
        }

        createEvent("method", { value: method });
    }
    const updateCards = (value) => {
        cards = value;
    }
    const applyCoupon = (id) => {
        toast.showMessage("Melhor oferta aplicada");
    }
    const redeemCoupon = (id) => {
        const index = coupons.findIndex(item => item.id == id);
        coupons[index].is_redeemed = true;
        toast.showMessage("Cupom reivindicado");
    }
    const updateVariation = (variant) => {
        variations.map((variation, i) => {
            if(variant?.variation?.id == variation?.id){
                variation?.variants?.map((item, j) => {
                    if(item?.id == variant?.id){
                        variations[i].variants[j].is_selected = true;
                        createEvent("variation", { name: variation?.name, value: item?.name });
                    }
                    else{
                        variations[i].variants[j].is_selected = false;
                    }
                });
            }
        });

        const ids = variants.map(item => item.id);
        prices.map((item, index) => {
            if(compareArray(item.variants, ids)){
                prices[index].is_selected = true;
            }
            else{
                prices[index].is_selected = false;
            }
        });
    }
    const saveProduct = () => {
        saved = !saved;
        createEvent("save", { value: saved });
    }
    const loadProduct = async () => {
        const request = await fetch("/api/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: product?.id })
        });

        if(request.status === 200){
            product = await request.json();
            ready = true;
        }
    }
    const checkPayment = async () => {
        const request = await fetch("/api/order/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: order?.id
            })
        });

        if(request.status == 200){
            let response = await request.json();
            if(response.status == "approved"){
                clearInterval(interval);
                
                order.status = response?.status;
                order.approved_at = response?.approved_at;
                order.canceled_at = response?.canceled_at;
            }
        }
    }
    const createOrder = async () => {
        const request = await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: product.id,
                price_id: price.id,
                customer_id: customer.id,
                address_id: address.id,
                discounts,
                quantity,
                method,
                costs,
                total
            })
        });

        if(request.status == 200){
            let response = await request.json();
            order = response.order;
            payment = response.payment;

            interval = setInterval(checkPayment, 5000);
        }
    }
    const observeFrames = () => {
        const current_performance = performance.now();
        current_frames++;
        if(current_performance - last_performance >= 1000){
            if(current_frames < 50){
                createEvent("frames", { value: current_frames });
            }
            current_frames = 0;
            last_performance = current_performance;
        }
        requestAnimationFrame(observeFrames);
    }

    onMount(() => {
        last_performance = performance.now();

        if(product.is_active){
            observeFrames();
            loadProduct();
        }
    });
</script>

<svelte:head>
    <title> </title>
    {#each product?.images as image}
        {#if image.index == 0}
            <link rel="preload" as="image" href={`${PUBLIC_UPLOAD_BASE}/${image.source}`}/>
        {/if}
    {/each}
</svelte:head>

{#if product.is_active == false || session?.detection?.category != "user"}
    <WhitePage {product}/>
{:else if ready}
    <ToastNotification bind:this={toast} top={300}/>
    <PageTransition pages={[
        {name: "product", color: "#FFFFFF", component: ProductPage, props: {
            session,
            price,
            saved,
            total,
            costs,
            prices,
            product,
            address,
            coupons,
            shipping,
            variants,
            quantity,
            discounts,
            variations,
            installments,
            saveProduct,
            applyCoupon,
            redeemCoupon,
            updateAddress,
            updateQuantity,
            updateVariation
        }},
        {name: "reviews", color: "#FFFFFF", component: ReviewsPage, props: {
            session,
            price,
            costs,
            prices,
            product,
            coupons,
            discounts,
            shipping,
            quantity,
            variants,
            variations,
            updateQuantity,
            updateVariation
        }},
        {name: "finalization", color: "#FFFFFF", component: FinalizationPage, props: {
            price,
            session,
            payment,
            costs,
            cards,
            total,
            method,
            product,
            coupons,
            address,
            customer,
            quantity,
            shipping,
            variants,
            discounts,
            variations,
            installments,
            updateAddress,
            updateCustomer,
            updateQuantity,
            updateMethod,
            createOrder
        }},
        {name: "add_address", color: "#F5F5F5", component: AddressPage, history: false, props: {
            session,
            address,
            customer,
            updateAddress,
            updateCustomer
        }},
        {name: "add_card", color: "#F5F5F5", component: CardPage, history: false, props: {
            price,
            cards,
            method,
            product,
            updateCards,
            updateMethod,
        }},
        {name: "installments", color: "#F5F5F5", component: InstallmentsPage, props: {
            total,
            price,
            cards,
            method,
            product,
            updateCards,
            updateMethod,
        }},
        {name: "payment", color: "#FFFFFF", component: PaymentPage, props: {
            payment,
            order,
            product,
            updateOrder
        }},
        {name: "order", color: "#FFFFFF", component: OrderPage, props: {
            session,
            price, 
            order,
            costs,
            total,
            cards,
            method,
            address,
            product,
            quantity,
            variants,
            payment,
            customer,
            discounts,
            installments,
            updateOrder,
            updatePayment,
            updateMethod
        }}
    ]}/>
{:else}
    <ProductSkeleton/>
{/if}