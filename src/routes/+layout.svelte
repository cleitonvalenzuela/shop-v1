<script>
	import "$style/app.css";
	
	import { navigating } from "$app/stores";

    import ProductSkeleton from "$component/product/ProductSkeleton.svelte";
	
	let { children } = $props();
</script>

{#if $navigating}
	{#if $navigating.to.route.id == "/product/[slug]"}
		<ProductSkeleton/>
	{/if}
{:else}
	{@render children()}
{/if}