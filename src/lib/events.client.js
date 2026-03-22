export const createEvent = async (name, data) => {
    const request = await fetch("/api/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, data })
    });

    const response = await request.json();
    if(request.status != 200) throw console.error(`Error on createEvent client side ${request.status}: ${JSON.stringify(response)}`);
    return response;
}