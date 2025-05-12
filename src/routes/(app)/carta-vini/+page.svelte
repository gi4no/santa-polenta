<script lang="ts">
	import { goto } from '$app/navigation';
	import CardWine from '$lib/components/CardWine.svelte';
	import TableFront from '$lib/components/TableFront.svelte';
	import type { Vino } from '$types/cartaVini';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let order = $state({
		key: '',
		dir: ''
	});

	const groupByType = Object.groupBy(data.wines, (el) => el.type);
	const groupByRegion = Object.fromEntries(
		Object.entries(groupByType).map(([key, value]) => {
			return [key, Object.groupBy(value || [], (el) => el.region)];
		})
	);

	const groupByRegionSort = Object.keys(groupByRegion)
		.sort()
		.reduce((obj: typeof groupByRegion, key: keyof typeof groupByRegion) => {
			obj[key] = groupByRegion[key];
			return obj;
		}, {});

	// const onChangeSelect = () => {
	// 	if (order.key) {
	// 		order.dir = 'desc';
	// 		goto(`?order=${order.key}&dir=${order.dir}`, { replaceState: true });
	// 	} else {
	// 		order = { key: '', dir: '' };
	// 		goto('/carta-vini', { replaceState: true });
	// 	}
	// };

	// const onChangeDir = () => {
	// 	goto(`?order=${order.key}&dir=${order.dir}`, { replaceState: true });
	// };

	// const onClickTh = (key: keyof Vino) => {
	// 	if (order.key === key && order.dir === 'asc') {
	// 		goto('/carta-vini', { replaceState: true });
	// 		order = { key: '', dir: '' };
	// 	} else {
	// 		order = { key, dir: order.key === key ? 'asc' : 'desc' };
	// 		goto(`?order=${order.key}&dir=${order.dir}`, { replaceState: true });
	// 	}
	// };
</script>

<section class="container mx-auto pb-[200px]">
	<h2 class="font-lucky mb-8 text-xl tracking-widest text-yellow-700">Carta dei vini</h2>
	<div class="hidden lg:block print:block">
		{#each Object.entries(groupByRegionSort) as [type, regions]}
			<div class="pb-12">
				<h2 class="mb-2 text-4xl font-bold">{type}</h2>
				{#each Object.entries(regions) as [region, wines]}
					<div class="mb-8">
						<h3 class="mb-2 text-2xl font-semibold italic">{region}</h3>
						<TableFront wines={wines || []} />
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<div class="lg:hidden print:hidden">
		<!-- <div class="flex justify-between">
			<select name="order" id="" bind:value={order.key}>
				<option value="">Ordina per</option>
				<option value="price">Prezzo</option>
				<option value="name">Nome</option>
				<option value="years">Anno</option>
			</select>
			<select name="dir" id="" bind:value={order.dir} disabled={!order.key}>
				<option value="">Direzione</option>
				<option value="desc">A-Z</option>
				<option value="asc">Z-A</option>
			</select>
		</div> -->
		{#each Object.entries(groupByRegionSort) as [type, regions]}
			<h2 class="mb-2 text-4xl font-bold tracking-[3px]">{type}</h2>
			{#each Object.entries(regions) as [region, wines]}
				<div class="mb-4">
					<h3 class="mb-2 text-2xl font-semibold italic">{region}</h3>
					{#each wines || [] as wine}
						<CardWine {wine} />
					{/each}
				</div>
			{/each}
		{/each}
	</div>
</section>
