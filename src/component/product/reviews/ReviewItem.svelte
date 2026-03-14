<script>
    import { maskWords } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import ReviewRating from "$component/product/reviews/ReviewRating.svelte";

    let { review, updatePage=()=>{} } = $props();
</script>

<button type="button" class="flex flex-col w-full" onclick={() => updatePage("reviews", {review})}>
    <div class="flex items-center gap-[8px]">
        <div class="block size-[23px] bg-cover bg-center rounded-full" style={review.customer?.image && `background-image: url('/customers/${review.customer?.image}')`}></div>
        <span class="text-black text-[13px] font-semibold">{maskWords(review.customer?.fullname)}</span>
    </div>
    <div class="mt-[7px]">
        <ReviewRating rating={review.rating}/>
    </div>
    <span class="w-full text-start text-[#666] text-[13px] mt-[6px]">Item: {review.item}</span>
    <p class="text-black text-start text-[14.6px] leading-[18px] mt-[6px]">{@html review.content}</p>
    {#if review.images?.length > 0}
        <div class="flex w-full gap-[9px] mt-[8px] relative mb-[3px]">
            {#each review.images as image, index}
                {#if index <= 3}
                    <div class="pb-[25%] relative overflow-hidden rounded-md bg-center bg-cover" style={`min-width: calc(25% - 6.5px); max-width: calc(25% - 6.5px); ${image.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image.source}')`}`}>
                        {#if index == 3 && review.images.length > 4}
                            <div class="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-[#0000003e]">
                                <span class="text-white text-[16px] font-semibold">+{review.images.length - 4}</span>
                            </div>
                        {/if}
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</button>