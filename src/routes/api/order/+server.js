import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";
import { stringify } from "querystring";
import { getRandomNumber } from '$lib/random';
import { addHoursToDate } from '$lib/datetime.js';
import { getShippingRange } from '$lib/shipping.js';

import { PODPAY_SECRET_KEY } from '$env/static/private';

const getCustomerByID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
    .from("customers")
    .select(`
        id,
        fullname,
        email,
        phone,
        document,
        image:images(id, source, index)
    `)
    .match({ id, is_active: true })
    .maybeSingle();

    if(error) throw console.log(`Get customer by id error: `, error);
    return data;
}

const getProductByID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
    .from("products")
    .select(`
        id,
        shipping:shippings(id, name, deadline, price:prices(id, regular, promotional))
    `)
    .match({ id, is_active: true })
    .maybeSingle();

    if(error) throw console.log(`Get product by id error: `, error);
    return data;
}

const createOrder = async (product_id, address_id, customer_id, price_id, session_id, deadline, costs, quantity, discounts, total) => {
    // Gera um número aleatório para o pedido.
    let number = getRandomNumber(17);

    // O status inicial é pendente.
    let status = "pending";
    let reason = "waiting_payment";

    // Cria o registro no banco de dados.
    const { data, error } = await supabase
        .from("orders")
        .insert({
            number,
            product_id,
            address_id,
            customer_id,
            price_id,
            session_id,
            status,
            reason,
            deadline,
            costs,
            quantity,
            discounts,
            total
        })
        .select(`*, product:products(*), price:prices(*, image:images(*)), address:addresses(*), customer:customers(*), session:sessions(*)`)
        .single();

    // Retornar os dados.
    if(error) throw console.log(`CreateOrder error: `, error);
    return data;
}

const createPayment = async (order_id, amount, customer, method) => {
    // Por padrao usa a PodPay.
    let gateway = "podpay";

    // Define a expiração para 24 horas depois.
    let expiration = addHoursToDate(Date.now(), 24);

    // O status inicial é pendente.
    let status = "pending";
    let reason = "waiting_payment";

    // Gera a transação no gateway.
    const request = await fetch("https://api.podpay.app/v1/transactions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': PODPAY_SECRET_KEY
        },
        body: JSON.stringify({
            paymentMethod: "pix",
            amount: parseInt(amount*100),
            customer: {
                name: customer.fullname,
                email: customer.email,
                phone: customer.phone,
                document: {
                    type: "cpf",
                    number: customer.document
                }
            },
            items: [{
                title: "Ebook: Dieta Cetogenica",
                tangible: false,
                quantity: 1,
                unitPrice: parseInt(amount*100)
            }]
        })
    });

    // Verifica a resposta da API.
    const response = await request.json();
    if(request.status != 201){
        throw console.log(`PodPay request error ${request.status}: `, JSON.stringify(response));
    }

    // Pega os dados de pagamento PIX.
    let pix = response?.data?.pixQrCode;
    let reference = response?.data?.id;

    // Cria o registro no banco de dados.
    const { data, error } = await supabase
        .from("payments")
        .insert({
            order_id,
            gateway,
            method,
            expiration,
            pix,
            reference,
            status,
            reason,
            amount
        })
        .select(`*`)
        .single();

    // Retornar os dados.
    if(error) throw console.log(`CreatePayment error: `, error);
    return data;
}

export const POST = async ({ request, locals, cookies }) => {
    const {
        customer_id,
        address_id,
        product_id,
        discounts,
        price_id,
        quantity,
        method,
        costs,
        total
    } = await request.json();

    // Pega os dados da sessão.
    let session_id = locals?.session?.id;

    // Pega o prazo de entrega.
    let product = await getProductByID(product_id);
    let deadline = getShippingRange(product?.shipping?.deadline);

    // Pega os dados do consumidor.
    let customer = await getCustomerByID(customer_id);

    // Cria o pedido e o pagamento.
    let order = await createOrder(product_id, address_id, customer_id, price_id, session_id, deadline, costs, quantity, discounts, total);
    let payment = await createPayment(order?.id, total, customer, method);

    // Retornar os dados.
    return json({ order, payment });
}