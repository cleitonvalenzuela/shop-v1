import { error, json } from '@sveltejs/kit';
import { createEvent } from '$lib/events.server';

export const POST = async ({ request, locals, cookies }) => {
    const { name, data } = await request.json();

    // Pega os dados da sessão.
    let session = locals?.session;

    // Cria o novo evento.
    const event = await createEvent(session?.id, name, data);

    // Retornar os dados.
    return json({ event });
}