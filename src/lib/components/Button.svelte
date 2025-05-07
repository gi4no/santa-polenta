<script lang="ts">
	let { href = '', label, type = 'button' } = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
  {type}
	class="min-w-[300px] rounded-sm border-2 bg-yellow-600 px-4 py-2 text-center text-xl transition-all duration-400 hover:text-yellow-900 cursor-pointer"
>
	{label}
</svelte:element>
