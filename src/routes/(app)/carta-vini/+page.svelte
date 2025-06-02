<script lang="ts">
	import CardWine from '$lib/components/CardWine.svelte';
	import TableFront from '$lib/components/TableFront.svelte';
	import groupBy from 'object.groupby';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import ChevronUp from '$lib/components/ChevronUp.svelte';
	import { fade } from 'svelte/transition';

	let { data }: { data: PageData } = $props();

	let order = $state({
		key: '',
		dir: ''
	});
	let isMobile: boolean | undefined = $state();
	let scrollY: number = $state(0);

	const groupByType = groupBy(data.wines, (el) => el.type);
	const groupByRegion = Object.fromEntries(
		Object.entries(groupByType).map(([key, value]) => {
			return [key, groupBy(value || [], (el) => el.region)];
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

	onMount(() => {
		isMobile = window.matchMedia('(width < 64rem)').matches;
	});
</script>

<svelte:window bind:scrollY />

<section class="container mx-auto pb-[200px]">
	<h2 class="font-kaikoura mb-8 text-xl uppercase tracking-widest text-yellow-700">Carta dei vini</h2>
	<div class="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
		<p class="min-w-full lg:min-w-auto">Vai a:</p>
		<a class="border px-2 py-1" href="#bianco{isMobile ? '-mobile' : ''}">Bianco</a>
		<a class="border px-2 py-1" href="#bollicina{isMobile ? '-mobile' : ''}">Bollicina</a>
		<a class="border px-2 py-1" href="#rosso{isMobile ? '-mobile' : ''}">Rosso</a>
	</div>
	<div class="hidden lg:block print:block">
		{#each Object.entries(groupByRegionSort) as [type, regions]}
			<div class="pb-12">
				<h2 class="mb-2 scroll-mt-4 text-4xl font-bold" id={type.toLocaleLowerCase()}>{type}</h2>
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
			<div>
				<h2
					class="mb-2 scroll-mt-4 text-4xl font-bold tracking-[3px]"
					id="{type.toLocaleLowerCase()}-mobile"
				>
					{type}
				</h2>
				{#each Object.entries(regions) as [region, wines]}
					<div class="mb-4">
						<h3 class="mb-2 text-2xl font-semibold italic">{region}</h3>
						{#each wines || [] as wine}
							<CardWine {wine} />
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
	{#if scrollY > 100}
		<button
			transition:fade
			onclick={() => window.scrollTo(0, 0)}
			class="fixed right-4 bottom-4 rounded-lg bg-white px-3 py-3 shadow-md cursor-pointer"
		>
			<ChevronUp />
		</button>
	{/if}
</section>
