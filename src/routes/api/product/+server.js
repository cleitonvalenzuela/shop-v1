import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";
import { getRandomCustomer } from '$lib/random.js';

const getProduct = async (id) => {
  if(!id) return error(400);

  const { data, error } = await supabase
  .from("products")
  .select(`
    id,
    slug,
    title,
    description,
    badge,
    rating,
    search,
    total_sales,
    total_reviews,
    flash_sale,
    pix_method,
    card_method,
    apple_method,
    boleto_method,
    free_installments,
    pix_discount,
    in_cart,
    recently_viewed,
    store:stores( id, title, total_sales, total_reviews, repurchases, image:images(id, source)),
    shipping:shippings(id, name, deadline, price:prices(id, regular, promotional)),
    prices:prices(id, variants, regular, promotional, image:images(id, source, index), is_selected, is_lowest, is_highest),
    images:images(id, source, index),
    coupons:coupons(id, type, discount, category, limit, minimum, origin, is_applied, is_redeemed),
    variations:variations(id, type, index, name, variants:variants(id, name, variation:variations(id), image:images(id, source), is_selected)),
    videos:videos(id, image:images(id, source)),
    tags:tags(id, label)
  `)
  .eq("id", id)
  .eq("is_active", true)
  .order("index", { foreignTable: "images", ascending: true })
  .order("index", { foreignTable: "variations", ascending: true })
  .maybeSingle();

  if(error) throw console.error(`Get product by id error: `, error);
  return data;
}

export const POST = async ({ request }) => {
  const { id } = await request.json();

  const product = await getProduct(id);
  product.videos = product.videos.map(item => {
    const customer = getRandomCustomer();
    return { ...item, customer }
  });

  return json(product);
}