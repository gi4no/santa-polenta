<script>
	import Logo from './Logo.svelte';

	let { isAdmin = false } = $props();
</script>

<header class="flex items-center justify-center py-4">
	<Logo {isAdmin} />
</header>
