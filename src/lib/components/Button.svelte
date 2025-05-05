<script lang="ts">
	let { href = '', label } = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	class="min-w-[300px] rounded-sm bg-yellow-600 px-4 py-2 text-center text-xl transition-all duration-400 hover:text-yellow-900 border-2"
>
	{label}
</svelte:element>
