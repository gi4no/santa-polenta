<script lang="ts">
	import { Backend } from '$lib/api';
	import type { Menu, MenuAssign, Plate } from '$types/menu';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let plates: Plate[] = $state([]);
	let edit: string[] = $state([]);
	let editMenu: string[] = $state([]);
	let menusAssignment: MenuAssign = $state({ pranzo: '', cena: '', id: '' });
	let menus: Menu[] = $state([]);

	const onEdit = async (plate: Plate) => {
		if (plate.id.includes('new')) {
			await Backend.addPlate(plate);
		} else {
			await Backend.updatePlate(plate);
		}
		await fetchPlate();
		edit = edit.filter((el) => el !== plate.id);
	};

	const onEditMenu = async (menu: Menu) => {
		if (menu.id.includes('new')) {
			await Backend.addMenu(menu);
		} else {
			await Backend.updateMenu(menu);
		}
		await fetchMenu();
		editMenu = editMenu.filter((el) => el !== menu.id);
	};

	const onEditMenuAssignment = async (id: string, key: 'pranzo' | 'cena') => {
		menusAssignment = { ...menusAssignment, [key]: id };
		await Backend.updateMenuAssignment(menusAssignment);
		await fetchMenuAssignment();
	};

	const fetchPlate = async () => {
		plates = await Backend.getPlate();
	};

	const fetchMenu = async () => {
		menus = await Backend.getMenu();
	};

	const fetchMenuAssignment = async () => {
		menusAssignment = await Backend.getMenuAssignment();
	};

	onMount(() => {
		fetchPlate();
		fetchMenu();
		fetchMenuAssignment();
	});
</script>

<h3 class="font-kaikoura mb-4 text-3xl">Carta</h3>
<h4 class="font-kaikoura mb-8 text-xl">Piatti</h4>

<div class="mb-8 w-full overflow-auto">
	<table class="w-full">
		<thead class="text-left">
			<tr class="bg-yellow-300">
				<th class="min-w-[350px] rounded-tl-xl px-2 py-2">Nome</th>
				<th class="w-[150px] px-2 py-2">Allergeni</th>
				<th class="w-[150px] px-2 py-2">Prezzo</th>
				<th class="w-[150px] rounded-tr-xl px-2 py-2">Azioni</th>
			</tr>
		</thead>
		<tbody>
			{#each plates || [] as plate}
				{@const disabled = !edit.includes(plate.id)}
				<tr class="border-b {!disabled ? 'bg-white' : ''}">
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={plate.nome}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={plate.allergeni}
							{disabled}
							required
						/>
					</td>
					<td>
						<input
							class="w-full px-2 py-2"
							type="text"
							bind:value={plate.prezzo}
							{disabled}
							required
						/>
					</td>
					<td class="text-center">
						{#if !disabled}
							<button class="cursor-pointer px-2" onclick={() => onEdit(plate)}> ✅ </button>
						{:else}
							<button class="cursor-pointer px-2" onclick={() => (edit = [...edit, plate.id])}>
								✏️
							</button>
						{/if}
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
			plates = [
				...plates,
				{
					id,
					nome: '',
					allergeni: '',
					prezzo: 0
				}
			];
		}}>Aggiungi +</button
	>
</div>

