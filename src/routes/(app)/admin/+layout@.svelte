<script>
	import { browser } from '$app/environment';
	import { logged } from '$lib/auth';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let { children } = $props();

	let open = $state(false);
	let innerWidth = $state();

	$effect(() => {
		if (innerWidth > 1024) {
			open = true;
		} else {
			open = false;
		}
	});

	onMount(async () => {
		if (browser) {
			await import('$lib/auth');
		}
	});
</script>

<svelte:window bind:innerWidth />

{#if $logged}
	<section class="min-h-[100vh] bg-yellow-50">
		<button
			onclick={() => (open = !open)}
			class="absolute top-4 left-4 z-20 block text-2xl lg:hidden"
		>
			{#if open}
				❌
			{:else}
				🚀
			{/if}
		</button>
		<nav
			class={twMerge(
				'fixed top-0 z-10 h-[100dvh] w-[300px] -translate-x-full bg-yellow-100 py-8 shadow-2xl font-kaikoura text-gray-800',
				open && 'translate-x-0 transition-transform'
			)}
		>
			<ul class="my-8 px-4">
				<li class="text-xl">
					<a href="/admin/carta">Carta</a>
				</li>
				<li class="text-xl">
					<a href="/admin/carta-vini">Carta vini</a>
				</li>
			</ul>
		</nav>
		<section class="lg:ml-[300px] lg:w-[calc(100%-300px)]">
			<Header isAdmin />
			<main class="px-2 lg:px-4 py-8">
				{@render children()}
			</main>
		</section>
	</section>
{/if}
