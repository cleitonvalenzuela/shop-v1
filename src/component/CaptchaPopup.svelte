<script>
    import { onMount } from "svelte";

    let { onResolve=()=>{}, tolerance=0.03 } = $props();

    let handle = $state(null);
    let track = $state(null);
    let canvas = $state(null);

    let open = $state(true);
    let image = $state("");
    let piece = $state({});
    let top = $state(0);
    let target = $state(0);
    let left = $state(0);
    let start = $state(0);

    let dragging = $state(false);
    let failed = $state(false);
    let solved = $state(false);
    let loading = $state(true);
    let processing = $state(false);
    let animated = $state(false);

    const getRandomImage = () => {
        const random_int = Math.floor(Math.random() * 15) + 1;
        return `/images/captcha/image-${random_int}.webp`;
    }

    const getRandomPiece = () => {
        const random_int = Math.floor(Math.random() * 15) + 1;
        return {
            mask: `/images/captcha/mask-${random_int}.svg`,
            white: `/images/captcha/white-overlay-${random_int}.png`,
            black: `/images/captcha/black-overlay-${random_int}.png`
        }
    }

    const getRandomDouble = (min, max) => {
        return min + Math.random() * (max - min);
    }

    let canvas_width = $derived(canvas?.offsetWidth ?? 0);
    let canvas_height = $derived(canvas?.offsetHeight ?? 0);

    let target_px = $derived(target * (canvas_width - handle?.offsetWidth ?? 0));
    let top_px = $derived(top * (canvas_height - handle?.offsetHeight ?? 0));

    export const openPopup = () => {
        document.body.classList.add("no-scroll");
        open = true;
    }
    export const closePopup = () => {
        open = false;
        document.body.classList.remove("no-scroll");
    }

    const onTouchStart = (e) => {
        e.preventDefault();

        if(processing) return;
        animated = false;
        dragging = true;
        start = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
        e.preventDefault();

        if (!dragging || solved || processing) return;
        left = Math.max(0, Math.min((track.offsetWidth - handle.offsetWidth), (e.touches[0].clientX - start)));
    };
    const onTouchEnd = async (e) => {
        e.preventDefault();

        dragging = false;
        processing = true;

        if (Math.abs(target_px - left) <= (tolerance * canvas_width)) {
            await fetch("/api/captcha", { method: "POST" });

            solved = true;
            processing = false;

            setTimeout(() => {
                onResolve(closePopup);
            }, 1000);
        }
        else{
            setTimeout(() => {
                failed = true;
                processing = false;

                setTimeout(() => {
                    updateCaptcha();

                    failed = false;
                    animated = true;
                    left = 0;

                    setTimeout(() => {
                        animated = false;
                    }, 300);
                }, 2000);
            }, 1500);
        }
    };

    const updateCaptcha = () => {
        loading = true;
        image = getRandomImage();
        piece = getRandomPiece();
        top = getRandomDouble(0, 0.75);
        target = getRandomDouble(0.3, 0.9);

        setTimeout(() => {
            loading = false;
        }, 1000);
    }

    onMount(() => {
        handle.addEventListener("touchstart", onTouchStart, { passive: false });
        track.addEventListener("touchmove", onTouchMove, { passive: false });
        track.addEventListener("touchend", onTouchEnd, { passive: false });

        setTimeout(() => {
            openPopup();
            updateCaptcha();
        }, 100);

        return () => {
            handle.removeEventListener("touchstart", onTouchStart);
            track.removeEventListener("touchmove", onTouchMove);
            track.removeEventListener("touchend", onTouchEnd);
        }
    });
</script>

