import supabase from '$lib/supabase.js';
import { json } from '@sveltejs/kit';
import { createEvent } from '../../../lib/events.server';

const validateCaptchaBySession = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("sessions")
        .update({ captcha_solved: true })
        .eq("id", id);

    if(error) throw console.error("Error on validateCaptchaBySession:", error);
    return true;
}

export const POST = async ({ request, locals }) => {
    const validate = await validateCaptchaBySession(locals?.session?.id);
    if(validate){
        return json({
            success: true
        });
    }
    else{
        return json({
            success: false
        })
    }
}