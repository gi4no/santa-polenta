<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let order = $state({
		key: '',
		dir: ''
	});

	const onClickTh = (key: string) => {
		if (order.key === key && order.dir === 'asc') {
			goto('/carta-vini', { replaceState: true });
		} else {
			order = { key, dir: order.key === key ? 'asc' : 'desc' };
			goto(`?order=${order.key}&dir=${order.dir}`, { replaceState: true });
		}
	};
</script>

<section class="container mx-auto">
	<h2 class="mb-8 text-4xl">Carta dei vini</h2>
	<table class="w-full">
		<thead>
			<tr class="border-b text-left italic">
				<th onclick={() => onClickTh('nome')}>Nome</th>
				<th onclick={() => onClickTh('cantina')}>Cantina</th>
				<th onclick={() => onClickTh('anno')}>Anno</th>
				<th onclick={() => onClickTh('regione')}>Regione</th>
				<th onclick={() => onClickTh('nazione')}>Nazione</th>
				<th onclick={() => onClickTh('tipologia')}>Tipologia</th>
				<th onclick={() => onClickTh('prezzo')}>Prezzo</th>
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
