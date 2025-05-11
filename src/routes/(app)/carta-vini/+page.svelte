<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let order = $state({
		key: '',
		dir: ''
	});

	const onChangeSelect = () => {
		if (order.key) {
			order.dir = 'desc';
			goto(`?order=${order.key}&dir=${order.dir}`, { replaceState: true });
		} else {
			order = { key: '', dir: '' };
			goto('/carta-vini', { replaceState: true });
		}
	};

	const onChangeDir = () => {
		goto(`?order=${order.key}&dir=${order.dir}`, { replaceState: true });
	};

	const onClickTh = (key: string) => {
		if (order.key === key && order.dir === 'asc') {
			goto('/carta-vini', { replaceState: true });
			order = { key: '', dir: '' };
		} else {
			order = { key, dir: order.key === key ? 'asc' : 'desc' };
			goto(`?order=${order.key}&dir=${order.dir}`, { replaceState: true });
		}
	};
</script>

<section class="container mx-auto pb-[200px]">
	<h2 class="font-lucky mb-8 text-xl tracking-widest text-yellow-700">Carta dei vini</h2>
	<div class="hidden lg:block print:block">
		<table class="w-full">
			<thead>
				<tr class="font-lucky border-b text-left tracking-widest text-yellow-700 italic print:text-sm">
					<th class="cursor-pointer" onclick={() => onClickTh('nome')}>
						Nome <span class="print:hidden">↕️</span>
					</th>
					<th class="cursor-pointer" onclick={() => onClickTh('cantina')}>
						Cantina <span class="print:hidden">↕️</span>
					</th>
					<th class="cursor-pointer" onclick={() => onClickTh('anno')}>
						Anno <span class="print:hidden">↕️</span>
					</th>
					<th class="cursor-pointer" onclick={() => onClickTh('regione')}>
						Regione <span class="print:hidden">↕️</span>
					</th>
					<th class="cursor-pointer" onclick={() => onClickTh('nazione')}>
						Nazione <span class="print:hidden">↕️</span>
					</th>
					<th class="cursor-pointer" onclick={() => onClickTh('tipologia')}>
						Tipologia <span class="print:hidden">↕️</span>
					</th>
					<th class="cursor-pointer" onclick={() => onClickTh('prezzo')}>
						Prezzo <span class="print:hidden">↕️</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each data.wines as wine}
					<tr class="border-b print:text-sm">
						<td>{wine.nome}</td>
						<td>{wine.cantina}</td>
						<td>{wine.anno}</td>
						<td>{wine.regione}</td>
						<td>{wine.nazione}</td>
						<td>{wine.tipologia}</td>
						<td>{wine.prezzo}€</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="lg:hidden print:hidden">
		<div class="flex justify-between">
			<select name="order" id="" bind:value={order.key} onchange={onChangeSelect}>
				<option value="">Ordina per</option>
				<option value="prezzo">Prezzo</option>
				<option value="nome">Nome</option>
				<option value="anno">Anno</option>
			</select>
			<select name="dir" id="" bind:value={order.dir} onchange={onChangeDir} disabled={!order.key}>
				<option value="">Direzione</option>
				<option value="desc">A-Z</option>
				<option value="asc">Z-A</option>
			</select>
		</div>
		{#each data.wines as wine}
			<div
				class="mt-2 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-4 first:mt-0"
			>
				<div>
					<div class="mb-4">
						<h3 class="text-xl">{wine.nome}</h3>
						<h4 class="text-sm italic">{wine.cantina}</h4>
					</div>
					<ul class="text-sm">
						<li>Anno: {wine.anno}</li>
						<li>Regione: {wine.regione}</li>
						<li>Nazione: {wine.nazione}</li>
						<li>Tipologia: {wine.tipologia}</li>
					</ul>
				</div>
				<div>
					<p class="text-xl">{wine.prezzo}€</p>
				</div>
			</div>
		{/each}
	</div>
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
