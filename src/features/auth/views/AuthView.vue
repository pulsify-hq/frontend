<script setup lang="ts">
	import { ref } from "vue";
	import AuthForm from "../components/AuthForm.vue";
	
	import BaseCard from "@/shared/components/base/BaseCard.vue";

	const mode = ref<"signup" | "login">("signup");

    const toggleMode = ()  => { mode.value = mode.value === 'login' ? 'signup' : 'login' }
</script>

<template>
	<main class="flex items-center justify-center min-h-screen" aria-label="Authentication">
		<BaseCard class="w-full m-8 max-w-90">
			<AuthForm :mode="mode" />
			<p class="text-text-muted text-right text-xs mt-4">
				{{
					mode === "signup"
						? "Already have an account?"
						: "Don\'t have an account?"
				}}
				<button class="text-primary cursor-pointer underline" @click="toggleMode">
					{{ 
                        mode === "signup" 
                        ? "Log in" 
                        : "Create account" 
                    }}
				</button>
			</p>
		</BaseCard>
	</main>
</template>
