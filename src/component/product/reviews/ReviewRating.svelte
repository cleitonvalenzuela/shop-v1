<script>
    let { rating=5, size=11, gap=3 } = $props();

    const getStars = (rating) => {
        const stars = [];

        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;

        for (let i = 0; i < full; i++) stars.push("full");
        if (half) stars.push("half");
        for (let i = 0; i < empty; i++) stars.push("empty");

        return stars;
    }
</script>

<div class="flex items-center" style={`gap: ${gap}px;`}>
    {#each getStars(rating) as star}
        {#if star == "full"}
            <svg style={`width: ${size}px;`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
        {:else if star == "half"}
            <svg style={`width: ${size}px;`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#eeeeee" d="M22 0c1.125 0 2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5V0Z"/>
                <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3v35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
        {:else}
            <svg style={`width: ${size}px;`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#eeeeee" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
            </svg>
        {/if}
    {/each}
</div>