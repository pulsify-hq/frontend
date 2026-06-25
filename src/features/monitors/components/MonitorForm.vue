<script setup lang="ts">
	import BaseModal from "@/shared/components/base/BaseModal.vue";
	import BaseButton from "@/shared/components/base/BaseButton.vue"; // Ensure this is imported
	import { useMonitorStore } from "../stores/monitorStore";
	import LoadingSpinner from "@/shared/components/feedback/LoadingSpinner.vue";

	const store = useMonitorStore();

	
	const isOpen = defineModel<boolean>({ default: false });

	const onSubmit = () => {
		isOpen.value = false;
		// todo: form submission
	};
</script>

<template>
	<BaseModal v-model="isOpen">
		<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
			jjjjj
			<BaseButton type="submit">
				<LoadingSpinner v-if="store.isLoading" />
				<span v-else>Next</span>
			</BaseButton>
		</form>

		<button @click="isOpen = false">Close</button>
	</BaseModal>
</template>
