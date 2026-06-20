<script setup lang="ts">
	import { computed } from "vue";

	interface Props {
		variant?: "primary" | "secondary" | "destructive";
		type?: "button" | "submit" | "reset";
		disabled?: boolean;
	}

	const props = withDefaults(defineProps<Props>(), {
		variant: "primary",
		type: "button",
		disabled: false,
	});

	const variantClasses = {
		primary:
			"bg-primary border-primary text-black hover:bg-primary-dim hover:border-primary-dim btn-primary",
		secondary:
			"bg-transparent border-border text-white hover:bg-border border-2",
		destructive: "bg-error/10 border-error/20 text-error hover:bg-error/15",
	};

	const buttonStyle = computed(() => variantClasses[props.variant]);
    const disabledButtonStyle = computed(() => {
        return props.disabled? 'cursor-not-allowed bg-primary-dim/30 border-primary-dim/10 hover:bg-primary-dim/30 hover:border-primary-dim/10' : 'cursor-pointer'
    })
</script>

<template>
	<button
		:type="type"
		:disabled="disabled"
		:aria-disabled="disabled"
		:class="buttonStyle, disabledButtonStyle"
		class="px-4 py-2 text-sm md:text-base border rounded-md font-semibold transition-colors duration-200"

	>
		<slot></slot>
	</button>
</template>

<style scoped>
	.btn-primary {
		position: relative;
		overflow: hidden;
	}

	.btn-primary::after {
		content: "";
		position: absolute;
		top: 0;
		left: -100%;
		width: 60%;
		height: 100%;
		background: linear-gradient(
			120deg,
			transparent 0%,
			rgba(255, 255, 255, 0.3) 50%,
			transparent 100%
		);
		transform: skewX(-20deg);
		transition: left 0.5s ease;
	}

	.btn-primary:hover::after {
		left: 150%;
	}
</style>
