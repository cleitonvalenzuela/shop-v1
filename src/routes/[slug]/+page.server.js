import { error, redirect } from "@sveltejs/kit";
import supabase from "$lib/supabase";
import { getLowestPrice } from "$lib/clipboard.js";
import { viewContentEvent } from "../../lib/tiktok";

const getProductBySlug = async (slug) => {
    if(!slug) return;

    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            store_id,
            title,
            slug,
            is_active,
            images:images(id, source, index),
            prices:prices(id, variants, regular, promotional, is_selected)
        `)
        .eq("slug", slug)
        .order("index", { foreignTable: "images", ascending: true })
        .maybeSingle();

    if(error) throw console.error("Error on getProductBySlug:", error);
    return data;
}

export const load = async ({ url, locals, params }) => {
    // Busca os dados do produto.
    const product = await getProductBySlug(params.slug);
    if(!product) throw error(404, "Page not found");

    // Pega os dados do cliente.
    const customer = locals?.session?.customer || {};

    // Pega os dados do endereço.
    const address = locals?.session?.address || {};

    // Pega os dados da sessao.
    const session = {
        id: locals?.session?.id,
        os: {
            name: locals?.session?.os_name,
            version: locals?.session?.os_version
        },
        browser: {
            name: locals?.session?.browser_name,
            version: locals?.session?.browser_version,
        },
        device: {
            model: locals?.session?.device_model,
            vendor: locals?.session?.device_vendor
        },
        detection: locals?.session?.detection,
        ttclid: locals?.session?.ttclid,
        ip: locals?.session?.ip_address,
        useragent: locals?.session?.useragent
    };

    // Pega o preço padrão.
    const price = product?.prices?.reduce((a, b) => a.promotional < b.promotional ? a : b);

    // Dispara o evento de visualização de conteudo.
    await viewContentEvent(product?.id, product?.slug, price?.promotional, 1, session?.ttclid, session?.ip, session?.useragent);
    
    // Retorna os dados para o cliente.
    return { product, customer, address, session };
}