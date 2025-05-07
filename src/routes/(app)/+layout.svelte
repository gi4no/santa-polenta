<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<section
	class="main-section h-[100dvh] bg-cover bg-position-[0_-360px] bg-no-repeat {page.url.pathname}"
>
	<Header />
	{@render children()}
	<Footer />
</section>

<style lang="postcss">
	@reference "tailwindcss";
	.main-section {
		background:
			linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
			url('/assets/images/santa-polenta.png') no-repeat;
		background-position: center center;
		background-size: cover;
		@variant lg {
			background:
				linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
				url('/assets/images/santa-polenta-desk.jpg') no-repeat;
			background-position: center center;
			background-size: cover;
		}
		:global(&.\/carta-vini) {
			background:
				linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
				url('/assets/images/santa-polenta-desk.jpg') no-repeat;
			background-position: center center;
			background-size: cover;
			transition: all 0.4s ease-out;
		}
	}
</style>