<h4 class="font-kaikoura mb-4 text-xl">Menu</h4>
<h5 class="font-kaikoura">Assegna menu:</h5>
<div class="mb-4 flex">
	<div class="min-w-[200px]">
		<p class="italic">Pranzo</p>
		<select
			name="pranzo"
			id="pranzo"
			class="rounded-sm border px-2 py-2"
			value={menusAssignment.pranzo}
			onchange={(e) => {
				onEditMenuAssignment(e.currentTarget.value, 'pranzo');
			}}
		>
			{#each menus as menu}
				<option value={menu.id}>{menu.nome}</option>
			{/each}
		</select>
	</div>
	<div>
		<p class="italic">Cena</p>
		<select
			name="cena"
			id="cena"
			class="rounded-sm border px-2 py-2"
			value={menusAssignment.cena}
			onchange={(e) => {
				onEditMenuAssignment(e.currentTarget.value, 'cena');
			}}
		>
			{#each menus as menu}
				<option value={menu.id}>{menu.nome}</option>
			{/each}
		</select>
	</div>
</div>

<h5 class="font-kaikoura">Modifica/Aggiungi menu:</h5>
<div class="mb-4 grid grid-cols-1 items-start gap-8">
	{#each menus as menu}
		{@const disabled = !editMenu.includes(menu.id)}
		<div class="flex items-center rounded-sm border px-3 py-3">
			<div class="grow">
				<div class="mb-2">
					<label for="nome" class={twMerge('text-sm', disabled && 'font-bold')}>Nome</label>
					<input
						id="nome"
						class={twMerge('w-full rounded-sm border px-2 py-2', disabled && 'border-0 px-0 py-0')}
						type="text"
						bind:value={menu.nome}
						required
						{disabled}
					/>
				</div>
				<div class="mb-2">
					<label for="antipasti" class={twMerge('text-sm', disabled && 'font-bold')}>
						Antipasti
					</label>
					{#if !disabled}
						<select
							id="antipasti"
							class="mb-2 w-full rounded-sm border px-2 py-2"
							required
							onchange={(e) => {
								menu.antipasti = [...menu.antipasti, e.currentTarget.value];
								e.currentTarget.value = '';
							}}
						>
							<option value="">Scegli</option>
							{#each plates.filter((el) => ![...menu.antipasti, ...menu.primi, ...menu.secondi, ...menu.dolci].includes(el.id)) as plate}
								<option value={plate.id}>{plate.nome}</option>
							{/each}
						</select>
					{/if}
					{#each menu.antipasti as antipasto}
						<div>
							{#if !disabled}
								<button
									onclick={() => (menu.antipasti = menu.antipasti.filter((el) => el !== antipasto))}
								>
									❌
								</button>
							{/if}
							{plates.find((el) => el.id === antipasto)?.nome}
						</div>
					{/each}
				</div>
				<div class="mb-2">
					<label for="primi" class={twMerge('text-sm', disabled && 'font-bold')}>Primi</label>
					{#if !disabled}
						<select
							id="primi"
							class="mb-2 w-full rounded-sm border px-2 py-2"
							required
							onchange={(e) => {
								menu.primi = [...menu.primi, e.currentTarget.value];
								e.currentTarget.value = '';
							}}
						>
							<option value="">Scegli</option>
							{#each plates.filter((el) => ![...menu.antipasti, ...menu.primi, ...menu.secondi, ...menu.dolci].includes(el.id)) as plate}
								<option value={plate.id}>{plate.nome}</option>
							{/each}
						</select>
					{/if}
					{#each menu.primi as primi}
						<div>
							{#if !disabled}
								<button onclick={() => (menu.primi = menu.primi.filter((el) => el !== primi))}>
									❌
								</button>
							{/if}
							{plates.find((el) => el.id === primi)?.nome}
						</div>
					{/each}
				</div>
				<div class="mb-2">
					<label for="secondi" class={twMerge('text-sm', disabled && 'font-bold')}>Secondi</label>
					{#if !disabled}
						<select
							id="secondi"
							class="mb-2 w-full rounded-sm border px-2 py-2"
							required
							onchange={(e) => {
								menu.secondi = [...menu.secondi, e.currentTarget.value];
								e.currentTarget.value = '';
							}}
						>
							<option value="">Scegli</option>
							{#each plates.filter((el) => ![...menu.antipasti, ...menu.primi, ...menu.secondi, ...menu.dolci].includes(el.id)) as plate}
								<option value={plate.id}>{plate.nome}</option>
							{/each}
						</select>
					{/if}
					{#each menu.secondi as secondi}
						<div>
							{#if !disabled}
								<button
									onclick={() => (menu.secondi = menu.secondi.filter((el) => el !== secondi))}
								>
									❌
								</button>
							{/if}
							{plates.find((el) => el.id === secondi)?.nome}
						</div>
					{/each}
				</div>
				<div class="mb-2">
					<label for="dolci" class={twMerge('text-sm', disabled && 'font-bold')}>Dolci</label>
					{#if !disabled}
						<select
							id="dolci"
							class="mb-2 w-full rounded-sm border px-2 py-2"
							required
							onchange={(e) => {
								menu.dolci = [...menu.dolci, e.currentTarget.value];
								e.currentTarget.value = '';
							}}
						>
							<option value="">Scegli</option>
							{#each plates.filter((el) => ![...menu.antipasti, ...menu.primi, ...menu.secondi, ...menu.dolci].includes(el.id)) as plate}
								<option value={plate.id}>{plate.nome}</option>
							{/each}
						</select>
					{/if}
					{#each menu.dolci as dolci}
						<div>
							{#if !disabled}
								<button onclick={() => (menu.dolci = menu.dolci.filter((el) => el !== dolci))}>
									❌
								</button>
							{/if}
							{plates.find((el) => el.id === dolci)?.nome}
						</div>
					{/each}
				</div>
			</div>
			<div class="px-4">
				{#if !disabled}
					<button class="cursor-pointer px-2" onclick={() => onEditMenu(menu)}> ✅ </button>
				{:else}
					<button class="cursor-pointer px-2" onclick={() => (editMenu = [...editMenu, menu.id])}>
						✏️
					</button>
				{/if}
			</div>
		</div>
	{/each}
</div>
<button
	onclick={() => {
		const id = `${Math.random()}-new`;
		editMenu = [...editMenu, id];
		menus = [
			...menus,
			{
				id,
				nome: '',
				antipasti: [],
				primi: [],
				secondi: [],
				dolci: []
			}
		];
	}}
>
	+ Crea nuovo menu
</button>
