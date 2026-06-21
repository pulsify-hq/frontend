<script setup lang="ts">
import StatusBadge from '@/features/monitors/components/StatusBadge.vue';
import EmptyState from '@/shared/components/feedback/EmptyState.vue';

	
</script>

<template>
	<section class="flex items-center justify-center h-full">
		<StatusBadge status="UP" />
		<EmptyState />
	</section>
</template>
