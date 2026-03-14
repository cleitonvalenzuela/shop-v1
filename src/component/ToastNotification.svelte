<script>
    import { onDestroy } from "svelte";

    let { message, top, bottom, center } = $props();

    let is_open = $state(false);
    let icon = $state(null);
    let timeout = $state(null);

    export const showMessage = (value=null, _icon=null) => {
        if(value) message = value;
        if(_icon) icon = _icon;

        is_open = true;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            is_open = false;
        }, 3000);
    }
    export const hideMessage = () => {
        is_open = false;
    }

    onDestroy(() => {
        clearTimeout(timeout);
    });
</script>

<div class={`flex w-full justify-center absolute left-0 right-0 mx-auto pointer-events-none duration-200 ease-in-out transition-all z-50 ${is_open ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} style={top ? `top: ${top}px;` : bottom ? `bottom: ${bottom}px;` : `height: 100dvh; align-items: center;`}>
    <div class={`flex items-center gap-[8px] bg-[#3A3A3A] ${icon == null ? "px-[16px]" : "ps-[13px] pe-[16px]"} py-[13px] rounded-[12px]`}>
        {#if icon == "checked_circle"}
            <svg class="h-[15px] mb-[1px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path fill="#F6F6F6" d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0Zm-2.5 26.5-7-6.5-3 3.5L20 34l13.5-20-4-2.5-10 15Z"/>
            </svg>
        {/if}
        <span class="text-white text-[14px] leading-none font-medium">{message}</span>
    </div>
</div>