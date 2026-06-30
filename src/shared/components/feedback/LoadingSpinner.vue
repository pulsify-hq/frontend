<script setup lang="ts">
	import { computed } from "vue";

	interface Props {
		size?: "sm" | "md" | "lg";
	}

	const props = withDefaults(defineProps<Props>(), {
		size: "sm",
	});

	const size = computed(() => {
		return props.size === "sm"
			? "w-4 h-4"
			: props.size === "md"
				? "w-6 h-6"
				: "w-10 h-10";
	});
</script>

<template>
	<svg
		class="animate-spin"
		:class="size"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		role="status"
		aria-label="Loading. Please wait"
	>
		<circle
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			stroke-width="3"
			opacity="0.2"
		/>
		<path
			d="M12 2a10 10 0 0 1 10 10"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
		/>
	</svg>
</template>
