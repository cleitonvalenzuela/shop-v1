export const load = async ({ url }) => {
    const href = url.searchParams.get("href");
    return { href }
}