<script>
    import { getCardInstallments } from "$lib/card";
    import { formatFullname, formatPrice } from "$lib/formating";
    import { onMount } from "svelte";

    let { total, product, card, method, price, updateMethod=()=>{}, updatePage=()=>{}, closeDrawer=()=>{} } = $props();

    let installments = $derived.by(() => {
        let installments = getCardInstallments(card?.brand, total);
        return installments?.map(item => {
            if(item.number == card?.installments){
                item.is_selected = true;
            }
            else{
                item.is_selected = false;
            }
            return item;
        });
    });
    let installment = $derived(installments?.find(item => item.is_selected));

    const GoInstallments = () => {
        updatePage("installments", { card });
        setTimeout(closeDrawer, 300);
    }
</script>

<a href="#" role="button" class={`flex w-full justify-between gap-[8px] disabled:opacity-40`} onclick={() => updateMethod("card", card)} disabled={card?.is_disabled}>
    {#if card?.brand === "mastercard"}
        <div class="flex justify-center w-[32px] h-[19px] shrink-0 rounded-[2px] bg-[#F1F1F1]">
            <svg class="h-[16px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 72 44">
                <path fill="#FF5F00" d="M45.273 39.064H25.996V4.678h19.277v34.386Z"/>
                <path fill="#EB001B" d="M27.231 21.869c0-6.976 3.29-13.19 8.414-17.193A22.04 22.04 0 0 0 22.03 0C9.863 0 0 9.79 0 21.869c0 12.077 9.863 21.868 22.03 21.868a22.04 22.04 0 0 0 13.615-4.675c-5.124-4.005-8.414-10.218-8.414-17.193Z"/>
                <path fill="#F79E1B" d="M71.27 21.869c0 12.077-9.862 21.868-22.03 21.868a22.044 22.044 0 0 1-13.616-4.675c5.125-4.005 8.416-10.218 8.416-17.193 0-6.976-3.29-13.19-8.416-17.193A22.047 22.047 0 0 1 49.241 0c12.167 0 22.03 9.79 22.03 21.869Z"/>
            </svg>
        </div>
    {:else if card?.brand === "visa"}
        <div class="flex justify-center w-[32px] h-[19px] shrink-0 rounded-[2px] bg-[#F1F1F1]">
            <svg class="w-[30px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 85 26">
                <path fill="#0E4595" d="M29.98 25.703 34.272.515h6.865l-4.295 25.188H29.98ZM61.646 1.058C60.286.548 58.155 0 55.493 0 48.709 0 43.93 3.416 43.889 8.312c-.038 3.62 3.412 5.639 6.016 6.844 2.673 1.234 3.571 2.022 3.558 3.124-.017 1.689-2.134 2.46-4.107 2.46-2.748 0-4.208-.382-6.463-1.322l-.885-.4-.963 5.638c1.603.703 4.569 1.312 7.648 1.344 7.217 0 11.902-3.377 11.955-8.606.026-2.865-1.803-5.046-5.764-6.843-2.4-1.166-3.87-1.943-3.854-3.123 0-1.047 1.244-2.167 3.932-2.167a12.682 12.682 0 0 1 5.138.965l.615.291.931-5.46ZM79.313.515h-5.305c-1.643 0-2.873.448-3.595 2.088L60.217 25.687h7.21s1.178-3.104 1.444-3.785c.788 0 7.792.01 8.793.01.206.882.835 3.775.835 3.775h6.371L79.313.515Zm-8.417 16.264c.568-1.45 2.736-7.04 2.736-7.04-.04.066.563-1.46.91-2.405l.464 2.172 1.59 7.273h-5.7ZM.088.515 0 1.039c2.714.657 5.138 1.608 7.26 2.79l6.092 21.834 7.264-.008L31.425.515h-7.273L17.43 17.692l-.716-3.491c-.033-.108-.07-.216-.107-.325L14.27 2.642C13.855 1.046 12.65.571 11.16.515H.088Z"/>
            </svg>
        </div>
    {:else if card?.brand === "elo"}
        <div class="flex justify-center w-[32px] h-[19px] shrink-0 rounded-[2px] bg-[#F1F1F1]">
            <svg class="h-[7.2px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 31">
                <path fill="#003933" d="M0 12.695h7.333C8.653 5.658 14.72 0 22.463 0 31.266 0 37.44 6.323 37.44 15.86c0 1.018-.101 1.834-.202 2.547H13.56c1.112 4.334 4.656 6.881 8.903 6.881 3.64 0 6.376-1.427 8.552-3.926l4.354 4.028c-2.89 3.314-7.19 5.61-12.906 5.61-7.743 0-13.81-5.556-15.124-12.593H0v-5.712Zm31.165 0c-.304-1.786-1.113-3.416-2.278-4.591-1.517-1.529-3.742-2.5-6.424-2.5-2.682 0-4.858.918-6.476 2.548-1.113 1.121-2.023 2.65-2.48 4.538h17.658v.005ZM41.84.204h6.375v24.473h11.538v6.12H48.317c-4.2 0-6.477-2.296-6.477-6.528V.204ZM60.961 15.5c0-8.313 6.727-15.5 15.636-15.5a15.54 15.54 0 0 1 15.38 12.695h7.333v5.712h-7.333A15.585 15.585 0 0 1 76.597 31C67.64 31 60.96 23.861 60.96 15.5Zm15.636 9.482c5.31 0 9.26-4.081 9.26-9.434 0-5.304-4.045-9.536-9.26-9.536-5.311 0-9.26 4.082-9.26 9.483 0 5.256 4.05 9.487 9.26 9.487Z"/>
            </svg>
        </div>
    {:else if card?.brand === "amex"}
        <div class="flex justify-center w-[32px] h-[19px] shrink-0 rounded-[2px] bg-[#026FCF]">
            <svg class="w-[29px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 106 37">
                <path fill="#FFF" d="m38.805 20.116 2.165 2.504 2.33-2.504h10.076c1.165 0 3.08.167 3.913 1.001v-1h8.992c.916 0 2.665.166 3.83 1v-1h13.573v1.001c.75-.668 2.166-1 3.414-1h7.576v1c.833-.584 1.999-1 3.498-1H106v12.574c0 2.782-3.831 3.785-5.33 3.785h-8.66v-1.002c-.833.668-2.332 1.002-3.746 1.002H65.448V32.72c0-.501-.082-.501-.499-.501h-.416v4.257H57.04v-4.424c-1.248.584-2.664.584-3.913.584h-.833v3.84h-9.158l-2.165-2.505-2.414 2.505h-14.74v-16.36h14.989Zm33.472 2.338V34.14h9.325v-2.42h-6.577v-2.338h6.41v-2.336h-6.41v-2.172h6.577v-2.42h-9.325Zm-45.962 0v11.685H37.39l3.58-3.84 3.414 3.84h5.412v-3.922h3.497c2.414 0 4.83-.669 4.83-3.924 0-3.172-2.5-3.84-4.664-3.84h-8.91l-3.58 3.84-3.413-3.84h-11.24Zm33.14 0v11.685h2.83v-4.257h2.998c.998 0 1.582.084 1.998.5.5.585.5 1.587.5 2.339v1.418h2.747v-2.254c0-1.085-.083-1.586-.416-2.17-.25-.335-.748-.752-1.415-1.002.749-.25 1.998-1.251 1.998-3.088 0-1.335-.5-2.086-1.416-2.586-.916-.5-1.998-.586-3.414-.586h-6.41Zm27.477 0c-2.998 0-3.998 1.835-3.998 3.505 0 3.672 3.248 3.506 5.83 3.59.498 0 .832.082.998.25.166.166.334.5.334.835 0 .333-.168.583-.334.75-.25.167-.583.25-1.082.25h-5.413v2.505h5.413c2.83 0 4.412-1.168 4.412-3.671 0-1.169-.332-1.921-.832-2.505-.667-.585-1.666-.92-3.248-.92h-1.498c-.416 0-.75-.083-1.082-.165-.334-.168-.582-.419-.582-.836s.082-.668.415-.918c.25-.166.583-.167 1.083-.167h5.162v-2.504h-5.578Zm10.907 0c-2.914 0-3.996 1.835-3.996 3.505 0 3.672 3.248 3.506 5.828 3.59.499 0 .832.082.999.25.167.166.333.5.333.835 0 .333-.167.583-.333.75-.167.167-.583.25-1.083.25h-5.411v2.505h5.41c2.832 0 4.414-1.167 4.414-3.671 0-1.169-.333-1.921-.832-2.505-.666-.585-1.666-.92-3.248-.92h-1.498c-.416 0-.75-.082-1.083-.165-.333-.168-.582-.419-.582-.836s.165-.668.415-.918c.25-.166.584-.167 1.083-.167h5.162v-2.504h-5.578ZM47.047 33.138l-4.33-4.843 4.33-4.59v9.433Zm-10.99-8.265 3.08 3.423-3.163 3.423h-6.911v-2.338h6.16v-2.336h-6.16v-2.172h6.994Zm17.402 0c1 0 1.665.418 1.665 1.419 0 1.002-.666 1.586-1.665 1.586h-3.663v-3.005h3.663Zm12.24 0c.499 0 .999 0 1.331.25.334.168.583.501.583 1.002s-.249.92-.583 1.17c-.415.166-.832.166-1.332.166l-3.413.084v-2.672h3.413ZM14.656 0l1 1.92V0h8.493l1.915 4.173L27.896 0h27.062c1.248 0 2.33.25 3.164.918V0h7.41v.918C66.78.25 68.362 0 70.194 0h10.742l.999 1.92V0h7.91l1.166 1.92V0h7.743v16.36h-7.826l-1.498-2.504v2.504h-9.743l-1.082-2.67h-2.416l-1.082 2.67h-5.079c-1.998 0-3.498-.501-4.496-1.002v1.002H53.46v-3.756c0-.501-.083-.584-.416-.584h-.416v4.34H29.312v-2.087l-.832 2.086h-4.913l-.832-2.003v2.003h-9.409l-.999-2.67H9.912l-1.082 2.67L0 16.36 7.414 0h7.243Zm21.567 2.337v11.686h9.325v-2.42h-6.495V9.264h6.412v-2.42h-6.412V4.758h6.495V2.337h-9.325Zm-27.144 0L4.084 14.023h2.997l1.082-2.588h5.828l1.083 2.588h5.662V4.84l4.08 9.181h2.415l4.08-9.181v9.181h2.83V2.338h-4.578l-3.415 7.93-3.664-7.93h-4.496v11.018l-4.746-11.02H9.08Zm38.467 0v11.686h2.748V9.766h2.997c1 0 1.666.083 2.082.5.5.585.416 1.587.416 2.255v1.502h2.83v-2.338c0-1-.083-1.502-.499-2.086-.25-.334-.75-.752-1.332-1.002.748-.334 1.999-1.252 2-3.088 0-1.336-.584-2.087-1.5-2.671-.916-.501-1.915-.501-3.33-.501h-6.412Zm12.824 0v11.686h2.83V2.337h-2.83Zm9.99 0c-1.915 0-3.414.416-4.247 1.335-1.248 1.252-1.498 2.838-1.498 4.59 0 2.088.5 3.423 1.416 4.425.999 1.002 2.747 1.336 4.08 1.336h3.247l1.082-2.588h5.828l1.084 2.588h5.66V5.258l5.247 8.765h3.996V2.337h-2.831v8.097l-4.912-8.097h-4.33v11.018L79.519 2.337h-4.163l-3.996 9.182h-1.25c-.748 0-1.498-.168-1.914-.584-.5-.585-.75-1.504-.75-2.755 0-1.252.25-2.17.75-2.671.583-.501 1.166-.668 2.164-.668h2.664V2.337H70.36ZM12.992 8.93h-3.83l1.914-4.591 1.916 4.59Zm66.279 0h-3.83l1.914-4.591 1.916 4.59ZM53.708 4.758c.5 0 1.082 0 1.416.167.332.25.5.585.5 1.085s-.167.917-.5 1.085c-.416.25-.832.25-1.415.25h-3.414V4.759h3.413Z"/>
            </svg>
        </div>
    {/if}
    <div class="flex flex-col w-full mt-[2px]">
        <div class="flex justify-between items-start">
            <span class="text-black text-[14.4px] leading-none mt-[1px]">{formatFullname(card?.brand)} {card?.final}</span>
            <div class="flex size-[20px] justify-center items-center">
                <div class={`flex size-[16px] rounded-full ${method === "card" && card?.is_selected ? "border-[5px] border-[#FE2C55]" : "border-[1.8px] border-[#D4D4D4]"}`}></div>
            </div>
        </div>
        {#if card?.is_disabled}
            <span class="text-[#73747B] text-[11px] text-start leading-[14px] mt-[3px] pe-[32px]">{card?.brand} não está disponível para este pedido.</span>
        {:else}
            {#if product?.free_installments > 0}
                <div class="flex w-full pt-[4px]">
                    <div class="flex justify-center items-center gap-[3px] px-[6px] py-[5px] rounded-[3px] bg-[#FFE5EA]">
                        <span class="text-[#E10544] text-[10.6px] font-medium leading-[10.6px]">Sem juros em até {product?.free_installments} parcelas</span>
                        <svg class="w-[4px] h-[8px] shrink-0 mb-[1px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23">
                            <path fill="#E10544" d="M.5 2.5 3 0l11 11.5L2.5 23 0 20.5l9.5-9-9-9Z"/>
                        </svg>
                    </div>
                </div>
            {/if}
            {#if method === "card" && card?.is_selected}
                <button type="button" aria-label="Ver tudo" onclick={GoInstallments}>
                    <div class="flex flex-col w-full mt-[12px]">
                        <div class="flex flex-col items-start w-full rounded-[10px] border-[1px] p-[8px] gap-[2px] border-[#FE2C55] bg-[#F8F8F8]">
                            {#if installment?.number <= product?.free_installments}
                                <span class="text-black text-[13px] font-semibold leading-none">{installment?.number} meses x R$ {formatPrice(total / installment?.number)}</span>
                                <span class="text-[#565656] text-[11px] leading-[15px]">Taxa de parcelamento mensal: R$ 0,00 <b class="line-through font-normal text-[#ADADAD]">R$ {formatPrice(installment?.fee)}</b></span>
                                <div class="flex justify-center items-center gap-[3px] px-[6px] py-[5px] mt-[3px] rounded-[3px] bg-[#FFE5EA]">
                                    <svg class="w-[8px] h-[8px] shrink-0 mb-[1px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 21">
                                        <path fill="#E10544" d="m0 11 2.5-2.5 7 8L20.5 0l3 2-13 19H9L0 11Z"/>
                                    </svg>                              
                                    <span class="text-[#E10544] text-[10.6px] font-medium leading-[10.6px]">Parcelamento sem juros aplicado</span>
                                    <svg class="w-[4px] h-[8px] shrink-0 mb-[1px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23">
                                        <path fill="#E10544" d="M.5 2.5 3 0l11 11.5L2.5 23 0 20.5l9.5-9-9-9Z"/>
                                    </svg>
                                </div>
                            {:else}
                                <span class="text-black text-[13px] font-semibold leading-none">{installment?.number} meses x R$ {formatPrice(installment?.amount)}</span>
                                <span class="text-[#565656] text-[11px] leading-[15px]">Taxa de parcelamento mensal: R$ {formatPrice(installment?.fee)}</span>
                            {/if}
                        </div>
                    </div>
                    <div class="flex items-center justify-center mt-[16px] gap-[6px]">
                        <span class="text-[#707070] text-[12px] leading-none">Ver todos os planos de pagamento</span>
                        <svg class="w-[5px] h-[8px] shrink-0 mb-[1px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 28">
                            <path fill="#808080" d="M0 2.5 2.5 0 16 14 2.5 28 0 25l11-11L0 2.5Z"/>
                        </svg>
                    </div>
                </button>
            {/if}
        {/if}
    </div>
</a>