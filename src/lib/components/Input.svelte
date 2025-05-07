<script>
	let { type, value = $bindable(), label, id = '', name } = $props();
</script>

<div class="w-full">
	<label for={id || name} class="block text-sm">{label}</label>
	<input id={id || name} class="w-full rounded-sm border-2 px-2 py-3" {type} {name} bind:value />
</div>
