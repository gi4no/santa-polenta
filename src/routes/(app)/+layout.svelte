<script lang="ts">
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<section
	class="main-section min-h-[100vh] bg-cover bg-fixed bg-position-[0_-360px] bg-no-repeat {page.url
		.pathname} relative"
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
		background-attachment: fixed;
		@variant lg {
			background:
				linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
				url('/assets/images/santa-polenta-desk.jpg') no-repeat;
			background-position: center center;
			background-size: cover;
			background-attachment: fixed;
		}
		:global(&.\/carta-vini),
		:global(&.\/carta\/pranzo),
		:global(&.\/carta\/cena),
		:global(&.\/lista-allergeni) {
			background:
				linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
				url('/assets/images/santa-polenta.png') no-repeat;
			background-position: center center;
			background-size: cover;
			background-attachment: fixed;
			transition: all 0.4s ease-out;
			@variant lg {
				background:
					linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
					url('/assets/images/santa-polenta-desk.jpg') no-repeat;
				background-position: center center;
				background-size: cover;
				background-attachment: fixed;
			}
			:global(footer a) {
				color: black;
			}
		}
	}
</style>
