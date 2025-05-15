<script lang="ts">
	import type { Allergeni } from '$types/allergeni';

	export const allergeni: Allergeni[] = [
		{
			name: 'Glutine',
			number: '1',
			description: 'cereali, grano, segale, orzo, avena, farro, kamut, inclusi ibridati derivati'
		},
		{
			name: 'Crostacei e derivati',
			number: '2',
			description: 'marini e d’acqua dolce: gamberi, scampi, granchi e simili'
		},
		{
			name: 'Uova',
			number: '3',
			description: 'uova e prodotti che le contengono: maionese, emulsionanti, pasta all’uovo'
		},
		{
			name: 'Pesce e derivati',
			number: '4',
			description: 'prodotti alimentari in cui è presente il pesce, anche in piccole percentuali'
		},
		{
			name: 'Arachidi e derivati',
			number: '5',
			description: 'creme e condimenti in cui vi sia anche in piccole dosi'
		},
		{
			name: 'Soia e derivati',
			number: '6',
			description: 'prodotti derivati come latte di soia, tofu, spaghetti di soia e simili'
		},
		{
			name: 'Latte e derivati',
			number: '7',
			description:
				'ogni prodotto in cui viene usato il latte: yogurt, biscotti, torte, gelato e creme varie'
		},
		{
			name: 'Frutta a guscio e derivati',
			number: '8',
			description:
				'mandorle, nocciole, noci comuni, noci di acagiù, noci pecan, anacardi, pistacchi'
		},
		{
			name: 'Sedano e derivati',
			number: '9',
			description:
				'sia in pezzi che all’interno di preparati per zuppe, salse e concentrati vegetali'
		},
		{
			name: 'Senape e derivati',
			number: '10',
			description: 'si può trovare nelle salse e nei condimenti, specie nella mostarda'
		},
		{
			name: 'Semi di sesamo e derivati',
			number: '11',
			description: 'semi interi usati per il pane, farine che lo contengono in minima percentuale'
		},
		{
			name: 'Anidride solforosa e solfiti',
			number: '12',
			description:
				'anidride solforosa e solfiti in concentrazione superiori a 10 mg/kg o 10 mg/l espressi come SO2 - usati come conservanti, possiamo trovarli in: conserve di prodotti ittici, in cibi sott’aceto, sott’olio e in salamoia, nelle marmellate, nell’aceto, nei funghi secchi e nelle bibite analcoliche e succhi di frutta'
		},
		{
			name: 'Lupino e derivati',
			number: '13',
			description: 'presenti in cibi vegan sotto forma di: arrosti, salamini, farine e similari'
		},
		{
			name: 'Molluschi e derivati',
			number: '14',
			description:
				'canestrello, cannolicchio, capasanta, cozza, ostrica, patella, vongola, tellina, ecc...'
		}
	];
</script>

<section class="container mx-auto">
	{#each allergeni as { number, name, description }}
		<div class="mb-6 flex items-start gap-4">
			<img class="w-[80px]" src="/assets/allergeni/{number}.png" alt={name} />
			<div>
				<h3 class="font-bold">{number} {name}</h3>
				<p class="text-sm">{description}</p>
			</div>
		</div>
	{/each}
</section>
