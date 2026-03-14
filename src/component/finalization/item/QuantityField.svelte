<script>
    let { quantity=1, updateQuantity=()=>{} } = $props();
</script>

<div class="flex items-center">
    <button class="flex size-[26px] justify-center items-center bg-[#F2F2F2] active:bg-[#e0e0e0] rounded-s-md" type="button" aria-label="Diminuir" onclick={() => updateQuantity(quantity-1)}>
        <svg class="w-[9px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 4">
            <path fill={quantity == 1 ? "#919191" : "#000"} d="M0 0h36v4H0z"/>
        </svg>
    </button>
    <div class="flex justify-center items-center w-[29px] h-[26px] bg-[#F2F2F2]">
        <span class="flex justify-center items-center w-full h-[14px] text-[15px] border-x-[1px] border-x-[#e0e0e0] text-black font-medium">{quantity}</span>
    </div>
    <button class="flex size-[26px] justify-center items-center bg-[#F2F2F2] active:bg-[#e0e0e0] rounded-e-[6px]" type="button" aria-label="Aumentar" onclick={() => updateQuantity(quantity+1)}>
        <svg class="w-[9px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
            <path fill={quantity == 10 ? "#919191" : "#000"} d="M20 16h16v4H20v16h-4V20H0v-4h16V0h4v16Z"/>
        </svg>
    </button>      
</div>