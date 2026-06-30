<script setup lang="ts">
	import { useRoute } from "vue-router";
	import VerificationFlow from "../components/VerificationFlow.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";

	const route = useRoute();
	const mode =
		(route.query.mode as "default" | "reset") ?? "default";
</script>

<template>
	<main
		class="flex items-center justify-center min-h-screen"
		aria-label="Verification"
	>
		<BaseCard class="w-full m-8 max-w-90">
			<VerificationFlow :mode="mode" />
		</BaseCard>
	</main>
</template>
