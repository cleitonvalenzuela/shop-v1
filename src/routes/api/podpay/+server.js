import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

const updateOrderStatus = async (id, status, approved_at, canceled_at) => {
    if(!id || !status) return;

    const { data, error } = await supabase
        .from("order")
        .update({ status, approved_at, canceled_at})
        .eq("payment_id", id);

    if(error) throw console.error("Error on UpdateOrderStatus:", error);
    return true;
}

const updatePaymentStatus = async (id, status, paid_at, canceled_at) => {
    if(!reference || !status) return;

    const { data, error } = await supabase
        .from("payments")
        .update({ status, paid_at, canceled_at })
        .eq("id", id);

    if(error) throw console.error("Error on UpdatePaymentStatus:", error);
    return true;
}

const getPaymentByReference = async (reference) => {
    if(!reference) return;

    const { data, error } = await supabase
        .from("payments")
        .select(`
            id,
            status,
            order:orders(id, status)
        `)
        .eq("reference", String(reference))
        .maybeSingle();

    if(error) throw console.error("Error on GetPaymentByReference:", error);
    return data;
}

export const POST = async ({ request, locals }) => {
    const { type, data } = await request.json();

    // Processa a requisição.
    if(type == "transaction"){
        const reference = data?.id;
        const paid_at = data?.paidAt;
        const canceled_at = data?.canceledAt;
        
        let status = data?.status;

        const payment = await getPaymentByReference(reference);
        if(payment.status != "canceled"){
            status = status == "waiting_payment" ? "pending" : status;
            updatePaymentStatus(payment?.id, status, approved_at, canceled_at);
            updateOrderStatus(payment?.order?.id, status, approved_at, canceled_at);
        }
    }

    // Retornar os dados.
    return new Response("OK");
}