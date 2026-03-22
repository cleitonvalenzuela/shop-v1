import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";
import { getRandomNumber } from '$lib/random';
import { addHoursToDate } from '$lib/datetime.js';
import { getShippingRange } from '$lib/shipping.js';
import { createEvent } from '$lib/events.server';

const cancelOrderByID = async (order_id, reason) => {
    if(!order_id || !reason) return;

    // O status é cancelado.
    let status = "canceled";

    // Cria o registro no banco de dados.
    const { data, error } = await supabase
        .from("orders")
        .update({ status, reason, canceled_at: new Date() })
        .eq("id", order_id)
        .select(`*, product:products(*), price:prices(*, image:images(*)), address:addresses(*), customer:customers(*), session:sessions(*)`)
        .single();

    // Retornar os dados.
    if(error) throw console.error(`CancelOrderByID error: `, error);
    return data;
}

const cancelPaymentsByOrder = async (order_id, reason) => {
    if(!order_id || !reason) return;

    // O status é cancelado.
    let status = "canceled";

    // Cria o registro no banco de dados.
    const { data, error } = await supabase
        .from("payments")
        .update({ status, reason, canceled_at: new Date() })
        .eq("order_id", order_id)
        .select(`*`)
        .single();

    // Retornar os dados.
    if(error) throw console.error(`CancelPaymentsByOrder error: `, error);
    return data;
}

export const POST = async ({ request, locals, cookies }) => {
    const { order_id, reason } = await request.json();
    if(!order_id || !reason) return error(400);

    // Cancela o pedido e os pagamentos.
    let order = await cancelOrderByID(order_id, reason);
    let payment = await cancelPaymentsByOrder(order_id, "order_cancelation");

    await createEvent("cancelation", { id: order?.id, reason: reason });

    // Retornar os dados.
    return json({ order, payment });
}