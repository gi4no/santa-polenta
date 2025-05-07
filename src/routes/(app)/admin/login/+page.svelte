<script>
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Logo from '$lib/components/Logo.svelte';
</script>

<section class="h-[100dvh] bg-yellow-200">
	<article
		class="fixed top-1/2 left-1/2 min-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white py-20 shadow-2xl"
	>
		<div class="flex flex-col items-center justify-center px-12">
			<div class="mb-12 w-[200px]">
				<Logo isAdmin />
			</div>
			<form class="w-full space-y-4">
				<Input name="mail" type="text" value="" label="Email" />
				<Input name="password" type="password" value="" label="Password" />
				<Button type="submit" label="login" />
			</form>
		</div>
	</article>
</section>
