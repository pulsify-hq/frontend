<script setup lang="ts">
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import { type Monitor } from "../stores/monitorStore";

	import StatusBadge from "./StatusBadge.vue";
	import BaseButton from "@/shared/components/base/BaseButton.vue";

	const props = defineProps<{ monitor: Monitor }>();

	const emit = defineEmits<{
		(e: "edit", id: string): void;
		(e: "delete", id: string): void;
	}>();
</script>

<template>
	<BaseCard class="md:max-w-full"
		><p>{{ props.monitor.name }}</p>
		<p>{{ props.monitor.url }}</p>
		<StatusBadge
			:status="props.monitor.status"
			:last-ping-check="props.monitor.lastPingCheck"
		/>
		<BaseButton @click="emit('edit', props.monitor.id)">Edit</BaseButton>
		<BaseButton @click="emit('delete', props.monitor.id)">Delete</BaseButton>
	</BaseCard>
</template>
