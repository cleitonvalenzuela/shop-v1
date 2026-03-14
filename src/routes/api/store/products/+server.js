import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const { id } = await request.json();
    if(!id)return error(400);

    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            title,
            rating,
            total_sales,
            total_reviews,
            flash_sale,
            images:images(id, source, index),
            prices:prices(id, regular, promotional),
            coupons:coupons(id, type, category, minimum, limit, origin, discount, is_applied, is_redeemed)
        `)
        .eq("store_id", id)
        .eq("is_active", true);

    if(error) throw console.log(`Get products by store error: `, error);
    return json(data);
}