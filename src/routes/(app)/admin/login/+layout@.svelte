<script>
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<section>
	{@render children()}
</section>
