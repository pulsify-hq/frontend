<script setup lang="ts">
	import BaseButton from "../base/BaseButton.vue";

	interface Props {
		title?: string;
		description?: string;
		imageURL?: string;
		usesButton?: boolean;
	}

	const props = withDefaults(defineProps<Props>(), {
		title: "There's nothing here...",
		description: "Go ahead and create your first monitor",
		imageURL: "/undraw_server-down.svg",
		usesButton: true,
	});
</script>

<template>
	<div class="flex flex-col items-center mb-12 md:mb-0">
		<img :src="imageURL" alt="" class="opacity-50 w-64 mb-4 md:mb-8" />
		<p class="text-text text-2xl md:text-4xl">{{ title }}</p>
		<p class="text-text-muted text-sm md:text-base mb-4 md:mb-8">
			{{ description }}
		</p>
		<BaseButton v-if="usesButton" class="w-full">
			Create a new monitor
		</BaseButton>
	</div>
</template>
