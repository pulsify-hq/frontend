<script setup lang="ts" generic="T">
	import BaseInput from "./BaseInput.vue";

	import { toRefs } from "vue";
	import { useSearch } from "../../composables/useSearch";

	const props = defineProps<{
		items: T[];
		getText: (item: T) => string;
	}>();

	const { items } = toRefs(props);

	const { searchQuery, results } = useSearch(items, props.getText);
</script>

<template>
	<div>
		<BaseInput v-model="searchQuery" placeholder="search"></BaseInput>

		<slot :results="results"></slot>
	</div>
</template>
