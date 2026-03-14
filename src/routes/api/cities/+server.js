import supabase from '$lib/supabase.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const body = await request.json();

    const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("region_id", body.region)
        .order("name", { ascending: true });

    if(error) return json({
        success: false
    });

    return json({
        success: true,
        results: data.map(result => {
            return {
                id: result.id,
                name: result.name
            }
        })
    });
}