<script setup lang="ts">
	import { computed } from "vue";

	interface Props {
		status: "UP" | "DOWN";
		lastPingCheck?: string;
	}

	const props = defineProps<Props>();

	const variantClasses = {
		UP: "bg-primary-dim/20 backdrop-blur-md border-primary border text-primary [&_div]:bg-primary",

		DOWN: "bg-error/10 border-error border text-error [&_div]:bg-error",
	};

	const badgeStyle = computed(() => variantClasses[props.status]);

	const tooltipText = computed(() => {
		if (!props.lastPingCheck) return `Status: ${props.status}`;
		const date = new Date(props.lastPingCheck);
		return `Status: ${props.status} • Last checked: ${date.toLocaleString()}`;
	});
</script>

<template>
	<div
		:class="badgeStyle"
		class="flex items-center justify-center py-2 px-4 rounded-full gap-2"
		role="status"
        :title="tooltipText"
		:aria-label="tooltipText"
	>
		<div
			class="w-3 h-3 rounded-full"
			:class="status === 'UP' ? 'animate-pulse' : ''"
		></div>
		<span>{{ status }}</span>
	</div>
</template>
