<script>
    import { formatPrice } from "$lib/formating";

    let { product, method, price, updateMethod=()=>{} } = $props();
</script>

<button type="button" class={`flex w-full justify-between gap-[8px] disabled:opacity-40`} onclick={() => updateMethod("pix")}  disabled={product?.pix_method == "enabled" ? false : true}>
    <div class="flex justify-center items-center w-[32px] h-[20px] shrink-0 rounded-[2px] bg-[#F1F1F1]">
        <svg class="h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 297 297">
            <path fill="#32BCAD" d="M144.4 169.745c3.124-3.124 8.571-3.133 11.697 0l44.511 44.513c8.234 8.229 19.185 12.763 30.827 12.763h5.36l-56.534 56.535c-17.607 17.606-46.154 17.606-63.759 0l-56.374-56.373H68.9c11.642 0 22.595-4.534 30.829-12.763l44.671-44.675ZM47.504 82.201c.718.271 1.48.463 2.295.463h19.1c8.03 0 15.891 3.256 21.566 8.936l44.679 44.677c4.164 4.161 9.632 6.244 15.105 6.244a21.313 21.313 0 0 0 15.108-6.249l44.508-44.51c5.675-5.677 13.538-8.936 21.569-8.936h15.531c.86 0 1.677-.188 2.428-.49l34.165 34.165c17.604 17.606 17.603 46.15 0 63.757l-34.165 34.164a6.464 6.464 0 0 0-2.428-.489h-15.531c-8.031 0-15.894-3.258-21.569-8.936l-44.508-44.507c-8.066-8.074-22.143-8.071-30.217-.004L90.465 205.16c-5.675 5.678-13.535 8.935-21.566 8.935H49.8c-.814 0-1.575.192-2.295.462l-34.3-34.297c-17.607-17.607-17.607-46.153 0-63.759l34.299-34.3Zm68.995-68.996c17.605-17.607 46.151-17.607 63.759 0l56.533 56.534h-5.36c-11.643 0-22.594 4.533-30.827 12.763l-44.512 44.515c-3.226 3.234-8.476 3.222-11.694.004L99.725 82.34C91.49 74.11 80.54 69.577 68.898 69.577h-8.771l56.372-56.372Z"/>
        </svg>
    </div>
    <div class="flex flex-col w-full mt-[2px]">
        <div class="flex justify-between items-start">
            <span class="text-black text-[14.4px] leading-none mt-[2px]">Pix</span>
            <div class="flex size-[20px] justify-center items-center">
                <div class={`flex size-[16px] rounded-full ${method === "pix" ? "border-[5px] border-[#FE2C55]" : "border-[1.8px] border-[#D4D4D4]"}`}></div>
            </div>
        </div>
        {#if product?.pix_discount > 0}
            <div class="flex w-full pt-[5px] pb-[3px]">
                <div class="flex justify-center items-center gap-[3px] px-[6px] py-[5px] mb-[2px] rounded-[3px] bg-[#FFE5EA]">
                    <span class="text-[#E10544] text-[10.6px] font-medium leading-[10.6px]">Desconto de {product?.pix_discount < 1 ? `${product?.pix_discount * 100}%` : `R$ ${formatPrice(product?.pix_discount)}`}</span>
                </div>
            </div>
        {/if}
        {#if method === "pix"}
            <span class="text-[#73747B] text-[11px] text-start leading-[14px] mt-[3px] pe-[32px]">Pague em até 24 horas e obtenha confirmação instantânea.</span>
        {/if}
    </div>
</button>