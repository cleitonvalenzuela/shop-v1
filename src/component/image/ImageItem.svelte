<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    import { onMount } from "svelte";

    // Props permanecem as mesmas
    let { source, description="", onMove=()=>{}, isZoomed = $bindable(false) } = $props();

    let container = $state(null);
    let image = $state(null);
    let ready = $state(false);
    let dragging = $state(false);

    let mode = $state(null);

    let image_width = $state(0);
    let image_height = $state(0);
    let image_ratio = $state(0);

    let viewport_width = $state(0);
    let viewport_height = $state(0);
    let viewport_ratio = $state(0);

    let current_scale = $state(1);
    let max_scale = $state(4);
    let last_distance = $state(0);
    
    let current_coods = $state({x: 0, y: 0});
    let last_touch = $state({x: 0, y: 0});
    
    let last_pan_point = $state({ x: 0, y: 0 });
    let last_center_point = $state({ x: 0, y: 0 });

    $effect(() => {
        // Margem de segurança pequena para float
        isZoomed = current_scale > 1.001;
    });

    /* ---------- helpers ---------- */
    const calculateDistance = (t1, t2) => Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

    const getMidpoint = (t1, t2) => ({
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2
    });

    const calculateDimensions = () => {
        if(!image) return;
        image_width = image.naturalWidth;
        image_height = image.naturalHeight;
        image_ratio = image_width / image_height;
        viewport_width = window.innerWidth;
        viewport_height = window.innerHeight;
        viewport_ratio = viewport_width / viewport_height;
        max_scale = Math.max(3, image.naturalWidth / viewport_width);
        ready = true;
    }

    /* ---------- touch handlers ---------- */

    const onTouchStart = (e) => {
        if(e.cancelable){
            e.preventDefault();
        }
        
        if(dragging) return;

        if (e.touches.length === 1) {
            mode = current_scale <= 1 ? "swipe" : "pan";
            onMove("start", e.touches[0].clientX);
        }
        else if (e.touches.length === 2) {
            if(e.target != image) return;

            mode = "zoom";
            last_distance = calculateDistance(e.touches[0], e.touches[1]);
            last_center_point = getMidpoint(e.touches[0], e.touches[1]);
        }

        last_touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e) => {
        if(e.cancelable){
            e.preventDefault();
        }

        dragging = true;
        if (e.touches.length === 1) {
            const current_touch = {x: e.touches[0].clientX, y: e.touches[0].clientY };

            if (mode === "swipe") {
                onMove("move", e.touches[0].clientX);
            }
            else if (mode === "zoom") {
                current_coods.x += current_touch.x - last_touch.x;
                current_coods.y += current_touch.y - last_touch.y;
            }

            last_touch = { x: current_touch.x, y: current_touch.y };
        }
        else if (e.touches.length === 2 && mode == "zoom") {
            if(e.target != image) return;

            const t1 = e.touches[0]; const t2 = e.touches[1];
            const distance = calculateDistance(t1, t2); const center = getMidpoint(t1, t2);

            let factor = current_scale < 1 ? 1 + ((distance / last_distance) - 1) * 0.5 : distance / last_distance;
            const new_scale = current_scale * factor;

            const viewport_center_x = window.innerWidth / 2;
            const viewport_center_y = window.innerHeight / 2;
            const fingers_offset_x = center.x - viewport_center_x;
            const fingers_offset_y = center.y - viewport_center_y;
            const move_x = center.x - last_center_point.x;
            const move_y = center.y - last_center_point.y;

            current_coods.x = fingers_offset_x - (fingers_offset_x - current_coods.x) * factor + move_x;
            current_coods.y = fingers_offset_y - (fingers_offset_y - current_coods.y) * factor + move_y;

            current_scale = new_scale;
            last_distance = distance;
            last_center_point = center;
        }
    };

    const onTouchEnd = (e) => {
        if(e.cancelable){
            e.preventDefault();
        }

        if (e.touches.length === 0) {
            onMove("end");
            
            dragging = false;
            mode = null;

            current_coods.x = 0;
            current_coods.y = 0;
            current_scale = 1;
            last_distance = 0;
        }
    };

    const preventDefault = (e) => e.preventDefault();

    /* ---------- lifecycle ---------- */
    onMount(() => {
        container.addEventListener("touchstart", onTouchStart, { passive: false, cancelable: false });
        container.addEventListener("touchmove", onTouchMove, { passive: false, cancelable: false });
        container.addEventListener("touchend", onTouchEnd, { passive: false, cancelable: false });

        return () => {
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", onTouchEnd);
        };
    });
</script>

<svelte:window onresize={calculateDimensions}/>

<div bind:this={container} class="w-dvw h-dvh flex justify-center items-center shrink-0 snap-center relative overflow-hidden touch-none bg-black">
    <img
        bind:this={image}
        src={source ? `${PUBLIC_UPLOAD_BASE}/${source}` : ''} 
        alt={description} 
        onload={calculateDimensions}
        style={`
            ${image_ratio > viewport_ratio ? `width: ${viewport_width}px; height: auto;` : `width: auto; height: ${viewport_height}px;`} 
            transform: translate(${current_coods.x}px, ${current_coods.y}px) scale(${current_scale});
            transform-origin: center center;
        `} 
        class={`will-change-transform ease-in-out transition-transform ${dragging === false ? "duration-300" : "duration-0"} ${ready ? 'opacity-100' : 'opacity-0'}`} 
        draggable="false"
    />
</div>