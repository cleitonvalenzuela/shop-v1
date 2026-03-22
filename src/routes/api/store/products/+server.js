import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const { id } = await request.json();
    if(!id)return error(400);

    const { data, error } = await supabase
        .from("more")
        .select(`
            id,
            image:images(id, source),
            price:prices(id, regular, promotional)
        `)
        .eq("store_id", id)
        .eq("is_active", true)
        .order("index", { ascending: true });

    if(error) throw console.error(`Get more products by store error: `, error);
    return json(data);
}