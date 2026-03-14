<script>
    import CaptchaPopup from "$component/CaptchaPopup.svelte";
    import ProductSkeleton from "$component/product/ProductSkeleton.svelte";

    let { data } = $props();

    const redirect = () => {
        if(data?.href){
            location.href = data?.href;
        }
    }
</script>

<CaptchaPopup onResolve={redirect}/>

<div class="w-full h-full fixed top-0 left-0">
    <header class="flex flex-col w-full">
        <div class="flex justify-between items-center h-12 px-5 bg-white"></div>
    </header>
    <main class="w-full h-full bg-white z-50">
        <span class="flex w-full pb-[100vw] relative overflow-hidden bg-[#f8f8f8]"></span>
        <div class="flex flex-col p-4">
            <span class="w-[32%] h-[1.8rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
            <div class="flex gap-[0.3rem] mt-[0.75rem]">
                <span class="w-[25%] h-[1.5rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
                <span class="w-[25%] h-[1.5rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
                <span class="w-[25%] h-[1.5rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
            </div>
            <span class="w-[90%] h-[1rem] mt-[0.75rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
            <span class="w-[65%] h-[1rem] mt-[0.25rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
            <span class="w-[25%] h-[1rem] mt-[0.5rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
            <div class="flex gap-[0.3rem] mt-[0.8rem]">
                <span class="w-[1rem] h-[1rem] mt-[0.75rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
                <span class="w-[70%] h-[1rem] mt-[0.75rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
            </div>
            <div class="flex gap-[0.3rem] mt-[0.8rem]">
                <span class="w-[1rem] h-[1rem] mt-[0.75rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
                <span class="w-[35%] h-[1rem] mt-[0.75rem] rounded-[0.15rem] bg-[#f8f8f8]"></span>
            </div>
        </div>
    </main>
</div>