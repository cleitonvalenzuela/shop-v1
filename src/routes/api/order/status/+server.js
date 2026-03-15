import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

const getOrderByID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("orders")
        .select(`
            id,
            status,
            approved_at,
            canceled_at
        `)
        .eq("id", id)
        .maybeSingle();

    if(error) throw console.error("Error on getOrderByID:", error);
    return true;
}

export const POST = async ({ request, locals }) => {
    const { id } = await request.json();

    // Pega os dados do pedido.
    const order = await getOrderByID(id);
    if(!order){
        return error(400);
    }

    // Retornar os dados.
    return json(order);
}