<div class={`absolute bottom-0 left-0 w-full h-full ${open ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in-out z-20 no-selectable`}>
    <div class="flex flex-col justify-center items-center w-full h-full bg-[#00000099]">
        <div class="flex flex-col bg-white rounded-[8px] p-[19px]">
            <span class="text-[#343434] text-[16px] leading-none">Verifique para continuar:</span>
            <div class="flex flex-col relative mt-[12px]">
                <div class="w-[288px] h-[176px] bg-[#F2F2F4] rounded-[4px]" style={`background-image: url('${image}'); background-size: 100% 100%`}></div>
                <div class="w-full h-[50px] bg-[#F2F2F4] rounded-[4px] mt-[5px] relative">
                    <span class={`absolute top-[8px] left-[64px] px-[16px] text-[#909191] text-center text-[12px] leading-[16px] ${!dragging && "duration-300 transition-opacity"} ${(dragging && left >= 0) || processing || failed || solved || loading ? "opacity-0" : "opacity-100"}`}>Arraste a peça do quebra-cabeça para o lugar certo</span>
                </div>
                <div class="absolute top-0 left-0 w-full">
                    <div bind:this={canvas} class="flex w-[288px] h-[176px] relative">
                        {#if canvas_width && canvas_height && target_px && top_px}
                            <div class="absolute top-0 left-0 size-[72px] z-20" style={`background-image: url('${piece.black}'); transform: translate3d(${target_px}px, ${top_px}px, 0); background-size: 100% 100%;`}></div>
                            <div class={`absolute top-0 left-0 size-[72px] z-20 will-change-transform ${animated && "duration-300 transition-transform"}`} style={`transform: translate3d(${left}px, ${top_px}px, 0);`}>
                                <div
                                    class="size-[72px]"
                                    style={`
                                        background-image: url('${image}');
                                        background-size: ${canvas_width}px ${canvas_height}px;
                                        background-position: -${target_px}px -${top_px}px;
                                        mask-image: url('${piece.mask}');
                                        mask-repeat: no-repeat;
                                        mask-size: 100% 100%;
                                    `}
                                ></div>
                                <div class="size-[72px] bg-cover absolute top-0 left-0" style={`background-image: url('${piece.white}');`}></div>
                            </div>
                        {/if}
                        <div class={`flex justify-center items-center absolute top-0 left-0 w-full rounded-[4px] h-full z-30 bg-[#000000b2] transition-opacity duration-300 ${(processing || failed || solved) ? "opacity-100" : "opacity-0"}`}>
                            {#if processing}
                                <span class="loader-v1"></span>
                            {:else if solved}
                                <div class="flex flex-col justify-center items-center">
                                    <svg class="w-[25px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 80 80">
                                        <path fill="#fff" d="M16.799 7.416a40.002 40.002 0 0 1 51.485 4.3l-3.567 3.567a34.955 34.955 0 1 0 9.99 20.572l5.01-.598A40 40 0 1 1 16.8 7.417Zm63.2 12.084L40 59 18 36l3.5-3.5 18.5 19 36.5-36 3.5 4Z"/>
                                    </svg>
                                    <span class="max-w-[224px] text-white text-[15px] text-center leading-[19px] mt-[8px]">Verificado</span>
                                </div>
                            {:else}
                                <div class="flex flex-col justify-center items-center">
                                    <svg class="w-[25px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 80 80">
                                        <path fill="#fff" d="m40.254 36.655 14.934-14.763 3.515 3.555L43.77 40.211l14.764 14.934-3.556 3.515-14.764-14.934L25.279 58.49l-3.515-3.555L36.698 40.17 21.935 25.236l3.555-3.515 14.764 14.934Z"/>
                                        <path fill="#fff" fill-rule="evenodd" d="M40 0c22.091 0 40 17.909 40 40S62.091 80 40 80 0 62.091 0 40 17.909 0 40 0Zm0 4.568C20.432 4.568 4.568 20.432 4.568 40S20.432 75.432 40 75.432 75.432 59.568 75.432 40 59.568 4.568 40 4.568Z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="max-w-[224px] text-white text-[15px] text-center leading-[19px] mt-[8px]">A verificação falhou. Por favor tente novamente</span>
                                </div>
                            {/if}
                        </div>
                        <div class={`flex justify-center items-center absolute top-0 left-0 w-full h-full z-30 bg-[#F2F2F4] transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0"}`}>
                            <div class="flex flex-col justify-center items-center">
                                <span class="max-w-[192px] text-[#C5C3C7] text-[16px] text-center leading-[19px] mt-[8px]">Carregando...</span>
                            </div>
                        </div>
                    </div>
                    <div bind:this={track} class="flex w-full h-[50px] mt-[5px] relative z-30">
                        <div class={`flex w-full h-full z-10 rounded-[4px] overflow-hidden transition-opacity duration-300 ${((dragging && left > 0) || solved || processing || failed) ? "opacity-100" : "opacity-0"}`}>
                            <div class={`w-full ${failed ? "bg-[#FFC2C4]" : "bg-[#C9F0DF]"}`} style={`width: ${left}px`}></div>
                            <div class={`w-[64px] h-full bg-linear-to-r ${failed ? "from-[#FFC2C4]" : "from-[#C9F0DF]"} to-transparent`}></div>
                        </div>
                        <div class="flex w-full absolute top-0 left-0 z-20">
                            <div bind:this={handle} class={`p-[4px] no-selectable will-change-transform ${animated && "duration-300 transition-transform"}`} style={`transform: translateX(${left}px);`}>
                                <div class="flex items-center justify-center w-[64px] h-[42px] rounded-[4px] bg-white border-[1.28px] border-[#D8D8D9] active:border-[#b6b6b9] group">
                                    <svg class="w-[24px] fill-[#B7B7B9] group-active:fill-[#959597]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 206 178">
                                        <path d="M0 56.46a5 5 0 0 1 5-5h76.088a5 5 0 0 0 4.999-4.911l.737-41.629c.073-4.112 4.802-6.383 8.057-3.867L201.5 83.46c5 4 4.5 7.5 0 11L94.872 176.41c-3.256 2.503-7.974.23-8.046-3.876l-.74-42.162a5 5 0 0 0-5-4.913H5a5 5 0 0 1-5-5v-64Z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center mt-[16px] gap-[10px]">
                <button class="flex items-center gap-[6px]" type="button">
                    <svg class="h-[13px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 116 116">
                        <path fill="#605F64" d="M58 0c19.961 0 37.565 10.085 48 25.436V9h10v38H80V37h19.768C92.077 21.731 76.263 11.257 58 11.257c-25.816 0-46.743 20.928-46.743 46.743 0 25.816 20.928 46.743 46.743 46.743 18.312 0 34.16-10.531 41.83-25.866l11.054 2.976C101.788 101.988 81.53 116 58 116 25.968 116 0 90.032 0 58S25.968 0 58 0Z"/>
                    </svg>
                    <span class="text-[#605F64] text-[14px] font-medium leading-none">Atualizar</span>                    
                </button>
                <button class="flex items-center gap-[6px]" type="button">
                    <svg class="h-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path fill="#605F64" d="M18 10a8 8 0 1 0-16 0 8 8 0 0 0 16 0Zm-9 4V9a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm11-4c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10Zm-8.95-3.9a1 1 0 0 1-.998 1h-.1a1 1 0 0 1-1.002-1V6a1 1 0 0 1 1-1h.1a1 1 0 0 1 1 1v.1Z"/>
                    </svg>                                          
                    <span class="text-[#605F64] text-[14px] font-medium leading-none">Relatar problema</span>                    
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .loader-v1 {
        width: 29px;
        padding: 3px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #FFF;
        --_m: 
        conic-gradient(#0000 10%,#000),
        linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
        mask: var(--_m);
        -webkit-mask-composite: source-out;
        mask-composite: subtract;
        animation: l3 1s infinite linear;
    }

    @keyframes l3 {
        to {
            transform: rotate(1turn);
        }
    }
</style>