<script>
    import { maskWords } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import ReviewRating from "$component/product/reviews/ReviewRating.svelte";

    let { review={}, images=[], openViewer=()=>{}, likeReview=()=>{}} = $props();
</script>

<div class="flex flex-col w-full pt-[16px] pb-[3px]">
    <div class="flex items-center gap-[8px]">
        <div class="block size-[23px] bg-cover bg-center rounded-full" style={review.customer?.image && `background-image: url('/customers/${review.customer?.image}')`}></div>
        <span class="text-black text-[13px] font-semibold">{maskWords(review.customer?.fullname)}</span>
    </div>
    <div class="mt-[7px]">
        <ReviewRating rating={review.rating}/>
    </div>
    <span class="w-full text-[#666] text-[13px] text-start mt-[6px]">Item: {review.item}</span>
    <p class="text-black text-start text-[15px] leading-[19px] mt-[6px]">{@html review.content}</p>
    {#if review.images?.length > 0}
        <div class={`flex flex-wrap w-full ${review.images.length == 4 && "max-w-[50%]"} gap-[9px] mt-[10px] relative mb-[3px]`}>
            {#each review.images as image, index}
                {#if review.images.length == 1}
                    <button type="button" class="relative overflow-hidden rounded-md bg-center bg-cover bg-[#eeeeee]" style={`min-width: calc(50% - 6.5px); padding-bottom: 50%; max-width: calc(50% - 6.5px); ${image.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image.source}')`}`} onclick={() => openViewer(image.id)} aria-label="Ver imagem"></button>
                {:else if review.images.length == 2}
                    <button type="button" class="relative overflow-hidden rounded-md bg-center bg-cover bg-[#eeeeee]" style={`min-width: calc(50% - 6.5px); padding-bottom: 50%; max-width: calc(50% - 6.5px); ${image.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image.source}')`}`} onclick={() => openViewer(image.id)} aria-label="Ver imagem"></button>
                {:else if review.images.length == 3}
                    <button type="button" class="relative overflow-hidden rounded-md bg-center bg-cover bg-[#eeeeee]" style={`min-width: calc(33.4% - 6.5px); padding-bottom: 33.4%; max-width: calc(33.4% - 6.5px); ${image.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image.source}')`}`} onclick={() => openViewer(image.id)} aria-label="Ver imagem"></button>
                {:else}
                    <button type="button" class="relative overflow-hidden rounded-md bg-center bg-cover bg-[#eeeeee]" style={`min-width: calc(33.4% - 6.5px); padding-bottom: 33.4%; max-width: calc(33.4% - 6.5px); ${image.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image.source}')`}`} onclick={() => openViewer(image.id)} aria-label="Ver imagem"></button>
                {/if}
            {/each}
        </div>
    {/if}
    <div class="flex justify-between items-center py-[5px]">
        <span class="text-[#858585] text-[12px]">2025-12-10</span>
        <div class="flex items-center gap-[10px]">
            <button type="button" class="flex justify-center items-center w-[38px]" aria-label="Fechar">
                <svg class="h-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 49 11">
                    <path fill="#858585" d="M5.313 0c2.934 0 5.312 2.462 5.312 5.5S8.247 11 5.312 11C2.378 11 0 8.538 0 5.5S2.378 0 5.313 0Zm19 0c2.934 0 5.312 2.462 5.312 5.5S27.247 11 24.312 11C21.378 11 19 8.538 19 5.5S21.378 0 24.313 0Zm18.691 0c2.934 0 5.313 2.463 5.313 5.5 0 3.038-2.379 5.5-5.313 5.5-2.934 0-5.312-2.462-5.312-5.5 0-3.037 2.378-5.5 5.312-5.5Z"/>
                </svg>
            </button>
            <button type="button" class="flex justify-center items-center gap-[6px] h-[38px] px-[4px]" aria-label="Curtir" onclick={() => likeReview(review?.id)}>
                <svg class="w-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 54">
                    {#if review?.is_liked}
                        <path fill="#858585" d="M31.092 2.096c5-5.5 11.486 1 9 6l-4 11h11c4.986 0 8.986 4.5 7.5 10l-3.5 16c-1.514 6-6.606 7.5-10.092 7.5H24.078s-11 0-11-18.5c.5-17 3-16.5 8.5-22.5 5.477-5.975 9.48-9.47 9.514-9.5Zm-19.61 17c-3.904 13-2.419 25 2 30h-4.42c-11.488 0-9.986-30 .002-30h2.417Z"/>
                    {:else}
                        <path fill="#858585" d="M33.247.09a7.152 7.152 0 0 1 5.059 1.074c2.687 1.76 4.215 5.449 2.554 8.772l-2.989 5.977-.005.008c-.252.513-.5.986-.72 1.403-.092.176-.176.34-.256.491.075.001.153.003.233.003h9c2.625 0 5.623.722 7.603 3.08 2.04 2.429 2.426 5.892 1.313 10.064-.997 3.739-1.244 4.727-1.49 5.711-.254 1.016-.507 2.03-1.51 5.789-1.005 3.768-2.145 6.668-4.167 8.514-2.157 1.97-4.85 2.342-7.749 2.342-2.808 0-6.354-.127-9.173-.253a414.426 414.426 0 0 1-4.591-.231l-.283-.016-.074-.004-.018-.002h-.03l-.022-.003c-3.57-.274-6.676-1.253-9.047-3.07a11.75 11.75 0 0 1-.516-.421H9.623c-3.68 0-6.086-2.733-7.45-5.552C.772 40.87.071 37.177.005 33.614c-.066-3.557.495-7.282 1.88-10.222 1.39-2.947 3.89-5.574 7.74-5.574h5.002a17.958 17.958 0 0 1 2.076-3.102l.038-.044.04-.043.005-.005.012-.014.048-.053.186-.202.705-.76c.605-.653 1.469-1.58 2.506-2.68 2.07-2.196 4.839-5.09 7.613-7.865 1.67-1.67 3.507-2.668 5.391-2.96Zm2.319 5.256a2.158 2.158 0 0 0-1.551-.316c-.631.098-1.543.475-2.623 1.556a381.858 381.858 0 0 0-7.512 7.76 458.79 458.79 0 0 0-2.478 2.649l-.693.749-.181.197-.01.01c-1.93 2.33-5.36 8.067-3.046 23.496.285 1.9 1.126 3.304 2.455 4.323 1.375 1.054 3.448 1.823 6.366 2.051h.001l.07.005.276.016 1.03.056c.877.047 2.105.11 3.502.172 2.805.125 6.26.248 8.951.248 2.6 0 3.66-.379 4.377-1.034.854-.78 1.713-2.38 2.708-6.11.998-3.74 1.244-4.728 1.49-5.712.254-1.016.508-2.03 1.51-5.789.888-3.326.274-4.862-.311-5.56-.645-.767-1.898-1.295-3.774-1.295h-9c-1.306 0-2.59-.09-3.606-.506-.559-.228-1.195-.617-1.666-1.29a3.428 3.428 0 0 1-.605-2.098c.036-1.073.54-2.109.86-2.748.19-.379.41-.792.62-1.188.216-.409.435-.828.654-1.274l.004-.007.004-.007v-.002l.003-.004L36.388 7.7c.338-.677.116-1.739-.822-2.354ZM9.624 22.818c-1.143 0-2.264.685-3.216 2.706-.957 2.03-1.46 4.93-1.403 7.997.057 3.062.667 5.995 1.67 8.068 1.039 2.149 2.13 2.729 2.948 2.729h3.41a12.813 12.813 0 0 1-.505-2.13c-1.319-8.789-.92-14.962.205-19.37H9.624Z"/>
                    {/if}
                </svg>
                {#if review?.likes > 0 || review?.is_liked}
                    <span class="w-[16px] text-[#858585] text-[13px] font-medium leading-none">{review?.is_liked ? review?.likes+1 : review?.likes}</span>
                {/if}
            </button>
        </div>
    </div>
</div>