<script>
    import { formatPrice } from "$lib/formating";

    let { coupon, version="compact", applyCoupon=()=> {}, redeemCoupon=()=>{} } = $props();

    const getPromotionTitle = (coupon) => {
        if(coupon.category == "shipping"){
            return "Cupom de envio";
        }
        else{
            if(coupon.type == "variable"){
                return `${Math.floor(coupon.discount * 100)}% OFF`;
            }
            else{
                return `Desconto de R$ ${formatPrice(coupon.discount)}`;
            }
        }
    }

    const getPromotionDescription = (coupon, version) => {
        if(coupon.category == "shipping"){
            if(coupon.minimum){
                return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount)}`} no frete em pedidos acima de R$ ${formatPrice(coupon.minimum)}`;
            }
            else{
                return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount)}`} no frete`;
            }
        }
        else{
            if(coupon.minimum && coupon.limit){
                if(version == "compact"){
                    return `nos pedidos acima de R$ ${formatPrice(coupon.minimum)}`;
                }
                else{
                    return `nos pedidos acima de R$ ${formatPrice(coupon.minimum)}, máximo de R$ ${formatPrice(coupon.limit)}`;
                }
            }
            else if(coupon.minimum){
                return `nos pedidos acima de R$ ${formatPrice(coupon.minimum)}`;
            }
            else{
                return "Sem gasto mínimo";
            }
        }
    }
</script>

