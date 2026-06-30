<script lang="ts">
	import { useId } from 'vue';
	const id = useId()

	export default { inheritAttrs: false };
</script>

<script setup lang="ts">

	interface Props {
		modelValue?: string;
		label?: string;
		error?: string |null;
		hint?: string;
		type?: "text" | "email" | "password" | "url" | "number" | "tel";
	}

	const props = withDefaults(defineProps<Props>(), {
		type: "text",
	});

	const emit = defineEmits(["update:modelValue"]);
</script>

<template>
	<div class="flex flex-col gap-1">
		<label
			:for="id"
			v-if="label"
			class="text-xs font-mono font-bold tracking-widest text-text-muted"
		>
			{{ label }}
		</label>

		<input
			v-bind="$attrs"
			:type="type"
			:value="modelValue"
			:id="id"
			:aria-invalid="!!error"
			:aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
			class="bg-surface border border-border rounded-md px-4 py-2 text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 w-full"
			@input="
				emit('update:modelValue', ($event.target as HTMLInputElement).value)
			"
		/>

		<p v-if="error" :id="`${id}-error`" class="text-xs text-error mt-1">
			{{ error }}
		</p>
		<p v-else-if="hint" :id="`${id}-hint`" class="text-xs text-text-muted mt-1">
			{{ hint }}
		</p>
	</div>
</template>
