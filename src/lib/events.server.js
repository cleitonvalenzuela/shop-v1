import supabase from "$lib/supabase";

export const createEvent = async (session_id, name, _data) => {
    const { data, error } = await supabase
        .from("events")
        .insert({
            session_id: session_id,
            name: name,
            data: _data
        })
        .select()
        .maybeSingle()

    if(error) throw console.error(`Error on createEvent on server side:`, error);
    return data;
}