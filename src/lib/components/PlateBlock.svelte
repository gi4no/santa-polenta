<script lang="ts">
	import type { Plate } from '$types/menu';

	let { plates, title }: { plates: (Plate | undefined)[] | undefined; title: string } = $props();
</script>

<div class="mb-12">
	<h3 class="mb-4 text-2xl font-bold">{title}</h3>
	{#each plates || [] as plate}
		{@const isLong = plate?.nome && plate.nome.length > 25}
		<div class="mb-2 text-xl">
			{plate?.nome} <sup class="text-sm mr-2 italic">{plate?.allergeni}</sup>
			<span class="font-bold whitespace-nowrap">€ {plate?.prezzo}</span>
		</div>
	{/each}
</div>
