<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			modelValue?: boolean;
		}>(),
		{
			modelValue: true,
		},
	);

	const emit = defineEmits<{
		"update:modelValue": [boolean];
	}>();
</script>

<template>
	<label class="relative inline-flex items-center cursor-pointer">
		<input
			type="checkbox"
			class="sr-only peer"
			:checked="modelValue"
			@change="emit('update:modelValue', !modelValue)"
		/>

		<div
			class="w-11 h-6 bg-surface-high rounded-full peer-checked:bg-primary transition-colors duration-200"
		></div>

		<div
			class="absolute left-0.5 top-0.5 w-5 h-5 bg-white peer-checked:bg-surface-low rounded-full transition-transform duration-200 peer-checked:translate-x-5"
		></div>
	</label>
</template>
