<script setup lang="ts">
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import ForgotPasswordForm from "../components/ForgotPasswordForm.vue";
</script>

<template>
	<main
		class="flex items-center justify-center min-h-screen"
		aria-label="Forgot password"
	>
		<BaseCard class="w-full m-8 max-w-90">
			<ForgotPasswordForm mode="delete" />
		</BaseCard>
	</main>
</template>
