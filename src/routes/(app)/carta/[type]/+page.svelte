<script lang="ts">
	import { page } from '$app/state';
	import ListaAllergeni from '$lib/components/ListaAllergeni.svelte';
	import PlateBlock from '$lib/components/PlateBlock.svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import Close from '$lib/components/Close.svelte';
	import { openAside } from '$lib/state';
	import { clickOutside } from '$lib/utils';

	let { data }: { data: PageData } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<section class="container mx-auto pb-[200px]">
	<h2 class="font-lucky mb-8 text-center text-xl tracking-widest text-yellow-700">
		Menu {page.params.type}
	</h2>
	<div class="text-center">
		<PlateBlock title="Antipasti" plates={data.menu?.antipasti} />
		<PlateBlock title="Primi" plates={data.menu?.primi} />
		<PlateBlock title="Secondi" plates={data.menu?.secondi} />
		<PlateBlock title="Dolci" plates={data.menu?.dolci} />
		<div class="mb-2">
			<div class="mb-2 text-xl">
				Coperto pane e servizio € 0,00 sono offerti come la nostra simpatia 😄
			</div>
		</div>
		<button class="italic underline cursor-pointer" onclick={() => openAside.set(true)}>Lista allergeni</button>
	</div>
</section>

<div class="aside" use:clickOutside={() => openAside.set(false)} class:open={$openAside}>
	<div class="sticky top-0 flex justify-end bg-white/50 px-2 py-2 backdrop-blur-[2px]">
		<button onclick={() => openAside.set(false)}>
			<Close />
		</button>
	</div>
	<ListaAllergeni />
</div>

<style lang="postcss">
	@reference "tailwindcss";
	.aside {
		transform: translateX(-100%);
		transition: 0.4s ease-out;
		@apply fixed top-0 left-0 z-10 h-full w-[80%] overflow-y-auto bg-white pb-8 lg:w-[500px];
		&.open {
			transform: none;
		}
	}
</style>
