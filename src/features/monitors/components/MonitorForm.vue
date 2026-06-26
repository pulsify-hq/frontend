<script setup lang="ts">
	import BaseModal from "@/shared/components/base/BaseModal.vue";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import { useMonitorStore } from "../stores/monitorStore";
	import { useForm } from "vee-validate";
	import { z } from "zod";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import LoadingSpinner from "@/shared/components/feedback/LoadingSpinner.vue";
	import { monitorSchema } from "../composables/schema";
	import { toTypedSchema } from "@vee-validate/zod";
	import { computed, watch } from "vue";
import { useMonitorModal } from "../composables/useMonitorModal";

	const store = useMonitorStore();

	const {editingId} = useMonitorModal()
	const isOpen = defineModel<boolean>({ default: false });

	const existingMonitor = computed(() =>
		editingId.value ? store.monitors.find((m) => m.id === editingId.value) : null,
	);

	const { handleSubmit, errors, defineField, meta, resetForm } = useForm({
		validationSchema: toTypedSchema(monitorSchema),
		initialValues: {
			name: existingMonitor.value?.name ?? "",
			url: existingMonitor.value?.url ?? "",
		},
	});

	const [name] = defineField("name");
	const [url] = defineField("url");

	const onSubmit = handleSubmit(async (values) => {
		store.resetError();
		const success = editingId.value
			? await store.updateMonitor(editingId.value, values)
			: await store.createMonitor(values.name, values.url);

		if (success) {
			isOpen.value = false;
		} 
	});

	watch(isOpen, (open) => {
		if (open) {
			resetForm({
				values: {
					name: existingMonitor.value?.name ?? "",
					url: existingMonitor.value?.url ?? ""
				}
			})
		}
	})
</script>

<template>
	<BaseModal v-model="isOpen">
		<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
			<BaseInput
				v-model="name"
				label="Monitor Name"
				type="text"
				placeholder="My monitor"
				hint="Choose what you'll call your monitor"
				:error="errors.name"
				required
			/>
			<BaseInput
				v-model="url"
				label="Site URL"
				type="text"
				placeholder="https://www.mysite.com"
				hint="Enter the link to your site"
				:error="errors.url"
				required
			/>
			<BaseButton type="submit">
				<LoadingSpinner v-if="store.isLoading" />
				<span v-else>Next</span>
			</BaseButton>
		</form>
		<!-- <button @click="isOpen = false">Close</button> -->
	</BaseModal>
</template>
