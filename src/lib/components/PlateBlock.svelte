<script lang="ts">
	import type { Plate } from '$types/menu';

	let { plates, title }: { plates: (Plate | undefined)[] | undefined; title: string } = $props();
</script>

<div class="mb-12">
	<h3 class="mb-4 text-2xl font-bold">{title}</h3>
	{#each plates || [] as plate}
		<div class="mb-2 text-xl">
			{plate?.nome} <sup class="mr-2 text-sm whitespace-nowrap italic">{plate?.allergeni}</sup>
			<span class="font-bold whitespace-nowrap">€ {plate?.prezzo}</span>
		</div>
	{/each}
</div>
