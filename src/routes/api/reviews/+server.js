import { error as _error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";
import { validateInteger, validateReviewFilter, validateUUID } from '$lib/validation.js';
import { getRandomCustomer } from '$lib/random.js';

const filters = {
    all: {gte: 0, lte: 5},
    images: {gte: 0, lte: 5},
    five: {gte: 4.51, lte: 5},
    four: {gte: 3.51, lte: 4},
    three: {gte: 2.51, lte: 3},
    two: {gte: 1.51, lte: 2},
    one: {gte: 0.51, lte: 1}
}

const getReviews = async (id, filter, page, limit) => {
    const { data, error } = await supabase
        .from("reviews")
        .select(`
            id,
            content,
            rating,
            item,
            likes,
            is_liked,
            is_preview,
            ${filter == "images" ? "images:images!inner" : "images:images"}(id, source, index, review_id))`)
        .gte("rating", filter ? filters[filter].gte : 0)
        .lte("rating", filter ? filters[filter].lte : 5)
        .eq("is_active", true)
        .eq("product_id", id)
        .order("created_at", { ascending: false })
        .order("index", { foreignTable: "images", ascending: true })
        .range(page * limit, (page * limit) + limit);

    if(error) throw console.log(`Get reviews error: `, error);
    return data;
}

export const POST = async ({ request }) => {
    let { id, filter, page, limit } = await request.json();

    if(!validateUUID(id)) return _error(400);
    if(!validateReviewFilter(filter)){
        filter = "all";
    }
    if(!validateInteger(page)){
        page = 0;
    }
    if(!validateInteger(limit) || limit <= 0){
        limit = 20;
    }

    let reviews = await getReviews(id, filter, page, limit);
    reviews = reviews.map((item, index) => {
        const customer = getRandomCustomer(item?.gender);
        return { ...item, customer }
    });

    return json(reviews);
}