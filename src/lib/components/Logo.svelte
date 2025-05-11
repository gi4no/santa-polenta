<script>
	let { isAdmin = false } = $props();
</script>

<a
	class="block font-lucky relative border-t-2 border-b-2 border-t-yellow-600 border-b-yellow-500 px-2 py-2"
	href="/"
>
	<h2
		class="text-5xl leading-none tracking-[2px] text-yellow-500 text-shadow-amber-900 text-shadow-md"
	>
		Santa
	</h2>
	<h3 class="ps-8 text-4xl leading-4 text-yellow-600 text-shadow-amber-900 text-shadow-md">
		Polenta
	</h3>
	{#if isAdmin}
		<span class="absolute bottom-0 w-full translate-y-full py-1 text-center text-yellow-900">
			backoffice
		</span>
	{/if}
</a>
