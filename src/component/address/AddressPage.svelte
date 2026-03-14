<script>
    import { onMount } from "svelte";
    
    import FullnameField from "$component/address/fields/FullnameField.svelte";
    import PhoneField from "$component/address/fields/PhoneField.svelte";
    import StreetField from "$component/address/fields/StreetField.svelte";
    import SaveDefault from "$component/address/SaveDefault.svelte";
    import DistrictField from "$component/address/fields/DistrictField.svelte";
    import EmailField from "$component/address/fields/EmailField.svelte";
    import NumberField from "$component/address/fields/NumberField.svelte";
    import UnitField from "$component/address/fields/UnitField.svelte";
    import PostalField from "$component/address/fields/PostalField.svelte";
    import RegionField from "$component/address/fields/RegionField.svelte";
    import CityField from "$component/address/fields/CityField.svelte";
    import LocationDrawer from "$component/location/LocationDrawer.svelte";
    import EditingPopup from "$component/address/EditingPopup.svelte";

    let { session, address, customer, keyboard=false, updatePage=()=>{}, backPage=()=>{}, updateAddress=()=>{}, updateCustomer={} } = $props();

    let drawer = $state(null);
    let popup = $state(null);
    let loading = $state(false);
    let container = $state(null);
    let scroll = $state({ position: 0, locked: false });

    let fullname = $state(null);
    let phone = $state(null);
    let email = $state(null);
    let postal = $state(null);
    let district = $state(null);
    let street = $state(null);
    let number = $state(null);
    let unit = $state(null);

    let valid = $derived(
        fullname?.validate() &&
        phone?.validate() &&
        email?.validate() &&
        postal?.validate() &&
        address?.region &&
        address?.city &&
        district?.validate() &&
        street?.validate()
    );
    
    const handleTouchMove = (e) => {
        if(keyboard){
            e.preventDefault();
            e.stopPropagation();
        }
    }
    const updateLocation = (value) => {
        location = value;
    }
    const updateScroll = (params) => {
        if(params?.locked){
            scroll.locked = true;
        }
        else{
            scroll.locked = false;
        }

        if(params?.position !== null){
            container.scrollTo({ top: params?.position, behavior: params?.animated ? "smooth" : "instant" });
        }
    }
    const saveAddress = async () => {
        const request = await fetch("/api/address", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: address?.id,
                postal: postal.value,
                district: district.value,
                street: street.value,
                number: number.value,
                unit: unit.value,
                city_id: address?.city?.id,
                region_id: address?.region?.id,
                is_filled: true
            })
        });

        const response = await request.json();
        updateAddress(response);
    }
    const saveCustomer = async () => {
        const request = await fetch("/api/customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: customer?.id,
                fullname: fullname.value,
                phone: phone.value,
                email: email.value,
                document: customer?.document,
                is_filled: customer?.document ? true : false
            })
        });

        const response = await request.json();
        updateCustomer(response);
    }
    const submitForm = async () => {
        if(!valid) return;

        updateScroll({ locked: true });
        loading = true;

        await saveAddress();
        await saveCustomer();

        loading = false;
        updateScroll({ locked: false });
        updatePage("finalization");
    }

    onMount(() => {
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("touchmove", handleTouchMove);
        }
    });
</script>

<LocationDrawer bind:this={drawer} {address} {updateAddress} {updateScroll}/>
<EditingPopup bind:this={popup} {backPage} {updateScroll}/>

<div class={`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50 duration-300 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}>
    <div class="flex flex-col justify-center items-center w-[122px] pt-[32px] pb-[15px] rounded-[4px] bg-[#2e2e2ed9]">
        <div class="relative size-[16px] me-[8px] z-20">
            <span class="absolute size-[12px] rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
            <span class="absolute size-[12px] rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
        </div>
        <span class="w-full text-white text-center text-[13px] font-semibold mt-[18px]">Carregando...</span>
    </div>
</div>
<div class={`flex flex-col w-full overflow-hidden bg-[#F5F5F5] pt-[48px] ${session?.os?.name == "iOS" ? "pb-[152px]" : "pb-[118px]"}`}>
    <header class={`flex max-w-dvw h-[48px] justify-between items-center z-20 bg-[#F5F5F5] fixed top-0`}>
        <button class="flex justify-center items-center w-[56px] h-[32px]" type="button" aria-label="Voltar" onclick={popup?.openPopup}>
            <svg class="h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
            </svg>
        </button>
        <div class="flex flex-col w-full items-center justify-center gap-[6px]">
            <span class="text-black text-[17px] font-bold leading-none">Adicionar novo endereço</span>
        </div>
        <div class="flex w-[56px] items-center"></div>
    </header>
    <main bind:this={container} class={`flex flex-col w-full px-[8px] pt-[16px] pb-[24px] transparent-scroll relative z-10 scrollable ${scroll.locked ? "overflow-y-hidden" : "overflow-y-scroll"}`}>
        <span class="text-[#6B6B6B] text-[13px] font-semibold leading-none ps-[14px]">Informações de contato</span>
        <div class="flex flex-col bg-white w-full rounded-[4px] mt-[10px] pb-[18px]">
            <FullnameField bind:this={fullname} next={phone}/>
            <PhoneField bind:this={phone} next={email}/>
            <EmailField bind:this={email} next={postal}/>
        </div>
        <span class="text-[#6B6B6B] text-[13px] font-semibold leading-none ps-[14px] mt-[28px]">Informações de endereço</span>
        <div class="flex flex-col bg-white w-full rounded-[4px] mt-[10px] pb-[18px]">
            <PostalField bind:this={postal}/>
            <div class="flex items-center gap-[32px] px-[16px]">
                <RegionField {address} openLocationDrawer={drawer?.openDrawer}/>
                <CityField {address} openLocationDrawer={drawer?.openDrawer}/>
            </div>
            <DistrictField bind:this={district} next={street}/>
            <StreetField bind:this={street} next={number}/>
            <NumberField bind:this={number} next={unit}/>
            <UnitField bind:this={unit}/>
        </div>
        <span class="text-[#6B6B6B] text-[13px] font-semibold leading-none ps-[14px] mt-[28px]">Configurações</span>
        <div class="flex flex-col bg-white w-full rounded-[4px] mt-[10px]">
            <div class="flex w-full h-[56px] justify-between items-center px-[16px]">
                <span class="text-black text-[14px]">Definir como padrão</span>
                <SaveDefault enabled={true}/>
            </div>
        </div>
    </main>
    <footer class={`flex flex-col gap-[14px] px-[16px] pt-[14px] ${session?.os?.name == "iOS" ? "pb-[50px]" : "pb-[16px]"} w-full border-t-[1px] bg-[#F5F5F5] border-[#d6d7d8] z-20 fixed bottom-0`}>
        <span class="text-[#444444] text-[12px] text-center leading-[15px]">Leia a <b class="text-black font-semibold">Política de privacidade do Tiktok</b> para saber mais sobre como usamos suas informações pessoais. {keyboard}</span>
        <button type="button" title="Salvar endereço" class="flex justify-center w-full h-[44px] items-center rounded-lg disabled:opacity-50 bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden" disabled={!valid} onclick={submitForm}>
            <span class="text-white text-[16px] font-semibold leading-none">Salvar</span>
        </button>
    </footer>
</div>