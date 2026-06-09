<script setup lang="ts">
	import { computed } from "vue";

	interface Props {
		variant?: "default" | "outlined" | "danger";
		clickable?: boolean;
		ariaLabel?: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		variant: "default",
		clickable: false,
		ariaLabel: undefined,
	});

	const variantClasses = {
		default: "bg-surface-low/40 backdrop-blur-md border-surface-low text-text",
		outlined: "bg-transparent border-border text-text",
		danger: "bg-error/10 border-error/20 text-error",
	};

    const emit = defineEmits(['click'])

    const handleKeydown = (e: KeyboardEvent) => {
        if (!props.clickable) return
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            emit('click')
        }
    }

	const cardStyle = computed(() => variantClasses[props.variant]);
	const role = computed(() => (props.clickable ? "button" : undefined));
</script>

<template>
	<div
		:class="cardStyle"
		class="px-6 py-4 md:px-6 md:py-6 text-sm md:text-base border rounded-md leading-relaxed"
		:role="role"
		:tabindex="clickable ? 0 : undefined"
		:aria-label="ariaLabel"
        @keydown="handleKeydown"
	>
		<slot></slot>
	</div>
</template>
