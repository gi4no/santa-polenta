<script lang="ts">
	import { auth } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { onMount } from 'svelte';

	let user = $state({ email: '', password: '' });

	const onSubmit = (e: Event) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, user.email, user.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	onMount(() => {});
</script>

<section class="h-[100dvh] bg-yellow-200">
	<article
		class="fixed top-1/2 left-1/2 lg:min-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white py-10 shadow-2xl"
	>
		<div class="flex flex-col items-center justify-center px-6 lg:px-12">
			<div class="mb-12 w-[200px]">
				<Logo isAdmin />
			</div>
			<form class="w-full space-y-4" onsubmit={onSubmit}>
				<Input name="mail" type="text" label="Email" bind:value={user.email} />
				<Input name="password" type="password" label="Password" bind:value={user.password} />
				<Button type="submit" label="login" />
			</form>
		</div>
	</article>
</section>
