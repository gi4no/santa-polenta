<script lang="ts">
	import { Backend } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
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

<h3 class="mb-8 text-3xl">Carta vini</h3>

<div>
	<table class="w-full">
		<thead class="text-left">
			<tr class="bg-yellow-300">
				<th class="rounded-tl-xl px-2 py-2">Nome</th>
				<th class="px-2 py-2">Cantina</th>
				<th class="px-2 py-2">Annata</th>
				<th class="px-2 py-2">Regione</th>
				<th class="px-2 py-2">Nazione</th>
				<th class="px-2 py-2">Prezzo</th>
				<th class="px-2 py-2">Tipologia</th>
				<th class="w-[150px] rounded-tr-xl px-2 py-2">&nbsp;</th>
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
							bind:value={wine.nome}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.cantina}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.anno}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.regione}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.nazione}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.prezzo}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={wine.tipolgia}
							{disabled}
							required
						/>
					</td>
					<td class="text-center">
						<button class="cursor-pointer px-2" onclick={() => (edit = [...edit, wine.id])}>
							✏️
						</button>
						<button class="cursor-pointer px-2" onclick={() => onEdit(wine)}> ✅ </button>
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
					anno: 0,
					cantina: '',
					disabled: false,
					nazione: '',
					nome: '',
					prezzo: 0,
					regione: '',
					tipolgia: ''
				}
			];
		}}>Aggiungi +</button
	>
</div>