{#if version == "compact"}
    <li class={`flex justify-between items-center w-[288px] h-[60px] gap-[11px] border-[1px] rounded-[8px] px-[12px] relative ${coupon.category == 'shipping' ? 'bg-[#F0FBFB] border-[#C6F0F0]' : 'bg-[#FFF9FA] border-[#fce1e6]'}`}>
        <svg class="w-[6px] absolute -left-[2px] top-[25px] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M2.455.5C7.727.5 12 4.977 12 10.5s-4.273 10-9.545 10A9.148 9.148 0 0 1 0 20.164V.835A9.15 9.15 0 0 1 2.455.5Z"/>
            <path fill={coupon.category == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M2 0c3.512 0 6.224 1.293 8.05 3.295 1.813 1.986 2.7 4.61 2.7 7.205 0 2.595-.887 5.22-2.7 7.205C8.225 19.707 5.513 21 2 21v-2c2.988 0 5.15-1.082 6.574-2.643 1.438-1.576 2.176-3.702 2.176-5.857 0-2.155-.738-4.28-2.176-5.857C7.151 3.083 4.988 2 2 2V0Z"/>
        </svg>
        <div class="flex w-full flex-col justify-center">
            <span class="w-full text-start text-black text-[14px] font-semibold whitespace-nowrap leading-[19px]">{getPromotionTitle(coupon, version)}</span>
            <span class="w-full text-start text-[#706D6E] text-[11px] leading-[15px]">{getPromotionDescription(coupon, version)}</span>
        </div>
        {#if coupon.is_redeemed}
            <button type="button" class={`text-[11px] font-bold w-[86px] h-[24px] border-[1px] active:opacity-80 rounded-sm leading-none ${coupon.category == 'shipping' ? 'text-[#13C2C2] border-[#13C2C2]' : 'text-[#FE2C55] border-[#FE2C55]'}`} onclick={e => { e.stopPropagation(); applyCoupon(coupon.id); }}>Usar</button>
        {:else}
            <button type="button" class={`text-white text-[11px] font-bold w-[86px] h-[24px] active:opacity-80 rounded-sm leading-none ${coupon.category == 'shipping' ? 'bg-[#13C2C2]' : 'bg-[#FE2C55]'}`} onclick={e => { e.stopPropagation(); redeemCoupon(coupon.id); }}>Resgatar</button>
        {/if}
        <svg class="w-[6px] absolute -right-[2px] top-[25px] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M10.295 20.5C5.023 20.5.75 16.023.75 10.5S5.023.5 10.295.5c.849 0 1.671.118 2.455.336v19.329a9.147 9.147 0 0 1-2.455.335Z"/>
            <path fill={coupon.category == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M10.75 21c-3.512 0-6.224-1.293-8.05-3.295C.886 15.72 0 13.095 0 10.5c0-2.595.887-5.22 2.7-7.205C4.525 1.293 7.237 0 10.75 0v2C7.762 2 5.6 3.082 4.176 4.643 2.738 6.219 2 8.345 2 10.5c0 2.155.738 4.28 2.176 5.857C5.599 17.917 7.762 19 10.75 19v2Z"/>
        </svg>
    </li>
{:else}
    <li class={`flex flex-col w-full p-[12px] border-[1px] rounded-lg relative ${coupon.category == 'shipping' ? 'bg-[#F0FBFB] border-[#C6F0F0]' : 'bg-[#FFF9FA] border-[#fce1e6]'}`}>
        <svg class="w-[6px] absolute -left-[2px] bottom-[30px] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M2.455.5C7.727.5 12 4.977 12 10.5s-4.273 10-9.545 10A9.148 9.148 0 0 1 0 20.164V.835A9.15 9.15 0 0 1 2.455.5Z"/>
            <path fill={coupon.category == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M2 0c3.512 0 6.224 1.293 8.05 3.295 1.813 1.986 2.7 4.61 2.7 7.205 0 2.595-.887 5.22-2.7 7.205C8.225 19.707 5.513 21 2 21v-2c2.988 0 5.15-1.082 6.574-2.643 1.438-1.576 2.176-3.702 2.176-5.857 0-2.155-.738-4.28-2.176-5.857C7.151 3.083 4.988 2 2 2V0Z"/>
        </svg>
        <div class="flex items-center gap-[5px]">
            <span class={`text-[10px] font-medium leading-none px-[3px] pt-[2px] pb-[2px] rounded-[3px] ${coupon.category == "shipping" ? "bg-[#DEF6F6] text-[#007B7B]" : "bg-[#FFE6EB] text-[#E10543]"}`}>Do {coupon.origin}</span>
        </div>
        <div class="flex flex-col">
            <div class={`flex justify-between items-start gap-[16px] border-b-[1px] pb-[12px] mt-[8px] border-dashed ${coupon.category == 'shipping' ? "border-[#b1ebeb]" : "border-[#fce1e6]"}`}>
                <div class="flex w-full flex-col">
                    <span class="text-black text-[18px] font-bold leading-none mt-[4px]">{getPromotionTitle(coupon, version)}</span>
                    <span class="text-black text-[14px] leading-[18px] mt-[8px]">{getPromotionDescription(coupon, version)}</span>
                    <span class="text-[#666] text-[11px] leading-none mt-[12px]">Válido por 1 dia após a reinvidicação</span>
                </div>
                <div class="flex">
                    {#if coupon.is_redeemed}
                        <button type="button" class={`text-[11px] font-bold w-[64px] h-[26px] border-[1px] active:opacity-80 rounded-sm leading-none ${coupon.category == 'shipping' ? 'text-[#13C2C2] border-[#13C2C2]' : 'text-[#FE2C55] border-[#FE2C55]'}`} onclick={e => { e.stopPropagation(); applyCoupon(coupon.id); }}>Usar</button>
                    {:else}
                        <button type="button" class={`text-white text-[11px] font-bold w-[64px] h-[26px] active:opacity-80 rounded-sm leading-none ${coupon.category == 'shipping' ? 'bg-[#13C2C2]' : 'bg-[#FE2C55]'}`} onclick={e => { e.stopPropagation(); redeemCoupon(coupon.id); }}>Resgatar</button>
                    {/if}
                </div>
            </div>
            <span class="text-[#666] text-[11px] mt-[11px] leading-none">em produtos elegíveis <b class="text-[#2B5DB9]">Termos aplicáveis</b></span>
        </div>
        <svg class="w-[6px] absolute -right-[2px] bottom-[30px] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M10.295 20.5C5.023 20.5.75 16.023.75 10.5S5.023.5 10.295.5c.849 0 1.671.118 2.455.336v19.329a9.147 9.147 0 0 1-2.455.335Z"/>
            <path fill={coupon.category == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M10.75 21c-3.512 0-6.224-1.293-8.05-3.295C.886 15.72 0 13.095 0 10.5c0-2.595.887-5.22 2.7-7.205C4.525 1.293 7.237 0 10.75 0v2C7.762 2 5.6 3.082 4.176 4.643 2.738 6.219 2 8.345 2 10.5c0 2.155.738 4.28 2.176 5.857C5.599 17.917 7.762 19 10.75 19v2Z"/>
        </svg>
    </li>
{/if}