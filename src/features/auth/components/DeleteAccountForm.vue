<script setup lang="ts">
	import { useAuthStore } from "../stores/authStore";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import LoadingSpinner from "@/shared/components/feedback/LoadingSpinner.vue";

	const emit = defineEmits<{ done: [] }>();

	const store = useAuthStore();

	async function handleDelete() {
		store.error = null;
		const success = await store.deleteUser();

		if (success) {
			emit("done");
		}
	}
</script>

<template>
	<div class="flex flex-col gap-6">
		<BaseCard class="py-2!" variant="danger" v-if="store.error">{{ store.error }}</BaseCard>

		<p class="text-text-muted text-xs">
			Deleting an account is irreversible and you will not be able to retrieve
			your account once deleted.
		</p>

		<BaseButton
			variant="destructive"
			:disabled="store.isLoading"
			@click="handleDelete"
		>
			<LoadingSpinner v-if="store.isLoading" />
			<span v-else>Delete Account</span>
		</BaseButton>
	</div>
</template>
