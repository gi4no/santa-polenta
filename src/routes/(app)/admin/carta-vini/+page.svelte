<script lang="ts">
	import { Backend } from '$lib/api';
	import type { Vino } from '$types/cartaVini';
	import { onMount } from 'svelte';

	let wines: Vino[] = $state([]);
	let edit: string[] = $state([]);

	const onEdit = async (wine: Vino) => {
		if (wine.id.includes('new')) {
			await Backend.addWine(wine);
		} else {
			await Backend.updateWine(wine);
		}
		await fetchWine();
		edit = edit.filter((el) => el !== wine.id);
	};

	const toggleWine = async (wine: Vino) => {
		await Backend.updateWine({ ...wine, disabled: !wine.disabled });
		await fetchWine();
		edit = edit.filter((el) => el !== wine.id);
	};

	const fetchWine = async () => {
		wines = await Backend.getWine();
		console.log($state.snapshot(wines));
	};

	onMount(() => {
		fetchWine();
	});

	$effect(() => {
		$inspect(wines);
	});
</script>

<h3 class="font-kaikoura mb-8 text-3xl">Carta vini</h3>

<div class="w-full overflow-auto">
	<table>
		<thead class="text-left">
			<tr class="bg-yellow-300">
				<th class="min-w-[150px] rounded-tl-xl px-2 py-2">Nome</th>
				<th class="min-w-[150px] px-2 py-2">Cantina</th>
				<th class="min-w-[150px] px-2 py-2">Annata</th>
				<th class="min-w-[100px] px-2 py-2">Regione</th>
				<th class="min-w-[150px] px-2 py-2">Nazione</th>
				<th class="min-w-[150px] px-2 py-2">Prezzo</th>
				<th class="min-w-[150px] px-2 py-2">Tipologia</th>
				<th class="sticky right-0 min-w-[100px] rounded-tr-xl bg-yellow-300 px-2 py-2">Azioni</th>
			</tr>
		</thead>
		<tbody>
			{#each wines || [] as wine}
				{@const disabled = !edit.includes(wine.id)}
				<tr class="border-b {!disabled ? 'bg-white' : ''}">
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.name}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.producer}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.years}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.region}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.nation}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.price}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.type}
							{disabled}
							required
						/>
					</td>
					<td class="sticky right-0 bg-yellow-50 text-center">
						<span class="absolute top-0 left-0 h-full w-[1px] bg-black"></span>
						{#if !disabled}
							<button class="cursor-pointer px-2" onclick={() => onEdit(wine)}> ✅ </button>
						{:else}
							<button class="cursor-pointer px-2" onclick={() => (edit = [...edit, wine.id])}>
								✏️
							</button>
						{/if}
						<button class="cursor-pointer px-2" onclick={() => toggleWine(wine)}>
							{#if wine.disabled}
								↩️
							{:else}
								❌
							{/if}
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<button
		class="mt-4 cursor-pointer"
		onclick={() => {
			const id = `${Math.random()}-new`;
			edit = [...edit, id];
			wines = [
				...wines,
				{
					id,
					years: 0,
					producer: '',
					disabled: false,
					nation: '',
					name: '',
					price: 0,
					region: '',
					type: '',
					grape: '',
					alcohol: ''
				}
			];
		}}>Aggiungi +</button
	>
</div>
