import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request, locals }) => {
    const body = await request.json();

    console.log("POSTBACK PodPay", body);

    // Retornar os dados.
    return new Response("OK");
}