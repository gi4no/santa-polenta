<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="container mx-auto">
	<h2 class="mb-8 text-4xl">Carta dei vini</h2>
	<table class="w-full">
		<thead>
			<tr class="border-b text-left italic">
				<th>Nome</th>
				<th onclick={() => goto('?order=cantina&dir=asc', { replaceState: true })}>Cantina</th>
				<th>Anno</th>
				<th>Regione</th>
				<th>Nazione</th>
				<th>Tipologia</th>
				<th>Prezzo</th>
			</tr>
		</thead>
		<tbody>
			{#each data.wines as wine}
				<tr class="border-b">
					<td>{wine.nome}</td>
					<td>{wine.cantina}</td>
					<td>{wine.anno}</td>
					<td>{wine.regione}</td>
					<td>{wine.nazione}</td>
					<td>{wine.tipolgia}</td>
					<td>{wine.prezzo}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style lang="postcss">
	@reference "tailwindcss";
	table {
		tbody,
		thead {
			td,
			th {
				@apply py-2;
			}
		}
	}
</style>
