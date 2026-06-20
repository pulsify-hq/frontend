<script setup lang="ts">
	import { ref } from "vue";
	import LoginForm from "../components/LoginForm.vue";
	import SignupForm from "../components/SignupForm.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";

	const mode = ref<"signup" | "login">("signup");

	const toggleMode = () => {
		mode.value = mode.value === "login" ? "signup" : "login";
	};
</script>

<template>
	<main
		class="flex items-center justify-center min-h-screen"
		aria-label="Authentication"
	>
		<BaseCard class="w-full m-8 max-w-90">
			<Transition name="fade" mode="out-in">
				<LoginForm v-if="mode === 'login'" key="login" />
				<SignupForm v-else key="signup" />
			</Transition>

			<p class="text-text-muted text-right text-xs mt-4">
				{{
					mode === "signup"
						? "Already have an account?"
						: "Don't have an account?"
				}}
				<button
					class="text-primary cursor-pointer underline"
					@click="toggleMode"
				>
					{{ mode === "signup" ? "Log in" : "Create account" }}
				</button>
			</p>
		</BaseCard>
	</main>
</template>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.15s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
