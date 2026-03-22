<script>
    import { onMount } from "svelte";

    import CitiesView from "$component/location/views/CitiesView.svelte";
    import RegionsView from "$component/location/views/RegionsView.svelte";
    import { createEvent } from "$lib/events.client";

    let { address, onCloseDrawer=()=>{}, updateAddress=()=>{}, updateScroll=()=>{} } = $props();

    let container = $state(null);
    let open = $state(false);
    let dragging = $state(false);
    let view = $state("regions");
    let tab = $state("regions");
    let location = $state(address);

    const updateView = (value, animated=true) => {
        dragging = true;

        tab = value;
        view = value;
        
        const width = window.innerWidth;

        if(value == "regions"){
            setTimeout(() => {
                container.scrollTo({ left: 0, behavior: animated ? "smooth" : "instant" });
            }, 100);
        }
        else{
            setTimeout(() => {
                container.scrollTo({ left: width, behavior: animated ? "smooth" : "instant" });
            }, 100);
        }

        setTimeout(() => {
            dragging = false;
        }, 350);
    };
    const handleScroll = () => {
        const scroll = container.scrollLeft;
        const width = window.innerWidth;

        if(scroll >= (width / 2)){
            view = "cities";
        }
        else{
            view = "regions";
        }

        if(!dragging){
            tab = view;
        }
    }
    const updateLocation = (value) => {
        location = value;
        updateAddress({ ...address, region: location?.region, city: location?.city });

        if(location?.city){
            closeDrawer();
        }
    }

    export const openDrawer = () => {
        updateScroll({ locked: true });

        if(location?.region){
            updateView("cities", false);
        }
        else{
            updateView("regions", false);
        }
        
        open = true;
        createEvent("drawer", { name: "location" });
    }
    export const closeDrawer = () => {
        open = false;
        updateScroll({ locked: false });
        onCloseDrawer();
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={closeDrawer}>
            <svg class="w-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[12px] px-[16px] pt-[19px] pb-[5px]">
            <span class="text-black text-[16px] font-bold leading-none">Selecionar {tab == "regions" ? "Estado/UF" : "Cidade"}</span>
        </div>
        <div class="flex absolute bottom-0 left-0 w-full h-[16px]"></div>
        <div class="flex flex-col w-full px-4 py-5 relative">
            <div class="flex items-center gap-[12px]">
                <button type="button" class="flex flex-col gap-[6px]" onclick={() => { updateView("regions") }}>
                    <span class={`text-[14px] font-semibold ${tab == "regions" ? "text-black" : "text-[#707070]"}`}>{location?.region ? location?.region?.name : "Estado/UF"}</span>
                    <span class={`w-full h-[2px] rounded-full ${tab == "regions" ? "bg-black" : "bg-transparent"}`}></span>
                </button>
                {#if location?.region}
                    <button type="button" class="flex flex-col gap-[6px]" onclick={() => { updateView("cities") }}>
                        <span class={`text-[14px] font-semibold ${tab == "cities" ? "text-black" : "text-[#707070]"}`}>{location?.city ? location?.city?.name : "Cidade"}</span>
                        <span class={`w-full h-[2px] rounded-full ${tab == "cities" ? "bg-black" : "bg-transparent"}`}></span>
                    </button>
                {/if}
            </div>
        </div>
        <div bind:this={container} onscroll={handleScroll} class="flex overflow-x-auto overscroll-y-contain h-full snap-x snap-mandatory scroll-smooth transparent-scroll">
            <div class="flex snap-start snap-always flex-none w-screen h-full relative">
                <RegionsView {view} {updateView} {location} {updateLocation}/>
            </div>
            {#if location?.region}
                <div class="flex snap-start snap-always flex-none w-screen h-full relative">
                    <CitiesView {view} {updateView} {location} {updateLocation}/>
                </div>
            {/if}
        </div>
    </div>
</div>