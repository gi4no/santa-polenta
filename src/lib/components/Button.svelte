<script lang="ts">
	let { href = '', label, type = 'button' } = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
  {type}
	class="font-kaikoura uppercase min-w-[300px] rounded-sm border-2 bg-yellow-700/80 px-4 py-2 text-center text-xl transition-all duration-400 hover:text-yellow-600 hover:bg-yellow-800 cursor-pointer hover:border-black"
>
	{label}
</svelte:element>
