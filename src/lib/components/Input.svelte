<script>
	let { type, value, label, id = '', name } = $props();
</script>

<div class="w-full">
	<label for={id || name} class="block text-sm">{label}</label>
	<input id={id || name} class="border-2 px-2 py-3 rounded-sm w-full" {type} {name} bind:value />
</div>
