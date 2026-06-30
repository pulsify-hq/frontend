<script setup lang="ts">
	import { onMounted, onUnmounted } from "vue";
	import BaseCard from "./BaseCard.vue";

	const props = withDefaults(
		defineProps<{
			modelValue: boolean;
			closeable?: boolean;
			title?: string
		}>(),
		{
			closeable: true,
		},
	);

	const emit = defineEmits<{
		"update:modelValue": [boolean];
	}>();

	const handleBackdrop = (e: MouseEvent) => {
		if (props.closeable && e.target === e.currentTarget) {
			emit("update:modelValue", false);
		}
	};

	const handleEscape = (e: KeyboardEvent) => {
		if (props.closeable && e.key === "Escape" && props.modelValue) {
			emit("update:modelValue", false);
		}
	};

	onMounted(() => {
		window.addEventListener("keydown", handleEscape);
	});

	onUnmounted(() => {
		window.removeEventListener("keydown", handleEscape);
	});
</script>

<template>
	<Teleport to="body">
		<Transition name="backdrop">
			<div
				v-if="modelValue"
				class="h-screen w-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 text-text p-4"
				role="dialog"
				aria-modal="true"
				:aria-label="title ?? 'Dialog'"
				@click="handleBackdrop"
			>
				<BaseCard
					class="w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden py-6"
				>
					<div class="overflow-y-auto max-h-full scrollbar-none">
						<slot></slot>
					</div>
				</BaseCard>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
	.backdrop-enter-active,
	.backdrop-leave-active {
		transition: opacity 0.2s ease;
	}

	.backdrop-enter-from,
	.backdrop-leave-to {
		opacity: 0;
	}
</style>
