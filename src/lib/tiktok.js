import { TIKTOK_PIXEL_ID, TIKTOK_PIXEL_TOKEN } from "$env/static/private";

export const purchaseEvent = async (total_amount, product_id, product_quantity, user_id, user_email, user_phone, session_ttclid, session_ip, session_useragent) => {
    const url = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

    const request = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Token": TIKTOK_PIXEL_TOKEN
        },
        body: JSON.stringify({
            event_source: "web",
            event_source_id: TIKTOK_PIXEL_ID,
            data: [{
                event: "Purchase",
                event_time: Date.now(),
                user: {
                    external_id: user_id,
                    email: user_email,
                    phone: user_phone,
                    ttclid: session_ttclid,
                    ip: session_ip,
                    user_agent: session_useragent
                },
                properties: {
                    currency: "BRL",
                    value: total_amount,
                    quantity: product_quantity,
                    content_type: "product",
                    content_ids: product_id
                },
                page: {
                    url: null,
                    referrer: null
                }
            }]
        })
    });

    const response = await request.json();
    console.log("Purchase", request.status, JSON.stringify(response));
    return true;
}

export const viewContentEvent = async (product_id, product_amount, product_quantity, session_ttclid, session_ip, session_useragent) => {
    const url = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

    const request = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Token": TIKTOK_PIXEL_TOKEN
        },
        body: JSON.stringify({
            event_source: "web",
            event_source_id: TIKTOK_PIXEL_ID,
            data: [{
                event: "ViewContent",
                event_time: Date.now(),
                user: {
                    ttclid: session_ttclid,
                    ip: session_ip,
                    user_agent: session_useragent
                },
                properties: {
                    currency: "BRL",
                    value: product_amount,
                    quantity: product_quantity,
                    content_type: "product",
                    content_id: product_id
                },
                page: {
                    url: null,
                    referrer: null
                }
            }]
        })
    });

    const response = await request.json();
    console.log("PageView", request.status, JSON.stringify(response));
    return true;
}