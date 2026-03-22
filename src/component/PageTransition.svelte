<script>
    import { onMount } from "svelte";
    import { createEvent } from "$lib/events.client";

    let { pages=[] } = $props();

    let keyboard = $state(false);
    let locked = $state(false);
    let current = $state(0);
    let prevent = $state(0);
    let page = $state({name: pages[0]?.name, params: {}});
    let loaded = $state({ 0: true });
    let history = $state([page]);

    const updatePage = (name, params={}) => {
        page = { name, params };

        const index = pages.findIndex(item => item.name == name);
        if(index !== -1){
            prevent = current;
            current = index;
            loaded[index] = true;
        }

        createEvent("transition", { name: name, params: params });

        if(pages[index]?.color) document.body.style.backgroundColor = pages[index].color;
        if(pages[index]?.history !== false) history.push(page);
    }
    const backPage = (length=1) => {
        if(history.length < length) return;
        const item = history.at(-length);
        updatePage(item.name, item.params);
    }
    const getHistory = () => {
        return history;
    }
    const lockScroll = () => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";

        createEvent("lock", { success: true });
    };

    const unlockScroll = () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";

        createEvent("unlock", { success: true });
    };
    const handleResize = () => {
        const window_width = window.innerWidth;
        const window_height = window.innerHeight;
        const viewport_height = window?.visualViewport?.height;
        const viewport_width = window?.visualViewport?.width;
        keyboard = viewport_height < window_height;

        if (!locked && viewport_height > window_height * 0.95) {
            locked = true;
            lockScroll();
        }
    };
    const handleScroll = (e) => {
        if(window.scrollY > 5 && !locked){
            locked = true;
            lockScroll();
        }
    };

    onMount(() => {
        window.visualViewport.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.visualViewport.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "";
        };
    });
</script>

<style>
    :global(.is-unlocking .scrollable) {
        overflow: hidden !important;
        touch-action: pan-y !important;
    }
</style>

<!--${index === current && locked ? "overflow-y-auto overscroll-y-contain" : "overflow-hidden"}-->

<div class={`w-full min-h-[120vh] text-black z-10 bg-transparent relative ${locked ? "pointer-events-none" : "pointer-events-auto"}`}></div>
<div class={`fixed top-0 left-0 w-full h-[100dvh] z-20 text-black overflow-hidden ${locked ? "pointer-events-auto" : "pointer-events-none"}`}>
    <div class="grid grid-cols-1 grid-rows-1 w-full h-full">
        {#each pages as item, index}
            <div class={`
                    col-start-1 row-start-1 
                    flex flex-col w-full h-[100dvh]
                    will-change-transform transition-transform ease-in-out overflow-hidden
                    ${index === current || index === prevent ? "duration-300" : "duration-0"} 
                    ${index === current ? "translate-x-0" : index == prevent ? (current > prevent ? "-translate-x-full" : "translate-x-full") : (index < current ? "-translate-x-full" : "translate-x-full")} 
                    ${index === current || index === prevent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}
                    ${!locked ? "is-unlocking" : ""}
					`} style={`background-color: ${item.color};`}>
                
                {#if loaded[index]}
                    <item.component {...item.props} {...page.params} {updatePage} {backPage} {getHistory} {locked} {keyboard}/>
                {/if}
            </div>
        {/each}
    </div>
</div>


<!--
<script>
    import { onMount } from "svelte";

    let { pages = [] } = $props();

    let keyboard = $state(false);
    let locked = $state(false);

    let current = $state(0);
    let prevent = $state(0);

    let params = $state({});
    let history = [[pages[0]?.name]];

    const transition_ms = 300;
    let is_transitioning = $state(false);
    let transition_timer = null;

    const should_render = (index) => {
        const is_in_window = index === current || index === current - 1 || index === current + 1;
        const is_outgoing = is_transitioning && index === prevent;
        return is_in_window || is_outgoing;
    };

    const finish_transition = () => {
        is_transitioning = false;
        prevent = current;
        transition_timer = null;
    };

    const updatePage = (name, values={}) => {
        params = values;
        history.push([name, params]);

        const index = pages.findIndex((page) => page.name === name);
        if (index === -1) return;

        if (pages[index]?.color) document.body.style.backgroundColor = pages[index].color;

        if (index === current) return;

        prevent = current;

        is_transitioning = true;
        if (transition_timer) clearTimeout(transition_timer);

        current = index;

        transition_timer = setTimeout(finish_transition, transition_ms);
    };

    const backPage = () => {
        if (history.length < 2) return;
        updatePage(...history.at(-2));
    };

    const lockScroll = () => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100px";
    };

    const unlockScroll = () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
    };

    const handleResize = () => {
        const window_height = window.innerHeight;
        const viewport_height = window?.visualViewport?.height;
        keyboard = viewport_height < window_height;

        if (!locked && viewport_height > window_height * 0.95) {
            locked = true;
            lockScroll();
        }
    };

    const handleScroll = () => {
        if (window.scrollY > 5 && !locked) {
            locked = true;
            lockScroll();
        }
    };

    onMount(() => {
        window.visualViewport?.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.visualViewport?.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "";

            if (transition_timer) clearTimeout(transition_timer);
        };
    });
</script>

<style>
    :global(.is-unlocking .scrollable) {
    overflow: hidden !important;
    touch-action: pan-y !important;
    }
</style>

<div class="w-full h-[120vh] absolute top-0 left-0 -z-10 bg-transparent pointer-events-none"></div>

<div class="fixed top-0 left-0 w-full h-[100dvh] text-black overflow-hidden">
    <div class="grid grid-cols-1 grid-rows-1 w-full h-full">
    {#each pages as page, index}
        <div
        class={`
            col-start-1 row-start-1
            flex flex-col w-full h-[100dvh]
            will-change-transform transition-transform ease-in-out overflow-hidden
            ${index === current || index === prevent ? "duration-300" : "duration-0"}
            ${
            index === current
                ? "translate-x-0"
                : index === prevent
                ? (current > prevent ? "-translate-x-full" : "translate-x-full")
                : (index < current ? "-translate-x-full" : "translate-x-full")
            }
            ${index === current || index === prevent ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}
            ${!locked ? "is-unlocking" : ""}
        `}
        style={`background-color: ${page.color};`}
        >
        {#if should_render(index)}
            <page.component
            {...page.props}
            {...params}
            {updatePage}
            {backPage}
            {locked}
            {keyboard}
            />
        {/if}
        </div>
    {/each}
    </div>
</div>
-->