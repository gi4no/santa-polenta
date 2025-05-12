<script lang="ts">
	import type { Vino } from '$types/cartaVini';

	let { wine }: { wine: Vino } = $props();
</script>

<div class="mt-4 flex gap-4 items-center justify-between rounded-2xl bg-white/70 px-4 py-4 first:mt-0">
	<div>
		<div class="mb-4">
			<h3 class="text-xl">{wine.name}</h3>
			<h4 class="italic">{wine.producer}</h4>
		</div>
		<ul>
			<li>Anno: {wine.years}</li>
			<li>Gradi: {wine.alcohol}</li>
			<li>Uvaggio: {wine.grape}</li>
			<li>Regione: {wine.region}</li>
			<li>Nazione: {wine.nation}</li>
			<li>Tipologia: {wine.type}</li>
		</ul>
	</div>
	<div>
		<p class="text-2xl whitespace-nowrap">€ {wine.price}</p>
	</div>
</div>
