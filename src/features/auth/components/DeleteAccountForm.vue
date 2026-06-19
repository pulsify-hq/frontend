<script setup lang="ts">
	import { ref } from "vue";
	import { useAuthStore } from "../stores/authStore";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";

	const props = defineProps<{ email: string }>();
	const emit = defineEmits<{ done: [] }>();

	const store = useAuthStore();
	const isDeleting = ref(false);

	async function handleDelete() {
		store.error = null;
		isDeleting.value = true;
		const success = await store.deleteUser(props.email);
		isDeleting.value = false;

		if (success) {
			emit("done");
		}
	}
</script>

<template>
	<div class="flex flex-col gap-6">
		<BaseCard variant="danger" v-if="store.error">{{ store.error }}</BaseCard>

		<p class="text-text-muted text-xs">
			Deleting an account is irreversible and you will not be able to retrieve
			your account once deleted.
		</p>

		<BaseButton
			variant="destructive"
			:disabled="isDeleting"
			@click="handleDelete"
		>
			{{ isDeleting ? "Deleting..." : "Delete Account" }}
		</BaseButton>
	</div>
</template>
