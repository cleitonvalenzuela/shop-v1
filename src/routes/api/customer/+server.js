import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

const updateCustomer = async (id, fullname, email, phone, document, is_filled) => {
    // Cria/atualiza o registro no banco de dados.
    const { data, error } = await supabase
        .from("customers")
        .upsert({
            id: id,
            fullname,
            email,
            phone,
            document,
            is_filled
        })
        .select(`
            id,
            fullname,
            email,
            phone,
            document
            is_filled
        `)
        .single();

    // Retornar os dados.
    if(error) throw console.log(`CreateCustomer error: `, error);
    return data;
}

const updateSession = async (session_id, customer_id) => {
    const { data, error } = await supabase
        .from("sessions")
        .update({
            customer_id: customer_id
        })
        .eq("id", session_id);
}

export const POST = async ({ request, locals }) => {
    const { id, fullname, email, phone, document, is_filled } = await request.json();

    // Pega os dados da sessão.
    const session = locals.session;

    // Cria o usuário consumidor.
    const customer = await updateCustomer(id, fullname, email, phone, document, is_filled);

    // Salva o usuário na sessão.
    updateSession(session.id, customer.id);

    // Retornar os dados.
    return json(customer);
}