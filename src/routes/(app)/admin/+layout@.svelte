<script>
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<section class="h-[100dvh] bg-yellow-50">
	<nav class="fixed top-0 h-[100dvh] w-[300px] bg-yellow-100">
		<Header isAdmin />
		<ul class="my-8 px-4">
			<li class="text-xl">
				<a href="/admin/menu">Menu</a>
			</li>
			<li class="text-xl">
				<a href="/admin/carta-vini">Carta vini</a>
			</li>
		</ul>
	</nav>
	<section class="ml-[300px] w-[calc(100%-300px)] px-8 py-8">
		{@render children()}
	</section>
</section>
