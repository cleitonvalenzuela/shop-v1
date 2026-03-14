<script>
    import { onMount } from "svelte";
    import { maskWords } from "$lib/formating";

    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import ImageItem from "$component/image/ImageItem.svelte";
    import ReviewRating from "$component/product/reviews/ReviewRating.svelte";

    let { session } = $props();

    let container = $state(null);
    let open = $state(false);
    let dragging = $state(false);

    let index = $state(0);
    let images = $state([]);
    let reviews = $state([]);

    let image = $derived(images[index]);
    let review = $derived(reviews?.find(item => item.id == image?.review_id));

    let likeReview = $state(null);

    let start_x = $state(0);
    let prevent_x = $state(0);
    let translate_x = $state(0);
    let delta_x = $state(0);

    let window_width = $state(0);
    let container_width = $state(0);

    /* ---------- touch handlers ---------- */

    const onMove = (event, position) => {
        if(event == "start"){
            dragging = true;
            start_x = position;
            prevent_x = translate_x;
            delta_x = 0;
        }
        else if(event == "move"){
            delta_x = position - start_x;
            translate_x = Math.min(0, Math.max((container_width - window_width) * -1, prevent_x + delta_x));
            index = Math.floor(((translate_x * -1) - (window_width / 2)) / window_width) + 1;
        }
        else {
            dragging = false;

            if(delta_x < -30 && index < (images?.length - 1)){
                index++;
                translate_x = index * window_width * -1;
            }
            else if(delta_x > 30 && index > 0){
                index--;
                translate_x = index * window_width * -1;
            }
            else{
                translate_x = (Math.floor((translate_x - (window_width / 2)) / window_width) + 1) * window_width;
                index = Math.floor(((translate_x * -1) - (window_width / 2)) / window_width) + 1;
            }
        }
    }

    /* ---------- API ---------- */

    export const openViewer = (params={}) => {
        index = params?.index;
        images = params?.images;
        reviews = params?.reviews;
        likeReview = params?.likeReview;

        dragging = true;
        translate_x = (index * window_width) * -1;

        setTimeout(() => {
            dragging = false;
        }, 300);

        open = true;
    }
    export const closeViewer = () => {
        open = false;
    }
</script>

<svelte:window bind:innerWidth={window_width} />

