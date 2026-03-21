import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

const updateAddress = async (id, postal, district, street, number, unit, complement, city_id, region_id, is_filled) => {
    // Cria o registro no banco de dados.
    const { data, error } = await supabase
        .from("addresses")
        .upsert({
            id,
            postal,
            district,
            street,
            number,
            unit,
            complement,
            city_id,
            region_id,
            is_filled
        })
        .select(`
            id,
            postal,
            district,
            street,
            number,
            unit,
            complement,
            city:cities(id, name),
            region:regions(id, name, code),
            is_filled
        `)
        .single();

    // Retornar os dados.
    if(error) throw console.error(`CreateAddress error: `, error);
    return data;
}

const updateSession = async (session_id, address_id) => {
    const { data, error } = await supabase
        .from("sessions")
        .update({
            address_id: address_id
        })
        .eq("id", session_id);
}

export const POST = async ({ request, locals }) => {
    const { id, postal, district, street, number, unit, complement, city_id, region_id, is_filled } = await request.json();

    // Pega os dados da sessão.
    const session = locals.session;

    // Cria um novo endereço.
    const address = await updateAddress(id, postal, district, street, number, unit, complement, city_id, region_id, is_filled);

    // Salva o endereço na sessão.
    updateSession(session.id, address.id);

    // Retornar os dados.
    return json(address);
}