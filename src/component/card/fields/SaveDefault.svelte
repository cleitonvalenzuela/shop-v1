<script>
    let { enabled=$bindable(false) } = $props();

    const toggleSwitch = () => {
        enabled = !enabled;
    }
</script>

<button type="button" class="flex gap-[5px]" aria-label="Salvar" onclick={toggleSwitch}>
    <div class="flex size-[20px] justify-center items-center">
        <div class={`flex justify-center items-center size-[16px] rounded-full ${enabled ? "bg-[#FE2C55]" : "border-[1.8px] border-[#D4D4D4]"}`}>
            <svg class={`w-[8.4px] ${enabled ? "opacity-100" : "opacity-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 12">
                <path fill="#FFF" d="m0 6.5 2-2L5 8l6-8 2 1.5L5 12 0 6.5Z"/>
            </svg>
        </div>
    </div>
    <span class="text-black text-[14px] font-medium text-start">Salvar este cartão para compras futuras</span>
</button>