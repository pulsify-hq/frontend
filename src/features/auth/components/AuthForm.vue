<script setup lang="ts">
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import { ref, watch } from "vue";

	const email = ref("");
	const password = ref("");
	const confirmedPassword = ref("");

	interface Props {
		mode?: "login" | "signup";
	}

	const props = withDefaults(defineProps<Props>(), {
		mode: "signup",
	});

	const passwordError = ref("");
	const confirmedPasswordError = ref("");


	function handleSubmit() {
		if (props.mode === 'login') return
	}


	watch(password, (newVal) => {
		if (newVal.length === 0) {
			passwordError.value = "";
		} else if (newVal.length < 8) {
			passwordError.value = "Password must be at least 8 characters";
		} else {
			passwordError.value = "";
		}

		if (newVal === confirmedPassword.value) {
			confirmedPasswordError.value = "";
		}
	});

	watch(confirmedPassword, (newVal) => {
		if (newVal !== password.value) {
			confirmedPasswordError.value = "Passwords must match";
		} else {
			confirmedPasswordError.value = "";
		}
	});

	watch(
		() => props.mode,
		(newVal, oldValue) => {
			if (newVal !== oldValue) {
				email.value = "";
				password.value = "";
				confirmedPassword.value = "";
			}
		},
	);
</script>

<template>
	<h2 class="text-primary text-xl mb-4">
		{{ mode === "login" ? "Sign in to" : "Sign up for" }} Pulsify
	</h2>

	<form action="" class="flex flex-col gap-8" @submit.prevent>
		<div class="flex flex-col gap-6">
			<BaseInput
				v-model="email"
				label="Email Address"
				type="email"
				placeholder="you@example.com"
				hint="We'll never share your email"
				required
				autocomplete="email"
			/>

			<!-- Password Field Group -->
			<BaseInput
				v-model="password"
				label="Password"
				type="password"
				hint="Password must be 8+ characters"
				:error="passwordError"
				required
				:autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
			/>

			<BaseInput
				v-if="mode === 'signup'"
				v-model="confirmedPassword"
				label="Confirm Password"
				type="password"
				hint="Passwords must match"
				:error="confirmedPasswordError"
				required
				autocomplete="new-password"
			/>
		</div>
		<BaseButton type="submit">Submit</BaseButton>
	</form>
</template>
