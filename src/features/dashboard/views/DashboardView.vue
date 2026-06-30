<script setup lang="ts">
	import MonitorCard from "@/features/monitors/components/MonitorCard.vue";
	import EmptyState from "@/shared/components/feedback/EmptyState.vue";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import { onMounted, computed } from "vue";
	import { useMonitorStore } from "@/features/monitors/stores/monitorStore";
	import { useMonitorModal } from "@/features/monitors/composables/useMonitorModal";
	import { useSearch } from "@/shared/composables/useSearch";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import { useHead } from "@unhead/vue";
	
	useHead({ title: "Dashboard — Pulsify" });

	const store = useMonitorStore();
	const { openEdit: openEditModal, openCreate } = useMonitorModal();

	onMounted(() => {
		store.fetchMonitors();
	});

	const { searchQuery, results } = useSearch(
		computed(() => store.monitors),
		(m) => `${m.name} ${m.url}`,
	);

	const openEdit = (id: string) => openEditModal(id);

	const handleDelete = async (id: string) => {
		if (confirm("Delete this monitor? This cannot be undone.")) {
			await store.deleteMonitor(id);
		}
	};
</script>

<template>
	<section class="flex flex-col w-full gap-4 min-h-full">
		<EmptyState
			v-if="store.monitors.length === 0"
			class="flex-1 flex items-center justify-center self-center"
		>
			<BaseButton class="w-full" @click="openCreate()">
				Create a new monitor
			</BaseButton>
		</EmptyState>

		<template v-else>
			<BaseInput
				v-model="searchQuery"
				placeholder="Search monitors"
				class="w-full md:w-64 md:self-end"
			/>

			<EmptyState
				v-if="results.length === 0"
				title="No matches found"
				description="Try a different search term"
				class="flex-1 flex items-center justify-center self-center"
			/>

			<div v-else class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				<MonitorCard
					v-for="monitor in results"
					:key="monitor.id"
					:monitor="monitor"
					@edit="openEdit"
					@delete="handleDelete"
				/>
			</div>
		</template>
	</section>
</template>
