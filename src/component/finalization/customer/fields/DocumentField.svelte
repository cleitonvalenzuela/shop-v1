<script>
    import { formatCPF } from "$lib/formating";

    let { value=$bindable(), error, onFocus=()=>{}, onBlur=()=>{} } = $props();

    let input = $state(null);

    const onInput = (event) => {
        error = null;
        value = formatCPF(event.target.value);
    }
    const clearInput = (e) => {
        value = "";
        error = null;
    }

    export const focus = () => {
        input.focus();
    }
</script>

<div class="flex flex-col mt-[10px]">
    <div class={`flex w-full h-[40px] bg-[#F2F2F2] rounded-[6px] border-[2.56px] relative ${error ? "border-[#FF4C3A]" : "border-transparent"}`}>
        <input
            class="text-black text-[15px] px-[10px] border-none bg-transparent w-full h-full caret-[#FE2C55] outline-none"
            type="text"
            inputmode="numeric"
            placeholder="Insira o número de CPF"
            bind:this={input}
            bind:value={value}
            oninput={onInput}
            onfocus={onFocus}
            onblur={onBlur}
        />
        {#if value != ""}
            <button class="flex items-center justify-center size-[36px] absolute top-0 right-[3px]" type="button" aria-label="Limpar" ontouchstart={clearInput}>
                <svg class="w-[18px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#7E7E7E" d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0Zm8.556 13.586a2 2 0 0 0-2.829 0l-5.656 5.657-5.657-5.655a2 2 0 0 0-2.828 2.828l5.657 5.656-5.655 5.659a2 2 0 1 0 2.828 2.827l5.656-5.658 5.659 5.657a2 2 0 0 0 2.828-2.83L24.9 22.072l5.657-5.657a2 2 0 0 0-.001-2.828Z"/>
                </svg>
            </button>
        {/if}
    </div>
    <div class="flex w-full min-h-[29px]">
        {#if error}
            <div class="flex items-center mt-[5px] gap-[6px]">
                <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 33">
                    <path fill="#DA3123" d="M12.5 2.25c1.503-3 6.503-3 8 0 1.497 3 10.5 19.5 12 22s-1.5 8-4.5 8H5c-4 0-6.003-5-4.5-8 1.503-3 10.496-19 12-22Zm4 20.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM15.496 9.25a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2Z"/>
                </svg>
                <span class="text-[#DA3123] text-[12px] font-semibold leading-none">{error}</span>
            </div>
        {/if}
    </div>
</div>