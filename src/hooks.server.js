import supabase from "$lib/supabase";
import { redirect } from "@sveltejs/kit";
import { UAParser } from "ua-parser-js";
import { categorizeRequest } from "$lib/detection";

const getSessionByID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from('sessions')
        .update({ updated_at: new Date() })
        .eq('id', id)
        .select(`
            *,
            customer:customers(id, fullname, phone, email, document, is_filled),
            address:addresses(id, postal, district, street, number, unit, complement, city:cities(id, name), region:regions(id, name, code), is_filled)
        `)
        .maybeSingle();

    if(error) throw console.error("Error on getSessionID: ", error);

    return data;
}

const createNewSession = async (ip_address, useragent, headers, query, detection, ttclid) => {
    const { os, browser, cpu, device } = UAParser(useragent);

    const { data, error} = await supabase
        .from("sessions")
        .insert({
            ip_address: ip_address,
            useragent: useragent,
            headers: headers,
            query: query,
            detection: detection,
            ttclid: ttclid,
            browser_name: browser?.name,
            browser_version: browser?.version,
            os_name: os?.name,
            os_version: os?.version,
            device_model: device?.model,
            device_vendor: device?.vendor,
            captcha_solved: false
        })
        .select()
        .maybeSingle();

    if(error) throw console.error("Error on createNewSession: ", error);
    return data;
}

const updateSessionTTCLID = async (session_id, ttclid) => {
    if(!session_id || !ttclid) return;

    const { data, error } = await supabase
        .from("sessions")
        .update({ ttclid })
        .eq("id", session_id)
        .select()
        .single();

    if(error) throw console.error("Error on updateSessionTTCLID: ", error);
    return data;
}

export const handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    const ip_address = event.getClientAddress?.() || event.request.headers.get("x-forwarded-for")?.split(",")[0] || null;
    const useragent = event.request.headers.get("user-agent");
    const headers = Object.fromEntries(event.request.headers.entries());
    const query = Object.fromEntries(event.url.searchParams.entries());
    const detection = await categorizeRequest(useragent, headers);
    const ttclid = event.url.searchParams.get('ttclid');

    if(/vercel-(screenshot|favicon)\/([0-9]+)/.test(useragent)) return new Response("OK");

    let session = await getSessionByID(event.cookies.get("session"));
    if(!session){
        session = await createNewSession(ip_address, useragent, headers, query, detection, ttclid);
        event.cookies.set("session", session.id, {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365
        });
    }
    else{
        if(ttclid && ttclid != session.ttclid){
            session = await updateSessionTTCLID(session?.id, ttclid);
        }
    }

    if(!session.captcha_solved){
        if(!pathname.startsWith("/api/") && !pathname.startsWith("/captcha")){
            throw redirect(302, `/captcha?href=${event.url.href}`);
        }
    }

    event.locals.session = session;
    return resolve(event);
}