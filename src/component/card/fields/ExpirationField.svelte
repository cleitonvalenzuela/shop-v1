<script>
    import { maskCardExpiration } from "$lib/formating";
    import { validateCardExpiration, validateCardExpirationMonth, validateCardExpirationYear } from "$lib/validation";

    let { value=$bindable(""), error, next } = $props();

    let focused = $state(false);
    let input = $state(null);

    const handleInput = (e) => {
        error = null;
        value = maskCardExpiration(e.target.value);
        if(validate()) next?.focus();
    }
    const handleFocus = (e) => {
        focused = true;
        error = null;
    }
    const handleDown = (e) => {
        if(e.key === "Enter") next?.focus();
    }
    const handleBlur = (e) => {
        focused = false;
        value = value.trim();
        validate(true);
    }

    export const validate = (show=false) => {
        if(value == ""){
            if(show) error = "Data de val. é obrigatório";
            return false;
        }
        else if(!validateCardExpirationMonth(value)){
            if(show) error = "Mês deve ser um número entre 01 e 12";
            return false;
        }
        else if(!validateCardExpirationYear(value)){
            if(show) error = "Ano está muito longe";
            return false;
        }
        else if(!validateCardExpiration(value)){
            if(show) error = "Cartão expirado";
            return false;
        }
        return true;
    }
    export const focus = () => {
        input?.focus();
    }
    export const clear = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        
        value = "";
        error = null;
    }
    export { value };
</script>

<div class="flex flex-col w-full">
    <span class="text-black text-[15px] font-semibold leading-none">Data de validade</span>
    <div class={`flex w-full px-[16px] mt-[8px] bg-[#F2F2F2] rounded-[10px] ${error && "shadow-input-error shake"} relative`}>
        <input bind:this={input} class="flex w-full h-[48px] text-[16px] outline-none placeholder:text-[#BCBCBE] caret-[#FE2C55] text-black" placeholder="MM/AA" bind:value={value} oninput={handleInput} onfocus={handleFocus} onblur={handleBlur} onkeydown={handleDown} enterkeyhint="done" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" inputmode="numeric" name="expiration" maxlength="5"/>
        {#if value !== "" && focused}
            <button class="flex items-center justify-center size-[48px] absolute top-0 right-0" type="button" aria-label="Limpar" ontouchstart={clear}>
                <svg class="w-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#CCCCCC" d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0Zm8.556 13.586a2 2 0 0 0-2.829 0l-5.656 5.657-5.657-5.655a2 2 0 0 0-2.828 2.828l5.657 5.656-5.655 5.659a2 2 0 1 0 2.828 2.827l5.656-5.658 5.659 5.657a2 2 0 0 0 2.828-2.83L24.9 22.072l5.657-5.657a2 2 0 0 0-.001-2.828Z"/>
                </svg>
            </button>
        {/if}
    </div>
    {#if error}
        <div class="flex pt-[5px] pb-[3px] items-center gap-[6px]">
            <svg class="w-[12px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 33">
                <path fill="#DA3123" d="M12.5 2.25c1.503-3 6.503-3 8 0 1.497 3 10.5 19.5 12 22s-1.5 8-4.5 8H5c-4 0-6.003-5-4.5-8 1.503-3 10.496-19 12-22Zm4 20.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM15.496 9.25a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2Z"/>
            </svg>
            <span class="text-[13px] text-[#DA3123] font-medium mt-[2px] leading-[15px]">{error}</span>
        </div>
    {/if}
</div>