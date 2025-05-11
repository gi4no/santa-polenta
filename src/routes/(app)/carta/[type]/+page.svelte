<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="container mx-auto pb-[200px] print:pb-0">
	<h2 class="font-lucky mb-8 text-xl tracking-widest text-yellow-700 text-center">Carta {page.params.type}</h2>
	<div class="text-center">
		<div class="mb-8">
			<h3 class="mb-4 text-2xl font-bold">Antipasti</h3>
			{#each data.menu?.antipasti || [] as ant}
				<div class="mb-2 text-xl">
					{ant?.nome} <span class="text-sm">{ant?.allergeni}</span>
					<span class="font-bold">€ {ant?.prezzo}</span>
				</div>
			{/each}
		</div>
		<div class="mb-8">
			<h3 class="mb-4 text-2xl font-bold">Primi</h3>
			{#each data.menu?.primi || [] as primi}
				<div class="mb-2 text-xl">
					{primi?.nome} <span class="text-sm">{primi?.allergeni}</span>
					<span class="font-bold">€ {primi?.prezzo}</span>
				</div>
			{/each}
		</div>
		<div class="mb-8">
			<h3 class="mb-4 text-2xl font-bold">Secondi</h3>
			{#each data.menu?.secondi || [] as sec}
				<div class="mb-2 text-xl">
					{sec?.nome} <span class="text-sm">{sec?.allergeni}</span>
					<span class="font-bold">€ {sec?.prezzo}</span>
				</div>
			{/each}
		</div>
		<div class="mb-12">
			<h3 class="mb-4 text-2xl font-bold">Dolci</h3>
			{#each data.menu?.dolci || [] as dolci}
				<div class="mb-2 text-xl">
					{dolci?.nome} <span class="text-sm">{dolci?.allergeni}</span>
					<span class="font-bold">€ {dolci?.prezzo}</span>
				</div>
			{/each}
		</div>
		<div>
			<div class="mb-2 text-xl">
				Coperto pane e servizio € 0,00 sono offerti come la nostra simpatia 😄
			</div>
		</div>
	</div>
</section>
