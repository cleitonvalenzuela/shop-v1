<script>
    let { enabled=$bindable(false) } = $props();

    const toggleSwitch = () => {
        enabled = !enabled;
    }
</script>

<button type="button" aria-label="Definir como padrão" class={`flex w-[45px] p-[3px] rounded-full transition-colors duration-200 ${enabled ? "bg-[#0BE09B]" : "bg-[#E0E0E0]"}`} onclick={toggleSwitch}>
    <div class={`size-[21px] rounded-full bg-white shadow-xl duration-200 ease-in-out transition-transform will-change-transform ${enabled ? "translate-x-[18px]" : "translate-0"}`}></div>
</button>