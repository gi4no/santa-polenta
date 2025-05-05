<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<section class="main-section h-[100dvh] bg-cover bg-position-[0_-360px] bg-no-repeat">
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
	}
</style>
