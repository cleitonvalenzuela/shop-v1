<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    let { video={} } = $props();
</script>

<li class="flex w-[120px] h-[160px] bg-[#F6F6F6] rounded-[8px] relative overflow-hidden bg-cover bg-center" style={video?.image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${video.image?.source}');`}>
    <div class="absolute top-[8px] left-[8px]">
        <svg class="w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="30" fill="#000" fill-opacity=".25"/>
            <path fill="#fff" stroke="#fff" d="M21.257 16.76c1.026-.431 2.36-.333 3.486.343 1.255.754 5.387 3.132 9.508 5.505 4.128 2.377 8.247 4.749 9.492 5.495 1.172.704 1.771 1.579 1.82 2.414.049.818-.422 1.796-1.84 2.742-2.981 1.987-15.451 8.971-18.971 10.982-1.614.923-2.912.772-3.793.201-.909-.588-1.459-1.673-1.459-2.767v-22c0-1.555.76-2.495 1.757-2.914Z"/>
        </svg>
    </div>
    <div class="flex w-full items-center gap-[3px] absolute bottom-[8px] left-[8px] overflow-hidden pe-[12px]">
        <div class="block size-[16px] rounded-full overflow-hidden bg-[#eae8e8] bg-cover bg-center" style={video.customer?.image && `background-image: url('/customers/${video.customer?.image}')`}></div>
        <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-white text-[11px] font-medium leading-none text-shadow-md">{video.customer?.fullname}</span>
    </div>
</li>