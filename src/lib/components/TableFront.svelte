<script lang="ts">
	import type { Vino } from '$types/cartaVini';

	let { wines }: { wines: Vino[] } = $props();
</script>

<table class="w-full table-fixed">
	<thead>
		<tr class="font-lucky border-b text-left tracking-widest text-yellow-700 italic print:text-sm">
			<th class="w-[200px]">Nome</th>
			<th>Cantina</th>
			<th class="w-[100px]">Anno</th>
			<th class="w-[100px]">Gradi</th>
			<th>Uvaggio</th>
			<th>Regione</th>
			<th>Nazione</th>
			<th>Tipologia</th>
			<th>Prezzo</th>
		</tr>
	</thead>
	<tbody>
		{#each wines as wine}
			<tr class="border-b print:text-sm">
				<td>{wine.name}</td>
				<td>{wine.producer}</td>
				<td>{wine.years}</td>
				<td>{wine.alcohol}</td>
				<td>{wine.grape}</td>
				<td>{wine.region}</td>
				<td>{wine.nation}</td>
				<td>{wine.type}</td>
				<td>{wine.price}€</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="postcss">
	@reference "tailwindcss";
	table {
		tbody,
		thead {
			td,
			th {
				@apply px-2 py-2;
			}
		}
	}
</style>