<div class={`flex w-full h-full fixed top-0 left-0 z-50 bg-black transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
    <button class="fixed size-[48px] flex justify-center items-center z-50" type="button" title="Fechar" onclick={closeViewer}>
        <svg class="min-w-4 max-w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 47 46">
            <path fill="#FFF" d="M46.077 4.053 27.091 22.89l18.986 18.84-4.022 4.052-19.017-18.87-19.017 18.87L0 41.73l18.984-18.84L0 4.054 4.021 0l19.017 18.87L42.055 0l4.022 4.053Z"/>
        </svg>
    </button>
    <span class="text-white z-50 text-[15px] font-bold fixed top-[18px] right-[18px] text-shadow-2xs">{index+1}/{images?.length}</span>
    {#if review}
        <div class={`flex flex-col w-full fixed ${session?.os?.name == "iOS" ? "bottom-[42px]" : "bottom-[10px]"} left-0 px-[12px] z-50`}>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-[8px] pointer-events-none">
                    <div class="block size-[23px] bg-cover bg-center rounded-full" style={review?.customer?.image && `background-image: url('/customers/${review?.customer?.image}')`}></div>
                    <span class="text-white text-[13px] font-semibold text-shadow-md">{maskWords(review?.customer?.fullname)}</span>
                    <ReviewRating rating={review?.rating}/>
                </div>
                <div class="flex justify-center items-center">
                    <button type="button" class="flex justify-center items-center gap-[6px] h-[34px] px-[4px]" onclick={() => likeReview(review?.id)}>
                        <svg class="w-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 54">
                            {#if review?.is_liked}
                                <path fill="#FFF" d="M31.092 2.096c5-5.5 11.486 1 9 6l-4 11h11c4.986 0 8.986 4.5 7.5 10l-3.5 16c-1.514 6-6.606 7.5-10.092 7.5H24.078s-11 0-11-18.5c.5-17 3-16.5 8.5-22.5 5.477-5.975 9.48-9.47 9.514-9.5Zm-19.61 17c-3.904 13-2.419 25 2 30h-4.42c-11.488 0-9.986-30 .002-30h2.417Z"/>
                            {:else}
                                <path fill="#FFF" d="M33.247.09a7.152 7.152 0 0 1 5.059 1.074c2.687 1.76 4.215 5.449 2.554 8.772l-2.989 5.977-.005.008c-.252.513-.5.986-.72 1.403-.092.176-.176.34-.256.491.075.001.153.003.233.003h9c2.625 0 5.623.722 7.603 3.08 2.04 2.429 2.426 5.892 1.313 10.064-.997 3.739-1.244 4.727-1.49 5.711-.254 1.016-.507 2.03-1.51 5.789-1.005 3.768-2.145 6.668-4.167 8.514-2.157 1.97-4.85 2.342-7.749 2.342-2.808 0-6.354-.127-9.173-.253a414.426 414.426 0 0 1-4.591-.231l-.283-.016-.074-.004-.018-.002h-.03l-.022-.003c-3.57-.274-6.676-1.253-9.047-3.07a11.75 11.75 0 0 1-.516-.421H9.623c-3.68 0-6.086-2.733-7.45-5.552C.772 40.87.071 37.177.005 33.614c-.066-3.557.495-7.282 1.88-10.222 1.39-2.947 3.89-5.574 7.74-5.574h5.002a17.958 17.958 0 0 1 2.076-3.102l.038-.044.04-.043.005-.005.012-.014.048-.053.186-.202.705-.76c.605-.653 1.469-1.58 2.506-2.68 2.07-2.196 4.839-5.09 7.613-7.865 1.67-1.67 3.507-2.668 5.391-2.96Zm2.319 5.256a2.158 2.158 0 0 0-1.551-.316c-.631.098-1.543.475-2.623 1.556a381.858 381.858 0 0 0-7.512 7.76 458.79 458.79 0 0 0-2.478 2.649l-.693.749-.181.197-.01.01c-1.93 2.33-5.36 8.067-3.046 23.496.285 1.9 1.126 3.304 2.455 4.323 1.375 1.054 3.448 1.823 6.366 2.051h.001l.07.005.276.016 1.03.056c.877.047 2.105.11 3.502.172 2.805.125 6.26.248 8.951.248 2.6 0 3.66-.379 4.377-1.034.854-.78 1.713-2.38 2.708-6.11.998-3.74 1.244-4.728 1.49-5.712.254-1.016.508-2.03 1.51-5.789.888-3.326.274-4.862-.311-5.56-.645-.767-1.898-1.295-3.774-1.295h-9c-1.306 0-2.59-.09-3.606-.506-.559-.228-1.195-.617-1.666-1.29a3.428 3.428 0 0 1-.605-2.098c.036-1.073.54-2.109.86-2.748.19-.379.41-.792.62-1.188.216-.409.435-.828.654-1.274l.004-.007.004-.007v-.002l.003-.004L36.388 7.7c.338-.677.116-1.739-.822-2.354ZM9.624 22.818c-1.143 0-2.264.685-3.216 2.706-.957 2.03-1.46 4.93-1.403 7.997.057 3.062.667 5.995 1.67 8.068 1.039 2.149 2.13 2.729 2.948 2.729h3.41a12.813 12.813 0 0 1-.505-2.13c-1.319-8.789-.92-14.962.205-19.37H9.624Z"/>
                            {/if}
                        </svg>
                        {#if review?.likes > 0 || review?.is_liked}
                            <span class="w-[16px] text-[#FFF] text-[13px] font-medium leading-none">{review?.is_liked ? review?.likes+1 : review?.likes}</span>
                        {/if}
                    </button>
                </div>
            </div>
            <span class="w-full text-[#c2c2c2] text-[13px] text-start text-shadow-md pointer-events-none">Item: {review?.item}</span>
            <p class="text-white text-start text-[14px] leading-[19px] mt-[6px] text-shadow-md pointer-events-none">{@html review?.content}</p>
        </div>
    {/if}
    <div bind:this={container} bind:clientWidth={container_width} class={`flex h-full will-change-transform transition-transform ease-in-out z-40 ${dragging == false ? "duration-300" : "duration-0"}`} style={`transform: translateX(${translate_x}px);`}>
        {#each images as image, index}
            <ImageItem source={image?.source} {onMove}/>
        {/each}
    </div>
</div>